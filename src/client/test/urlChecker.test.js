const urlChecker = require("../js/urlChecker");

test("Valid URL passes", () => {
    expect(urlChecker.validUrl("https://google.com/")).toBe(true);
    expect(urlChecker.validUrl("https://facebook.com/dasdas/asda/sdasd")).toBe(true);
    expect(urlChecker.validUrl("https://abc.org/adsdasd?73345dsa")).toBe(true);
    expect(urlChecker.validUrl("https://en.wikipedia.org/wiki/ICE_3")).toBe(true);
    expect(urlChecker.validUrl("https://github.com/Sandark")).toBe(true);
})

test("Should fail for plain string", () => {
    expect(urlChecker.validUrl("123")).toBe(false);
    expect(urlChecker.validUrl("gsdfgsdfgdsfgdsf")).toBe(false);
    expect(urlChecker.validUrl("55-55-55-55")).toBe(false);
    expect(urlChecker.validUrl("\n")).toBe(false);
    expect(urlChecker.validUrl("\\\\\\\\\\")).toBe(false);
    expect(urlChecker.validUrl("129,331das0-, v'zc/zx0f,i")).toBe(false);
    expect(urlChecker.validUrl("https://sdfasdp.ppppppppppp")).toBe(false);
    expect(urlChecker.validUrl("https://sdfasdp.ppppppppppp")).toBe(false);
    expect(urlChecker.validUrl("magnet:?xt=urn:adsd:cxx")).toBe(false);
})