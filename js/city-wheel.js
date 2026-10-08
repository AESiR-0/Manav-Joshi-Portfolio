/* ── The city wheel ───────────────────────────────────────────────────
   Every form on the site asks where you live, and this is the one way it
   asks. His rulings, 8 October 2026, in order:
     1. a city picker on any form, and the scroll should feel like setting
        an alarm on an iPhone
     2. the wheel sits IN the form, no pop-up, and lists only the cities he
        has announced or talked about
     3. it is ONE LINE, the size of every other field, and it starts on the
        city of the next Build Club Sunday that still has room

   USE IT
     <script src="/js/city-wheel.js" defer></script>
     <input type="text" id="fCity" data-city-wheel>

   The input is hidden and a one-line wheel is drawn in its place, dressed
   in the input's own computed styles, so it looks like the field next to
   it on any page. The input still holds the answer, so the page reads it
   the way it reads every other field: $('fCity').value. Send it as
   `from_city`, never `city`. On the Sunday forms `city` already means where
   the SUNDAY is, and the CRM matches WhatsApp messages on it.

   THE DEFAULT is the city of the next Sunday, read from /js/smbc-cities.js
   (the one table every Sunday page reads), then moved on past any Sunday
   the CRM says is sold out. A wheel somebody has touched is never moved.
   The cost, accepted: an untouched wheel sends that city, so from_city
   reads "lives in Jaipur" for anyone who left it alone.

   WHAT MAKES IT FEEL LIKE THE ALARM WHEEL
     · a drum: rows roll away on rotateX as they leave the line
     · native momentum and snap, so a flick coasts and lands on a row
     · one tick per row crossed: vibrate() on Android, the switch-checkbox
       haptic on iPhone Safari 18+, and a quiet click sound everywhere
     · type a letter to jump: "m" lands on Mumbai

   "Somewhere else" is the last row. Landing on it opens a small text box
   under the wheel, so nobody is forced to lie about where they live.

   Works on React-rendered inputs too: new inputs are found as they appear,
   and the value is written through the native setter so onChange fires.
   ─────────────────────────────────────────────────────────────────── */
