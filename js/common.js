// 還日堂 共通UI: mobile nav
(() => {
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
  const navs = document.querySelectorAll('.site-nav, nav.mobile-nav, header nav');

  navs.forEach((mobileNav) => {
    if (mobileNav.dataset.commonNavReady === "true") return;
    mobileNav.dataset.commonNavReady = "true";

    mobileNav.addEventListener('click', (e) => {
      // PCでは通常リンクとして動かす。ハンバーガー制御はスマホだけ。
      if (!isMobile()) return;

      const clickedInstagram = e.target.closest('[aria-label="Instagram"]');
      const clickedLink = e.target.closest('a');

      if (!mobileNav.classList.contains('is-open')) {
        if (!clickedInstagram) {
          mobileNav.classList.add('is-open');
          e.preventDefault();
        }
      } else {
        const clickX = e.clientX;
        const clickY = e.clientY;
        const isCloseButton = clickX > (window.innerWidth - 70) && clickY < 70;

        if (isCloseButton) {
          mobileNav.classList.remove('is-open');
          return;
        }

        if (clickedLink) {
          setTimeout(() => {
            mobileNav.classList.remove('is-open');
          }, 120);
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!isMobile()) return;

    document.querySelectorAll('.site-nav.is-open, nav.mobile-nav.is-open, header nav.is-open').forEach((mobileNav) => {
      if (mobileNav.contains(e.target)) return;
      mobileNav.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.site-nav.is-open, nav.mobile-nav.is-open, header nav.is-open').forEach((mobileNav) => {
        mobileNav.classList.remove('is-open');
      });
    }
  });

  window.addEventListener('resize', () => {
    if (isMobile()) return;
    document.querySelectorAll('.site-nav.is-open, nav.mobile-nav.is-open, header nav.is-open').forEach((mobileNav) => {
      mobileNav.classList.remove('is-open');
    });
  });
})();
