document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("[data-barba='container']");
  const namespace = container?.getAttribute("data-barba-namespace");

  if (namespace === "home") {
    initTyped();
  }
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.href === window.location.href) {
      e.preventDefault(); // stop Barba from reloading the same page
    }
  });
});

window.addEventListener("load", () => {
  const img = document.querySelector(".img-box img");
  if (img) {
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
  }
});

function pageTransition() {
  let tl = gsap.timeline();

  tl.to(".transition", {
    duration: .5,
    scaleY: 1,
    transformOrigin: "bottom",
    ease: "power4.inOut",
  });

  tl.to(".transition", {
    duration: .5,
    scaleY: 0,
    transformOrigin: "top",
    ease: "power4.inOut",
    delay: 0.2,
  });
}
function contentAnimation() {
  gsap.from(".container", {
    opacity: 0,
    duration: 1,
    y: 50,
    ease: "power2.out",
  });
}

function delay(n) {
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        done();
      },
      async enter(data) {
        contentAnimation();
        if (data.next.namespace === "home") {
          initTyped(); // ✅ Only run typed.js on home
        }
      },
      async once(data) {
        contentAnimation();
        if (data.next.namespace === "home") {
          initTyped(); // ✅ Run on first load if on home
        }
      },
    },
  ],
});

function initTyped() {
  if (document.querySelector("#element")) {
    new Typed("#element", {
      strings: ["Designer.", "Programmer.", "Web Developer."],
      smartBackspace: true,
      typeSpeed: 50,
      loop: true,
    });
  }
}

function loadPageStyles(namespace) {
  // Remove any existing dynamic style
  document.querySelectorAll("link.page-style").forEach((link) => link.remove());

  // Load the right CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${namespace}.css`; // e.g., home.css or about.css
  link.className = "page-style";
  document.head.appendChild(link);
}
