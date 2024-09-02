document.addEventListener('DOMContentLoaded', async function() {
    const apiKey = 'ce7115ea75e84213998121625242408';
    const cityName = 'Iligan';
    const apiEndpoint = 'https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}';
 
    try {

        const response = await fetch(apiEndpoint); // Wait for the fetch to complete
        const weatherData = await response.json(); // Wait for the response to be parsed into JSON
 
        const weatherContainer = document.getElementById('weather');
        const temperatureInCelsius = weatherData.current.temp_c;
        const weatherDescription = weatherData.current.condition.text;
        const humidityLevel = weatherData.current.humidity;
 
        weatherData.forecast.forecastday.forEach(element => {
            console.log(element);

        weatherContainer.innerHTML += `
          
        <div class="weather-container">
        <div class="weather-item">
            <img src="https:${element.day.condition.icon}">
        </div>
        <div class="weather-item">
            <span class="label">Current Date:</span>
            <span class="value">${element.date}</span>
        </div>
        <div class="weather-item">
            <span class="label">Weather Information:</span>
            <span class="value">${element.day.condition.text}</span>
        </div>
        <div class="weather-item">
            <span class="label">Temperature:</span>
            <span class="value">${element.day.avgtemp_c}%</span>
        </div>
        <div class="weather-item">
            <span class="label">Humidity:</span>
            <span class="value">${element.day.avghumidity}%</span>
        </div>
    </div>
        
        `;
    });
    } catch (error) {
        const weatherContainer = document.getElementById('weather');
        weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
    }
 });