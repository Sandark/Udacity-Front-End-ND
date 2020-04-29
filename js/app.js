/* Define Global Variables */
const navigationBar = document.querySelector("#navbar_list");
const existingSections = document.querySelectorAll("section");
const navigationSectionMap = new Map();

const visibilityGap = 50;


/* Build navigation bar */
let temporaryFragment = document.createDocumentFragment();
existingSections.forEach((e) => {
    let newNavigationElement = document.createElement("li");
    let newNavigationLink = document.createElement("a");

    newNavigationLink.setAttribute("href", "#" + e.id);
    newNavigationLink.textContent = e.getAttribute("data-nav");

    /* Prevents default behaviour for a element and allows smooth scroll to target */
    newNavigationLink.onclick = (event) => {
        event.preventDefault();

        let href = event.target.hash;
        document.querySelector(href).scrollIntoView({behavior: 'smooth', block: 'center'});
    };

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
    let sections = document.getElementsByTagName("section");
    let fullyVisibleSection;

    if (isFullyVisible(sections[0])) {
        fullyVisibleSection = sections[0];
    } else if (isLastFullyVisible(sections[sections.length - 1])) {
        fullyVisibleSection = sections[sections.length - 1];
    } else {
        for (let i = 0; i < sections.length; i++) {
            if (isFullyVisible(sections[i])) {
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
    section.style.cssText = "box-shadow: 0 2px 10px #044f68;"
    navigationSectionMap.get(section).style.background = "#848484";

}

let removeActiveStyle = (section) => {
    if (section.style.cssText.match("box-shadow")) {
        section.style.cssText = ""
        navigationSectionMap.get(section).style.background = "";
    }
}

let isFullyVisible = (element) => {
    let boundingClientRect = element.getBoundingClientRect();

    return boundingClientRect.y > visibilityGap;
};

let isLastFullyVisible = (element) => {
    let boundingClientRect = element.getBoundingClientRect();

    return boundingClientRect.y > visibilityGap && window.innerHeight - visibilityGap > boundingClientRect.bottom;
}

window.onscroll = evaluateActiveSection;
