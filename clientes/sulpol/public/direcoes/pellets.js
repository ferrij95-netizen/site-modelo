// Desenha grânulos de masterbatch (SVG) em qualquer elemento com data-pellets.
// data-pellets="branco|preto|cores|aditivo|marca", data-n = quantidade, data-seed = variação.
(function () {
  var sets = {
    branco: ['#FFFFFF', '#F4F4F2', '#ECECEA'],
    preto: ['#1A1A1A', '#2A2A2A', '#111111'],
    cores: ['#E2559A', '#1C3F94', '#2A5CD8', '#1E9A4B', '#FFE135', '#F2B705', '#F26A1B', '#D2232A', '#6B3E22'],
    aditivo: ['#F3EFD9', '#E9E4C6', '#F7F4E6'],
  };
  function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var m = function (c) { return Math.max(0, Math.min(255, Math.round(f < 0 ? c * (1 + f) : c + (255 - c) * f))); };
    return 'rgb(' + m(r) + ',' + m(g) + ',' + m(b) + ')';
  }
  document.querySelectorAll('[data-pellets]').forEach(function (el, k) {
    var kind = el.dataset.pellets, n = +(el.dataset.n || 60), r = rnd(+(el.dataset.seed || 7 + k * 13));
    var brand = getComputedStyle(el).getPropertyValue('--brand').trim() || '#0B4F9C';
    var cols = kind === 'marca' ? [brand, shade(brand, .25), shade(brand, -.25)] : sets[kind] || sets.cores;
    var W = 400, H = 300, defs = '', body = '';
    cols.forEach(function (c, i) {
      defs += '<radialGradient id="p' + k + '_' + i + '" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="' + shade(c, .45) + '"/><stop offset=".55" stop-color="' + c + '"/><stop offset="1" stop-color="' + shade(c, -.35) + '"/></radialGradient>';
    });
    var ps = [];
    for (var i = 0; i < n; i++) ps.push({ x: r() * W, y: r() * H, s: 14 + r() * 12, a: r() * 180, c: Math.floor(r() * cols.length) });
    ps.sort(function (a, b) { return a.y - b.y; });
    ps.forEach(function (p) {
      body += '<g transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + p.a.toFixed(0) + ')">' +
        '<ellipse rx="' + (p.s * .62).toFixed(1) + '" ry="' + (p.s * .5).toFixed(1) + '" cy="2.5" fill="rgba(0,0,0,.18)"/>' +
        '<ellipse rx="' + (p.s * .6).toFixed(1) + '" ry="' + (p.s * .48).toFixed(1) + '" fill="url(#p' + k + '_' + p.c + ')"/></g>';
    });
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' + defs + '</defs>' + body + '</svg>';
  });
})();
