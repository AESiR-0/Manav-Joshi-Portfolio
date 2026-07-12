/**
 * PhotoBurst — fast-then-slow image cycling.
 * Replace PLACEHOLDER_PHOTOS in each page with real photos from the same origin.
 *
 * LOW DATA STRATEGY:
 *  - First image is <link rel="preload"> in HTML (renders immediately)
 *  - Remaining images preload in background after first paint
 *  - Burst only cycles images that are already in cache
 *  - Uses WebP via URL param when Unsplash; swap for local paths in prod
 */
export class PhotoBurst {
  /**
   * @param {string[]} photos  Array of image URLs (first is shown immediately)
   */
  constructor(photos) {
    this.photos = photos;
    this.layerA = document.getElementById('burstA');
    this.layerB = document.getElementById('burstB');
    this.active = this.layerA;  // which layer is on top
    this.inactive = this.layerB;
    this.index = 0;
    this.loaded = new Set();
    this.running = false;

    // Timings: burst → settle → cruise
    // Each number is the delay (ms) before the NEXT image appears.
    this.timings = [70, 70, 70, 70, 80, 110, 170, 270, 430, 680, 1050, 1600, 2000];
    this.timingIdx = 0;
  }

  /** Show first image synchronously (preloaded via <link rel=preload>) */
  init() {
    this._setLayer(this.active, this.photos[0]);
    this.active.classList.add('active');
    this.loaded.add(0);
    this._preloadRest();
  }

  /** Start cycling. Call after init(). */
  start() {
    this.running = true;
    this._next();
  }

  _next() {
    if (!this.running) return;

    const delay = this.timingIdx < this.timings.length
      ? this.timings[this.timingIdx++]
      : 2000;

    setTimeout(() => {
      this.index = (this.index + 1) % this.photos.length;

      // Only swap if the image is loaded; skip to next if not
      if (!this.loaded.has(this.index)) {
        this._next();
        return;
      }

      this._swap(this.photos[this.index]);
      this._next();
    }, delay);
  }

  _swap(src) {
    // Cross-fade: set the inactive layer to the new image, fade it in, fade old out
    const crossfadeDuration = this.timingIdx < this.timings.length ? 80 : 500;
    this.inactive.style.transition = `opacity ${crossfadeDuration}ms ease`;
    this._setLayer(this.inactive, src);
    // Force reflow
    this.inactive.getBoundingClientRect();
    this.inactive.classList.add('active');
    this.active.style.transition = `opacity ${crossfadeDuration}ms ease`;
    this.active.classList.remove('active');

    // Swap references
    [this.active, this.inactive] = [this.inactive, this.active];
  }

  _setLayer(layer, src) {
    layer.style.backgroundImage = `url(${CSS.escape ? `'${src}'` : `'${src}'`})`;
  }

  _preloadRest() {
    // Stagger preloads to not block the main thread during burst
    this.photos.forEach((src, i) => {
      if (i === 0) return;
      setTimeout(() => {
        const img = new Image();
        img.onload = () => this.loaded.add(i);
        img.src = src;
      }, i * 400); // stagger by 400ms each
    });
  }

  stop() { this.running = false; }
}
