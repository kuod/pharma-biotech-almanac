# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file static web application (`index.html`) — no build step, no dependencies, no package manager. Open `index.html` directly in a browser to run it.

## Architecture

Everything lives in `index.html` in three contiguous sections:

1. **`<style>`** — All CSS, inline, using CSS custom properties (`:root` vars like `--bg`, `--ink`, `--accent`) for theming. Responsive breakpoint at 640px.

2. **HTML body** — Two tab panels:
   - `#tab-rankings`: Year-navigation buttons + sortable table of top-25 companies
   - `#tab-heatmap`: Grid heatmap of all companies across all 16 five-year snapshots

3. **`<script>`** — All JS, inline, structured as:
   - **`data` object** (~600 lines): The entire dataset — keyed by year (1950–2025 in 5-year steps), each year has `note`, `footnote`, and `rows[]` (company name, country code, market cap in $B, key drugs array).
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
- `cap` is in **$B** for values ≥ 1, and in **$B** (fractional) for pre-1990 values (e.g. `0.40` = $400M)
- `cap: 0` or negative means the company is excluded from rendering that year
- Pre-1990 data is estimated; post-1990 is sourced from reported figures

## No Build / No Tests

There is no build system, linter, or test suite. Validate changes by opening `index.html` in a browser.
