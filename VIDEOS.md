# How to give me the videos

Each category page has **one hero video** (top) and a **"Some more work"** row of
**three highlight circles** below "Why me" — tap a circle and the clips play one
after another, Instagram-story style, in the site's own player. All self-hosted, so
no Drive/Instagram/YouTube chrome — it feels native.

## Drop one folder per category

Make these folders in **`~/Downloads/Hosting/host-videos/`**, each with a **hero +
3 clips**, as `.mp4` (download reels while logged in — I can't pull them anonymously):

```
host-videos/
  Weddings/    hero-varmala.mp4   sangeet-games.mp4   haldi-fun.mp4   couple-entry.mp4
  Concerts/    hero-gotilo.mp4    abhivyakti.mp4      three-shows.mp4  crowd-20k.mp4
  Corporate/   hero-auction.mp4   toyota.mp4          award-show.mp4   product-launch.mp4
  Shows/       hero.mp4           shu-plan.mp4        champion-stuff.mp4  interview.mp4
  Private/     hero.mp4           game-night.mp4      qna.mp4          intimate.mp4
```

Two rules only:
- the file with **"hero"** in its name becomes the hero video;
- the **filename becomes the circle label**, prettified — `sangeet-games.mp4` → "Sangeet Games". So name them how you want them to read (keep to ~1–2 words).

Orientation (portrait vs landscape) is detected automatically. You don't have to do
all five at once — drop whatever's ready; the rest stay as they are.

## Then two commands

```
python3 tools/process_videos.py      # compresses, makes posters, writes the manifest
python3 tools/gen_host_pages.py       # rebuilds the pages
```

That's it — heroes and highlight circles populate from whatever folders you dropped.

## Getting it onto the live site

Videos are large, so they can't just be pasted. Once the files are processed, tell me
and we'll push `assets/video/` + the rebuilt `host/` pages to your GitHub repo
(you log into GitHub in Chrome; I'll drive the upload). Say the word when the
folders are ready.
