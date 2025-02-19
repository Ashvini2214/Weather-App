// Function to fetch weather data
async function getWeather(city) {
  const apiKey = "9cf50263e9b2b2b0ed8ab11206c656c3"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
          displayWeather(data);
      } else {
          displayError(data.message);
      }
  } catch (error) {
      displayError("Unable to fetch weather data.");
  }
}

// Function to display weather data
function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");

  weatherResult.innerHTML = `
    <p><strong>City:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

// Function to display error messages
function displayError(message) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();

  if (city) {
      getWeather(city);
  } else {
      displayError("Please enter a city name.");
  }
});
