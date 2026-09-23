// Select menu from the about page.
const aboutMenu = document.querySelector(".about__menu");
const mobileMenu = document.querySelector(".MenuMobile");
const mobileMenuLines = mobileMenu.querySelectorAll("span");
mobileMenuLines.forEach(line => line.style = "background: #323232");

// Definition function for checking situation of menu in mobile.
const checkMenuToggle = () => {
    if(mobileMenu.classList.contains("MenuMobile--toggle")){
        aboutMenu.style = "right: 0;";
        setTimeout(() => {
            mobileMenu.style = `
            position: fixed;
            z-index: 6;
            right: 169px;
            top: 10px;
            `;
            mobileMenuLines.forEach(line => line.style = "background: #FFFDD0");
        }, 350)
    }
    else{
        aboutMenu.style = "right: -500px;";
        mobileMenu.style = "position: absolute;";
        mobileMenuLines.forEach(line => line.style = "background: #323232");
    };        
};

// Definition mobile menu handler for about page.
const menuMobileHandler = event => {
    event.preventDefault();

    mobileMenu.classList.toggle("MenuMobile--toggle");
    checkMenuToggle();
};

// Definition function for closing mobile menu when clicking outside of menu panel.
const menuMobileClosingHandler = event => {
    if(!mobileMenu.classList.contains("MenuMobile--toggle")){
        return;
    };

    const clickedInsideMenu = aboutMenu.contains(event.target);
    const clickedMenuButton = mobileMenu.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        mobileMenu.classList.remove("MenuMobile--toggle");
        checkMenuToggle();
    };
};

// Add event to mobile menu of about page.
mobileMenu.addEventListener("click", menuMobileHandler);
document.addEventListener("click", menuMobileClosingHandler);

