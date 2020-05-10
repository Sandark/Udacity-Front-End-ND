/* Openweather API constants */
const units = document.body.querySelector("#units");

/* Fields to be used */
const zipCodeField = document.body.querySelector("#zip");
const feelingsField = document.body.querySelector("#feelings");
const generateButton = document.body.querySelector("#generate");
const currentTemperature = document.body.querySelector("#temp-current");

const recordDate = document.body.querySelector("#date");
const recordTemp = document.body.querySelector("#temp");
const recordFeelings = document.body.querySelector("#content");

/* Base for using HTTP GET and POST requests */
const getData = async (url = "", data = {}) => {
    url += "?";
    Object.keys(data).forEach(key => url += `&${key}=${data[key]}`);

    const response = await fetch(url);

    try {
        return await response.json();
    } catch (e) {
        console.log("error", e);
    }
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
}

generateButton.addEventListener("click", () => {
    if (isInputValid()) {
        zipCodeField.classList.remove("error");

        getData("/weather", {
            zip: zipCodeField.value,
            units: units.options[units.selectedIndex].value
        })
            .then(value => {
                if (value.cod === 200) {
                    currentTemperature.textContent = `${value.main.temp}° ${units.options[units.selectedIndex].getAttribute("data-sign")}`;
                    return true;
                } else {
                    currentTemperature.textContent = "Sorry, but city could not be found";
                }
            })
            .then(temperatureRetrieved => {
                postNewRecordIfTemperatureIsRetrieved(temperatureRetrieved);
            })
    }
});

function postNewRecordIfTemperatureIsRetrieved(temperatureRetrieved) {
    if (temperatureRetrieved === true) {
        postData("/add", {
            temp: currentTemperature.textContent,
            feelings: feelingsField.value
        }).then(response => {
            recordDate.textContent = response.date;
            recordTemp.textContent = response.temp;
            recordFeelings.textContent = response.feelings;
        });
    }
}

function validateFieldContainsData(field) {
    if (field.value.length === 0) {
        field.classList.add("error");
        return false;
    } else {
        field.classList.remove("error");
        return true;
    }
}

function isInputValid() {
    return validateFieldContainsData(zipCodeField) & validateFieldContainsData(feelingsField);
}

const getRecentRecord = () => {
    getData("/record")
        .then(record => {
            if (record.date) {
                recordDate.textContent = record.date;
                recordTemp.textContent = record.temp;
                recordFeelings.textContent = record.feelings;
            } else {
                recordDate.textContent = "";
                recordTemp.textContent = "";
                recordFeelings.textContent = "No recent data found";
            }
        })
}

getRecentRecord();