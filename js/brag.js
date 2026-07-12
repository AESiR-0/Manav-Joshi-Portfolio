/**
 * BragRotator — cycles through proof lines with a soft fade.
 * Interval is intentionally irregular to feel like trivia, not a ticker.
 */
export class BragRotator {
  /**
   * @param {HTMLElement} el      The element to update
   * @param {string[]}    lines   Array of brag strings
   * @param {number}      base    Base interval in ms (default 4000)
   */
  constructor(el, lines, base = 4000) {
    this.el = el;
    this.lines = lines;
    this.base = base;
    this.index = 0;
    this.timer = null;
  }

  start() {
    this.el.textContent = this.lines[this.index];
    this._schedule();
  }

  _schedule() {
    // Vary interval slightly so it never feels mechanical
    const jitter = (Math.random() - 0.5) * 800;
    this.timer = setTimeout(() => this._rotate(), this.base + jitter);
  }

  _rotate() {
    this.el.classList.add('fade');
    setTimeout(() => {
      this.index = (this.index + 1) % this.lines.length;
      this.el.textContent = this.lines[this.index];
      this.el.classList.remove('fade');
      this._schedule();
    }, 500); // matches CSS transition duration
  }

  stop() {
    clearTimeout(this.timer);
  }
}
