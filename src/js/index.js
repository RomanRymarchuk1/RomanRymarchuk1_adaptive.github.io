const menuBtn = document.querySelector(".heder__nav-btn");
const mobileMenu = document.querySelector(".header__nav-list--mobile");
const passivSvg = document.querySelector(".heder__btn-svg");
const activeSvg = document.querySelector(".heder__btn-svg--active");
let menuOpen = false;

menuBtn.addEventListener("click", (e) => {
  if (!menuOpen) {
    menuOpen = true;
    mobileMenu.classList.remove("none");
    passivSvg.classList.add("none");
    activeSvg.classList.remove("none");
  } else {
    menuOpen = false;
    mobileMenu.classList.add("none");
    passivSvg.classList.remove("none");
    activeSvg.classList.add("none");
  }
});
