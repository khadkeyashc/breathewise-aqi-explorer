import { useState } from 'react';
import SearchPanel from './components/SearchPanel.jsx';
import CitySummary from './components/CitySummary.jsx';
import InsightPills from './components/InsightPills.jsx';
import PollutantGrid from './components/PollutantGrid.jsx';
import AqiGauge from './components/AqiGauge.jsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [query, setQuery] = useState('');
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [lastSearched, setLastSearched] = useState([]);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    setStatus('');
    setLoading(true);
    try {
      const url = `${API_BASE}/city/${encodeURIComponent(trimmed)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.message || 'Something went wrong while fetching AQI.');
        setCityData(null);
      } else {
        setCityData(json);
        setStatus(json.fromCache ? 'Served from cache' : 'Fresh data from WAQI');
        setLastSearched(prev => {
          const name =
            (json.details.city && json.details.city.name) ||
            (json.station && json.station.stationName) ||
            trimmed;
          const next = [name, ...prev.filter(c => c !== name)];
          return next.slice(0, 5);
        });
      }
    } catch (e) {
      setError('Network error. Please check your connection.');
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  const headerCityName =
    cityData &&
    ((cityData.details.city && cityData.details.city.name) ||
      (cityData.station && cityData.station.stationName));

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="brand">
            <div className="brand-logo">
              <div className="brand-logo-inner" />
            </div>
            <div>
              <div className="brand-title">BreatheWise AQI</div>
              <div className="brand-subtitle">
                City air quality console for quick operational checks
              </div>
            </div>
          </div>
          {headerCityName && (
            <div className="header-context">
              <span className="header-dot" />
              <span className="header-label">Live snapshot</span>
              <span className="header-value">{headerCityName}</span>
            </div>
          )}
        </header>

        <SearchPanel
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          loading={loading}
          lastSearched={lastSearched}
        />

        {status && <div className="status-text">{status}</div>}
        {error && <div className="error-text">{error}</div>}

        {cityData && (
          <>
            <div className="layout-grid">
              <div className="card card-primary">
                <CitySummary data={cityData} />
              </div>
              <div className="card card-secondary">
                <div className="card-header">
                  <div>
                    <div className="card-title">AQI gauge</div>
                    <div className="card-subtle">
                      Position of this city on the AQI range
                    </div>
                  </div>
                </div>
                <AqiGauge aqi={cityData.details.aqi} />
              </div>
            </div>

            <div className="layout-grid layout-grid-secondary">
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Pollutants snapshot</div>
                    <div className="card-subtle">
                      Key pollutants measured at the reporting station
                    </div>
                  </div>
                </div>
                <PollutantGrid pollutants={cityData.details.pollutants} />
              </div>
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Activity guidance</div>
                    <div className="card-subtle">
                      Suggestions based on the current AQI band
                    </div>
                  </div>
                </div>
                <InsightPills category={cityData.details.category} />
              </div>
            </div>

            <div className="footer">
              <span>Data courtesy of the World Air Quality Index project (WAQI).</span>
              {cityData.details.city && cityData.details.city.url && (
                <a href={cityData.details.city.url} target="_blank" rel="noreferrer">
                  View source station on waqi.info
                </a>
              )}
            </div>
          </>
        )}

        {!cityData && !error && (
          <div className="empty-state">
            <div className="empty-title">Start with any major city</div>
            <div className="empty-body">
              Use the search above to inspect live AQI, pollutants and activity guidance for
              cities such as Pune, Delhi, Mumbai or London.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
