// Filme une page web réelle (animations comprises) en suivant un scénario de défilement.
// Usage : node enregistrer-site.cjs <scenario.json> <sortie.mp4>
//
// Le scénario :
// {
//   "url": "https://exemple.mg/",
//   "width": 1920, "height": 1080,
//   "warmupMs": 12000,          // premier chargement non filmé (anti-bot, cache), puis rechargement filmé
//   "settleMs": 600,            // attente après le chargement filmé, gardée dans la vidéo (animations d'entrée)
//   "injectCss": "...",         // facultatif : CSS ajouté à chaque chargement
//   "steps": [
//     { "hold": 2000 },                                        // arrêt
//     { "scrollTo": "#filieres", "offset": -80, "ms": 1400 },  // défilement doux vers un sélecteur
//     { "scrollTo": 2400, "ms": 1200 },                        // ou vers une position en pixels
//     { "jumpTo": "#agrements", "offset": -80 }                // saut instantané (à masquer au montage)
//   ]
// }
//
// La vidéo vient du screencast de Chrome (DevTools) : une image à chaque changement à l'écran,
// recalée ensuite à 30 i/s constants avec ffmpeg.

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { chromium } = require("C:/wamp64/www/ifspa/node_modules/@playwright/test");

const [, , scenarioPath, outPath] = process.argv;
if (!scenarioPath || !outPath) {
  console.error("Usage : node enregistrer-site.cjs <scenario.json> <sortie.mp4>");
  process.exit(1);
}
const scenario = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));
const width = scenario.width ?? 1920;
const height = scenario.height ?? 1080;
const FPS = 30;

// Défilement doux exécuté dans la page, en temps réel (easeInOutCubic).
async function smoothScroll(page, target, offset, ms) {
  await page.evaluate(
    ({ target, offset, ms }) =>
      new Promise((resolve) => {
        const el = typeof target === "string" ? document.querySelector(target) : null;
        const to = Math.max(
          0,
          (el ? el.getBoundingClientRect().top + window.scrollY : Number(target)) + (offset ?? 0),
        );
        const from = window.scrollY;
        const start = performance.now();
        const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const tick = (now) => {
          const t = Math.min(1, (now - start) / ms);
          window.scrollTo(0, from + (to - from) * ease(t));
          if (t < 1) requestAnimationFrame(tick);
          else resolve(to);
        };
        requestAnimationFrame(tick);
      }),
    { target, offset, ms },
  );
}

async function jump(page, target, offset) {
  await page.evaluate(
    ({ target, offset }) => {
      const el = typeof target === "string" ? document.querySelector(target) : null;
      const to = (el ? el.getBoundingClientRect().top + window.scrollY : Number(target)) + (offset ?? 0);
      // « instant » : sinon un site en scroll-behavior: smooth fait défiler tout l'entre-deux.
      window.scrollTo({ top: Math.max(0, to), behavior: "instant" });
    },
    { target, offset },
  );
}

(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  });
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    locale: "fr-FR",
    reducedMotion: "no-preference",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
  });
  // CSS ajouté à chaque chargement, pour masquer à l'image un élément qui ne s'affiche
  // correctement que chez un vrai visiteur (un widget anti-robot, par exemple).
  if (scenario.injectCss) {
    await context.addInitScript((css) => {
      const add = () => {
        const style = document.createElement("style");
        style.textContent = css;
        document.head.append(style);
      };
      if (document.head) add();
      else document.addEventListener("DOMContentLoaded", add);
    }, scenario.injectCss);
  }
  const page = await context.newPage();

  if (scenario.warmupMs) {
    await page.goto(scenario.url, { waitUntil: "load", timeout: 90000 });
    await page.waitForTimeout(scenario.warmupMs);
  }

  const cdp = await context.newCDPSession(page);
  const frames = [];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "enregistrer-site-"));
  cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
    frames.push({ data, t: metadata.timestamp });
    await cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });

  // Le chargement filmé part d'une page blanche : on ne garde les images qu'à partir de l'événement load.
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: width, maxHeight: height, everyNthFrame: 1 });
  await page.goto(scenario.url, { waitUntil: "load", timeout: 90000 });
  const startWall = Date.now() / 1000;
  await page.waitForTimeout(scenario.settleMs ?? 600);

  for (const step of scenario.steps) {
    if (step.hold) await page.waitForTimeout(step.hold);
    else if (step.scrollTo !== undefined) await smoothScroll(page, step.scrollTo, step.offset, step.ms ?? 1200);
    else if (step.jumpTo !== undefined) await jump(page, step.jumpTo, step.offset);
  }
  const endWall = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await browser.close();

  // Horodatage du screencast : secondes depuis l'époque, comme Date.now().
  const kept = frames.filter((f) => f.t >= startWall - 0.05).sort((a, b) => a.t - b.t);
  if (!kept.length) throw new Error("Aucune image filmée.");
  // L'image affichée au moment du load (la dernière avant startWall) ouvre la vidéo.
  const before = frames.filter((f) => f.t < startWall).at(-1);
  const list = before ? [{ ...before, t: startWall }, ...kept] : kept;

  let concat = "";
  list.forEach((f, i) => {
    const file = path.join(tmp, `f${String(i).padStart(5, "0")}.jpg`);
    fs.writeFileSync(file, Buffer.from(f.data, "base64"));
    const next = i + 1 < list.length ? list[i + 1].t : endWall;
    concat += `file '${file.replace(/\\/g, "/")}'\nduration ${Math.max(0.001, next - f.t).toFixed(4)}\n`;
  });
  concat += `file '${path.join(tmp, `f${String(list.length - 1).padStart(5, "0")}.jpg`).replace(/\\/g, "/")}'\n`;
  fs.writeFileSync(path.join(tmp, "concat.txt"), concat);

  execFileSync(
    "ffmpeg",
    [
      "-v", "error", "-y",
      "-f", "concat", "-safe", "0", "-i", path.join(tmp, "concat.txt"),
      "-vf", `fps=${FPS},scale=${width}:${height}:flags=lanczos,format=yuv420p`,
      "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-an", "-movflags", "+faststart",
      outPath,
    ],
    { stdio: "inherit" },
  );
  fs.rmSync(tmp, { recursive: true, force: true });

  const duration = endWall - startWall;
  console.log(
    `${outPath} : ${duration.toFixed(2)} s, ${list.length} images reçues (${(list.length / duration).toFixed(1)} i/s en moyenne)`,
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
