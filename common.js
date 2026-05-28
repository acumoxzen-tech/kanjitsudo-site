// 還日堂 共通UI
(() => {
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  // Fade-in復旧：各ページの .fade-section を表示
  const fadeSections = document.querySelectorAll('.fade-section');
  if (fadeSections.length) {
    if ('IntersectionObserver' in window) {
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px'
      });

      fadeSections.forEach(section => fadeObserver.observe(section));
    } else {
      fadeSections.forEach(section => section.classList.add('is-visible'));
    }
  }

  // Detail photo animation
  const detailPhoto = document.querySelector('.detail-photo');
  if (detailPhoto) {
    if ('IntersectionObserver' in window) {
      const photoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            detailPhoto.classList.add('is-visible');
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -12% 0px'
      });
      photoObserver.observe(detailPhoto);
    } else {
      detailPhoto.classList.add('is-visible');
    }
  }

  // Mobile hamburger nav only
  const navs = document.querySelectorAll('.site-nav');

  navs.forEach((mobileNav) => {
    if (mobileNav.dataset.commonNavReady === "true") return;
    mobileNav.dataset.commonNavReady = "true";

    mobileNav.addEventListener('click', (e) => {
      if (!isMobile()) return;

      const clickedInstagram = e.target.closest('[aria-label="Instagram"]');
      const clickedLink = e.target.closest('a');

      const rect = mobileNav.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      // 閉じている時：右端のハンバーガー領域を押した時だけ開く
      if (!mobileNav.classList.contains('is-open')) {
        const hamburgerZone = x >= rect.right - 48 && x <= rect.right + 8 && y >= rect.top - 8 && y <= rect.bottom + 8;

        if (hamburgerZone && !clickedInstagram) {
          mobileNav.classList.add('is-open');
          e.preventDefault();
        }

        return;
      }

      // 開いている時：右上の×領域で閉じる
      const isCloseButton = x > (window.innerWidth - 70) && y < 70;
      if (isCloseButton) {
        mobileNav.classList.remove('is-open');
        e.preventDefault();
        return;
      }

      // 開いている時：リンクを押したら遷移は止めずに閉じる
      if (clickedLink) {
        setTimeout(() => {
          mobileNav.classList.remove('is-open');
        }, 120);
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
