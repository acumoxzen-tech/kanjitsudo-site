// 還日堂 Header Active / PC Scrollspy
(() => {
  const nav = document.querySelector('.site-header .site-nav');
  if (!nav) return;

  const clearActive = () => {
    nav.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    nav.querySelectorAll('.nav-dropdown-trigger').forEach(el => el.classList.remove('active'));
  };

  const activate = (navName, guide = false) => {
    clearActive();
    const link = nav.querySelector(`[data-nav="${navName}"]`);
    if (link) link.classList.add('active');
    if (guide) {
      const trigger = nav.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.classList.add('active');
    }
  };

  const setActiveByLocation = () => {
    const path = location.pathname;
    const hash = location.hash || '#top';

    if (path.endsWith('/menu.html')) {
      activate(hash === '#flow-section' ? 'flow' : 'menu', hash === '#flow-section');
      return;
    }
    if (path.endsWith('/faq.html')) {
      activate('faq', true);
      return;
    }
    if (path.endsWith('/news.html')) {
      activate('news', true);
      return;
    }

    switch (hash) {
      case '#about-page':
        activate('about');
        break;
      case '#staff-page':
        activate('staff');
        break;
      case '#gallery-page':
        activate('gallery', true);
        break;
      case '#contact-page':
        activate('contact', true);
        break;
      case '#access-page':
        activate('access', true);
        break;
      case '#top':
      default:
        activate('home');
        break;
    }
  };

  const scrollSections = [
    { id: 'top', nav: 'home', guide: false },
    { id: 'about-page', nav: 'about', guide: false },
    { id: 'menu-page', nav: 'menu', guide: false },
    { id: 'staff-page', nav: 'staff', guide: false },
    { id: 'gallery-page', nav: 'gallery', guide: true },
    { id: 'contact-page', nav: 'contact', guide: true },
    { id: 'access-page', nav: 'access', guide: true }
  ];

  let ticking = false;

  const setActiveByScroll = () => {
    if (window.innerWidth <= 768) return;
    const path = location.pathname;
    if (path.endsWith('/menu.html') || path.endsWith('/faq.html') || path.endsWith('/news.html')) {
      return;
    }

    const headerOffset = 110;
    const probeY = window.scrollY + headerOffset;
    let current = scrollSections[0];

    for (const item of scrollSections) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.offsetTop <= probeY) current = item;
    }

    activate(current.nav, current.guide);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActiveByScroll();
      ticking = false;
    });
  };

  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      if (window.innerWidth > 768 && !location.pathname.endsWith('/menu.html') && !location.pathname.endsWith('/faq.html') && !location.pathname.endsWith('/news.html')) {
        setActiveByScroll();
      } else {
        setActiveByLocation();
      }
    }, 80);
  });

  window.addEventListener('popstate', setActiveByLocation);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setActiveByScroll();
    else setActiveByLocation();
  });

  document.addEventListener('DOMContentLoaded', () => {
    setActiveByLocation();
    setTimeout(setActiveByScroll, 120);
  });

  setActiveByLocation();
  setTimeout(setActiveByScroll, 120);
})();
