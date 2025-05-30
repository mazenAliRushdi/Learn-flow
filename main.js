document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded and parsed");

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

  const animateCounter = (element, end, duration) => {
    console.log(
      "animateCounter called for:",

      element,

      "end:",

      end,

      "duration:",

      duration
    );

    const start = 0;

    let current = start;

    const increment = Math.ceil((end - start) / (duration / 50));

    const timer = setInterval(() => {
      current += increment;

      element.textContent = formatNumber(
        current,

        end,

        element.getAttribute("data-original-value")
      );

      if (current >= end) {
        clearInterval(timer);

        console.log("Counter finished for:", element);
      }
    }, 50);
  };

  const formatNumber = (num, end, originalValue) => {
    const parsedNum = Math.min(num, end);

    if (originalValue.includes("K")) {
      return Math.floor(parsedNum / 1000) + "K+";
    } else if (originalValue.includes("+")) {
      return parsedNum + "+";
    }

    return parsedNum;
  };

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Hero section is intersecting");

          const statsNumbers = document.querySelectorAll(
            ".hero__stats .stats__number"
          );

          console.log("Found statsNumbers:", statsNumbers);

          statsNumbers.forEach((numberElement) => {
            const originalValue = numberElement.getAttribute(
              "data-original-value"
            );

            const target = parseInt(
              originalValue.replace("+", "").replace("K", "000")
            );

            console.log("Animating:", numberElement, "with target:", target);

            animateCounter(numberElement, target, 2000);

            observer.unobserve(entry.target);
          });
        }
      });
    },

    {
      root: null,

      threshold: 0.6,
    }
  );

  const heroSection = document.querySelector(".hero");

  if (heroSection) {
    console.log("Hero section found:", heroSection);

    statsObserver.observe(heroSection);

    console.log("Stats observer attached to hero section");
  } else {
    console.log("Hero section not found");
  }

  const scrollReveal = ScrollReveal({
    distance: "60px",

    duration: 800,

    easing: "cubic-bezier(0.5, 0, 0, 1)",

    reset: false,
  });

  const featureItems = document.querySelectorAll(".feature__item");

  featureItems.forEach((item, index) => {
    const origin = index % 2 === 0 ? "bottom" : index === 1 ? "left" : "right";

    const delay = (index + 1) * 200;

    scrollReveal.reveal(item, { origin: origin, delay: delay, once: true });

    console.log(
      `Revealing feature item ${
        index + 1
      } with origin: ${origin}, delay: ${delay}, once: true`
    );
  });

  scrollReveal.reveal(".footer__logo", {
    origin: "bottom",

    delay: 200,

    once: true,
  });

  scrollReveal.reveal(".footer__links li", {
    origin: "bottom",

    delay: 400,

    interval: 100,

    once: true,
  });

  scrollReveal.reveal(".footer__copyright", {
    origin: "bottom",

    delay: 600,

    once: true,
  });
});