(function () {
  if (window.CityWheel) return;

  /* The cities he has announced or talked about, and no others. Today that
     is the Build Club tour (Jaipur, Mumbai, Jodhpur, Ahmedabad), Surat from
     4 October, and the two the calendar lists as TBA (Hyderabad, Pune).
     Alphabetical, so the wheel is predictable. A new city goes in when it
     is announced, not before. */
  var CITIES = ['Ahmedabad', 'Hyderabad', 'Jaipur', 'Jodhpur', 'Mumbai', 'Pune', 'Surat'];
  var OTHER = 'Somewhere else';
  var ROWS = CITIES.concat(OTHER);
  var TILT = 58;          // degrees a row rolls away per row from the line
  var LOAD_API = 'https://smbc-crm2.manavjoshi01.workers.dev/api/load';
  var CITIES_JS = '/js/smbc-cities.js';

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;

  /* ── styles, injected once. Sizes and skin come from the input itself,
     per wheel, so only the behaviour lives here. ── */
  var css = [
    '.cw{position:relative;overflow:hidden;-webkit-user-select:none;user-select:none;box-sizing:border-box}',
    '.cw-scroll{position:absolute;inset:0;overflow-y:scroll;overscroll-behavior:contain;scroll-snap-type:y mandatory;',
    'scrollbar-width:none;-webkit-overflow-scrolling:touch;perspective:300px;outline:none;touch-action:pan-y;cursor:ns-resize}',
    '.cw-scroll::-webkit-scrollbar{display:none}',
    '.cw-scroll.drag{scroll-snap-type:none;cursor:grabbing}',
    '.cw-item{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;scroll-snap-align:center;scroll-snap-stop:always;',
    'transform-origin:50% 50%;backface-visibility:hidden;will-change:transform,opacity;box-sizing:border-box}',
    '.cw-item.other{font-style:italic}',
    '.cw-chev{position:absolute;right:14px;top:50%;width:16px;height:16px;margin-top:-8px;opacity:.55;pointer-events:none}',
    '.cw-other{margin-top:10px}',
    '.cw-other[hidden]{display:none!important}',
    '.cw.pop{animation:cwPop .4s cubic-bezier(.34,1.56,.64,1)}',
    '@keyframes cwPop{0%{transform:scale(1)}40%{transform:scale(1.02)}100%{transform:scale(1)}}',
    '.cw-hap{position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}',
    '@media (prefers-reduced-motion:reduce){.cw.pop{animation:none}}'
  ].join('');

  var styled = false, hap = null, audio = null, uid = 0;
  var wheels = [];        // every wheel on the page, so the default can reach them

  function setup() {
    if (styled) return;
    styled = true;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    /* iPhone Safari has no vibrate(). Since iOS 18, toggling a switch
       checkbox through its label fires the system tick, which is the only
       haptic a web page can reach there. Best effort: where it does
       nothing, the click sound still lands. */
    hap = el('label', 'cw-hap');
    hap.setAttribute('aria-hidden', 'true');
    var sw = document.createElement('input');
    sw.type = 'checkbox'; sw.setAttribute('switch', ''); sw.tabIndex = -1;
    hap.appendChild(sw);
    document.body.appendChild(hap);
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* ── the tick ── haptic where the phone allows it, a click everywhere */
  function tick() {
    if (navigator.vibrate) { try { navigator.vibrate(7); } catch (e) {} }
    else if (coarse && hap) { try { hap.click(); } catch (e) {} }
    if (!audio || !audio._click) return;
    try {
      var t = audio.currentTime, src = audio.createBufferSource(), g = audio.createGain();
      src.buffer = audio._click;
      g.gain.setValueAtTime(0.16, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      src.connect(g); g.connect(audio.destination);
      src.start(t);
    } catch (e) {}
  }

  /* A few milliseconds of shaped noise through a high pass: the dry
     plastic click of the alarm wheel, not a beep. Made on the first touch,
     because browsers only allow audio after one. */
  function wakeAudio() {
    if (audio) { if (audio.state === 'suspended') audio.resume(); return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      audio = new AC();
      var n = Math.floor(audio.sampleRate * 0.006);
      var buf = audio.createBuffer(1, n, audio.sampleRate), ch = buf.getChannelData(0);
      for (var i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 4);
      audio._click = buf;
      var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!OAC) return;
      var off = new OAC(1, n, audio.sampleRate);
      var s = off.createBufferSource(); s.buffer = buf;
      var hp = off.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2400;
      s.connect(hp); hp.connect(off.destination); s.start();
      off.startRendering().then(function (r) { audio._click = r; }).catch(function () {});
    } catch (e) { audio = null; }
  }

  /* React keeps its own copy of an input's value. Writing through the
     prototype's setter and firing a bubbling input event is the one way to
     make its onChange see a value it did not type. */
  function setValue(input, v) {
    if (input.value === v) return;
    var set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    set.call(input, v);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /* ── THE DEFAULT: the next Build Club Sunday that still has room ── */
  var defaultCity = '';

  function sundays(n) {
    var now = new Date(), d = new Date(now);
    d.setDate(now.getDate() + ((7 - now.getDay()) % 7));
    /* Same cut-over as the Sunday page: the room ends at 1 pm. */
    if (now.getDay() === 0 && now.getHours() >= 13) d.setDate(d.getDate() + 7);
    var out = [];
    for (var k = 0; k < n; k++) {
      var x = new Date(d); x.setDate(d.getDate() + 7 * k);
      out.push(x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'));
    }
    return out;
  }

  function offer(city) {
    if (!city || ROWS.indexOf(city) < 0 || city === OTHER) return;
    defaultCity = city;
    wheels.forEach(function (w) { w.suggest(city); });
  }

  function findDefault() {
    var C = window.SMBC_CITY;
    if (!C) return;
    var weeks = sundays(12);
    offer(C.at(weeks[0]));           // instant: next Sunday, no network
    /* Then ask the CRM which Sundays are sold out, and skip them. On any
       failure the instant answer stands. */
    try {
      fetch(LOAD_API + '?weeks=12', { mode: 'cors', cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (load) {
          if (!load || typeof load !== 'object') return;
          for (var i = 0; i < weeks.length; i++) {
            if (String(load[weeks[i]] || '').trim().toLowerCase() !== 'sold out') { offer(C.at(weeks[i])); return; }
          }
        })
        .catch(function () {});
    } catch (e) {}
  }

  function loadCities() {
    if (window.SMBC_CITY) return findDefault();
    var s = document.createElement('script');
    s.src = CITIES_JS;
    s.onload = findDefault;
    document.head.appendChild(s);
  }

  /* ── one wheel, drawn in place of one input ── */
  function make(input) {
    if (input.__cw) return;
    input.__cw = true;
    setup();
    var n = ++uid;

    /* Dress the wheel in the input's own clothes, read before it is hidden:
       same height, border, radius, fill, type and left padding as the field
       above it, so it reads as one more line of the same form. */
    var cs = getComputedStyle(input);
    var row = input.offsetHeight || 54;
    var padL = cs.paddingLeft;
    var skin = {
      height: row + 'px', borderRadius: cs.borderRadius,
      borderWidth: cs.borderTopWidth, borderStyle: cs.borderTopStyle, borderColor: cs.borderTopColor,
      backgroundColor: cs.backgroundColor, boxShadow: cs.boxShadow,
      color: cs.color, fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight
    };
    var inner = row - 2 * (parseFloat(cs.borderTopWidth) || 0);

    input.hidden = true;
    input.tabIndex = -1;

    var box = el('div', 'cw');
    for (var k in skin) box.style[k] = skin[k];
    if (cs.backdropFilter && cs.backdropFilter !== 'none') box.style.backdropFilter = cs.backdropFilter;
    if (cs.webkitBackdropFilter && cs.webkitBackdropFilter !== 'none') box.style.webkitBackdropFilter = cs.webkitBackdropFilter;

    var sc = el('div', 'cw-scroll');
    sc.tabIndex = 0;
    sc.setAttribute('role', 'listbox');
    var lab = input.id && document.querySelector('label[for="' + input.id + '"]');
    if (lab) { lab.id = lab.id || 'cw-lab-' + n; sc.setAttribute('aria-labelledby', lab.id); }
    else sc.setAttribute('aria-label', 'City you live in');
    var items = ROWS.map(function (name, i) {
      var it = el('div', 'cw-item' + (name === OTHER ? ' other' : ''));
      it.id = 'cw-' + n + '-' + i;
      it.setAttribute('role', 'option');
      it.textContent = name;
      it.style.height = inner + 'px';
      it.style.lineHeight = inner + 'px';
      it.style.paddingLeft = padL;
      it.style.paddingRight = '40px';
      sc.appendChild(it);
      return it;
    });
    box.appendChild(sc);

    /* The up-and-down chevron every one-line picker wears, so it reads as
       something you can turn. */
    box.insertAdjacentHTML('beforeend',
      '<svg class="cw-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9.5l5-5 5 5M7 14.5l5 5 5-5"/></svg>');

    /* The "somewhere else" box borrows the page's own input styling by
       being a plain input in the same field. */
    var other = document.createElement('input');
    other.type = 'text';
    other.className = 'cw-other';
    other.maxLength = 60;
    other.placeholder = 'type your city';
    other.setAttribute('aria-label', 'Your city');
    other.hidden = true;
    other.addEventListener('input', function () { setValue(input, other.value.trim()); });

    input.parentNode.insertBefore(box, input.nextSibling);
    box.parentNode.insertBefore(other, box.nextSibling);

    var idx = 0, lastTick = 0, armed = false, settleT = 0, dragMoved = false;

    /* Ticks only for a hand on the wheel, never for the page placing it. */
    function arm() { armed = true; wakeAudio(); }
    ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(function (t) {
      sc.addEventListener(t, arm, { passive: true });
    });

    function clamp(i) { return Math.max(0, Math.min(ROWS.length - 1, i)); }

    /* ── the drum ── a row rolls away as it leaves the line */
    function paint() {
      var mid = sc.scrollTop / inner;
      for (var i = 0; i < items.length; i++) {
        var d = i - mid, a = Math.abs(d);
        if (a > 1.5) { items[i].style.visibility = 'hidden'; continue; }
        items[i].style.visibility = '';
        var deg = Math.max(-88, Math.min(88, d * TILT));
        items[i].style.transform = 'rotateX(' + (-deg) + 'deg) translateZ(0)';
        items[i].style.opacity = String(Math.max(0, 1 - a * 0.85));
      }
    }

    function onScroll() {
      paint();
      var i = clamp(Math.round(sc.scrollTop / inner));
      if (i !== lastTick) { lastTick = i; if (armed) tick(); }
      clearTimeout(settleT);
      settleT = setTimeout(settle, 140);
    }

    function settle() {
      clearTimeout(settleT);
      var i = clamp(Math.round(sc.scrollTop / inner));
      items[idx].setAttribute('aria-selected', 'false');
      var moved = i !== idx;
      idx = i;
      items[idx].setAttribute('aria-selected', 'true');
      sc.setAttribute('aria-activedescendant', items[idx].id);
      var name = ROWS[idx];
      if (name === OTHER) {
        other.hidden = false;
        setValue(input, other.value.trim());
        if (moved && armed) other.focus({ preventScroll: true });
      } else {
        other.hidden = true;
        setValue(input, name);
      }
      if (moved && armed) {
        box.classList.remove('pop'); box.offsetWidth; box.classList.add('pop');
      }
    }

    function go(i, smooth) {
      i = clamp(i);
      sc.scrollTo({ top: i * inner, behavior: smooth && !reduced ? 'smooth' : 'auto' });
      if (!smooth || reduced) { lastTick = i; paint(); settle(); }
    }

    /* A tap steps one row, like nudging the wheel with a thumb: the top
       half goes back, the bottom half goes forward. */
    sc.addEventListener('click', function (e) {
      if (dragMoved) return;
      arm();
      var r = sc.getBoundingClientRect();
      go(idx + (e.clientY < r.top + r.height / 2 ? -1 : 1), true);
    });

    /* ── keys ── arrows step, letters jump */
    sc.addEventListener('keydown', function (e) {
      var k = e.key, step = { ArrowDown: 1, ArrowUp: -1, PageDown: 3, PageUp: -3 }[k];
      var at = clamp(Math.round(sc.scrollTop / inner));
      if (step) { e.preventDefault(); go(at + step, true); return; }
      if (k === 'Home') { e.preventDefault(); go(0, true); return; }
      if (k === 'End') { e.preventDefault(); go(ROWS.length - 1, true); return; }
      if (k.length === 1 && /[a-z]/i.test(k)) {
        var c = k.toLowerCase();
        for (var j = 1; j <= ROWS.length; j++) {
          var m = (at + j) % ROWS.length;
          if (ROWS[m].charAt(0).toLowerCase() === c) { go(m, true); break; }
        }
      }
    });

    /* ── mouse drag ── touch already drags natively; a mouse gets the same */
    var y0 = 0, top0 = 0, down = false, lastY = 0, lastT = 0, v = 0;
    sc.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; dragMoved = false;
      y0 = lastY = e.clientY; top0 = sc.scrollTop; lastT = e.timeStamp; v = 0;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      if (!dragMoved && Math.abs(e.clientY - y0) > 4) { dragMoved = true; sc.classList.add('drag'); }
      if (!dragMoved) return;
      sc.scrollTop = top0 - (e.clientY - y0);
      var dt = e.timeStamp - lastT || 16;
      v = (e.clientY - lastY) / dt; lastY = e.clientY; lastT = e.timeStamp;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      if (!dragMoved) return;
      sc.classList.remove('drag');
      /* A little coast, so a flick with the mouse lands further than a drag. */
      go(Math.round((sc.scrollTop - v * 120) / inner), true);
      setTimeout(function () { dragMoved = false; }, 0);
    });

    sc.addEventListener('scroll', onScroll, { passive: true });
    if ('onscrollend' in window) sc.addEventListener('scrollend', settle);

    /* Where it starts: a value already in the input (a restored draft, the
       back button) wins; then the next Sunday's city; then the first row. */
    var start = ROWS.indexOf(input.value);
    if (start < 0 && input.value) { start = ROWS.length - 1; other.value = input.value; }
    var own = start >= 0;
    if (!own && defaultCity) start = ROWS.indexOf(defaultCity);
    go(Math.max(0, start), false);

    wheels.push({
      /* The default may arrive after the wheel is drawn (the CRM answers
         late). Move to it only if nobody has touched the wheel and it was
         not restored from a value of its own. */
      suggest: function (city) {
        if (armed || own) return;
        var i = ROWS.indexOf(city);
        if (i >= 0 && i !== idx) go(i, false);
      }
    });
  }

  /* ── wiring ── every input already on the page, and any that appear
     later (React renders after this script runs). */
  function scan(root) {
    var all = (root || document).querySelectorAll('input[data-city-wheel]');
    for (var i = 0; i < all.length; i++) make(all[i]);
  }
  function boot() {
    scan();
    loadCities();
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].addedNodes.length; j++) {
          var nd = list[i].addedNodes[j];
          if (nd.nodeType !== 1) continue;
          if (nd.matches('input[data-city-wheel]')) make(nd); else if (nd.querySelector) scan(nd);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.CityWheel = { cities: CITIES.slice() };
})();
