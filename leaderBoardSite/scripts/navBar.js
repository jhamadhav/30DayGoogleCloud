let num = 0;
let isMenuOpen = false;

//variables to store previous and current Yoffset of the window
let prev = window.pageYOffset;
let now;

//event listener when scrolled
window.onscroll = () => {
    now = window.pageYOffset;
    let btn = document.getElementsByTagName("nav")[0];
    let nav = document.getElementsByClassName("nav-links")[0].classList.toString().split(" ")

    if (now > 70 && nav.indexOf("open") == -1) {
        if (now - prev < 0) {
            btn.style.transform = "translateY(0)";
        } else {
            btn.style.transform = "translateY(-70px)";
        }
    }
    if (window.scrollY == 0) {
        btn.style.transform = "translateY(0)";
    }
    prev = window.pageYOffset;
};

const menuOpen = () => {
    anime();
}
const anime = () => {
    document.getElementsByClassName("nav-links")[0].classList.toggle("open");
    document.getElementsByClassName("burger")[0].classList.toggle("menuAnimate");
}
