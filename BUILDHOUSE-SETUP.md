# build house — application backend setup (~5 minutes)

The page at `/buildhouse` posts applications to a Google Apps Script web app,
same pattern as buildandbreak. **It already works today**: until you do this
setup, applications land in the buildandbreak sheet, tagged
`status = buildhouse-apply`, with the extra answers packed into the `notes`
column. Nothing gets lost. This setup just gives applications their own clean
sheet with proper columns.

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new), name it `build house applications`.
2. Done. The script writes its own header row.

## 2. Paste the script

In the sheet: **Extensions → Apps Script**, replace `Code.gs` with:

```js
const SHEET_NAME = 'applications';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const p = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['timestamp', 'name', 'phone', 'building', 'shipped', 'why', 'movein', 'money', 'status', 'notes']);
    }
    sh.appendRow([
      new Date(),
      p.name || '',
      p.phone || '',
      p.building || '',
      p.shipped || '',
      p.why || '',
      p.movein || '',
      p.price || '',
      'new',
      '',
    ]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
```

Save (⌘S).

## 3. Deploy as a web app

1. **Deploy → New deployment** → gear → type **Web app**.
2. **Execute as: Me**. **Who has access: Anyone**. Deploy, authorize.
3. Copy the **Web app URL** (ends in `/exec`).

## 4. Wire up the page

In `buildhouse/index.html`, find `SHEET_ENDPOINT` at the top of the
`<script>` block and paste the new URL. Push.

## 5. Test

```sh
curl -d 'name=test&phone=%2B919999999999&building=a%20test&why=testing&movein=august%202026&price=grant' \
  'https://script.google.com/macros/s/YOUR_ID/exec' -L
```

A `test` row appears in seconds. Delete it.

## Working the pipeline

Each application arrives with `status = new`. Suggested hand-worked states:
`new → shortlist → spoke → offered → committed` (or `pass`). The page promises
a reply within 48 hours for fits, so check the sheet daily through launch
week. Selection bar (your ruling): ships visibly and often, over prestige.
