/* =================================================================
   Patterson projection for the cms-map module.

   Web Mercator inflates high latitudes badly, which misreads a coverage
   map — Greenland and Russia dominate, the tropics shrink. Patterson
   (Patterson / Šavrič / Jenny, 2014) is a compromise cylindrical
   projection built for exactly this job: straight parallels, honest
   proportions, poles kept in frame.

     y = 1.0148φ + 0.23185φ³ − 0.14499φ⁵ + 0.02406φ⁷      x = λ

   Implemented directly, with a Newton–Raphson inverse; no proj4.
================================================================= */

(function () {
  'use strict';

  var HALF_PI = Math.PI / 2;
  var DEG = Math.PI / 180;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function fwdY(p) {
    var p2 = p * p;
    return p * (1.0148 + p2 * (0.23185 + p2 * (-0.14499 + 0.02406 * p2)));
  }
  function dY(p) {
    var p2 = p * p, p4 = p2 * p2;
    return 1.0148 + 0.69555 * p2 + p4 * (-0.72495 + 0.16842 * p2);
  }
  function invY(y) {
    var phi = clamp(y, -HALF_PI, HALF_PI);
    for (var i = 0; i < 12; i++) {
      var d = dY(phi);
      if (!d) break;
      var step = (fwdY(phi) - y) / d;
      phi = clamp(phi - step, -HALF_PI, HALF_PI);
      if (Math.abs(step) < 1e-11) break;
    }
    return phi;
  }

  var MAX_Y = fwdY(HALF_PI);

  var projection = {
    project: function (latlng) {
      return new L.Point(latlng.lng * DEG, fwdY(latlng.lat * DEG));
    },
    unproject: function (point) {
      return new L.LatLng(invY(point.y) / DEG, point.x / DEG);
    },
    bounds: L.bounds([-Math.PI, -MAX_Y], [Math.PI, MAX_Y])
  };

  // One scale on both axes, so the projection keeps its true aspect ratio.
  var scale = 0.5 / Math.PI;

  window.MAP_PROJECTION = L.extend({}, L.CRS.Earth, {
    code: 'CGIAR:patterson',
    projection: projection,
    transformation: new L.Transformation(scale, 0.5, -scale, 0.5),
    wrapLng: null,   // Patterson does not repeat horizontally
    wrapLat: null
  });
})();
