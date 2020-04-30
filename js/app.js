/* Define Global Variables */
const navigationBar = document.querySelector("#navbar_list");
const existingSections = document.querySelectorAll("section");
const navigationSectionMap = new Map();

const activeClass = "active";
const activeNavClass = "active_nav";

const toTopButton = document.getElementById("to-top");

const visibilityGap = 50;


/* Build navigation bar */
/* Prevents default behaviour for 'a' element and allows smooth scroll to target */
let scrollToSection = function (event) {
    event.preventDefault();

    let href = event.target.hash;
    document.querySelector(href).scrollIntoView({behavior: 'smooth', block: 'center'});
};

/* Using temporary fragment build navigation bar and effectively inject into bar after it's built */
let temporaryFragment = document.createDocumentFragment();
existingSections.forEach((e) => {
    let newNavigationElement = document.createElement("li");
    let newNavigationLink = document.createElement("a");

    newNavigationLink.setAttribute("href", "#" + e.id);
    newNavigationLink.textContent = e.getAttribute("data-nav");

    newNavigationLink.onclick = scrollToSection;

    newNavigationElement.appendChild(newNavigationLink);
    temporaryFragment.appendChild(newNavigationElement);

    navigationSectionMap.set(e, newNavigationLink);
});

navigationBar.appendChild(temporaryFragment);


/* Smart search for active element:
* 1. If first element is visible it's active
* 2. If last element is visible and first not => last is active
* 3. Otherwise look for first element that has positive gap between top of viewport and top of element
*
* Once active element is found - apply active style and remove style from others */
let evaluateActiveSection = () => {
    let sections = existingSections;
    let fullyVisibleSection;

    if (isVisible(sections[0])) {
        fullyVisibleSection = sections[0];
    } else if (isLastFullyVisible(sections[sections.length - 1])) {
        fullyVisibleSection = sections[sections.length - 1];
    } else {
        for (let i = 0; i < sections.length; i++) {
            if (isVisible(sections[i])) {
                fullyVisibleSection = sections[i];
                break;
            }
        }
    }

    if (fullyVisibleSection !== undefined) {
        applyActiveStyle(fullyVisibleSection);

        for (let section of sections) {
            if (section !== fullyVisibleSection) {
                removeActiveStyle(section);
            }
        }
    }
};

let applyActiveStyle = (section) => {
    section.classList.add(activeClass);
    navigationSectionMap.get(section).classList.add(activeNavClass);

};

let removeActiveStyle = (section) => {
    if (section.classList.contains(activeClass)) {
        section.classList.remove(activeClass)
        navigationSectionMap.get(section).classList.remove(activeNavClass);
    }
};

/* Element is considered to be visible if it's top part above middle line
    of the screen and bottom is below the middle line of viewport */
let isVisible = (element) => {
    let boundingClientRect = element.getBoundingClientRect();

    return boundingClientRect.y < window.innerHeight / 2 - visibilityGap
        && boundingClientRect.bottom > window.innerHeight / 2 + visibilityGap;
};

let isLastFullyVisible = (element) => {
    let boundingClientRect = element.getBoundingClientRect();

    return boundingClientRect.y > visibilityGap && window.innerHeight - visibilityGap > boundingClientRect.bottom;
};

/* Re-evaluate active element on loading */
window.addEventListener("DOMContentLoaded", evaluateActiveSection);

/* Show scroll toTop button if user scrolled at least 20px, otherwise hide */
let showToTopButton = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopButton.style.display = "block";
    } else {
        toTopButton.style.display = "none";
    }
};

toTopButton.onclick = () => {
    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
};

window.onscroll = () => {
    evaluateActiveSection();
    showToTopButton();
}

/* Collapsible section, we apply listener to all section_information classes and during event
* change max-height of parent to correspond the height of section_information.
*  We call event at Capture phase to make sure it will be used on section_information. */
const sectionInformation = document.querySelectorAll(".section_information");

sectionInformation.forEach((e) => {
    let collapsingFunction = function (event) {
        let currentTarget = event.currentTarget;
        let parentElement = currentTarget.parentElement;

        if (parentElement.style.maxHeight) {
            parentElement.style.maxHeight = null;
        } else {
            parentElement.style.maxHeight = currentTarget.offsetHeight + "px";
        }
    }

    e.addEventListener("click", collapsingFunction, true);
});