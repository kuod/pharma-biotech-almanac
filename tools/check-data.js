#!/usr/bin/env node
// Sanity checks for the dataset embedded in index.html. Run: node tools/check-data.js
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const a = html.indexOf('const data={'), b = html.indexOf('// Normalize');
const c = html.indexOf('const FLAGS='), d = html.indexOf('const LINEAGE=');
const e = html.indexOf('const CO_FAMILY='), f = html.indexOf('// CPI-U');
const g = html.indexOf('const DRUG_TA='), h = html.indexOf('const TA_KEYS=');
const code = [a, b, c, d, e, f, g, h].some(x => x < 0) ? null
  : html.slice(a, b) + html.slice(c, d) + html.slice(e, f) + html.slice(g, h);
if (!code) { console.error('Could not locate data blocks in index.html'); process.exit(2); }
const { data, FLAGS, CO_FAMILY, DRUG_TA } = new Function(code + ';return{data,FLAGS,CO_FAMILY,DRUG_TA};')();

let errors = 0, warns = 0;
const err = m => { errors++; console.error('ERROR ', m); };
const warn = m => { warns++; console.warn('warn  ', m); };
const seenCo = new Set();
for (const [y, d] of Object.entries(data)) {
  const rows = d.rows, live = rows.filter(r => r.cap > 0);
  const names = live.map(r => r.company);
  names.forEach((n, i) => names.indexOf(n) !== i && err(`${y}: duplicate ${n}`));
  live.forEach(r => {
    seenCo.add(r.company);
    if (!FLAGS[r.country]) err(`${y} ${r.company}: no flag for country ${r.country}`);
    if (typeof r.cap !== 'number' || isNaN(r.cap)) err(`${y} ${r.company}: bad cap`);
    if (!r.drugs || !r.drugs.length) err(`${y} ${r.company}: no drugs`);
    (r.drugs || []).forEach(dr => { if (!DRUG_TA[dr.replace(/\s*\(.*?\)/g, '').trim()]) seenCo.add('drug:' + dr); });
  });
  if (live.length !== 25) warn(`${y}: ${live.length} ranked rows (expected 25)`);
  if (rows.some((r, i) => i && r.cap > rows[i - 1].cap)) warn(`${y}: source rows not sorted by cap (normalized at load)`);
  if (rows.some(r => r.cap <= 0)) warn(`${y}: placeholder rows with cap<=0 (dropped at load)`);
}
for (const co of Object.keys(CO_FAMILY)) if (!seenCo.has(co)) warn(`CO_FAMILY entry never ranked: ${co}`);
const unmapped = [...seenCo].filter(x => x.startsWith('drug:')).map(x => x.slice(5));
if (unmapped.length) warn(`${unmapped.length} drugs without a DRUG_TA mapping` + (process.argv.includes('--verbose') ? ': ' + unmapped.join(', ') : ' (--verbose to list)'));
console.log(`${errors} error(s), ${warns} warning(s)`);
process.exit(errors ? 1 : 0);
