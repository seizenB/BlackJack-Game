const hamburgerMenu = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburgerMenu.addEventListener("click", () => {
  if (mobileMenu.classList.contains("translate-x-full")) {
    mobileMenu.classList.remove("translate-x-full");
  } else {
    mobileMenu.classList.add("translate-x-full");
  }
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  if (
    targetElement !== hamburgerMenu &&
    !hamburgerMenu.contains(targetElement) &&
    !mobileMenu.contains(targetElement)
  ) {
    mobileMenu.classList.add("translate-x-full");
  }
});

const playButton = document.querySelector("#play-btn");
document.addEventListener("click", () => {
  window.location.href = "play.html";
});
