const { chromium } = require('C:/wamp64/www/ifspa/node_modules/@playwright/test');
const [url, out, png] = process.argv.slice(2);
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await p.setViewportSize({ width: 794, height: 1123 }); await p.screenshot({ path: png, fullPage: true });
  await b.close(); })();
