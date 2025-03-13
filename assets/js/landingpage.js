// nav js start
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const desktopHomeLink = document.getElementById("desktop-home-link");
  const desktopSubmenu = document.getElementById("desktop-submenu");
  const mobileHomeLink = document.getElementById("mobile-home-link");
  const mobileSubmenu = document.getElementById("mobile-submenu");
  const desktopNavLinks = document.querySelectorAll(
    "#d2c_nav_link_wrapper .nav_link"
  );
  const mobileNavLinks = document.querySelectorAll("#mobile-menu .nav_link");
  const sections = document.querySelectorAll("section");

  const toggleMenu = () => mobileMenu.classList.toggle("hidden");
  const hideMenu = () => mobileMenu.classList.add("hidden");
  const clickOutsideMenu = (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    )
      hideMenu();
  };

  mobileMenuBtn.addEventListener("click", toggleMenu);
  document
    .getElementById("close-drawer-btn")
    .addEventListener("click", hideMenu);
  mobileNavLinks.forEach((link) => link.addEventListener("click", toggleMenu));
  document.body.addEventListener("click", clickOutsideMenu);

  desktopHomeLink.addEventListener("click", () =>
    desktopSubmenu.classList.toggle("hidden")
  );

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest("#desktop-home-link") &&
      !event.target.closest("#desktop-submenu")
    ) {
      desktopSubmenu.classList.add("hidden");
    }
  });

  mobileHomeLink.addEventListener("click", () => {
    mobileSubmenu.classList.toggle("hidden");
    mobileMenu.classList.remove("hidden");
  });

  const activateNavLink = (id) => {
    const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];
    allNavLinks.forEach((navLink) =>
      navLink.classList.toggle(
        "active",
        navLink.getAttribute("href").substring(1) === id
      )
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activateNavLink(entry.target.id);
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  const initialSectionInView = Array.from(sections).find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
  });

  if (initialSectionInView) activateNavLink(initialSectionInView.id);
});

// sticky navbar background color change
function getScrollThreshold() {
  const width = window.innerWidth;

  if (width < 768) {
    // Mobile devices
    return 0;
  } else if (width < 992) {
    // Tablets
    return 0;
  } else {
    // Desktops
    return 0;
  }
}

function setNavbarBackground() {
  const navbar = document.getElementById("navbar");
  const threshold = getScrollThreshold();

  if (window.scrollY > threshold) {
    navbar.style.backgroundColor = "#125b85";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
}

// Set the background color on page load

// Set the background color on scroll
window.addEventListener("scroll", setNavbarBackground);

// Update threshold value on window resize
window.addEventListener("resize", setNavbarBackground);

// nav js end

// video js
document.addEventListener("DOMContentLoaded", function () {
  function playVideo(videoId, thumbnailId, playButtonId) {
    document.getElementById(thumbnailId).style.display = "none";

    document.getElementById(playButtonId).style.display = "none";

    var videoElement = document.getElementById(videoId);

    var videoSrc = videoElement.src;
    var autoplaySrc = videoSrc.includes("?")
      ? videoSrc + "&autoplay=1"
      : videoSrc + "?autoplay=1";

    videoElement.src = autoplaySrc;

    videoElement.style.display = "block";
  }

  document.getElementById("thumbnail1").addEventListener("click", function () {
    playVideo("video1", "thumbnail1", "playButton1");
  });
});

// initialize swiper slider
var swiper = new Swiper(".d2c_testimonial", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 600,
  coverflowEffect: {
    rotate: 50,
    stretch: 20,
    depth: 120,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// company marquee slider
let SwiperTop = new Swiper(".d2c_marquee_slider", {
  slidesPerView: 3,
  spaceBetween: 0,
  centeredSlides: true,
  speed: 6000,
  autoplay: {
    delay: 0,
  },
  loop: true,
  slidesPerView: "auto",
  allowTouchMove: false,
  disableOnInteraction: false,
});

// <!--
//     Template Name: {{ AiHealthX —Tailwind Healthcare Apps Landing Page }}
//     Template URL: {{ https://designtocodes.com/product/aihealthx-tailwind-healthcare-apps-landing-page }}
//     Description: {{ Upgrade your landing page level with AiHealthX—Tailwind Healthcare Apps Landing Page! It delivers a modern, efficient template for healthcare apps. }}
//     Author: DesignToCodes
//     Author URL: https://www.designtocodes.com
//     Text Domain: {{ AiHealthX | App Landing Page }}
//  -->
