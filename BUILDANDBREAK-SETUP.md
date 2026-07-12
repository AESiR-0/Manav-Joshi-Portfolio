# buildandbreak — RSVP backend setup (~5 minutes)

The page at `/buildandbreak` posts RSVPs to a Google Apps Script web app, which
writes rows to a Google Sheet you own. No database, no auth, no vendor. Built
for 15–20 rows and hand-verification.

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new), name it `buildandbreak rsvps`.
2. That's it — the script creates the header row itself on first write.

## 2. Paste the script

1. In the sheet: **Extensions → Apps Script**.
2. Delete whatever is in `Code.gs` and paste this:

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
      sh.appendRow(['timestamp', 'name', 'phone', 'work', 'why', 'utr', 'status', 'notes']);
    }

    const phone = String(p.phone || '').trim();

    // Step 2 (pay) updates the row created at step 1, matched by phone.
    // Columns: A timestamp, B name, C phone, D work, E why, F utr, G status, H notes
    if (p.step === 'pay' && phone) {
      const rows = sh.getDataRange().getValues();
      for (let i = rows.length - 1; i >= 1; i--) {
        if (String(rows[i][2]).trim() === phone) {
          sh.getRange(i + 1, 6).setValue(p.utr || '');
          sh.getRange(i + 1, 7).setValue('paid-unverified');
          sh.getRange(i + 1, 8).setValue(p.notes || '');
          return ContentService.createTextOutput('ok');
        }
      }
      // No claimed row found (shouldn't happen) — fall through and append.
    }

    sh.appendRow([
      new Date(),
      p.name || '',
      phone,
      p.work || '',
      p.why || '',
      p.utr || '',
      p.status || 'claimed',
      p.notes || '',
    ]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Live seat count for the page. Returns how many of the 15 seats are still open,
// counting rows whose status is paid/confirmed (column G). Served as JSONP.
const TOTAL_SEATS = 15;
function doGet(e) {
  const cb = (e && e.parameter && e.parameter.callback) || '';
  let taken = 0;
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (sh && sh.getLastRow() > 1) {
      const statuses = sh.getRange(2, 7, sh.getLastRow() - 1, 1).getValues();
      taken = statuses.filter(r => /paid|confirm/i.test(String(r[0]))).length;
    }
  } catch (err) {}
  const body = JSON.stringify({ left: Math.max(0, TOTAL_SEATS - taken), total: TOTAL_SEATS });
  return cb
    ? ContentService.createTextOutput(cb + '(' + body + ')').setMimeType(ContentService.MimeType.JAVASCRIPT)
    : ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
```

3. Save (⌘S).

## 3. Deploy as a web app

1. **Deploy → New deployment**.
2. Gear icon → type: **Web app**.
3. Description: anything. **Execute as: Me**. **Who has access: Anyone**.
   ("Anyone" is required so the page can POST without Google login. The URL is
   unguessable; worst case someone writes a junk row you delete by hand.)
4. **Deploy**, authorize with your Google account when it asks.
5. Copy the **Web app URL** (ends in `/exec`).

## 4. Wire up the page

Open `buildandbreak/index.html` and fill in the constants at the top of the
`<script>` block (search for `EDIT THESE`):

```js
const UPI_ID         = 'yourname@okhdfcbank';   // your real UPI id
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/.../exec';
const PRICE          = 499;                     // entry, in ₹
```

The seat count is **live** — the page reads it from the sheet via `doGet`, so
there's no number to hand-edit. It counts rows whose status is paid/confirmed
against the 15-seat cap, and flips the page to a sold-out state at zero. If you
ever want to free a seat (someone bailed), change that row's status away from
`paid`/`confirmed` in the sheet.

> Because you added `doGet` after the first deploy, you must push a **new
> version** of the deployment for the live count to work — see the last section.

## 5. Test it

From a terminal:

```sh
curl -d 'step=claim&name=test&phone=%2B919999999999&work=tester&why=just%20curious&status=claimed' \
  'https://script.google.com/macros/s/YOUR_ID/exec' -L
```

A `test` row should appear in the sheet within a couple of seconds. Then load
`/buildandbreak`, submit the form with a junk number, and check both steps land
(`claimed` → `paid-unverified` on the same row). Delete the test rows.

## How a real RSVP flows

1. Visitor submits name + number → row appears instantly with status
   **`claimed`** — even if they bail before paying, you have their WhatsApp.
2. They pay via UPI, enter any part of the transaction id (or tick "I'll
   WhatsApp the screenshot") → same row flips to **`paid-unverified`**.
3. You check your UPI app, match the amount/UTR, WhatsApp them a confirmation,
   and set status to `confirmed` (or whatever you like) by hand.

## If you redeploy the script

Editing the script later? Use **Deploy → Manage deployments → ✏️ → New
version** on the *existing* deployment, so the URL stays the same. A brand-new
deployment gets a new URL and you'd have to update `SHEET_ENDPOINT`.
