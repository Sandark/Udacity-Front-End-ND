const textField = document.querySelector("#target-text");
const submitText = document.querySelector("#submit-text");
const analysisResult = document.querySelector("#analysis-result");

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

submitText.addEventListener("click", evt => {
    postRequest("/analyse", {text: textField.value})
        .then(res => {
            if (res.error === null || res.error === undefined) {
                analysisResult.textContent = `${res.polarity} and ${res.subjectivity}`
            } else {
                analysisResult.textContent = `${res.error}`
            }
        })
})
