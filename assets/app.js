/* =================================================================
   cms-map — map engine for "Where CGIAR Works".

   Leaflet with no tile server: country outlines come from the bundled
   Natural Earth geometry, so the module works offline and inside a CMS.
   No colour value appears in this file — countries carry a tier class
   and pins are m-pin div icons, so the design tokens stay in the CSS.

   Configuration, for embedding a pre-filtered view:
     ?region=asia-pacific   africa | latin-america | asia-pacific |
                            europe-north-america | all
     ?embed=1               chrome-less, fills the iframe, posts its height
     ?header=0 / ?header=1  hide or show the title and description
                            (shown by default, hidden by default in an embed)
     ?panel=0               map only, no side panel
   The same keys can be set as window.CGIAR_MAP_CONFIG before this script.
   Whatever the defaults, every control stays live for the visitor.
================================================================= */

(function () {
  'use strict';

  var CENTERS = window.CENTERS;
  var FOOTPRINT = window.FOOTPRINT;
  var COUNTRY_REGION = window.COUNTRY_REGION;
  var WORLD = window.WORLD_GEO;

  var ALL = 'All';

  // The world minus Antarctica — the frame the source graphic uses.
  var WORLD_BOUNDS = L.latLngBounds([[-56, -168], [76, 179]]);

  var REGION_ORDER = [
    'Africa',
    'Latin America & the Caribbean',
    'Asia & the Pacific',
    'Europe & North America'
  ];

  var SLUG_TO_REGION = {
    'all': ALL,
    'africa': 'Africa',
    'latin-america': 'Latin America & the Caribbean',
    'americas': 'Latin America & the Caribbean',
    'asia-pacific': 'Asia & the Pacific',
    'apac': 'Asia & the Pacific',
    'europe-north-america': 'Europe & North America'
  };
  var REGION_TO_SLUG = {
    'All': 'all',
    'Africa': 'africa',
    'Latin America & the Caribbean': 'latin-america',
    'Asia & the Pacific': 'asia-pacific',
    'Europe & North America': 'europe-north-america'
  };

  var SHORT = {
    'Latin America & the Caribbean': 'Latin America',
    'Asia & the Pacific': 'Asia & Pacific',
    'Europe & North America': 'Europe & N. America'
  };

  /* -- configuration ------------------------------------------------------- */

  var CFG = (function () {
    var q = new URLSearchParams(window.location.search);
    var base = window.CGIAR_MAP_CONFIG || {};
    function pick(key, dflt) {
      var v = q.get(key);
      if (v === null || v === '') v = (base[key] !== undefined ? base[key] : null);
      return v === null ? dflt : String(v);
    }
    return {
      region: SLUG_TO_REGION[pick('region', 'all').toLowerCase()] || ALL,
      embed: pick('embed', '0') === '1',
      panel: pick('panel', '1') !== '0',
      header: pick('header', '')        // '' = follow the mode
    };
  })();

  // The title block is on by default, off by default inside an embed, and
  // either can be overridden explicitly with ?header=1 / ?header=0.
  CFG.showHeader = CFG.header === '' ? !CFG.embed : CFG.header === '1';

  if (CFG.embed) document.body.classList.add('is-embed');
  if (!CFG.showHeader) document.body.classList.add('is-noheader');
  if (!CFG.panel) document.body.classList.add('is-maponly');

  /* -- tier lookup --------------------------------------------------------- */

  var tierOf = {};
  Object.keys(FOOTPRINT).forEach(function (tier) {
    FOOTPRINT[tier].forEach(function (name) { tierOf[name] = Number(tier); });
  });
  // A country hosting a Center is always in the top tier of the heat map.
  CENTERS.forEach(function (c) {
    if (!c.hq && c.region !== 'Europe & North America') tierOf[c.country] = 3;
  });

  /* -- map ----------------------------------------------------------------- */

  var map = L.map('map', {
    crs: window.MAP_PROJECTION,
    center: [16, 12],
    zoom: 2,
    minZoom: 0,
    maxZoom: 8,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120,
    zoomControl: false,
    maxBounds: [[-89, -185], [89, 185]],
    maxBoundsViscosity: 0.7
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  map.attributionControl.setPrefix('').addAttribution(
    'Boundaries &copy; <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>'
  );

  /* -- countries ----------------------------------------------------------- */

  var countries = [];   // { layer, name, tier }
  var TIER_CLASSES = ['cms-map__country--t0', 'cms-map__country--t1',
                      'cms-map__country--t2', 'cms-map__country--t3'];

  L.geoJSON(
    {
      type: 'FeatureCollection',
      features: WORLD.map(function (row) {
        return {
          type: 'Feature',
          properties: { name: row[0], tier: tierOf[row[0]] || 0 },
          geometry: { type: row[1] === 0 ? 'Polygon' : 'MultiPolygon', coordinates: row[2] }
        };
      })
    },
    {
      renderer: L.svg({ padding: 0.4 }),
      smoothFactor: 0.6,
      style: function (f) {
        return {
          className: 'cms-map__country cms-map__country--t' + f.properties.tier,
          fillOpacity: 1,
          weight: 0.6,
          opacity: 1
        };
      },
      onEachFeature: function (f, layer) {
        countries.push({ layer: layer, name: f.properties.name, tier: f.properties.tier });
      }
    }
  ).addTo(map);

  /* With a region selected, everything outside it drops back to the base map
     colour so the shading reads as that region's coverage alone. The tier
     class is swapped on the path directly — Leaflet's setStyle does not
     re-apply options.className after the path exists. */
  var TOOLTIP_OPTS = { className: 'm-hint', sticky: true, direction: 'top', opacity: 1 };

  function paintCountries() {
    var region = state.region;
    countries.forEach(function (c) {
      var el = c.layer._path;
      var tier = (region !== ALL && COUNTRY_REGION[c.name] !== region) ? 0 : c.tier;

      if (el) {
        TIER_CLASSES.forEach(function (cls) { el.classList.remove(cls); });
        el.classList.add(TIER_CLASSES[tier]);
      }

      // A country shown in the base colour is background, not data: it should
      // not answer to hover either.
      if (tier && !c.layer.getTooltip()) {
        c.layer.bindTooltip(c.name, TOOLTIP_OPTS);
      } else if (!tier && c.layer.getTooltip()) {
        c.layer.closeTooltip();
        c.layer.unbindTooltip();
      }
    });
  }

  /* Bounds of a region: its shaded countries plus its headquarters. */
  var countryBounds = {};
  WORLD.forEach(function (row) {
    var b = L.latLngBounds([]);
    (function walk(c) {
      if (Array.isArray(c[0])) c.forEach(walk);
      else b.extend([c[1], c[0]]);
    })(row[2]);
    countryBounds[row[0]] = b;
  });

  function regionBounds(region) {
    if (region === ALL) return WORLD_BOUNDS;
    var b = L.latLngBounds([]);
    Object.keys(COUNTRY_REGION).forEach(function (name) {
      if (COUNTRY_REGION[name] === region && countryBounds[name]) b.extend(countryBounds[name]);
    });
    CENTERS.forEach(function (c) { if (c.region === region) b.extend([c.lat, c.lon]); });
    return b.isValid() ? b : WORLD_BOUNDS;
  }


  /* -- headquarters pins --------------------------------------------------- */

  function popupHTML(c) {
    var host = c.url.replace(/^https?:\/\//, '');
    return '<div class="m-popup">' +
      '<h2 class="m-popup__title h-typo-headline-xs">' + esc(c.name) + '</h2>' +
      '<p class="m-popup__meta">' +
        '<span class="a-tag h-typo-tag">' + esc(c.abbr) + '</span>' +
        '<span class="m-popup__place h-typo-copy-s">' +
          esc(c.city) + ', ' + esc(c.country) + '</span>' +
      '</p>' +
      '<p class="m-popup__desc h-typo-copy-s">' + esc(c.focus) + '</p>' +
      '<a class="a-link h-typo-link-s m-popup__cta" href="' + esc(c.url) + '" ' +
         'target="_blank" rel="noopener noreferrer">' +
        '<span class="a-link__text">' + esc(host) + '</span>' +
        '<svg class="a-icon" aria-hidden="true"><use href="#icon-external-link"></use></svg>' +
      '</a>' +
      '</div>';
  }

  var markers = {};
  var markerLayer = L.layerGroup().addTo(map);

  CENTERS.forEach(function (c) {
    var m = L.marker([c.lat, c.lon], {
      icon: L.divIcon({
        className: 'm-pin m-pin--marker' + (c.hq ? ' m-pin--system' : ''),
        html: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      }),
      keyboard: true,
      alt: c.abbr + ' headquarters, ' + c.city + ', ' + c.country
    });

    m.bindPopup(popupHTML(c), { closeButton: true, autoPanPadding: [40, 40], maxWidth: 320 });
    m.bindTooltip(c.abbr + ' &middot; ' + c.city, {
      className: 'm-hint', direction: 'top', offset: [0, -12], opacity: 1
    });
    m.on('popupopen', function () { setActive(c.id, false); });
    m.on('popupclose', function () { setActive(null, false); });

    markers[c.id] = m;
    markerLayer.addLayer(m);
  });

  function pinEl(id) {
    var m = markers[id];
    return m && m._icon ? m._icon : null;
  }

  /* -- panel --------------------------------------------------------------- */

  var listEl = document.getElementById('list');
  var countEl = document.getElementById('count');
  var searchEl = document.getElementById('search');
  var clearEl = document.getElementById('clear');
  var filtersEl = document.getElementById('filters');
  var regionTag = document.getElementById('regionTag');

  var present = CENTERS.map(function (c) { return c.region; });
  var REGIONS = [ALL].concat(REGION_ORDER.filter(function (r) {
    return present.indexOf(r) !== -1;
  }));

  var state = { q: '', region: CFG.region, active: null };

  var facetCounts = {};

  REGIONS.forEach(function (r) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'cms-search-filter-link';
    b.dataset.region = r;
    b.setAttribute('aria-pressed', String(r === state.region));
    b.innerHTML =
      '<span class="cms-search-filter-link__label h-typo-copy-s">' +
        '<svg class="a-icon cms-search-filter-link__mark" aria-hidden="true">' +
          '<use href="#icon-check"></use></svg>' +
        esc(r === ALL ? 'All regions' : r) +
      '</span>' +
      '<span class="cms-search-filter-link__count h-typo-copy-s"></span>';
    b.addEventListener('click', function () { selectRegion(r, true); });
    filtersEl.appendChild(b);
    facetCounts[r] = b.querySelector('.cms-search-filter-link__count');
  });

  /* Facet counts answer "what would I get", so they respond to the search
     term but ignore the region currently chosen. */
  function updateFacets() {
    REGIONS.forEach(function (r) {
      var n = CENTERS.filter(function (c) {
        return (r === ALL || c.region === r) && matchesQuery(c);
      }).length;
      facetCounts[r].textContent = n;
      filtersEl.querySelector('[data-region="' + cssEsc(r) + '"]')
        .classList.toggle('cms-search-filter-link--empty', n === 0);
    });
  }

  function cssEsc(v) { return v.replace(/"/g, '\\"'); }

  function selectRegion(region, fly) {
    state.region = region;
    Array.prototype.forEach.call(filtersEl.children, function (el) {
      el.setAttribute('aria-pressed', String(el.dataset.region === region));
    });
    render();
    map.closePopup();
    if (fly) map.fitBounds(regionBounds(region), { padding: [16, 16], animate: true, duration: 0.7 });
    syncEmbedCode();
  }

  function matchesQuery(c) {
    if (!state.q) return true;
    var hay = (c.abbr + ' ' + c.name + ' ' + c.city + ' ' + c.country + ' ' + c.region)
      .toLowerCase();
    return state.q.split(/\s+/).every(function (t) { return hay.indexOf(t) !== -1; });
  }

  function matches(c) {
    if (state.region !== ALL && c.region !== state.region) return false;
    return matchesQuery(c);
  }

  function render() {
    var visible = CENTERS.filter(matches);
    var ids = {};
    visible.forEach(function (c) { ids[c.id] = true; });

    CENTERS.forEach(function (c) {
      var m = markers[c.id];
      var on = markerLayer.hasLayer(m);
      if (ids[c.id] && !on) markerLayer.addLayer(m);
      else if (!ids[c.id] && on) markerLayer.removeLayer(m);
    });

    paintCountries();
    updateFacets();

    countEl.textContent = visible.length + ' of ' + CENTERS.length + ' headquarters';
    regionTag.textContent = state.region === ALL
      ? CENTERS.length + ' headquarters'
      : state.region;

    listEl.textContent = '';

    if (!visible.length) {
      var li = document.createElement('li');
      li.className = 'cms-map__empty h-typo-copy-m';
      li.textContent = 'No headquarters match that search.';
      listEl.appendChild(li);
      return;
    }

    visible.forEach(function (c) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'm-result';
      btn.dataset.id = c.id;
      btn.setAttribute('aria-current', String(state.active === c.id));
      btn.innerHTML =
        '<span class="m-result__top">' +
          '<span class="m-result__abbr h-typo-tag">' + esc(c.abbr) + '</span>' +
          '<span class="m-result__place h-typo-copy-s">' +
            esc(c.city) + ', ' + esc(c.country) +
          '</span>' +
        '</span>' +
        '<span class="m-result__name h-typo-copy-s">' + esc(c.name) + '</span>';

      btn.addEventListener('click', function () { focusCenter(c.id); });
      btn.addEventListener('mouseenter', function () { hover(c.id, true); });
      btn.addEventListener('mouseleave', function () { hover(c.id, false); });
      btn.addEventListener('focus', function () { hover(c.id, true); });
      btn.addEventListener('blur', function () { hover(c.id, false); });

      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  function hover(id, on) {
    var el = pinEl(id);
    if (el) el.classList.toggle('state-m-pin--active', on);
  }

  function setActive(id, scroll) {
    state.active = id;
    CENTERS.forEach(function (c) {
      var el = pinEl(c.id);
      if (el) el.classList.toggle('state-m-pin--active', c.id === id);
    });
    Array.prototype.forEach.call(listEl.querySelectorAll('.m-result'), function (el) {
      var on = el.dataset.id === id;
      el.setAttribute('aria-current', String(on));
      if (on && scroll) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function focusCenter(id) {
    var c = byId(id), m = markers[id];
    if (!c || !m) return;
    if (!markerLayer.hasLayer(m)) markerLayer.addLayer(m);

    // setView emits no moveend when the view is already at the target, so
    // the popup needs a fallback or re-selecting the same row would open nothing.
    var opened = false;
    function open() {
      if (opened) return;
      opened = true;
      m.openPopup();
    }

    map.setView([c.lat, c.lon], Math.max(map.getZoom(), 5), { animate: true, duration: 0.7 });
    map.once('moveend', open);
    setTimeout(open, 900);

    setActive(id, true);
  }

  function byId(id) {
    for (var i = 0; i < CENTERS.length; i++) if (CENTERS[i].id === id) return CENTERS[i];
    return null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  /* -- search -------------------------------------------------------------- */

  function onSearchInput() {
    var q = searchEl.value.trim().toLowerCase();
    if (q === state.q) return;
    state.q = q;
    clearEl.hidden = !searchEl.value;
    render();
  }

  // 'input' covers typing, paste and the native clear affordance; 'search' and
  // 'keyup' are belt-and-braces for inputs whose events get swallowed.
  ['input', 'search', 'keyup'].forEach(function (evt) {
    searchEl.addEventListener(evt, onSearchInput);
  });

  searchEl.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchEl.value) {
      e.stopPropagation();
      resetSearch();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      var first = listEl.querySelector('.m-result');
      if (first) focusCenter(first.dataset.id);
    }
  });

  clearEl.addEventListener('click', resetSearch);

  function resetSearch() {
    searchEl.value = '';
    state.q = '';
    clearEl.hidden = true;
    render();
    searchEl.focus();
  }

  /* -- map furniture ------------------------------------------------------- */

  document.getElementById('reset').addEventListener('click', function () {
    map.closePopup();
    setActive(null, false);
    map.fitBounds(regionBounds(state.region), { padding: [16, 16], animate: true, duration: 0.6 });
  });

  var legendToggle = document.getElementById('legendToggle');
  var legendBody = document.getElementById('legendBody');

  function setLegend(open) {
    legendToggle.setAttribute('aria-expanded', String(open));
    legendBody.hidden = !open;
  }
  legendToggle.addEventListener('click', function () {
    setLegend(legendToggle.getAttribute('aria-expanded') !== 'true');
  });
  if (window.matchMedia('(max-width: 860px)').matches) setLegend(false);

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== searchEl) {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
    }
  });

  /* -- embed --------------------------------------------------------------- */

  var embedBtn = document.getElementById('embedBtn');
  var embedPanel = document.getElementById('embedPanel');
  var embedClose = document.getElementById('embedClose');
  var embedRegion = document.getElementById('embedRegion');
  var embedCode = document.getElementById('embedCode');
  var embedCopy = document.getElementById('embedCopy');
  var embedCopyText = document.getElementById('embedCopyText');
  var embedHeader = document.getElementById('embedHeader');

  REGIONS.forEach(function (r) {
    var o = document.createElement('option');
    o.value = REGION_TO_SLUG[r];
    o.textContent = r === ALL ? 'All regions' : r;
    embedRegion.appendChild(o);
  });

  function embedURL() {
    var u = new URL(window.location.href);
    u.search = '';
    u.searchParams.set('embed', '1');
    u.searchParams.set('region', embedRegion.value);
    if (embedHeader.checked) u.searchParams.set('header', '1');
    return u.toString();
  }

  function syncEmbedCode() {
    embedRegion.value = REGION_TO_SLUG[state.region];
    embedCode.value =
      '<iframe src="' + embedURL() + '"\n' +
      '        width="100%" height="640" loading="lazy"\n' +
      '        style="border:0" title="Where CGIAR works"></iframe>';
  }

  embedHeader.addEventListener('change', function () {
    document.body.classList.toggle('is-noheader', !embedHeader.checked);
    syncEmbedCode();
    frame();
  });

  embedRegion.addEventListener('change', function () {
    var region = SLUG_TO_REGION[embedRegion.value] || ALL;
    selectRegion(region, true);
  });


  function openEmbed(open) {
    embedPanel.hidden = !open;
    embedBtn.setAttribute('aria-expanded', String(open));
    if (open) { syncEmbedCode(); embedCode.focus(); embedCode.select(); }
  }
  embedBtn.addEventListener('click', function () { openEmbed(embedPanel.hidden); });
  embedClose.addEventListener('click', function () { openEmbed(false); embedBtn.focus(); });

  embedCopy.addEventListener('click', function () {
    embedCode.select();
    var done = function () {
      embedCopyText.textContent = 'Copied';
      setTimeout(function () { embedCopyText.textContent = 'Copy embed code'; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(embedCode.value).then(done, function () {
        try { document.execCommand('copy'); done(); } catch (e) { /* leave selected */ }
      });
    } else {
      try { document.execCommand('copy'); done(); } catch (e) { /* leave selected */ }
    }
  });

  // Let a host page size the iframe to the content, as map.html does.
  function postHeight() {
    if (!CFG.embed || window.parent === window) return;
    var h = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'cgiar-map-height', height: h }, '*');
  }

  /* -- go ------------------------------------------------------------------ */

  embedHeader.checked = CFG.showHeader;

  render();
  syncEmbedCode();

  var framed = false;
  map.on('zoomstart movestart', function () { framed = true; });

  function frame() {
    map.invalidateSize();
    if (!framed) map.fitBounds(regionBounds(state.region), { padding: [16, 16], animate: false });
    postHeight();
  }

  map.whenReady(function () { setTimeout(frame, 0); });
  window.addEventListener('resize', frame);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(frame);
})();
