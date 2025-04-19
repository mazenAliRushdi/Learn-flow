document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded and parsed");

  // Mobile Navigation
  const menuToggle = document.querySelector(".navbar__toggle");
  const mainMenu = document.querySelector(".navbar__menu");

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", () => {
      mainMenu.classList.toggle("active");
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true" || false;
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }
});
