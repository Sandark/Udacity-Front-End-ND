/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navigationBar = document.querySelector("#navbar_list");
const existingSections = document.querySelectorAll("section");
const navigationSectionMap = new Map();

const gap = 200;


/* Build navigation bar */
let temporaryFragment = document.createDocumentFragment();
existingSections.forEach((e) => {
    let newNavigationElement = document.createElement("li");
    let newNavigationLink = document.createElement("a");

    newNavigationLink.setAttribute("href", "#" + e.id);
    newNavigationLink.textContent = e.getAttribute("data-nav");

    newNavigationElement.appendChild(newNavigationLink);
    temporaryFragment.appendChild(newNavigationElement);

    navigationSectionMap.set(e, newNavigationLink);
});

navigationBar.appendChild(temporaryFragment);


/* Search for first active element */
window.onscroll = function () {
    let section = document.getElementsByTagName("section");
    let foundFirst = false;

    for (let i = 0; i < section.length; i++) {
        let boundingClientRect = section[i].getBoundingClientRect();

        if (boundingClientRect.y > 50 && window.innerHeight - 50 > boundingClientRect.bottom && !foundFirst) {
            section[i].style.cssText = "box-shadow: 0 2px 10px #044f68;"
            navigationSectionMap.get(section[i]).style.background = "#848484";
            foundFirst = true;
        } else {
            section[i].style.cssText = ""
            navigationSectionMap.get(section[i]).style.background = "";
        }
    }
}


