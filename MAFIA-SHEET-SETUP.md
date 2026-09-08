# Mafia Supper — RSVP sheet (~3 minutes, all of it yours)

The page at `/mafia` posts each submission to a Google Apps Script web app,
which writes a row to a sheet you own. No database, no auth, no vendor. Same
pattern as `/buildandbreak`, which is the one already proven against Apps Script.

**The page works without this.** Every submission opens WhatsApp to you prefilled
with name, number and answer, and that happens whether or not the sheet is wired.
The sheet is the copy you can sort, not the delivery.

## The sheet already exists

**mafia supper rsvps** — https://docs.google.com/spreadsheets/d/1Y25o9AbAkso0FcNjU_Zmma5VaZA0Vyi1JrirP9XiqWE/edit

Created 8 Sep 2026 on `work@manavjoshi.com`. Empty; the script writes its own
header row on the first submission.

## 1. Paste the script

In that sheet: **Extensions → Apps Script**. Delete whatever is in `Code.gs` and
paste this:

```js
const SHEET_NAME = 'rsvps';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const p = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['timestamp', 'edition', 'name', 'phone', 'why', 'seat', 'notes']);
    }
    sh.appendRow([new Date(), p.edition || '', p.name || '', p.phone || '',
                  p.why || '', '', '']);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the /exec URL in a browser to confirm the deploy is alive.
function doGet() {
  return ContentService.createTextOutput('mafia supper: ok');
}
```

`seat` and `notes` are yours to fill by hand — that's where the tiebreaker call
gets recorded once more than nine come in.

## 2. Deploy it

**Deploy → New deployment → ⚙ → Web app**, then:

- **Execute as:** Me
- **Who has access:** **Anyone** — this is the one people get wrong. Not "Anyone
  with a Google account"; the page posts without a login.

Authorise when Google asks. Copy the `/exec` URL it gives you.

## 3. Send me the URL

It goes on one line — `ENDPOINT` in the `CFG` block at the bottom of
`mafia/index.html` — and I push. Until then that field stays empty and the page
just doesn't call it.

## Checking it works

Open the `/exec` URL in a browser: it should say `mafia supper: ok`. Then submit
the live form once with your own name and watch the row land.

If rows stop arriving, it is almost always the deployment access setting, or a
**new deployment** having been created (a new deployment means a new URL — use
**Manage deployments → edit → New version** instead, which keeps the URL).
