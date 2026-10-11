(function () {
  // Staggered entrance for the message card
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.setProperty('--i', i);
  });

  // Feature list: tap one to read what it does
  var detail = document.getElementById('detail');
  var buttons = document.querySelectorAll('#features button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wasOn = btn.getAttribute('aria-pressed') === 'true';
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      detail.classList.remove('pop');
      void detail.offsetWidth; // restart animation
      if (wasOn) {
        detail.textContent = 'Tap a feature to see what it does.';
      } else {
        btn.setAttribute('aria-pressed', 'true');
        detail.textContent = btn.dataset.detail;
        detail.classList.add('pop');
      }
    });
  });

  // Reactions: toggle on/off, count updates
  document.querySelectorAll('.react').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
      btn.querySelector('span').textContent = Number(btn.dataset.count) + (on ? 0 : 1);
    });
  });

  // Votes: only one of up/down at a time
  var votes = document.querySelectorAll('.vote');
  votes.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      votes.forEach(function (v) {
        v.setAttribute('aria-pressed', 'false');
        v.querySelector('span').textContent = v.dataset.count;
      });
      if (!on) {
        btn.setAttribute('aria-pressed', 'true');
        btn.querySelector('span').textContent = Number(btn.dataset.count) + 1;
      }
    });
  });

  // Live server status from /health
  var status = document.getElementById('status');
  var text = document.getElementById('statusText');
  fetch('/health')
    .then(function (r) { return r.json(); })
    .then(function () { status.classList.add('on'); text.textContent = 'Server online'; })
    .catch(function () { status.classList.add('off'); text.textContent = 'Server unreachable'; });
})();
