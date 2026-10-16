/* ============================================================
   LEGEND PRESET — script.js (macOS Tahoe)
   CARA TUKAR LINK GROUP:
   → Ubah nilai GROUP_LINK di bawah, semua butang ikut.
   ============================================================ */
const GROUP_LINK = "https://chat.whatsapp.com/C8zTy45Ga4wAqZVcz94DAY?s=cl&p=a&mlu=4&ilr=4";

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1) Link group ke semua butang ---------- */
  document.querySelectorAll("[data-wa-link]").forEach((btn) => {
    if (GROUP_LINK) btn.href = GROUP_LINK;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  /* ---------- 2) Menubar: shadow + menu mudah alih ---------- */
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- 3) Jam menubar gaya macOS ---------- */
  const clock = document.getElementById("menuClock");
  function tickClock() {
    if (!clock) return;
    const now = new Date();
    const hari = ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"][now.getDay()];
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    clock.textContent = `${hari} ${h}:${m} ${ap}`;
  }
  tickClock();
  setInterval(tickClock, 20000);

  /* ---------- 4) Refleksi kaca ikut kursor ---------- */
  window.addEventListener(
    "pointermove",
    (e) => {
      const host = e.target.closest(".window");
      if (!host) return;
      const r = host.getBoundingClientRect();
      host.style.setProperty("--mx", e.clientX - r.left + "px");
      host.style.setProperty("--my", e.clientY - r.top + "px");
    },
    { passive: true }
  );

  /* ---------- 5) Ripple pada butang utama ---------- */
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (prefersReducedMotion) return;
      const r = btn.getBoundingClientRect();
      const d = Math.max(r.width, r.height);
      const rip = document.createElement("span");
      rip.className = "ripple";
      rip.style.width = rip.style.height = d + "px";
      const x = typeof e.clientX === "number" ? e.clientX : r.left + r.width / 2;
      const y = typeof e.clientY === "number" ? e.clientY : r.top + r.height / 2;
      rip.style.left = x - r.left - d / 2 + "px";
      rip.style.top = y - r.top - d / 2 + "px";
      btn.appendChild(rip);
      setTimeout(() => rip.remove(), 700);
    });
  });

  /* ---------- 6) Reveal on scroll (stagger) ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  const groupCount = new Map();
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const parent = el.parentElement;
    const idx = groupCount.get(parent) || 0;
    groupCount.set(parent, idx + 1);
    el.style.setProperty("--i", idx);
    io.observe(el);
  });

  /* ---------- 7) Parallax wallpaper ringan ---------- */
  const scene = document.querySelector(".bg-scene");
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (prefersReducedMotion) return;
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true }
  );
  (function loop() {
    cx += (tx - cx) * 0.045;
    cy += (ty - cy) * 0.045;
    if (scene) {
      scene.style.setProperty("--px", cx * 20 + "px");
      scene.style.setProperty("--py", cy * 20 + "px");
    }
    if (!prefersReducedMotion) requestAnimationFrame(loop);
  })();

  /* ---------- 8) FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 9) Status aktif: nav ikut section ---------- */
  const sections = ["beranda", "kelebihan", "peraturan", "cara-join", "faq"];
  const navMap = {};
  document.querySelectorAll("[data-nav]").forEach((a) => (navMap[a.dataset.nav] = a));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        Object.values(navMap).forEach((a) => a.classList.remove("active"));
        if (navMap[id]) navMap[id].classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  /* ---------- 10) Mod prestasi rendah + tahun ---------- */
  const lowPower =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 2);
  if (lowPower) document.documentElement.classList.add("low-power");

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
