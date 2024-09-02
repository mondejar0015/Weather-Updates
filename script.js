document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "ce7115ea75e84213998121625242408";
    let cityName = "Cagayan De Oro";
  
    async function fetchWeather(city) {
      document.getElementById("weather-info").innerHTML =
        "<p>Loading weather data...</p>"; // Display loading message
  
      const apiEndpoint =
        "https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}";
  
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("City not found");
        const weatherData = await response.json();
        console.log(weatherData);
        const temperatureInCelsius = weatherData.current.temp_c;
        const weatherDescription = weatherData.current.condition.text;
        const humidityLevel = weatherData.current.humidity;
  
        document.getElementById("weather-info").innerHTML = `
                  <h2>Weather in ${city}</h2>
                  <p><strong>Temperature:</strong> ${temperatureInCelsius}°C</p>
                  <p><strong>Weather:</strong> ${weatherDescription}</p>
                  <p><strong>Humidity:</strong> ${humidityLevel}%</p>
              `;
      } catch (error) {
        document.getElementById("weather-info").innerHTML = (
          <p>Unable to retrieve weather data: ${error.message}</p>
        );
      }
    }
    fetchWeather(cityName);
  
    document.getElementById("search-btn").addEventListener("click", function () {
      cityName = document.getElementById("city-input").value.trim();
      if (cityName) {
        fetchWeather(cityName);
      } else {
        alert("Please enter a city name.");
      }
    });
  
    document
      .getElementById("city-input")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          cityName = document.getElementById("city-input").value.trim();
          if (cityName) {
            fetchWeather(cityName);
          } else {
            alert("Please enter a city name.");
          }
        }
      });
  });
  