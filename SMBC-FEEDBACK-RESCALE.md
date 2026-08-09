# SMBC feedback — rescale the 1-5 star rows onto 0-10 (one time, 2 minutes)

The debrief form used 1-5 stars until **2026-08-09**. It now writes **0-10**.
Until the old rows are converted, the `process` / `people` / `vibe` /
`recommend` columns hold two different instruments and any average taken off
them is wrong — a 4 could mean "very good" (star era) or "below middling"
(now).

**The mapping is ×2.**

| star era | becomes |
|---|---|
| 1 | 2 |
| 2 | 4 |
| 3 | 6 |
| 4 | 8 |
| 5 | 10 |

A 5/5 becomes 10/10, a 3/5 becomes 6/10 — the same fraction of the scale. That
is what makes an old row and a new row safe to average together. (It means no
old row can land on an odd number, which is correct: a 5-point scale never had
that resolution to begin with.)

## Run it

The code is in `apps-script-smbc-rescale.gs` in this repo.

1. Open the SMBC spreadsheet → **Extensions → Apps Script**.
2. **+ → Script** for a new file, name it `rescale`, paste the whole
   `apps-script-smbc-rescale.gs` file in, save.
3. Pick **`previewSmbcScaleMigration`** in the function dropdown → **Run**.
   Open **Execution log**. It prints every change it intends to make and
   writes nothing at all. Read it before going further.
4. If the log looks right, pick **`runSmbcScaleMigration`** → **Run**.

**Nothing here is deployed.** These functions run inside the editor against the
bound spreadsheet. The web app and its `/exec` URL are untouched, so there is
no redeploy and no risk to the invite form, chemistry lab, or build-and-break.

## What it does when you run it for real

- Copies the whole `smbc-feedback` tab to **`smbc-feedback pre-0-10 <date>`**
  before a single cell moves. That's the undo.
- Doubles the four rating columns on star-era rows.
- Rewrites the readable `why` bundle on those rows too, so `process 4/5`
  becomes `process 8/10` and the prose stops contradicting the columns.
- Stamps a **`scale`** column with `0-10 (was 1-5, ×2)` on every row it touched.

## Why it can't run twice by accident

Three independent guards, each of which alone is enough to stop a row being
doubled a second time:

1. **The stamp.** Any row with something in `scale` is skipped.
2. **The cutover.** Only rows timestamped before 2026-08-09 IST are eligible;
   everything the live form has written since is already 0-10.
3. **The range.** Only whole numbers 1-5 convert. A 0, a 7, a 10 or a blank is
   left exactly as it is.

Verified against a stubbed sheet covering: a mixed tab (star rows beside a new
0-10 row), a tab with no `why` column and blank cells, an already-stamped tab,
and a tab with only new rows. In every case the dry run wrote nothing, new rows
were untouched, and a second run reported "nothing to convert".

## If the tab isn't there

If `runSmbcScaleMigration` throws `No "smbc-feedback" tab`, the routing block
was never pasted into `doPost` and the debrief rows are sitting in the main
`rsvps` tab with `why` starting `smbc-feedback · `. In that case there are no
numeric columns to convert — only the bundle text — and it's worth splitting
them onto their own tab first (see `SMBC-FEEDBACK-SETUP.md`) rather than
rescaling in place.
