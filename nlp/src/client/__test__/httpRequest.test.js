import "./setupTests";

const httpRequest = require("../js/httpRequest");

test('Post request returns proper result', async () => {
    const mockSuccessResponse = {
        test: "SomeText"
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await httpRequest.postRequest("/", {})
        .then(data => {
            expect(data).toBe(mockSuccessResponse);
        });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/", expect.any(Object));
})

test('Post request unhappy path', async () => {

    const mockFetchPromise = Promise.reject(new Error("404"));
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(httpRequest.postRequest("/", {})).rejects.toThrow("404");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/", expect.any(Object));
})