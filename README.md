# 🌬️ BreatheWise AQI Explorer

A full-stack Air Quality Index (AQI) Explorer built using **Node.js (Express)** and **React (Vite)**.  
This application allows users to search any city and view real-time AQI, pollutant breakdown, health guidance, and visual gauge indicators.

This project is created as part of the **Finfactor Technologies – Software Engineer** coding challenge.

---

## 🚀 Features

### 🔍 City Search
- Search for any city globally.
- Real-time AQI fetched from WAQI API.
- Error handling for invalid city names.

### ⚙️ Backend (Node.js + Express)
- Acts as a **secure proxy API** for WAQI.
- Keeps WAQI token **hidden**.
- In-memory **caching system**:
  - Cache expiry (TTL)
  - Max-size eviction
  - Faster repeated search responses
- Clean REST API.

### 🎨 Frontend (React + Vite)
- Beautiful, animated UI with a gradient background.
- AQI gauge visualization.
- Pollutant grid (PM2.5, PM10, O₃, NO₂, SO₂, CO).
- Activity guidance chips.
- Responsive dashboard design.
- Professional layout suitable for production.

---

## 🏛️ Project Structure

breathewise-aqi-explorer/
│
├── server/ # Backend (Node.js)
│ ├── src/
│ │ ├── index.js # Server entrypoint
│ │ ├── cache.js # Custom cache module
│ │ ├── apiClient.js # WAQI fetch logic
│ │ ├── transform.js # Transform WAQI response
│ │ └── routes/
│ │ └── cityRoutes.js # /api/city/:name
│ ├── package.json
│ └── .env.example
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── App.jsx
│ │ ├── index.css # Full custom styling & animations
│ │ ├── main.jsx
│ │ └── components/
│ │ ├── SearchPanel.jsx
│ │ ├── CitySummary.jsx
│ │ ├── AqiGauge.jsx
│ │ ├── PollutantGrid.jsx
│ │ ├── InsightPills.jsx
│ │ └── AqiScale.jsx
│ └── package.json

# 🧰 Setup Instructions (Run Locally)

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/khadkeyashc/breathewise-aqi-explorer.git
cd breathewise-aqi-explorer
🌐 Backend Setup (Node.js)
2️⃣ Install Dependencies
cd server
npm install

3️⃣ Create .env File

Create a file at:

server/.env

PORT=5000
WAQI_TOKEN=YOUR_WAQI_TOKEN_HERE
CACHE_TTL_SECONDS=300
CACHE_MAX_ENTRIES=100

4️⃣ Run Backend
npm run dev


Backend runs at:

http://localhost:5000

💻 Frontend Setup (React + Vite)
5️⃣ Install Dependencies
cd ../client
npm install

6️⃣ Create .env File

Create:

client/.env

VITE_API_BASE_URL=http://localhost:5000/api

7️⃣ Run Frontend
npm run dev


Frontend starts at:

http://localhost:5173

🧪 Backend API Endpoints
📌 GET /api/city/:name

Example:

http://localhost:5000/api/city/Pune

Example Response (Simplified)
{
  "fromCache": false,
  "details": {
    "aqi": 232,
    "category": {
      "label": "Very Unhealthy",
      "color": "#a855f7",
      "message": "Health warnings of emergency conditions."
    },
    "dominantPollutant": "PM2.5",
    "pollutants": {
      "pm25": 232,
      "pm10": 138,
      "o3": 61,
      "no2": 198
    },
    "weather": {
      "temperature": 22,
      "humidity": 93,
      "pressure": 945.9,
      "wind": 0.5
    },
    "city": {
      "name": "Shivajinagar, Pune, India",
      "geo": { "lat": 18.523, "lon": 73.841 }
    },
    "time": {
      "localTime": "2025-11-25 12:00",
      "timezone": "+05:30"
    }
  }
}

⚡ Caching Mechanism (Backend)

Your backend uses a custom in-memory cache.

Cache entry example:
{
  "data": { ... },
  "cachedAt": 17325123000
}

Cache rules:

✔ TTL-based expiry (default 300 seconds)

✔ Maximum cache size

✔ LRU-style eviction of oldest entries

✔ fromCache: true flag included in API response

🎨 UI Highlights

Beautiful animated gradient background

Clean dashboard container

AQI gauge visualization

Pollutant cards with hover effects

Activity guidance pills

Fully responsive layout

Color-coded AQI categories:

Good

Moderate

Unhealthy for Sensitive Groups

Unhealthy

Very Unhealthy

Hazardous

🔮 Future Enhancements (Optional)

Add favorites list

Store search history

Add AQI trend chart (24h)

Add global AQI map (Leaflet/Mapbox)

Redis-based caching

Backend rate limiting

Unit tests (backend + frontend)

👤 Author

Yash Khadke
Full-Stack Developer (MERN)
GitHub: https://github.com/khadkeyashc

🙏 Acknowledgements

WAQI API – Real-time AQI Data

React + Vite – Frontend engine

Express.js – Backend framework
