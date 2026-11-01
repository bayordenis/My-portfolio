// =========================================================
// Denis Bayor — Portfolio interactions
// =========================================================
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Header shadow on scroll ----------
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Mobile navigation ----------
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // ---------- Highlight the nav link for the section in view ----------
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }

  // ---------- Project filtering ----------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const emptyState = document.querySelector(".empty-state");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      let visibleCount = 0;
      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) {
          visibleCount++;
          card.classList.add("visible"); // make sure revealed cards are not left transparent
        }
      });

      emptyState.hidden = visibleCount > 0;
    });
  });

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ---------- Contact form ----------
  const form = document.getElementById("contact-form");
  const status = form.querySelector(".form-status");
  const emailLink = document.getElementById("email-link");
  const myEmail = emailLink ? emailLink.getAttribute("href").replace("mailto:", "") : "";
  const formspreeReady = !form.action.includes("YOUR_FORM_ID");

  const showStatus = (msg, type) => {
    status.textContent = msg;
    status.className = `form-status ${type || ""}`;
  };

  const validate = () => {
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.type === "email"
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())
        : field.value.trim().length > 0;
      field.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok) valid = false;
    });
    return valid;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) {
      showStatus("Please fill in your name, a valid email and a message.", "err");
      form.querySelector(".invalid").focus();
      return;
    }

    const data = new FormData(form);

    // Fallback: no Formspree ID yet → open the visitor's email app with the message filled in
    if (!formspreeReady) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
      showStatus("Opening your email app…", "ok");
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    showStatus("Sending…");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      showStatus("Thanks! Your message has been sent — I'll get back to you soon.", "ok");
    } catch (err) {
      showStatus(`Something went wrong. Please email me directly at ${myEmail}.`, "err");
    } finally {
      submitBtn.disabled = false;
    }
  });

  form.querySelectorAll("input, textarea").forEach((field) =>
    field.addEventListener("input", () => {
      field.classList.remove("invalid");
      field.removeAttribute("aria-invalid");
    })
  );
});
