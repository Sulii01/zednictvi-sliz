/* Zednictví Sliž – interakce webu */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  // Mobilní menu
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Stín hlavičky po odscrollování
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Aktuální rok a počet let praxe (firma působí od roku 1995)
  var year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });
  document.querySelectorAll("[data-praxe]").forEach(function (el) { el.textContent = year - 1995; });

  // Postupné zobrazování sekcí
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Tlačítko "Zobrazit další fotky"
  document.querySelectorAll(".gallery-more").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var gallery = document.getElementById(btn.getAttribute("aria-controls"));
      gallery.classList.remove("gallery--hidden-more");
      btn.remove();
    });
  });

  // Galerie – lightbox
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  if (links.length) {
    var icon = function (d) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
    };
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Fotogalerie");
    box.innerHTML =
      '<img alt="">' +
      '<button class="lightbox__close" aria-label="Zavřít">' + icon("M6 6l12 12M18 6L6 18") + "</button>" +
      '<button class="lightbox__prev" aria-label="Předchozí fotka">' + icon("M15 18l-6-6 6-6") + "</button>" +
      '<button class="lightbox__next" aria-label="Další fotka">' + icon("M9 6l6 6-6 6") + "</button>" +
      '<div class="lightbox__count"></div>';
    document.body.appendChild(box);

    var img = box.querySelector("img");
    var count = box.querySelector(".lightbox__count");
    var set = [];
    var index = 0;
    var lastFocus = null;

    var show = function (i) {
      index = (i + set.length) % set.length;
      var a = set[index];
      img.src = a.href;
      img.alt = a.querySelector("img").alt;
      count.textContent = (index + 1) + " / " + set.length;
    };
    var open = function (a) {
      // Listujeme jen v rámci jedné galerie
      set = Array.prototype.slice.call(a.closest(".gallery").querySelectorAll("a"));
      lastFocus = a;
      show(set.indexOf(a));
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      box.querySelector(".lightbox__close").focus();
    };
    var close = function () {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      img.src = "";
      if (lastFocus) lastFocus.focus();
    };

    links.forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); open(a); });
    });
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__prev").addEventListener("click", function () { show(index - 1); });
    box.querySelector(".lightbox__next").addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });

    // Swipe na mobilu
    var startX = null;
    box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  // Poptávkový formulář – otevře e-mail s předvyplněnou zprávou
  var form = document.getElementById("poptavka");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body =
        "Jméno: " + d.get("jmeno") + "\n" +
        "Telefon: " + d.get("telefon") + "\n" +
        "Obec: " + d.get("obec") + "\n" +
        "Typ práce: " + d.get("typ") + "\n\n" +
        d.get("zprava");
      window.location.href =
        "mailto:marko.s@seznam.cz?subject=" + encodeURIComponent("Poptávka z webu – " + d.get("typ")) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
