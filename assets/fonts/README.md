# fonts

## Helvetica Now Display (the page face)

The `/buildandbreak` page is wired to self-host Helvetica Now Display. Drop these
three `.woff2` files into this folder with these **exact** names:

| file | weight | used for |
|---|---|---|
| `HelveticaNowDisplay-Regular.woff2` | 400 | the calm voice — body, headlines, almost everything |
| `HelveticaNowDisplay-Medium.woff2`  | 500 | buttons and chips |
| `HelveticaNowDisplay-Black.woff2`   | 900 | emphasis only — "that's the point.", "one thing" |

That's the whole set the page references. You don't need the other weights or
the italics for this page.

### Where to get them
Helvetica Now Display is a Monotype font. Buy a **web font** licence (desktop
licences don't cover websites) from [monotype.com](https://www.monotype.com) or
fonts.com. You want the seats for Regular, Medium, and Black. The licence gives
you font files; if they hand you `.otf`/`.ttf` instead of `.woff2`, convert them
once at [transfonter.org](https://transfonter.org) (pick woff2 output) and rename
to match the table above.

### Until the files are here
The page falls back to Inter automatically, so it never looks broken. The moment
these three files exist, Helvetica Now takes over and Inter stops downloading.
The page preloads Regular and Black, so the hero never flashes the fallback once
they're in place.

## Schoolbell (the one hand mark)
Schoolbell is already loaded free from Google Fonts and is open-licensed (OFL).
There is nothing to buy or host. Leave it as is.
