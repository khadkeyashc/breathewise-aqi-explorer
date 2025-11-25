function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function AqiGauge({ aqi }) {
  const numeric = Number(aqi);
  const safe = Number.isNaN(numeric) ? 0 : clamp(numeric, 0, 400);
  const angle = (safe / 400) * 180 - 90;

  return (
    <div className="gauge-wrapper">
      <div className="gauge">
        <div className="gauge-arc" />
        <div className="gauge-inner" />
        <div
          className="gauge-needle"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
        <div className="gauge-cap" />
        <div className="gauge-label">
          {Number.isNaN(numeric) ? 'No data' : `Position for AQI ${numeric}`}
        </div>
      </div>
    </div>
  );
}

export default AqiGauge;
