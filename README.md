# Where CGIAR works

An interactive version of the *Where CGIAR Works* map: CGIAR Center headquarter
locations, and the geographic coverage of the CGIAR 2025–2030 Research Portfolio.

**Live:** https://cg-so.github.io/where-cgiar-works/

Content lives in **one JSON file** — no database, no build step, no code
changes, matching the sibling [`apac-map`](https://github.com/CG-SO/apac-map)
project's pattern.

## How to update a Center, or the title (3 steps)

**1. Edit the data file**

Open [`data/centers.json`](data/centers.json) on github.com and click the
pencil (✎) icon, top right, to edit it in the browser.

- **Add a Center** — copy one `{ ... }` entry inside `"centers"` and change its
  fields.
- **Change a Center** — edit any field in its entry (see the format below).
- **Remove a Center** — delete its `{ ... }` entry (don't forget the comma on
  the entry before it).
- **Change the title or intro line** — edit `"header": { "title": …, "subtitle": … }`
  at the top of the file.

**2. Commit**

Scroll down, add a short commit message ("Update ILRI focus text", "Add new
Center"), and click **Commit changes…** → **Commit directly to the `main`
branch**. GitHub asks you to confirm — that confirmation *is* the publish
step, nothing else is needed.

**3. Wait ~1 minute**

GitHub Pages rebuilds automatically. Reload
[the live page](https://cg-so.github.io/where-cgiar-works/) after about a
minute to see the change. *(Commit one change at a time — several edits saved
in quick succession can queue competing deploys.)*

### Data file format

```jsonc
{
  "header": {                        // optional — omit to keep the page's current title
    "title":    "Our global presence", // also becomes the browser tab title
    "subtitle": "Short intro line under the title."
  },

  "centers": [                       // REQUIRED — one entry per office
    {
      "id":     "irri",              // REQUIRED, unique — lowercase, no spaces
      "name":   "International Rice Research Institute",   // REQUIRED — full name, shown in the popup
      "abbr":   "IRRI",              // REQUIRED — short form, shown as the tag and in the list
      "city":   "Los Baños",         // REQUIRED
      "country":"Philippines",       // REQUIRED — must match a name the map recognises;
                                     // if shading looks wrong after adding a country the
                                     // map hasn't seen before, that's the thing to check
      "office": "Headquarters",      // optional — only for Centers with more than one
                                     // office, e.g. ILRI: "Headquarters" (Nairobi) and
                                     // "Principal Office" (Addis Ababa). Shown after the
                                     // city in the popup and the list; omit otherwise
      "region": "Asia & the Pacific",// REQUIRED — one of the four values below
      "lat":    14.1699,             // REQUIRED — latitude
      "lon":    121.2441,            // REQUIRED — longitude
      "url":    "https://www.irri.org",       // REQUIRED — shown as a link in the popup
      "focus":  "One or two sentences on what this Center does.", // REQUIRED
      "hq":     false                // true only for the CGIAR System Organization
    }
  ]
}
```

**`region`** must be exactly one of: `"Africa"`, `"Latin America & the Caribbean"`,
`"Asia & the Pacific"`, `"Europe & North America"`. This drives the region
filter and its counts, and which countries a region's shading includes.

**Coordinates** are `[latitude, longitude]` as separate `lat`/`lon` fields. Get
them by right-clicking a spot in Google Maps and copying the two numbers.

**Text is plain text.** Write `Research & innovation` — no HTML, no `&amp;`.

## What it does

- 17 locations across 15 Centers (ILRI has a headquarters in Nairobi and a principal
  office in Addis Ababa; the Alliance has offices in Rome and Cali)
- Search by Center, acronym, city or country
- Filter by region via a dropdown, with live result counts on each option
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
| `data` | path to a JSON content file | `data/centers.json` |

The same keys can be set as `window.CGIAR_MAP_CONFIG` before `assets/app.js` loads.

**A pre-filtered region is only a starting view — visitors can still change it.**

Example, for an Asia & Pacific landing page — this is exactly what the **Embed**
button's "Copy embed code" gives you, region and title toggle included:

```html
<iframe id="cgiarMap" src="https://cg-so.github.io/where-cgiar-works/?embed=1&region=asia-pacific"
        width="100%" height="640" loading="lazy"
        style="border:0; display:block" title="Our global presence"></iframe>
<script>
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'cgiar-map-height' && typeof e.data.height === 'number') {
      var f = document.getElementById('cgiarMap');
      if (f) f.style.height = e.data.height + 'px';
    }
  });
</script>
```

**The `height="640"` on the iframe is only a starting size**, shown before the
`<script>` gets a chance to run. In `embed=1` the page posts
`{ type: 'cgiar-map-height', height }` to its parent on load, on resize, and
whenever a search or filter changes how much content the panel holds — the
snippet's `<script>` listens for that and sets the iframe's real height to
match, so it always fits its content instead of showing extra empty space or
its own internal scrollbar.

If your CMS strips inline `<script>` tags, the auto-height won't work — drop
the script and pick a fixed height that fits, e.g. `height="720"`. The map is
still fully usable, it just won't resize itself.

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
data/centers.json      ← editable: Center headquarters, page title/subtitle
assets/app.css         design-system token layer + components
assets/app.js          map engine (fetches data/centers.json, then runs
                        search, filter, embed)
assets/data.js         engine-level geo data: coverage tiers, country→region
                        mapping — not what "update a Center" means; see the
                        Data caveats section
assets/geo.js          Natural Earth 110m country outlines
assets/projections.js  Patterson projection as a Leaflet CRS
assets/icons.svg       the full CGIAR icon sprite (reference copy)
vendor/leaflet.js      Leaflet 1.9.4 (BSD-2-Clause)
```

There is no build step and no tile server — the geometry is bundled, so the
module works offline and inside a CMS.

The page fetches `data/centers.json` at load. If that fetch fails or the file
doesn't parse as valid JSON, the map area shows an error message naming the
file instead of rendering blank — a bad edit is visible immediately rather
than a silent failure a visitor has to report.

**Asset URLs are versioned** (`app.css?v=2`). Bump `v` in `index.html` when you
change an asset, or browsers will serve a stale mix.

## Data caveats

- **Center names, cities and websites** are transcribed from the source graphic.
- **Country shading is approximate.** The source graphic has no printed key, so
  the three tiers were read off the artwork. It is *not* an official CGIAR
  dataset. Replace the tier lists in `assets/data.js` (`window.FOOTPRINT`) with
  the real 2025–2030 portfolio coverage data when it is available. This is
  deliberately *not* in `centers.json` — it's a country-level classification
  covering ~120 countries, not something to hand-edit one field at a time, and
  it needs to stay in sync with `window.COUNTRY_REGION` in the same file
  (which country belongs to which region, for the region-scoped shading).
  Ask for this to be made editable too once real coverage data exists.
- **Regions** follow this project's own taxonomy (`data/africa.json`,
  `americas.json`, `apac.json` in `CG-SO/apac-map`). Three headquarters —
  Montpellier, Rome and Washington DC — fall outside all three and carry a
  fourth label, *Europe & North America*.

## Credits

Boundaries: [Natural Earth](https://www.naturalearthdata.com/) 110m, public domain.
Map engine: [Leaflet](https://leafletjs.com/) 1.9.4.
Projection: Patterson cylindrical (Patterson, Šavrič & Jenny, 2014).
