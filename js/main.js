const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const year = document.getElementById("year");
const form = document.querySelector(".contact-form");
const statusEl = document.querySelector(".form-status");

if (year) year.textContent = new Date().getFullYear();

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const closeMenu = () => {
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Öppna meny");
  nav?.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Öppna meny" : "Stäng meny");
  nav?.classList.toggle("is-open", !open);
  document.body.classList.toggle("nav-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const company = String(data.get("company") || "").trim();
  const message = String(data.get("message") || "").trim();

  const body = [
    `Namn: ${name}`,
    `E-post: ${email}`,
    company ? `Företag: ${company}` : "",
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const mailto = `mailto:kontakt@fputs.se?subject=${encodeURIComponent(
    "ForsbergX — starta projekt"
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  form.reset();
  if (statusEl) {
    statusEl.hidden = false;
    statusEl.textContent = "Tack. Öppna mailet som kommer upp — eller ring 079-346 39 64.";
  }
});
