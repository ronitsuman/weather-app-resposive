const apiKey = "24b98085e2f3788547f5147fd65435af"; // Replace with your OpenWeatherMap API key
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

// Elements to update
const weatherImage = document.querySelector(".weather-result-img img");
const temperature = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humi");
const windSpeed = document.querySelector(".airtext");

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            return new Error("City not found");
        }

        const data = await response.json();

        // Update the elements with weather data
        cityName.textContent = data.name;
        temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;

        // Update the weather image based on conditions
        const weatherCondition = data.weather[0].main;
        if (weatherCondition === "Clear") {
            weatherImage.src = "img/clear.png";
        } else if (weatherCondition === "Rain") {
            weatherImage.src = "img/rain.png";
        } else if (weatherCondition === "Snow") {
            weatherImage.src = "img/snow.png";
        } else if (weatherCondition === "Clouds") {
            weatherImage.src = "img/clouds.png";
        } else {
            weatherImage.src = "img/mist.png";
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Event listener on search button
searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

// Optional: Press 'Enter' to search
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});
