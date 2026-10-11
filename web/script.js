(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Headline: letters drop in one after another
  var k = 0;
  document.querySelectorAll('.w').forEach(function (w) {
    var t = w.textContent; w.textContent = '';
    t.split('').forEach(function (c) {
      var s = document.createElement('span');
      s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', k++);
      w.appendChild(s);
    });
  });

  // Feature cards: one open at a time
  var items = document.querySelectorAll('.item');
  items.forEach(function (it) {
    var b = it.querySelector('button');
    b.addEventListener('click', function () {
      var open = !it.classList.contains('open');
      items.forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (open) { it.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
    });
  });

  // Live forwarding demo
  var track = document.getElementById('track');
  var sw = document.getElementById('sw');
  var swText = document.getElementById('swText');
  var okN = document.getElementById('okN');
  var skN = document.getElementById('skN');
  var target = document.querySelector('.node:last-child');
  var filters = true, ok = 0, sk = 0;
  var PASS = [['🎬', 'video.mp4'], ['📷', 'photo.jpg'], ['📄', 'notes.pdf'], ['🎵', 'song.mp3']];
  var BLOCK = [['🔁', 'duplicate'], ['📦', 'app.apk'], ['🚫', 'spam word']];

  function bump(el, n) {
    el.textContent = n;
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function spawn() {
    if (document.hidden) return;
    var bad = Math.random() < 0.4;
    var d = pick(bad ? BLOCK : PASS);
    var el = document.createElement('div');
    el.className = 'chip';
    el.innerHTML = d[0] + ' <span>' + d[1] + '</span>';
    track.appendChild(el);
    var dist = track.clientWidth - el.offsetWidth;
    var stop = bad && filters;
    if (bad && !filters) el.classList.add('leak');

    if (stop) {
      var a = el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(' + dist * 0.5 + 'px)' }],
        { duration: 1800, easing: 'ease-in-out', fill: 'forwards' });
      a.onfinish = function () {
        el.classList.add('x');
        bump(skN, ++sk);
        el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateX(' + dist * 0.5 + 'px) scale(.7)' }],
          { duration: 600, delay: 350, fill: 'forwards' }).onfinish = function () { el.remove(); };
      };
    } else {
      el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(' + dist + 'px)' }],
        { duration: 3600, easing: 'ease-in-out', fill: 'forwards' }).onfinish = function () {
        el.remove();
        bump(okN, ++ok);
        target.classList.remove('hit'); void target.offsetWidth; target.classList.add('hit');
      };
    }
  }

  sw.addEventListener('click', function () {
    filters = !filters;
    sw.setAttribute('aria-checked', String(filters));
    swText.textContent = filters ? 'Filters on' : 'Filters off';
  });

  if (!reduce) { spawn(); setInterval(spawn, 1100); }

  // Server status from /health
  var st = document.getElementById('status');
  var tx = document.getElementById('statusText');
  fetch('/health').then(function (r) { return r.json(); })
    .then(function () { st.classList.add('on'); tx.textContent = 'Server online'; })
    .catch(function () { st.classList.add('off'); tx.textContent = 'Server unreachable'; });
})();
