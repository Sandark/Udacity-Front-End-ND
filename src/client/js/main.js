const textField = document.querySelector("#target-text");
const submitText = document.querySelector("#submit-text");
const analysisResult = document.querySelector(".analysis_result");
const clearText = document.querySelector("#clear-text");

const loader = document.createElement("div");
loader.classList.add("loader_spinner");

const analysisContent = document.createElement("div");
analysisContent.classList.add("analysis_content");

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

function showLoadingSpinner() {
    analysisResult.innerHTML = "";
    analysisResult.appendChild(loader);
}

function createAnalysisContent(res) {
    analysisContent.innerHTML = "";

    const tempFragment = document.createDocumentFragment();

    Object.keys(res).forEach(key => {
        const estimation = document.createElement("div");
        estimation.classList.add("analysis_estimation");

        const estimationType = document.createElement("div");
        estimationType.classList.add("analysis_type");
        estimationType.textContent = key;

        const estimationValue = document.createElement("div");
        estimationValue.classList.add("analysis_type_value");
        estimationValue.textContent = res[key];

        estimation.appendChild(estimationType);
        estimation.appendChild(estimationValue);

        tempFragment.appendChild(estimation);
    })

    analysisContent.appendChild(tempFragment);

    return analysisContent;
}

submitText.addEventListener("click", evt => {
    analysisResult.classList.add("visible");
    showLoadingSpinner();

    postRequest("/analyse", {text: textField.value})
        .then(res => {
            let analysisContent = createAnalysisContent(res);

            analysisResult.removeChild(loader);
            analysisResult.appendChild(analysisContent);
        })
})


clearText.addEventListener("click", evt => {
    textField.value = "";
    analysisResult.classList.remove("visible");
    analysisResult.innerHTML = "";
})