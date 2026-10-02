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
    '2026-10-25': 'Jodhpur'
  };

  root.SMBC_CITY = {
    fallback: DEFAULT_CITY,
    bySunday: BY_SUNDAY,
    at: function (iso) {
      return BY_SUNDAY[String(iso || '').slice(0, 10)] || DEFAULT_CITY;
    }
  };
})(window);
