document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.querySelector("#city").value;
    if (city) {
      // Clear old output
      document.getElementById("weatherResult").innerHTML = "";
      document.getElementById("errorContainer").textContent = "";

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f54679760ed6fb7be4b0294901312679`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          const resultDiv = document.getElementById("weatherResult");
          const celsiusTemp = (data.main.temp - 273.15).toFixed(2) + "°C";
          const description = data.weather[0].description;
          let emoji = "";
          let backgroundColor = "#f0f4f8"; // Default background color
          if (description.includes("cloud")) {
            emoji = "☁️";
            backgroundColor = "#c0c0c0"; // Cloudy background color
          } else if (description.includes("rain")) {
            emoji = "🌧️";
            backgroundColor = "#4682b4"; // Rainy background color
          } else if (description.includes("clear")) {
            emoji = "☀️";
            backgroundColor = "#87ceeb"; // Clear background color
          } else if (description.includes("thunderstorm")) {
            emoji = "⛈️";
            backgroundColor = "#2f4f4f"; // Thunderstorm background color
          } else {
            emoji = "❓";
          }

          resultDiv.innerHTML = `
            <p>City: ${data.name}</p>
            <p>Temperature: ${celsiusTemp}</p>
            <p>Description: ${description} ${emoji}</p>
          `;

          // Change background color
          document.body.style.backgroundColor = backgroundColor;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          document.getElementById("errorContainer").textContent =
            "Something went wrong. Please try again.";
        });
    } else {
      alert("Please enter a city name first.");
    }
  });
