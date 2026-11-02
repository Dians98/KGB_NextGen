// Vérifie que messages/fr.json et messages/en.json ont exactement les mêmes clés.
import { readFileSync } from "node:fs";

const load = (lang) => JSON.parse(readFileSync(new URL(`../messages/${lang}.json`, import.meta.url), "utf8"));

function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

const fr = new Set(keys(load("fr")));
const en = new Set(keys(load("en")));
const missingInEn = [...fr].filter((k) => !en.has(k));
const missingInFr = [...en].filter((k) => !fr.has(k));

if (missingInEn.length || missingInFr.length) {
  if (missingInEn.length) console.error("Manquant dans en.json :", missingInEn.join(", "));
  if (missingInFr.length) console.error("Manquant dans fr.json :", missingInFr.join(", "));
  process.exit(1);
}
console.log(`i18n OK : ${fr.size} clés dans les deux langues.`);
