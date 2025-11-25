const POLLUTANT_INFO = {
  pm25: { label: 'PM2.5', unit: 'µg/m³' },
  pm10: { label: 'PM10', unit: 'µg/m³' },
  o3: { label: 'O₃', unit: 'ppb' },
  no2: { label: 'NO₂', unit: 'ppb' },
  so2: { label: 'SO₂', unit: 'ppb' },
  co: { label: 'CO', unit: 'ppm' }
};

function PollutantGrid({ pollutants }) {
  const entries = Object.entries(POLLUTANT_INFO);

  return (
    <div className="pollutant-grid">
      {entries.map(([key, meta]) => {
        const value = pollutants[key];
        return (
          <div key={key} className="pollutant-card">
            <div className="pollutant-name">{meta.label}</div>
            <div className="pollutant-value">
              {value != null ? value : '—'}
            </div>
            <div className="pollutant-unit">{meta.unit}</div>
          </div>
        );
      })}
    </div>
  );
}

export default PollutantGrid;
