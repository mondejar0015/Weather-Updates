const apiKey = "af97bc9cb67d4730a0f61239241908";

async function getWeather() {
  const cityName = document.getElementById("city").value;
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

    updateWeatherInfo(data);
  } catch (error) {
    console.error("Unable to retrieve weather data:", error);
  }
}

function updateWeatherInfo(data) {
  const current = data.current;
  const forecast = data.forecast.forecastday;

  const tempDiv = document.getElementById("temp-div");
  tempDiv.innerHTML = `<p>${current.temp_c}°C</p>`;

  const weatherIcon = document.getElementById("weather-icon");
  const iconUrl = `https:${current.condition.icon}`;
  weatherIcon.src = iconUrl;

  weatherIcon.onload = () => {
    weatherIcon.style.display = "block";
  };
  weatherIcon.onerror = () => {
    weatherIcon.style.display = "none";
    console.error("Failed to load weather icon:", iconUrl);
  };

  document.getElementById("weather-info").innerText = current.condition.text;

  const hourlyForecast = forecast[0].hour;
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  if (hourlyForecastDiv) {
    z;
    hourlyForecastDiv.innerHTML = "";
    hourlyForecast.forEach((hour) => {
      const hourItem = document.createElement("div");
      hourItem.className = "hourly-item";

      const time = document.createElement("p");
      time.innerText = hour.time.split(" ")[1];
      hourItem.appendChild(time);

      const icon = document.createElement("img");
      icon.src = `https:${hour.condition.icon}`;
      icon.alt = hour.condition.text;
      icon.onload = () => {
        icon.style.display = "block";
      };
      icon.onerror = () => {
        icon.style.display = "none";
        console.error("Failed to load hourly icon:", icon.src);
      };
      hourItem.appendChild(icon);

      const temp = document.createElement("p");
      temp.innerText = `${hour.temp_c}°C`;
      hourItem.appendChild(temp);

      hourlyForecastDiv.appendChild(hourItem);
    });
  }

  const sevenDayForecast = document.getElementById("seven-day-forecast");
  sevenDayForecast.innerHTML = "";

  forecast.forEach((day) => {
    const dayItem = document.createElement("div");
    dayItem.className = "day-item";

    const dayDate = new Date(day.date);
    const dateStr = `${dayDate.getDate()}/${dayDate.getMonth() + 1}`;
    const dateElem = document.createElement("p");
    dateElem.innerText = dateStr;
    dayItem.appendChild(dateElem);

    const icon = document.createElement("img");
    icon.src = `https:${day.day.condition.icon}`;
    icon.alt = day.day.condition.text;
    icon.onload = () => {
      icon.style.display = "block";
    };
    icon.onerror = () => {
      icon.style.display = "none";
      console.error("Failed to load daily icon:", icon.src);
    };
    dayItem.appendChild(icon);

    const temp = document.createElement("p");
    temp.innerText = `${day.day.avgtemp_c}°C`;
    dayItem.appendChild(temp);

    sevenDayForecast.appendChild(dayItem);
  });
}
