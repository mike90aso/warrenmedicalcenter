// Warren Medical Center — mobile nav + Primary Care dropdown accordion
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var dropdownTriggers = document.querySelectorAll(".nav-item.has-dropdown > .nav-link");

  function setNavOpen(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (!open) {
      document.querySelectorAll(".nav-item.is-open").forEach(function (item) {
        item.classList.remove("is-open");
        var btn = item.querySelector(".nav-link");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNavOpen(!document.body.classList.contains("nav-open"));
    });
  }

  dropdownTriggers.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      // On desktop, hover opens the menu; click still toggles for keyboard/touch.
      var item = btn.closest(".nav-item");
      if (!item) return;

      var isMobile = window.matchMedia("(max-width: 980px)").matches;
      if (!isMobile) {
        // Allow keyboard users to toggle; don't navigate away (button has no href).
        var open = !item.classList.contains("is-open");
        document.querySelectorAll(".nav-item.is-open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var otherBtn = other.querySelector(".nav-link");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }

      event.preventDefault();
      var willOpen = !item.classList.contains("is-open");
      document.querySelectorAll(".nav-item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherBtn = other.querySelector(".nav-link");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNavOpen(false);
  });

  // Close mobile menu after choosing a link
  document.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 980px)").matches) {
        setNavOpen(false);
      }
    });
  });
})();
