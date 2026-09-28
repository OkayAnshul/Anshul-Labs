/* Anshul Labs — progressive enhancement only.
   The site is fully usable without JavaScript. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Header: add a background once the page has scrolled ----------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile menu ---------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu && header) {
    var setOpen = function (open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (open) {
        menu.removeAttribute("inert");
      } else {
        menu.setAttribute("inert", "");
        if (returnFocus) toggle.focus();
      }
    };

    menu.setAttribute("inert", "");

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false, false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false, true);
      }
    });

    var desktop = window.matchMedia("(min-width: 821px)");
    var onBreakpoint = function (event) {
      if (event.matches) setOpen(false, false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* Reveal on scroll ----------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* Highlight the nav link for the section in view ----------------------- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) {
        linkFor[id] = link;
        sections.push(section);
      }
    });

    var setCurrent = function (id) {
      navLinks.forEach(function (link) {
        link.removeAttribute("aria-current");
      });
      if (id && linkFor[id]) linkFor[id].setAttribute("aria-current", "true");
    };

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    // Clear the highlight when scrolling back up to the hero.
    var hero = document.querySelector(".hero");
    if (hero) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) setCurrent(null);
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 }).observe(hero);
    }
  }
})();
