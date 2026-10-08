/* ── The city wheel ───────────────────────────────────────────────────
   Every form on the site asks where you live, and this is the one way it
   asks. His ruling, 8 October 2026: a city picker on any form, and the
   scroll should feel like setting an alarm on an iPhone. Same day: the
   wheel sits IN the form, no pop-up, and it lists only the cities he has
   announced or talked about, not every city in India.

   USE IT
     <script src="/js/city-wheel.js" defer></script>
     <input type="text" id="fCity" data-city-wheel>

   The input is hidden and a wheel is drawn right after it. The input still
   holds the answer, so the page reads it the way it reads every other
   field: $('fCity').value. Send it as `from_city`, never `city`. On the
   Sunday forms `city` already means where the SUNDAY is, and the CRM
   matches WhatsApp messages on it.

   The wheel starts on "scroll to pick", which means no answer. A wheel
   that starts on a real city would send that city for everyone who never
   touched it, and the sheet would say half the applicants live in
   Ahmedabad because Ahmedabad was on top.

   WHAT MAKES IT FEEL LIKE THE ALARM WHEEL
     · a drum: rows tilt away on rotateX as they leave the centre band
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
  var NONE = 'scroll to pick';
  var OTHER = 'Somewhere else';
  var ROWS = [NONE].concat(CITIES, OTHER);
  var ROW = 38;           // px per row, the alarm wheel's rhythm
  var SHOW = 5;           // rows visible: the centre plus two either side
  var TILT = 22;          // degrees of drum per row away from centre

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;

  /* ── styles, injected once so a page only needs the script tag. Colour is
     inherited from the field it sits in, so it reads right on any page. ── */
  var css = [
    '.cw{position:relative;height:' + (ROW * SHOW) + 'px;border-radius:16px;',
    'border:1px solid rgba(127,127,127,.28);border-color:color-mix(in srgb,currentColor 22%,transparent);',
    '-webkit-user-select:none;user-select:none;overflow:hidden}',
    '.cw:focus-within{border-color:color-mix(in srgb,currentColor 45%,transparent)}',
    '.cw-band{position:absolute;left:8px;right:8px;top:50%;height:' + ROW + 'px;margin-top:-' + (ROW / 2) + 'px;',
    'border-radius:10px;background:rgba(127,127,127,.16);background:color-mix(in srgb,currentColor 11%,transparent);pointer-events:none}',
    '.cw-scroll{position:absolute;inset:0;overflow-y:scroll;overscroll-behavior:contain;scroll-snap-type:y mandatory;',
    'scrollbar-width:none;-webkit-overflow-scrolling:touch;perspective:440px;outline:none;touch-action:pan-y;',
    '-webkit-mask-image:linear-gradient(transparent,#000 28%,#000 72%,transparent);mask-image:linear-gradient(transparent,#000 28%,#000 72%,transparent)}',
    '.cw-scroll::-webkit-scrollbar{display:none}',
    '.cw-scroll.drag{scroll-snap-type:none;cursor:grabbing}',
    '.cw-pad{height:' + (ROW * (SHOW - 1) / 2) + 'px}',
    '.cw-item{height:' + ROW + 'px;line-height:' + ROW + 'px;text-align:center;font-size:20px;white-space:nowrap;',
    'scroll-snap-align:center;transform-origin:50% 50%;backface-visibility:hidden;cursor:pointer;will-change:transform,opacity}',
    '.cw-item.ph,.cw-item.other{font-style:italic;font-size:17px}',
    '.cw-other{margin-top:10px}',
    '.cw-other[hidden]{display:none!important}',
    '.cw.pop .cw-band{animation:cwPop .4s cubic-bezier(.34,1.56,.64,1)}',
    '@keyframes cwPop{0%{transform:scale(1)}40%{transform:scale(1.03)}100%{transform:scale(1)}}',
    '.cw-hap{position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}',
    '@media (prefers-reduced-motion:reduce){.cw.pop .cw-band{animation:none}}'
  ].join('');

  var styled = false, hap = null, audio = null, uid = 0;

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

  /* ── one wheel, drawn in place of one input ── */
  function make(input) {
    if (input.__cw) return;
    input.__cw = true;
    setup();
    var n = ++uid;

    input.hidden = true;
    input.tabIndex = -1;

    var box = el('div', 'cw');
    box.appendChild(el('div', 'cw-band'));
    var sc = el('div', 'cw-scroll');
    sc.tabIndex = 0;
    sc.setAttribute('role', 'listbox');
    var lab = input.id && document.querySelector('label[for="' + input.id + '"]');
    if (lab) { lab.id = lab.id || 'cw-lab-' + n; sc.setAttribute('aria-labelledby', lab.id); }
    else sc.setAttribute('aria-label', 'City you live in');
    sc.appendChild(el('div', 'cw-pad'));
    var items = ROWS.map(function (name, i) {
      var it = el('div', 'cw-item' + (i === 0 ? ' ph' : name === OTHER ? ' other' : ''));
      it.id = 'cw-' + n + '-' + i;
      it.setAttribute('role', 'option');
      it.textContent = name;
      it.addEventListener('click', function () { if (!dragMoved) { arm(); go(i, true); } });
      sc.appendChild(it);
      return it;
    });
    sc.appendChild(el('div', 'cw-pad'));
    box.appendChild(sc);

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

    /* ── the drum ── each row tilts by how far it sits from the centre band */
    function paint() {
      var mid = sc.scrollTop / ROW;
      for (var i = 0; i < items.length; i++) {
        var d = i - mid, a = Math.abs(d);
        var deg = Math.max(-80, Math.min(80, d * TILT));
        items[i].style.transform = 'rotateX(' + (-deg) + 'deg) translateZ(0)';
        items[i].style.opacity = String(Math.max(0.1, (i === 0 ? 0.6 : 1) - a * 0.26));
        items[i].style.fontWeight = a < 0.5 && i > 0 ? '600' : '400';
      }
    }

    function onScroll() {
      paint();
      var i = clamp(Math.round(sc.scrollTop / ROW));
      if (i !== lastTick) { lastTick = i; if (armed) tick(); }
      clearTimeout(settleT);
      settleT = setTimeout(settle, 140);
    }

    function settle() {
      clearTimeout(settleT);
      var i = clamp(Math.round(sc.scrollTop / ROW));
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
        setValue(input, idx === 0 ? '' : name);
      }
      if (moved && armed && idx > 0) {
        box.classList.remove('pop'); box.offsetWidth; box.classList.add('pop');
      }
    }

    function go(i, smooth) {
      i = clamp(i);
      sc.scrollTo({ top: i * ROW, behavior: smooth && !reduced ? 'smooth' : 'auto' });
      if (!smooth || reduced) { paint(); settle(); }
    }

    /* ── keys ── arrows step, letters jump */
    sc.addEventListener('keydown', function (e) {
      var k = e.key, step = { ArrowDown: 1, ArrowUp: -1, PageDown: 3, PageUp: -3 }[k];
      var at = clamp(Math.round(sc.scrollTop / ROW));
      if (step) { e.preventDefault(); go(at + step, true); return; }
      if (k === 'Home') { e.preventDefault(); go(0, true); return; }
      if (k === 'End') { e.preventDefault(); go(ROWS.length - 1, true); return; }
      if (k.length === 1 && /[a-z]/i.test(k)) {
        var c = k.toLowerCase();
        for (var j = 1; j <= ROWS.length; j++) {
          var m = (at + j) % ROWS.length;
          if (m > 0 && ROWS[m].charAt(0).toLowerCase() === c) { go(m, true); break; }
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
      go(Math.round((sc.scrollTop - v * 160) / ROW), true);
      setTimeout(function () { dragMoved = false; }, 0);
    });

    sc.addEventListener('scroll', onScroll, { passive: true });
    if ('onscrollend' in window) sc.addEventListener('scrollend', settle);

    /* A value already in the input (a restored draft, a back button) is
       where the wheel starts. */
    var start = ROWS.indexOf(input.value);
    if (start < 0 && input.value) { start = ROWS.length - 1; other.value = input.value; }
    lastTick = Math.max(0, start);
    go(Math.max(0, start), false);
  }

  /* ── wiring ── every input already on the page, and any that appear
     later (React renders after this script runs). */
  function scan(root) {
    var all = (root || document).querySelectorAll('input[data-city-wheel]');
    for (var i = 0; i < all.length; i++) make(all[i]);
  }
  function boot() {
    scan();
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
