const postRequest = async function (url, load) {

    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(load)
    });

    return await response.json();
}

export {
    postRequest
}