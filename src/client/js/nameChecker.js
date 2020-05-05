function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if (names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

document.querySelector("#submit-button").addEventListener("click", () => {
    alert("It's working!");
})