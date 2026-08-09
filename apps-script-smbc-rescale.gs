/* ═══════════════════════════════════════════════════════════════════
   SMBC feedback — one-time rescale of the 1-5 star era onto 0-10

   The debrief form used 1-5 stars until 2026-08-09; it now writes 0-10.
   Left alone, the sheet mixes two instruments in one column and every
   average computed off it is wrong.

   Mapping is ×2 — 1→2, 2→4, 3→6, 4→8, 5→10. A 5/5 becomes 10/10 and a
   3/5 becomes 6/10: the same fraction of the scale, which is what
   "proportionately" has to mean if old and new rows are to sit in one
   column and be averaged together.

   Run from the Apps Script editor. This touches the bound spreadsheet
   only — it is NOT part of the web app, so there is nothing to redeploy
   and the live /exec URL is untouched.

       1. previewSmbcScaleMigration()   → logs every change, writes nothing
       2. runSmbcScaleMigration()       → backs the tab up, then writes

   Running step 2 twice is safe: converted rows are stamped in a "scale"
   column and skipped on every later run.
   ═══════════════════════════════════════════════════════════════════ */

var RESCALE_TAB    = 'smbc-feedback';
var RESCALE_COLS   = ['process', 'people', 'vibe', 'recommend'];
var RESCALE_MARKER = 'scale';

/* Everything written before the 0-10 form went live is star-era. Rows at or
   after this instant are already 0-10 and must never be doubled. */
var RESCALE_CUTOFF = new Date('2026-08-09T00:00:00+05:30');

function previewSmbcScaleMigration() { return rescaleSmbcFeedback_(true); }
function runSmbcScaleMigration()     { return rescaleSmbcFeedback_(false); }

function rescaleSmbcFeedback_(dryRun) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(RESCALE_TAB);
  if (!sh) throw new Error('No "' + RESCALE_TAB + '" tab in this spreadsheet.');

  var data = sh.getDataRange().getValues();
  if (data.length < 2) { Logger.log('Nothing to do — the tab has no data rows.'); return; }

  var headers = data[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var tsCol  = headers.indexOf('timestamp');
  var whyCol = headers.indexOf('why');
  if (tsCol < 0) throw new Error('No "timestamp" column — cannot tell star-era rows from 0-10 rows.');

  /* the marker column is what makes a second run a no-op */
  var markerCol = headers.indexOf(RESCALE_MARKER);
  var markerIsNew = markerCol < 0;
  if (markerIsNew) markerCol = headers.length;

  var targets = [];
  RESCALE_COLS.forEach(function (name) {
    var c = headers.indexOf(name);
    if (c >= 0) targets.push({ name: name, col: c });
    else Logger.log('note: no "' + name + '" column in this tab — skipping it.');
  });
  if (!targets.length) throw new Error('None of the rating columns exist in this tab.');

  var plan = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];

    /* guard 1 — already converted on an earlier run */
    var stamped = markerIsNew ? '' : String(row[markerCol] || '').trim();
    if (stamped) continue;

    /* guard 2 — written on or after the cutover, so already 0-10 */
    var ts = row[tsCol];
    if (!(ts instanceof Date) || ts >= RESCALE_CUTOFF) continue;

    var edits = [];
    targets.forEach(function (t) {
      var raw = row[t.col];
      if (raw === '' || raw === null) return;
      var n = Number(raw);
      /* guard 3 — only whole 1-5 values are star-era readings */
      if (!isFinite(n) || n < 1 || n > 5 || n !== Math.round(n)) return;
      edits.push({ col: t.col, name: t.name, from: n, to: n * 2 });
    });

    /* the readable bundle carries the same numbers as "4/5" and must agree */
    var whyFrom = whyCol >= 0 ? String(row[whyCol] || '') : '';
    var whyTo = whyFrom.replace(/(\d+)\/5\b/g, function (m, d) { return (Number(d) * 2) + '/10'; });

    if (!edits.length && whyTo === whyFrom) continue;
    plan.push({ row: r + 1, edits: edits, whyFrom: whyFrom, whyTo: whyTo });
  }

  if (!plan.length) {
    Logger.log('Nothing to convert — every row is either already 0-10 or already stamped.');
    return;
  }

  plan.forEach(function (p) {
    Logger.log('row ' + p.row + ': ' +
      (p.edits.map(function (e) { return e.name + ' ' + e.from + '/5 → ' + e.to + '/10'; }).join(', ') || '(no numeric columns)') +
      (p.whyTo !== p.whyFrom ? '  | bundle rewritten' : ''));
  });

  if (dryRun) {
    Logger.log('DRY RUN — ' + plan.length + ' row(s) would change. Nothing written.');
    return;
  }

  /* a copy of the tab as it stands, before a single cell moves */
  var stamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd HHmm');
  sh.copyTo(ss).setName(RESCALE_TAB + ' pre-0-10 ' + stamp);

  if (markerIsNew) sh.getRange(1, markerCol + 1).setValue(RESCALE_MARKER);

  plan.forEach(function (p) {
    p.edits.forEach(function (e) { sh.getRange(p.row, e.col + 1).setValue(e.to); });
    if (whyCol >= 0 && p.whyTo !== p.whyFrom) sh.getRange(p.row, whyCol + 1).setValue(p.whyTo);
    sh.getRange(p.row, markerCol + 1).setValue('0-10 (was 1-5, ×2)');
  });

  SpreadsheetApp.flush();
  Logger.log('Done — ' + plan.length + ' row(s) rescaled. Backup tab: "' + RESCALE_TAB + ' pre-0-10 ' + stamp + '".');
}
