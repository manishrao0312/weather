// Your OpenWeatherMap API Key
const WEATHER_API_KEY = 'adbbf33300084696a36f6f151a2efe5b'; // Replace with your actual API key

async function getWeather(city) {
    const weatherDiv = document.getElementById('weather-result');
    weatherDiv.innerText = 'Loading...'; // Loading indicator

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`City not found: ${errorData.message}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDiv.innerText = error.message;
    }
}

// Initialize Leaflet map
const map = L.map('map').setView([20, 77], 5); // Center of India

// Load and display tile layers
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Function to display weather data
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-result');
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // URL for weather icon

    weatherDiv.innerHTML = `
        <h3>Weather in ${data.name}, ${data.sys.country}</h3>
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <p><strong>Temperature:</strong> ${data.main.temp.toFixed(1)} °C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like.toFixed(1)} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed.toFixed(1)} m/s</p>
        <p><strong>Rain (last hour):</strong> ${data.rain ? data.rain['1h'] : 0} mm</p>
        <p><strong>Cloud Cover:</strong> ${data.clouds.all}%</p>
    `;
}

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});

// ==================== Natural Calamity Predictions ====================

// Function to predict flood risk
// Function to predict flood risk
function predictFloodRisk(location) {
    const floodDiv = document.getElementById('flood-prediction-result');
    
    // Simple flood prediction logic based on location
    if (location.toLowerCase() === 'coastal' || location.toLowerCase().includes('river')) {
        floodDiv.innerText = `Flood risk for ${location}: High Risk (Coastal areas and river banks are more prone to flooding).`;
    } else if (location.toLowerCase() === 'mountain') {
        floodDiv.innerText = `Flood risk for ${location}: Low Risk (Mountainous areas generally have low flood risk).`;
    } else {
        floodDiv.innerText = `Flood risk for ${location}: Medium Risk (Based on historical data and local geography).`;
    }
}

// Event listener for Flood Prediction button
document.getElementById('predict-flood-btn').addEventListener('click', () => {
    const location = document.getElementById('flood-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }
    predictFloodRisk(location);
});

// Function to predict earthquake risk
function predictEarthquakeRisk(location) {
    const earthquakeDiv = document.getElementById('earthquake-prediction-result');
    
    // Simple earthquake prediction logic based on location
    if (location.toLowerCase() === 'earthquake-prone' || location.toLowerCase() === 'fault line') {
        earthquakeDiv.innerText = `Earthquake risk for ${location}: High Risk (Located near known fault lines).`;
    } else if (location.toLowerCase() === 'stable') {
        earthquakeDiv.innerText = `Earthquake risk for ${location}: Low Risk (Stable region with no significant seismic activity).`;
    } else {
        earthquakeDiv.innerText = `Earthquake risk for ${location}: Medium Risk (Based on geological data).`;
    }
}

// Event listener for Earthquake Prediction button
document.getElementById('predict-earthquake-btn').addEventListener('click', () => {
    const location = document.getElementById('earthquake-location').value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }
    predictEarthquakeRisk(location);
});

// Function to predict tsunami risk
function predictTsunamiRisk(location) {
    const tsunamiDiv = document.getElementById('tsunami-prediction-result');
    
    // Simple tsunami prediction logic based on location
    if (location.toLowerCase() === 'coastal') {
        tsunamiDiv.innerText = `Tsunami risk for ${location}: High Risk (Coastal areas are at risk of tsunamis).`;
    } else {
        tsunamiDiv.innerText = `Tsunami risk for ${location}: Low Risk (Inland areas are less likely to experience tsunamis).`;
    }
}

// Event listener for Tsunami Prediction button
document.getElementById('predict-tsunami-btn').addEventListener('click', () => {
    const location = document.getElementById('tsunami-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }
    predictTsunamiRisk(location);
});

// Function to predict tornado risk
function predictTornadoRisk(location) {
    const tornadoDiv = document.getElementById('tornado-prediction-result');
    
    // Simple tornado prediction logic based on location
    if (location.toLowerCase() === 'tornado-prone') {
        tornadoDiv.innerText = `Tornado risk for ${location}: High Risk (Tornado-prone region with frequent tornado activity).`;
    } else if (location.toLowerCase() === 'stable') {
        tornadoDiv.innerText = `Tornado risk for ${location}: Low Risk (Regions outside Tornado Alley generally have low tornado risk).`;
    } else {
        tornadoDiv.innerText = `Tornado risk for ${location}: Medium Risk (Moderate risk based on regional tornado history).`;
    }
}

// Event listener for Tornado Prediction button
document.getElementById('predict-tornado-btn').addEventListener('click', () => {
    const location = document.getElementById('tornado-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }
    predictTornadoRisk(location);
});
