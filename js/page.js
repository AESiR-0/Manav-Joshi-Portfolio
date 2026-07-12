/**
 * page.js — shared page initialisation helpers.
 * Each HTML page imports this and calls the relevant init function.
 */
import { PhotoBurst } from '/js/burst.js';
import { BragRotator } from '/js/brag.js';

/**
 * Boot a full burst + brag page.
 * @param {{ photos: string[], brags: string[] }} content
 */
export function initBurstPage(content) {
  const burst = new PhotoBurst(content.photos);
  burst.init();
  burst.start();

  if (content.brags) {
    const el = document.getElementById('bragLine');
    if (el) {
      const rotator = new BragRotator(el, content.brags, 4200);
      rotator.start();
    }
  }
}

/**
 * Build the brand logo row on home.
 */
export function renderLogos(logos, containerId = 'logos') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = logos.map(name =>
    `<span class="logo-mark">${name}</span>`
  ).join('');
}

/**
 * Build the linktree overlay on home.
 */
export function initLinktree(links) {
  const btn   = document.getElementById('funLinksBtn');
  const overlay = document.getElementById('linktree');
  const close   = document.getElementById('linktreeClose');
  const container = document.getElementById('linktreeLinks');
  if (!btn || !overlay) return;

  container.innerHTML = links.map(l =>
    `<a class="linktree-link" href="${l.url}">${l.label}</a>`
  ).join('');

  btn.addEventListener('click', () => overlay.classList.remove('hidden'));
  close.addEventListener('click', () => overlay.classList.add('hidden'));
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.add('hidden');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.add('hidden');
  });
}

/**
 * Build category proof lines and CTAs on followup pages.
 */
export function renderCategory(content) {
  const headlineEl = document.getElementById('categoryHeadline');
  const proofEl    = document.getElementById('categoryProof');
  const linksEl    = document.getElementById('categoryLinks');

  if (headlineEl) headlineEl.textContent = content.headline;

  if (proofEl && content.proof) {
    proofEl.innerHTML = content.proof.map(line =>
      `<span class="proof-line">${line}</span>`
    ).join('');
  }

  if (linksEl && content.links) {
    linksEl.innerHTML = content.links.map(l =>
      `<a class="category-cta" href="${l.url}">${l.label}</a>`
    ).join('');
  }
}
