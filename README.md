# 🌬️ BreatheWise AQI Explorer

A full-stack Air Quality Index (AQI) Explorer built using **Node.js (Express)** and **React (Vite)**.  
This application allows users to search any city and view real-time AQI, pollutant breakdown, health guidance, and visual gauge indicators.

This project is created as part of the **Finfactor Technologies – Software Engineer Coding Challenge**.

---

## 🚀 Features

### 🔍 City Search
- Search any city globally.
- Real-time AQI fetched via backend from WAQI API.
- Graceful error handling for invalid cities.

### ⚙️ Backend (Node.js + Express)
- Acts as **secure proxy API** (hides WAQI token).
- Normalizes WAQI response for frontend usage.
- **In-memory caching system**:
  - Cache expiry (TTL)
  - Max-size eviction
  - Much faster repeated searches.
- Clean, REST-style architecture.

### 🎨 Frontend (React + Vite)
- Clean, animated, professional dashboard UI.
- AQI gauge visualization.
- Pollutant grid (PM2.5, PM10, O₃, NO₂, SO₂, CO).
- Activity guidance chips based on AQI band.
- Responsive modern design with gradient animation.
- High-performance Vite frontend setup.

---

## 🏛️ Project Structure

breathewise-aqi-explorer/
│
├── server/ # Backend (Node.js)
│ ├── src/
│ │ ├── index.js # Entry file
│ │ ├── cache.js # Cache logic
│ │ ├── apiClient.js # WAQI API caller
│ │ ├── transform.js # Normalize WAQI JSON
│ │ └── routes/
│ │ └── cityRoutes.js # /api/city/:name endpoint
│ ├── package.json
│ └── .env.example
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── App.jsx
│ │ ├── index.css # UI styling + animations
│ │ ├── main.jsx
│ │ └── components/
│ │ ├── SearchPanel.jsx
│ │ ├── CitySummary.jsx
│ │ ├── AqiGauge.jsx
│ │ ├── PollutantGrid.jsx
│ │ ├── InsightPills.jsx
│ │ └── AqiScale.jsx
│ └── package.json

👤 Author
Yash Khadke
Full-Stack Developer (MERN)
GitHub: https://github.com/khadkeyashc

🙏 Acknowledgements
WAQI API – Real-time AQI Data
React + Vite – Frontend engine
Express.js – Backend framework
