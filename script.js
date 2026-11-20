const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isExpanded);
  });

  navLinks.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        skillsSection.classList.add("is-visible");
        skillsObserver.disconnect();
      }
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
  } else {
    skillsSection.classList.add("is-visible");
  }
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const formStatus = document.querySelector("#form-status");
  const fields = [
    { input: document.querySelector("#name"), error: document.querySelector("#name-error"), message: "Please enter your name." },
    { input: document.querySelector("#email"), error: document.querySelector("#email-error"), message: "Enter a valid email address." },
    { input: document.querySelector("#message"), error: document.querySelector("#message-error"), message: "Please add a short note about your project." },
  ];

  fields.forEach(({ input, error }) => {
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      formStatus.textContent = "";
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";
    let firstInvalidField;

    fields.forEach(({ input, error, message }) => {
      const valid = input.value.trim() !== "" && (input.type !== "email" || input.validity.valid);
      input.setAttribute("aria-invalid", String(!valid));
      error.textContent = valid ? "" : message;
      if (!valid && !firstInvalidField) firstInvalidField = input;
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    formStatus.textContent = "Thanks for your note! This demo form is validated, but needs a backend to deliver messages.";
    contactForm.reset();
    fields.forEach(({ input }) => input.removeAttribute("aria-invalid"));
  });
}
