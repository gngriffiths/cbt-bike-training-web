'use strict';

/* ── Mobile Navigation ──────────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const bars = hamburger.querySelectorAll('span');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    });
  });
})();

/* ── Nav Dropdown Toggle ────────────────────────────────────── */
(function () {
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach(function (dd) {
    var toggle = dd.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dd.classList.contains('open');
      dropdowns.forEach(function (d) {
        d.classList.remove('open');
        var t = d.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        dd.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
    // Close when a dropdown link is clicked
    dd.querySelectorAll('.nav-dropdown-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        dd.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('click', function () {
    dropdowns.forEach(function (d) {
      d.classList.remove('open');
      var t = d.querySelector('.nav-dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Navbar Scroll Shadow ───────────────────────────────────── */
(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
})();

/* ── Active Nav Link ────────────────────────────────────────── */
(function () {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.navbar-nav a, .mobile-menu a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (href === path) a.classList.add('active');
  });
  // Mark Courses dropdown toggle active when on a courses page
  document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
    if (dd.querySelector('.nav-dropdown-menu a.active')) {
      var toggle = dd.querySelector('.nav-dropdown-toggle');
      if (toggle) toggle.classList.add('active');
    }
  });
})();

/* ── Auto Update Copyright Year ─────────────────────────────── */
(function () {
  var yearEl = document.getElementById('current-year');
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
})();

/* ── Scroll Fade-Up Animations ──────────────────────────────── */
(function () {
  if (!('IntersectionObserver' in window)) return;

  var els = document.querySelectorAll('.bd-card, .cbt-card, .t-card, .p-card, .tb-item, .fade-up');
  if (!els.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(function (el, i) {
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
    }
    el.style.transitionDelay = (i % 3) * 0.08 + 's';
    observer.observe(el);
  });
})();
