const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../views/index.html"), "utf8");


jest.dontMock("fs");

describe("Main class testing", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        jest.resetModules();
    });

    it("Analysis results are empty by default", () => {
        expect(document.getElementsByClassName("analysis_result").innerHTML).toBe(undefined);
    });

    it("Input is invalid as text field is empty", () => {
        let main = require("../js/main");
        expect(main.isInputInvalid()).toBe(true);
    })

    it("Input is valid as text field is not empty", () => {
        let main = require("../js/main");
        document.querySelector("#target-text").textContent = "This is test that input is valid";
        expect(main.isInputInvalid()).toBe(false);
    })
});

