const apiKey = "dd062f462720262a28b2297c9a564077";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherIcons = {
  Clear: "clear.png",
  Clouds: "clouds.png",
  Drizzle: "drizzile.png",
  Rain: "rain.png",
  Snow: "snow.png",
  Mist: "mist.png",
  Haze: "mist.png",
  Wind: "wind.png",
};

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherContainer = document.querySelector(".weather");

searchButton.addEventListener("click", function () {
  const city = searchInput.value;
  if (city) {
    getWeather(city);
    searchInput.value = "";
  } else {
    alert("Please enter a city name!");
  }
});

function getWeather(city) {
  const query = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;

  fetch(query)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      updateWeather(data);
      weatherContainer.classList.add("visible"); // Add 'visible' class to show weather container
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("City not found! Please enter a valid city name.");
    });
}

function updateWeather(data) {
  const weatherCondition = data.weather[0].main;
  const iconFileName = weatherIcons[weatherCondition];
  weatherIcon.src = `images/${iconFileName}`;

  tempElement.textContent = `${Math.round(data.main.temp)}°C`;
  cityElement.textContent = data.name;
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${data.wind.speed} km/h`;
}
