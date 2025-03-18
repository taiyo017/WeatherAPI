document.getElementById("getWeather").addEventListener("click", () => {
    let city = document.getElementById("city").value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    getWeather(city)
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error}</p>`;
        });
});

function getWeather(city) {
    let apiKey = "d940f78f7a22015b7ad6641267963a25";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found! Please enter a valid city.");
            }
            return response.json();
        })
        .then((data) => {
            return {
                city: data.name,
                temperature: data.main.temp.toFixed(1), 
                description: data.weather[0].description
            };
        });
}

function displayWeather(data) {
    document.getElementById("weatherResult").innerHTML = `
        <h3>${data.city}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Weather: ${data.description}</p>
    `;
}
