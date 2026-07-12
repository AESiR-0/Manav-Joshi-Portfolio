# buildandbreak — photo slots

Drop real photos into this folder with these exact filenames and the page picks
them up with zero code changes. Until then, each slot shows a designed
placeholder with the filename and a note on what the shot should be.

| file | what goes here | shape / size |
|---|---|---|
| `hero.jpg` | wide room, people at laptops, warm light. the first thing 95% of visitors see, full-bleed behind the headline. nobody posing. | landscape, ~1600×2000px safe (it crops to fill a phone screen, keep action centre-ish). text sits over the **bottom third**, so keep that area calmer/darker. |
| `room.jpg` | two strangers over one laptop, pointing, mid-laugh. the collision. | landscape, ~1600×900 (shows 4:3 on phones, 2:1 on desktop, keep the subject centred). |
| `upi-qr.png` | screenshot of your UPI QR code (GPay/PhonePe/Paytm "receive money"). | square, ~600×600. |

## Two ways to swap a photo

1. **Just drop the file here** with the name above. Done.
2. **Audition crops in the browser first:** open the page with `#edit` on the end
   of the URL (e.g. `manavjoshi.com/buildandbreak#edit`), then drag a photo onto
   any slot to preview how it crops. This is preview-only, it does not save. Once
   a crop looks right, save that file into this folder with the matching name.

Notes:
- JPGs around 200–400 KB load fast on Instagram-story traffic. Export quality ~75.
- The page lays its own gradient scrim over `hero.jpg`, so don't pre-darken it.
- `og:image` also points at `hero.jpg`, it's the link preview when shared.
