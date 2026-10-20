# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file static web application (`index.html`) — no build step, no package manager. The only runtime dependency is mermaid (pinned, loaded from jsDelivr with SRI) for lineage diagrams; if it fails to load, everything else still works. Open `index.html` directly in a browser to run it.

## Architecture

Everything lives in `index.html` in three contiguous sections:

1. **`<style>`** — All CSS, inline, using CSS custom properties (`:root` vars like `--bg`, `--ink`, `--accent`) for theming. Responsive breakpoint at 640px.

2. **HTML body** — 15 tab panels (`#tab-rankings`, `#tab-bump`, `#tab-heatmap`, `#tab-countries`, `#tab-bubble`, treemaps, `#tab-upset`, and the views listed below), driven by `.tab-bar` buttons with `data-tab`

3. **`<script>`** — All JS, inline, structured as:
   - **`data` object** (~430 lines): The entire dataset — keyed by year (1950–2025 in 5-year steps), each year has `note`, `footnote`, and `rows[]` (company name, country code, market cap in $B, key drugs array).
   - **`FLAGS`** map: Country code → emoji flag
   - **`YEARS`/`EARLY`/`MODERN`** arrays: The 16 snapshot years split into pre/post-2000 groups
   - **`fmt(c)` / `fmtS(c)`**: Market cap formatters (handles M/B scale)
   - **`mkNav(yrs, id)`**: Builds year-selector buttons for a nav row
   - **`renderR()`**: Renders the rankings table for the currently active year
   - **`allCos()` / `sortedCos()`**: Aggregates companies across all years for the heatmap; `sortedCos()` respects `hmSortYear` (null = sort by aggregate total)
   - **`capColor(cap)` / `fgColor(cap)`**: Maps market cap to heatmap cell background/text color using a √-scaled gradient
   - **`buildHM()`**: Constructs the full heatmap grid DOM; clicking column headers re-sorts by that year

## Data Model

Each row in `data[year].rows`:
```js
{ company: "Pfizer", country: "US", cap: 135.0, drugs: ["Paxlovid", ...] }
```
- `cap` is always in **$B**; pre-1990 values are fractional (e.g. `0.40` = $400M)
- `cap: 0` or negative means the company is excluded from rendering that year
- Pre-2000 data is estimated or approximate (1990 and 1995 are in the `EARLY` array); 2000 onward is sourced from reported figures. 1995 ranks only 23 companies (two placeholder rows with `cap: 0` are dropped at load; issue #2 stays open, do not invent caps)

## Normalization

Immediately after the `data` object, rows with `cap<=0` are dropped and each year is sorted by `cap` descending, so array index + 1 is the rank everywhere. Source order in `data` doesn't matter. Use `esc()` when interpolating company/drug names into `innerHTML`.

## Additional views (second `<script>` block)

Concentration, Slope, Value Flow, TA Stream, Lineage, Growth and Churn tabs live in a self-contained IIFE at the end of `index.html`. They reuse `data`, `CPI_MULT`, `CO_FAMILY`, `LINEAGE`, `DRUG_TA`, `fmt`/`fmtAdj`, the shared `#hm-tip` tooltip and `openPanel`. Each has a `build*` function registered in `builders` and re-run on tab click. Value Flow/TA Stream split a company's cap evenly over its listed drugs, then over each drug's TAs (illustrative, not revenue).

## No Build / Data Check

There is no build system; CI (`.github/workflows/check.yml`) runs `node tools/check-scripts.js` and `node tools/check-data.js`. Validate changes by opening `index.html` in a browser, and run `node tools/check-data.js` (unmapped drugs are always printed as a warning) to sanity-check the dataset: duplicates, flag coverage, missing drugs, unsorted source rows.
