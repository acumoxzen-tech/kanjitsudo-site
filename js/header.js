// 還日堂 Header Active State
(() => {
  const nav = document.querySelector('.site-header .site-nav');
  if (!nav) return;

  const clearActive = () => {
    nav.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    nav.querySelectorAll('.nav-dropdown-trigger').forEach(el => el.classList.remove('active'));
  };

  const setActive = () => {
    clearActive();

    const path = location.pathname;
    const hash = location.hash || '#top';

    const activate = (selector) => {
      const el = nav.querySelector(selector);
      if (el) el.classList.add('active');
    };

    const activateGuide = (selector) => {
      const trigger = nav.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.classList.add('active');
      activate(selector);
    };

    if (path.endsWith('/menu.html')) {
      if (hash === '#flow-section') {
        activateGuide('[data-nav="flow"]');
      } else {
        activate('[data-nav="menu"]');
      }
      return;
    }

    if (path.endsWith('/faq.html')) {
      activateGuide('[data-nav="faq"]');
      return;
    }

    if (path.endsWith('/news.html')) {
      activateGuide('[data-nav="news"]');
      return;
    }

    switch (hash) {
      case '#about-page':
        activate('[data-nav="about"]');
        break;
      case '#staff-page':
        activate('[data-nav="staff"]');
        break;
      case '#gallery-page':
        activateGuide('[data-nav="gallery"]');
        break;
      case '#contact-page':
        activateGuide('[data-nav="contact"]');
        break;
      case '#access-page':
        activateGuide('[data-nav="access"]');
        break;
      case '#top':
      default:
        activate('[data-nav="home"]');
        break;
    }
  };

  window.addEventListener('hashchange', setActive);
  window.addEventListener('popstate', setActive);
  document.addEventListener('DOMContentLoaded', setActive);
  setActive();
})();
