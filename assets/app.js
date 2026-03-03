const focusableSelector = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

function trapFocus(container, event) {
  const items = [...container.querySelectorAll(focusableSelector)].filter(el => el.offsetParent !== null);
  if (!items.length || event.key !== 'Tab') return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

document.querySelectorAll('[data-lang]').forEach((wrap) => {
  const btn = wrap.querySelector('.lang-pill');
  btn.addEventListener('click', () => {
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

const drawer = document.getElementById('mobile-drawer');
const drawerPanel = drawer?.querySelector('.drawer-panel');
const burger = document.querySelector('.burger');
const closeDrawerBtn = drawer?.querySelector('.drawer-close');

function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  burger?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}
function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  burger?.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
  drawerPanel?.querySelector('a,button')?.focus();
}
burger?.addEventListener('click', openDrawer);
closeDrawerBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closePrivacy();
  }
  if (drawer.classList.contains('open')) trapFocus(drawerPanel, e);
  if (privacyModal.classList.contains('open')) trapFocus(privacyPanel, e);
});

document.querySelectorAll('.faq-item button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('active'));
    item.classList.add('active');
  });
});

const privacyModal = document.getElementById('privacy-modal');
const privacyPanel = privacyModal?.querySelector('.modal-panel');
const openPrivacy = document.querySelector('[data-open-privacy]');
const closePrivacyBtn = document.querySelector('[data-close-privacy]');
const closePrivacyX = document.querySelector('.modal-x');

function openPrivacyModal(e) {
  e.preventDefault();
  privacyModal.classList.add('open');
  privacyModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  closePrivacyX?.focus();
}
function closePrivacy() {
  privacyModal.classList.remove('open');
  privacyModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}
openPrivacy?.addEventListener('click', openPrivacyModal);
closePrivacyBtn?.addEventListener('click', closePrivacy);
closePrivacyX?.addEventListener('click', closePrivacy);
privacyModal?.addEventListener('click', (e) => { if (e.target === privacyModal) closePrivacy(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
