#!/usr/bin/env python3
"""Compress dropped-in hero + highlight videos and build the highlights manifest.

You drop ONE folder per category in  ~/Downloads/Hosting/host-videos/ :

    host-videos/
      Weddings/     hero-varmala.mp4   sangeet-games.mp4  haldi.mp4  couple-entry.mp4
      Concerts/     hero.mp4           gotilo.mp4         abhivyakti.mp4  crowd.mp4
      Corporate/    ...
      Shows/        ...
      Private/      ...

Rules per folder:
  • the file whose name contains "hero" is the hero video (else the first file)
  • the other files (up to 3) become the highlight circles, in filename order
  • each highlight's circle label is its filename, prettified
    (sangeet-games.mp4 -> "Sangeet Games")

Then run:   python3 tools/process_videos.py   &&   python3 tools/gen_host_pages.py

It compresses everything for web, makes poster thumbnails, and writes
assets/video/highlights.json. Categories you haven't dropped are left untouched.
"""
import subprocess, pathlib, json, shutil, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "host" / "Videos"
OUT = ROOT / "assets" / "video"
MANIFEST = OUT / "highlights.json"

# page tag -> accepted folder names (case-insensitive). These are the reel-based
# categories (hero + highlight circles). Shows is long-form YouTube — handled in
# the generator, not here.
CATS = {
    "weddings": ["weddings", "wedding"],
    "concerts": ["concerts", "concert"],
    "corporate": ["corporate", "brand"],
}
VID_EXT = {".mp4", ".mov", ".m4v", ".webm"}

# Hand-picked poster timestamps (seconds into the clip) — frames chosen for
# intrigue/emotion. Keyed by output name; anything not listed uses 1s.
POSTERS = {
    "weddings-hero": 172, "weddings-h1": 12, "weddings-h2": 24, "weddings-h3": 15,
    "concerts-hero": 42, "concerts-h1": 12, "concerts-h2": 24, "concerts-h3": 37,
    "corporate-hero": 36, "corporate-h1": 12, "corporate-h2": 28,
}

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

def orient(src):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", str(src)],
        capture_output=True, text=True).stdout.strip()
    try:
        w, h = (int(x) for x in out.split("x")[:2])
        return "portrait" if h >= w else "landscape"
    except Exception:
        return "portrait"

def encode(src, dst, poster):
    w = 720 if orient(src) == "portrait" else 1280
    run(["ffmpeg", "-y", "-v", "error", "-i", str(src), "-vf", f"scale={w}:-2",
         "-c:v", "libx264", "-crf", "27", "-preset", "medium", "-movflags",
         "+faststart", "-c:a", "aac", "-b:a", "112k", str(dst)])
    ts = POSTERS.get(pathlib.Path(dst).stem, 1)
    run(["ffmpeg", "-y", "-v", "error", "-ss", str(ts), "-i", str(src), "-frames:v", "1",
         "-vf", f"scale={w}:-2", "-q:v", "4", str(poster)])

def label_of(path):
    s = path.stem.replace("-", " ").replace("_", " ").strip().title()
    return re.sub(r"'([A-Za-z])", lambda m: "'" + m.group(1).lower(), s)  # Group'S -> Group's

def find_folder(names):
    if not SRC.exists():
        return None
    for d in SRC.iterdir():
        if d.is_dir() and d.name.lower() in names:
            return d
    return None

def main():
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        raise SystemExit("ffmpeg/ffprobe not found — brew install ffmpeg")
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}

    touched = []
    for tag, names in CATS.items():
        folder = find_folder(names)
        if not folder:
            continue
        files = sorted(f for f in folder.iterdir() if f.suffix.lower() in VID_EXT)
        if not files:
            continue
        heroes = [f for f in files if "hero" in f.stem.lower()]
        hero = heroes[0] if heroes else files[0]
        rest = [f for f in files if f != hero][:3]

        entry = {}
        hsrc, hpost = f"{tag}-hero.mp4", f"{tag}-hero.jpg"
        encode(hero, OUT / hsrc, OUT / hpost)
        entry["hero"] = {"src": hsrc, "poster": hpost, "orient": orient(hero)}

        hl = []
        for i, f in enumerate(rest, 1):
            src, post = f"{tag}-h{i}.mp4", f"{tag}-h{i}.jpg"
            encode(f, OUT / src, OUT / post)
            hl.append({"src": src, "poster": post, "label": label_of(f)})
        entry["highlights"] = hl
        manifest[tag] = entry
        touched.append(f"{tag}: hero + {len(hl)} highlights ({', '.join(h['label'] for h in hl)})")

    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    if touched:
        print("Processed:")
        for t in touched:
            print("  ✓", t)
        print(f"\nManifest written to {MANIFEST.relative_to(ROOT)}")
        print("Now run:  python3 tools/gen_host_pages.py")
    else:
        print(f"No category folders found in {SRC}")
        print("Create e.g.  " + str(SRC / "Weddings") + "  with a hero + 3 clips.")

if __name__ == "__main__":
    main()
