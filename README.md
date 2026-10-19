# Top 25 Drug Companies by Market Cap — 1950–2025

Seven decades of pharmaceutical dominance at 5-year intervals — from postwar antibiotics to GLP-1 blockbusters. Rankings, market caps, and key products across every era.

## Views

**Rankings** — Navigate any of the 16 five-year snapshots to see a ranked table of the top 25 companies (23 for 1995, see issue #2), with market cap bars and key products for each.

**Bump Chart** — Each company's rank trajectory across all snapshots.

**Heatmap** — All companies that ever appeared in a top-25 ranking, laid out across all 16 snapshots. Darker cells = higher valuation. Gray = not ranked that year. Click any year column header to re-sort; hover cells for details.

**Countries** — Share of top-25 market cap by home country over time.

**Bubble** — Every snapshot on one inflation-adjusted (2025 USD) log scale, colored by corporate family.

**Treemap-Year / Treemap-Aggregate** — Inflation-adjusted market cap per company-year, and cumulative dominance per company, grouped by corporate family.

**Therapeutic Areas** — Dot matrix of each year's top 25 against eight therapeutic areas.

**Concentration** — Top-1/5/10 share of the top-25 total and the Herfindahl index over time.

**Slope** — Compare any two snapshots: rank changes, drop-outs and new entries, with mergers optionally treated as one company.

**Value Flow** — Sankey from each company to therapeutic areas for a chosen year (market cap split evenly across flagship drugs; illustrative, not revenue).

**TA Stream** — The same allocation over time as a stream, stacked or 100% chart, in nominal or 2025 dollars.

**Lineage** — Merger diagrams for every corporate family, with a bar strip of each family's combined inflation-adjusted cap.

**Growth** — Real compound annual growth between two snapshots for companies ranked in both.

**Churn** — New entrants, drop-outs and median tenure of the top 25 at each snapshot.

Click any company in most views to open its corporate lineage panel.

Coverage: 16 snapshots (1950–2025) · 10 countries (US, UK, Switzerland, Germany, Denmark, France, Japan, Ireland, Australia, Belgium)

## Highlights

- **1950s** — Industry dominated by US companies emerging from the WWII antibiotic boom; European firms were embedded in chemical conglomerates
- **1960s** — Enovid, the first oral contraceptive, approved for that use in 1960; Librium (1960) and Valium (1963) launched the tranquilizer era; the Kefauver-Harris Amendments (1962) reshaped FDA approval after Thalidomide
- **2000** — Mega-merger wave formed GlaxoSmithKline, Novartis, AstraZeneca, and Aventis; Pfizer's acquisition of Warner-Lambert secured Lipitor, which became history's best-selling drug
- **2025** — GLP-1 revolution drove Eli Lilly from $130B (2020) to ~$750B in the 2025 snapshot (it briefly crossed $1 trillion later in 2025), the largest five-year value creation in pharma history; Novo Nordisk's Ozempic/Wegovy created a $60B+ annual obesity market

## Usage

**Locally** — open `index.html` directly in any browser. No server or build step required.

**GitHub Pages** — [https://kuod.github.io/pharma-biotech-almanac/](https://kuod.github.io/pharma-biotech-almanac/)

## Data & Methodology

Pre-1990 figures are estimates compiled from historical industry analyses and annual reports. Post-1990 figures are reported market capitalizations. All values are in USD billions. Rows are sorted by market cap at load, so rank always follows size.

Run `node tools/check-scripts.js` (inline-script syntax) and `node tools/check-data.js` to sanity-check the embedded dataset (duplicates, country flags, missing drugs, unsorted source rows).

## License

MIT
