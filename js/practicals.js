/* ── Practicals, one line each ────────────────────────────────────────
   A practical is one morning: you come, you learn, and you leave with a
   tangible outcome. Each one is a different lab, so each is dated by hand.

   The Chemistry Labs calendar and its Practicals page both read this
   file, so a date changes in one place.

   date   YYYY-MM-DD, or null while it has no date. An undated practical
          is shown as "date soon", never on a guessed day.
   href   its own page, if it has one. Without one, the page offers a
          WhatsApp message asking to be told when it is dated.

   Content Lab's own page (/contentlab/) carries its date in its own
   copy too. Change both, or the two will disagree.
   ─────────────────────────────────────────────────────────────────── */
(function (root) {
  root.CHEM_PRACTICALS = [
    {
      id: 'content',
      name: 'Content Lab',
      topic: 'Content for founders',
      outcome: 'Nobody goes home till you have a piece of content.',
      date: '2026-11-14',
      time: '9 AM',
      city: 'Ahmedabad',
      href: 'https://manavjoshi.com/contentlab/'
    },
    { id: 'gtm', name: 'Go-to-market', topic: 'Go-to-market', date: null },
    { id: 'capital', name: 'Raising capital', topic: 'Raising capital', date: null },
    { id: 'app', name: 'Building an app', topic: 'Building an app', date: null }
  ];
})(window);
