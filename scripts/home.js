// Reset the URL and return to the top of the page when the page is manually refreshed.
if (performance.getEntriesByType("navigation")[0]?.type === "reload") {

    history.scrollRestoration = "manual";

    history.replaceState(null, "", window.location.pathname);

    window.scrollTo(0, 0);
}

// -- Globall --
const projectsLink = document.querySelector("#menu__project--toggle");
const contactLink = document.querySelector("#menu__contact--toggle");
const sendLink = projectsLink.href;

const resumesAPI = "https://6ab248975b9b60f39d34816e.mockapi.io/api/v1/resumes";
const contactMeAPI = "https://6ab248975b9b60f39d34816e.mockapi.io/api/v1/ContactMe";

const resumesContainer = document.querySelector(".projects__items");
const contactName = document.querySelector("#name");
const contactEmail = document.querySelector("#email");
const contactMessage = document.querySelector("#message");
const contactSubmit = document.querySelector(".ContactMe__form--btn");

// Select menu from page.
const menu = document.querySelector(".menu");
const mobileMenu = document.querySelector(".MenuMobile");
const mobileMenuLine = mobileMenu.querySelectorAll("span");
mobileMenuLine.forEach(line => line.style = "background: #323232");

const showNotification = (message, icon) => {
    const notificationBox = document.querySelector(".notification");
    notificationBox.querySelector(".notification__message").textContent = message;
    notificationBox.querySelector(".notification__icon").textContent = icon;

    notificationBox.classList.remove("notification--deactivate");
    setTimeout(() => {
        notificationBox.classList.add("notification--deactivate");
    }, 3000);
};

// Definition function for checking situation of menu in mobile.
const checkMenuToggle = () => {
    if (mobileMenu.classList.contains("MenuMobile--toggle")) {
        menu.style = "right: 0;";
        setTimeout(() => {
            mobileMenu.style = `
            position: fixed;
            z-index: 6;
            right: 169px;
            top: 10px;
            `;
            mobileMenuLine.forEach(line => line.style = "background: #FFFDD0");
        }, 350)
    }
    else {
        menu.style = "right: -500px;";
        mobileMenu.style = "position: absolute;";
        mobileMenuLine.forEach(line => line.style = "background: #323232");
    };
};

const contactValidator = () => {
    let contactStatus = false;

    if (
        contactName.value != "" &&
        contactEmail.value != "" &&
        contactMessage.value != ""
    ) {
        contactStatus = true;
    };

    return contactStatus;
};

// Close the mobile menu when a navigation link is clicked
const closeMobileMenu = () => {
    if (!mobileMenu.classList.contains("MenuMobile--toggle")) {
        return;
    };

    mobileMenu.classList.remove("MenuMobile--toggle");
    checkMenuToggle();
};

// Definition mobile menu handler for home page.
const mobileMenuHandler = event => {
    event.preventDefault();

    mobileMenu.classList.toggle("MenuMobile--toggle");
    checkMenuToggle();
};

// Definition function for closing mobile menu when clicking outside of menu panel.
const menuMobileClosingHandler = event => {
    if (!mobileMenu.classList.contains("MenuMobile--toggle")) {
        return;
    };

    const clickedInsideMenu = menu.contains(event.target);
    const clickedMenuButton = mobileMenu.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        mobileMenu.classList.remove("MenuMobile--toggle");
        checkMenuToggle();
    };
};

// Create scroller functions for projects and contact areas.
const scrollToProject = () => {
    const projectSegment = document.querySelector(".projects");
    projectSegment.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};

const scrollToContact = () => {
    const contactMeSegment = document.querySelector(".footer");
    contactMeSegment.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

// Definition contactLink Handler and projectLink Handler for scroll into current segment.
const projectHandler = event => {
    event.preventDefault();

    scrollToProject();
    closeMobileMenu();
};

const contactHandler = event => {
    event.preventDefault();

    scrollToContact();
    closeMobileMenu();
};

const contactSubmitHandler = event => {
    event.preventDefault();
    
    if (contactValidator()) {
        let newContact = {
            "name": contactName.value,
            "email": contactEmail.value,
            "message": contactMessage.value
        };

        fetch(contactMeAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        })
            .then(response => {
                if (response.ok) {
                    showNotification("پیامت با موفقیت ارسال شد! ممنون که با من در ارتباط بودی", "✓");
                    contactName.value = "";
                    contactEmail.value = "";
                    contactMessage.value = "";
                };
            })
            .catch(error => {
                console.log(`Encountered with this error: ${error}`);
            });
    }
    else {
        showNotification("لطفا اطلاعات فرم را کامل وارد کن تا پیامت ارسال بشه", "✕");
    };

};

// Create projects loader function.
const projectsLoader = () => {
    let resumeHtmlData;
    fetch(resumesAPI)
        .then(response => {
            if (!response.ok) {
                console.log("There was a problem with the API response!");
            };
            return response.json();
        })
        .then(resumeDatas => {
            resumeDatas.forEach(resume => {
                resumeHtmlData = `
                <div class="projects__item">
                    <div class="projects__item--image">
                        <img src="imgs/${resume.resumeImage}" alt="Project image"
                            class="project__item--img">
                    </div>
                    <div class="projects__item--details">
                        <h3 class="projects__item--title">${resume.resumeTitle}</h3>
                        <p class="projects__item--description">${resume.resumeCaption}</p>
                        <a href="${resume.resumeLink}" target="_blank" class="projects__item--link">مشاهده پروژه</a>
                    </div>
                </div>
                `;

                resumesContainer.insertAdjacentHTML("beforeend", resumeHtmlData);
            });
        })
        .catch(error => {
            console.log(`Encountered with this error: ${error}`);
        });
};

// Check sended URL for scorll to projects area or contact area.
if (sendLink.includes("status=projects")) {
    scrollToProject();
}

else if (sendLink.includes("status=contact")) {
    scrollToContact();
};

// Call projects loader.
projectsLoader();

// Add events.
projectsLink.addEventListener("click", projectHandler);
contactLink.addEventListener("click", contactHandler);
mobileMenu.addEventListener("click", mobileMenuHandler);
document.addEventListener("click", menuMobileClosingHandler);
contactSubmit.addEventListener("click", contactSubmitHandler);