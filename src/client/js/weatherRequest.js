const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "api key";

const results = document.querySelector("#results")

export function requestWeather() {

    let url = new URL(baseUrl);
    const params = {
        q: "Tallinn",
        units: "metric",
        appid: apiKey
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
        .then(res => res.json())
        .then(res => {
            results.textContent = `Weather in Tallinn: ${res.main.temp}° C`;
        })
}