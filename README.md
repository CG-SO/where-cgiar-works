# Where CGIAR works

An interactive version of the *Where CGIAR Works* map: CGIAR Center headquarter
locations, and the geographic coverage of the CGIAR 2025–2030 Research Portfolio.

**Live:** https://cg-so.github.io/where-cgiar-works/

## What it does

- 17 headquarter locations (15 Centers; ILRI and the Alliance each have two offices)
- Search by Center, acronym, city or country
- Filter by region, with live result counts
- Selecting a region drops every country outside it back to the base map colour,
  so the shading reads as that region's coverage alone
- Click a pin or a result row for the Center's focus and website
- Patterson projection, so the coverage shading is not distorted by Mercator's
  inflation of the high latitudes

## Embedding

Every option is a URL parameter. The **Embed** button on the map builds the
snippet for you, but the parameters are:

| Parameter | Values | Default |
|---|---|---|
| `region` | `all`, `africa`, `latin-america`, `asia-pacific`, `europe-north-america` | `all` |
| `embed` | `1` — chrome-less, fills the iframe, posts its height to the parent | off |
| `header` | `0` / `1` — hide or show the title and description | shown; hidden when `embed=1` |
| `panel` | `0` — map only, no side panel | panel shown |

The same keys can be set as `window.CGIAR_MAP_CONFIG` before `assets/app.js` loads.

**A pre-filtered region is only a starting view — visitors can still change it.**

Example, for an Asia & Pacific landing page:

```html
<iframe src="https://cg-so.github.io/where-cgiar-works/?embed=1&region=asia-pacific"
        width="100%" height="640" loading="lazy"
        style="border:0" title="Where CGIAR works"></iframe>
```

In `embed=1` the page posts `{ type: 'cgiar-map-height', height }` to the parent
on load and resize, so a host page can size the iframe to its content.

## Design system

Built on the CGIAR design system: `data-theme="cgiar"` / `data-area="light"`,
62.5% root sizing, the `--sN` spacing scale, radius tokens, Noto Sans / Noto
Serif, and the `a-` / `m-` / `cms-` component naming. `assets/app.css` carries a
local copy of the token layer — when this is embedded in the real site, delete
everything above the `COMPONENTS` banner and link `ui.min.css` +
`props-cgiar.css` instead. Every token and class name matches.

No colour value appears in the JavaScript: countries carry a tier class and pins
are `m-pin` div icons, so all paint stays in the stylesheet.

## Files

```
index.html            markup + inlined icon sprite
assets/app.css        design-system token layer + components
assets/app.js         map engine (search, filter, embed)
assets/data.js        Centers, coverage tiers, country→region mapping
assets/geo.js         Natural Earth 110m country outlines
assets/projections.js Patterson projection as a Leaflet CRS
assets/icons.svg      the full CGIAR icon sprite (reference copy)
vendor/leaflet.js     Leaflet 1.9.4 (BSD-2-Clause)
```

There is no build step and no tile server — the geometry is bundled, so the
module works offline and inside a CMS.

**Asset URLs are versioned** (`app.css?v=2`). Bump `v` in `index.html` when you
change an asset, or browsers will serve a stale mix.

## Data caveats

- **Center names, cities and websites** are transcribed from the source graphic.
- **Country shading is approximate.** The source graphic has no printed key, so
  the three tiers were read off the artwork. It is *not* an official CGIAR
  dataset. Replace the tier lists in `assets/data.js` (`window.FOOTPRINT`) with
  the real 2025–2030 portfolio coverage data when it is available.
- **Regions** follow this project's own taxonomy (`data/africa.json`,
  `americas.json`, `apac.json` in `CG-SO/apac-map`). Three headquarters —
  Montpellier, Rome and Washington DC — fall outside all three and carry a
  fourth label, *Europe & North America*.

## Credits

Boundaries: [Natural Earth](https://www.naturalearthdata.com/) 110m, public domain.
Map engine: [Leaflet](https://leafletjs.com/) 1.9.4.
Projection: Patterson cylindrical (Patterson, Šavrič & Jenny, 2014).
