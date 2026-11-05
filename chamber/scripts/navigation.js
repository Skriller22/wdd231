const menuButton = document.querySelector("#hamburger-close");
const menuIcon = menuButton.querySelector("img");
const nav = document.querySelector("#site-nav");

function toggleMenu() {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuIcon.src = isOpen ? "images/menu-close.svg" : "images/menu-open.svg";
}

menuButton.addEventListener("click", toggleMenu);
