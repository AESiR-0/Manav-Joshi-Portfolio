# Mafia Supper — where submissions go

**Nothing to set up. It is already wired and verified live (8 Sep 2026).**

`/mafia` posts every submission to the single Apps Script endpoint that already
serves `/buildandbreak` and `/smbc` — the same `/exec` URL, no new deployment,
no change to `apps-script-Code.gs`.

## How it lands without a redeploy

Rows go into the shared **`rsvps`** tab, which the script writes by matching the
sheet's existing header row (`timestamp, step, slug, name, phone, work, why,
utr, status, notes`). Mafia sends:

| field | value |
|---|---|
| `step` | `mafia` |
| `slug` | `mafia` |
| `name` / `phone` / `why` | the three form answers |
| `status` | `new` |
| `edition` | `01` — no column for it, so the script parks it in `extra` |

Filter the tab on **`slug = mafia`** to see only supper submissions.

## The one trap, and why step is not 'claim'

`doGet` computes seats-left for `/buildandbreak` by counting rows where
**`step === 'claim'`**. `/buildandbreak` sends **no slug of its own**, so the
script's slug filter cannot separate the two events. A mafia row sent as
`step: 'claim'` would therefore have silently eaten build-and-break's seats.

`step: 'mafia'` is invisible to that counter. Verified before and after live test
writes: `?slug=buildandbreak` returned `{"left":15,"total":15}` both times.

**If anyone ever changes mafia's `step` to `claim`, build-and-break's seat count
starts lying.** That is the only thing on this page that can break something else.

## Verified

A real POST from the live page returned the script's own `ok` — which
`doPost` only returns after the row is appended; its failure path returns
`error`.

Note: `curl` cannot test this endpoint. Apps Script answers `/exec` with a
redirect, and curl either drops the POST body (`-L`) or re-POSTs to the
googleusercontent echo URL, which refuses the method (`--post302`). Both return
**405 regardless of whether the payload is correct**. Test from a browser.

## Leftovers to clear

- **Test rows** in the `rsvps` tab named `ZZ Test Claude` and `ZZ Test Claude 3`
  (phones `9000000001`, `9000000003`). Delete them.
- The empty spreadsheet **mafia supper rsvps** on `work@manavjoshi.com`
  (`1Y25o9AbAkso0FcNjU_Zmma5VaZA0Vyi1JrirP9XiqWE`) was created for the abandoned
  separate-sheet plan and is now unused. Safe to trash.
