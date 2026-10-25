/* ── Where the room is, Sunday by Sunday ──────────────────────────────
   The city belongs to the Sunday, not to the club. Every Sunday a page
   can show gets a line here, including the ones in Ahmedabad. An untagged
   date reads as "the usual place", and there is no usual place any more.

   Dates are YYYY-MM-DD, the same shape the date tiles and the CRM use.
   The tiles, the tick box, the row that reaches the CRM and the seat page
   all read this one table, so a city can never be right in one place and
   wrong in another. That is the whole reason it lives in its own file.

   DEFAULT_CITY is only the net under a Sunday nobody has filled in yet.
   Add the real line before that Sunday is four weeks out and visible.
   ─────────────────────────────────────────────────────────────────── */
(function (root) {
  var DEFAULT_CITY = 'Ahmedabad';

  var BY_SUNDAY = {
    '2026-09-27': 'Ahmedabad',
    '2026-10-04': 'Surat',
    '2026-10-11': 'Jaipur',
    '2026-10-18': 'Mumbai',
    '2026-10-25': 'Ahmedabad',
    '2026-11-01': 'Ahmedabad',
    '2026-11-08': 'Ahmedabad',
    '2026-11-15': 'Surat',
    '2026-11-22': 'Jaipur',
    '2026-11-29': 'Mumbai'
  };

  /* Sundays that run in more than one city at once. Manav's plan, set
     2026-10-22: from December every city runs every other Sunday, in two
     pairs, three times each; from 17 January all four run every Sunday.

     Kept apart from BY_SUNDAY on purpose. The Sunday form, the seat page
     and the away-dates row all read one city per Sunday through at(), and
     a two-city value there would print "Ahmedabad,Surat" into a tick box.
     Readers that can show several cities call cities(iso) instead. Until
     the Sunday form can ask which of two cities, at() returns the first. */
  var CITIES = ['Ahmedabad', 'Surat', 'Jaipur', 'Mumbai'];
  var EVERY_CITY_FROM = '2027-01-17';
  var PAIRS_BY_SUNDAY = {
    '2026-12-06': ['Ahmedabad', 'Surat'],
    '2026-12-13': ['Jaipur', 'Mumbai'],
    '2026-12-20': ['Ahmedabad', 'Surat'],
    '2026-12-27': ['Jaipur', 'Mumbai'],
    '2027-01-03': ['Ahmedabad', 'Surat'],
    '2027-01-10': ['Jaipur', 'Mumbai']
  };

  function citiesAt(iso) {
    var d = String(iso || '').slice(0, 10);
    if (d >= EVERY_CITY_FROM) return CITIES.slice();
    if (PAIRS_BY_SUNDAY[d]) return PAIRS_BY_SUNDAY[d].slice();
    return [BY_SUNDAY[d] || DEFAULT_CITY];
  }

  /* A Sunday that costs something other than the usual. Only the exceptions
     live here; a Sunday not listed charges the usual fee. */
  var PRICE_BY_SUNDAY = {
    '2026-10-18': 1999
  };

  root.SMBC_CITY = {
    fallback: DEFAULT_CITY,
    bySunday: BY_SUNDAY,
    priceAt: function (iso) {
      return PRICE_BY_SUNDAY[String(iso || '').slice(0, 10)] || 0;
    },
    at: function (iso) {
      return BY_SUNDAY[String(iso || '').slice(0, 10)] || citiesAt(iso)[0];
    },
    cities: citiesAt,
    all: CITIES.slice()
  };
})(window);
