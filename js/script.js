document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const navbar = document.querySelector(".top-nav");
  const firstVisit = !sessionStorage.getItem("visited");

  function fadeInBodyAndNavbar() {
    document.body.style.opacity = 1;
    if (navbar) navbar.style.opacity = 1;
  }

  if (loader && firstVisit) {
    // Loader แสดงทันที 3 วิ
    if (navbar) navbar.style.opacity = 0;

    setTimeout(() => {
      loader.classList.add("hide"); // fade-out
      setTimeout(() => loader.style.display = "none", 500);

      fadeInBodyAndNavbar();

      // บันทึกว่าผู้ใช้เคยเข้ามาแล้ว
      sessionStorage.setItem("visited", "true");
    }, 500); // 0.5 วินาที
  } else {
    // ครั้งถัดไป ไม่แสดง loader
    if (loader) loader.style.display = "none";
    fadeInBodyAndNavbar();
  }

/* ==============================
        FADE OUT BEFORE PAGE CHANGE
     ============================== */
  document.querySelectorAll("a").forEach(link => {
    if (link.href && link.href.startsWith(window.location.origin)) {
      link.addEventListener("click", e => {
        e.preventDefault();
        const target = link.href;
        document.body.style.opacity = 0;
        setTimeout(() => window.location.href = target, 300);
      });
    }
  });


  /* ================================
        HIGHLIGHT ACTIVE NAV
     ================================ */
  document.querySelectorAll(".top-nav a").forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });


  /* ================================
        AUTO FADE IMAGE CAROUSEL
     ================================ */
  const images = document.querySelectorAll(".carousel-image");
  let currentIndex = 0;
  const intervalTime = 4000;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) img.classList.add("active");
    });
  }

  if (images.length > 0) {
    showImage(currentIndex);

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, intervalTime);
  }

  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
  }


  /* ================================
        TAGLINE TEXT ROTATION
     ================================ */
  const taglineElement = document.querySelector(".tagline");
  const taglines = ["Designed for simplicity.", "Made for creators.", "Crafted with minimalism."];
  let index = 0;

  if (taglineElement) {
    taglineElement.textContent = taglines[index];
    taglineElement.style.opacity = 1;

    setInterval(() => {
      taglineElement.style.opacity = 0;
      setTimeout(() => {
        index = (index + 1) % taglines.length;
        taglineElement.textContent = taglines[index];
        taglineElement.style.opacity = 1;
      }, 600);
    }, 2500);
  }
});
