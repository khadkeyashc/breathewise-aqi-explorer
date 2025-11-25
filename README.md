# 🌬️ BreatheWise AQI Explorer

A modern, full-stack **Air Quality Index (AQI) Explorer** built with **Node.js (Express)** and **React (Vite)**.  
Users can search any global city and instantly view real-time AQI data, pollutant breakdown, weather parameters, and safety guidance — all displayed through a clean, animated UI.


---

## 🔥 Features

### 🔍 **City Search**
- Search any city worldwide  
- Real-time AQI from the WAQI API  
- Smart error handling for invalid or unknown cities  

### ⚙️ **Backend (Node.js + Express)**
- Acts as a **secure proxy API** to hide your WAQI token  
- Normalizes vendor API to clean frontend-friendly JSON  
- **In-Memory Caching System**  
  - Cache expiry (TTL)  
  - Max cache size with eviction  
  - Ultra-fast repeat responses  
- Follows clean REST practices  
- Handles all edge-case conditions gracefully  

### 🎨 **Frontend (React + Vite)**
- Beautiful gradient-animated background  
- Smooth card animations & shadows  
- AQI gauge visualization  
- Pollutant breakdown cards  
- Activity guidance chips  
- Fully responsive layout  
- Professional dashboard-style UI  

---

## 🏛️ Project Structure
``` 
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
│
└── README.md
``` 

# 🧰 Running the Project Locally
4️⃣ Start Backend
npm run dev
Backend runs at:
👉 http://localhost:5000

💻 Frontend Setup (React + Vite)
5️⃣ Install Dependencies
cd ../client
npm install
6️⃣ Create Frontend .env
client/.env
VITE_API_BASE_URL=http://localhost:5000/api
7️⃣ Start Frontend
npm run dev
Frontend runs at:
👉 http://localhost:5173


🎨 UI Highlights
Gradient pastel background with animation
Central dashboard layout with elevation
Large AQI number and category badge
Semi-circle AQI gauge
Pollutant metric cards with units
Health/activity guidance chips
Excellent spacing & typography
Fully responsive

🔮 Future Enhancements
If extended, features may include:
User favorites
Search history
AQI trend charts
Global interactive AQI map
Redis caching
Rate limiting
Dark mode
Unit testing (backend & frontend)

👤 Author
Yash Khadke
Full-Stack Developer (MERN / Node.js / React)
GitHub: https://github.com/khadkeyashc

🙏 Acknowledgements
World Air Quality Index (WAQI) API
React + Vite
Node.js + Express
