'use strict';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.dataset.ready = '';
nav.dataset.collapsible = '';
function closeMenu() {
  delete nav.dataset.open;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}
menuButton.addEventListener('click', () => {
  const open = !nav.hasAttribute('data-open');
  nav.toggleAttribute('data-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.hasAttribute('data-open')) { closeMenu(); menuButton.focus(); }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);

const publications = [...document.querySelectorAll('.publication')];
const filters = [...document.querySelectorAll('.filter')];
const search = document.querySelector('#publication-search');
const resultCount = document.querySelector('#result-count');
let currentFilter = 'all';
document.querySelector('.publication-tools').hidden = false;
resultCount.hidden = false;
function filterPublications() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  for (const publication of publications) {
    const year = Number(publication.dataset.year);
    const matchesFilter = currentFilter === 'all' || publication.dataset.year === currentFilter || (currentFilter === 'earlier' && year < 2025);
    publication.hidden = !(matchesFilter && publication.textContent.toLowerCase().includes(query));
    if (!publication.hidden) count++;
  }
  resultCount.textContent = `${count} of ${publications.length} publications`;
  document.querySelector('#no-results').hidden = count > 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  filterPublications();
}));
search.addEventListener('input', filterPublications);
filterPublications();
function revealLinkedPublication(hash = location.hash) {
  const target = document.getElementById(hash.slice(1));
  if (!target?.classList.contains('publication') || !target.hidden) return;
  search.value = '';
  currentFilter = 'all';
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  filterPublications();
  target.scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', () => revealLinkedPublication());
document.querySelectorAll('a[href^="#pub-"]').forEach(link => link.addEventListener('click', () => revealLinkedPublication(link.hash)));
revealLinkedPublication();

// Images link directly to their originals without JavaScript; enhance with a dialog.
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
let imageTrigger;
document.querySelectorAll('[data-preview]').forEach(link => link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  imageTrigger = link;
  document.querySelector('#dialog-title').textContent = link.dataset.preview;
  dialogImage.src = link.href;
  dialogImage.alt = link.querySelector('img')?.alt || link.dataset.preview;
  document.querySelector('#original-image').href = link.href;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); imageTrigger?.focus({ preventScroll: true }); });

document.querySelectorAll('img[data-fallback]').forEach(img => {
  const fallback = () => {
    const text = document.createElement('span');
    text.className = 'image-fallback';
    text.textContent = img.dataset.fallback;
    img.replaceWith(text);
  };
  if (img.complete && img.naturalWidth === 0) fallback();
  else img.addEventListener('error', fallback, { once: true });
});

const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
let navFramePending = false;
function updateActiveSection() {
  const threshold = document.querySelector('.masthead').getBoundingClientRect().height + 90;
  let active = sectionLinks[0];
  for (const link of sectionLinks) {
    const section = document.querySelector(link.hash);
    if (section && section.getBoundingClientRect().top <= threshold) active = link;
  }
  sectionLinks.forEach(link => {
    if (link === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  navFramePending = false;
}
function scheduleNavUpdate() {
  if (navFramePending) return;
  navFramePending = true;
  requestAnimationFrame(updateActiveSection);
}
window.addEventListener('scroll', scheduleNavUpdate, { passive: true });
window.addEventListener('resize', scheduleNavUpdate);
window.addEventListener('load', scheduleNavUpdate);
updateActiveSection();
