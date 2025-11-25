function SearchPanel({ query, setQuery, onSearch, loading, lastSearched }) {
  const handleKey = e => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="card search-panel">
      <div className="card-header">
        <div>
          <div className="card-title">Search by city</div>
          <div className="card-subtle">Type a city name to get real-time AQI</div>
        </div>
      </div>
      <div className="search-row">
        <input
          className="search-input"
          placeholder="e.g. Pune, Mumbai, Delhi, London..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className="search-button"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? 'Searching…' : 'Search'}
          {!loading && <span>↵</span>}
        </button>
      </div>
      <div className="search-meta">
        <span className="chip-pill">Powered by WAQI API</span>
        {lastSearched.length > 0 && (
          <span>
            Recent:{' '}
            {lastSearched.join(' • ')}
          </span>
        )}
      </div>
    </div>
  );
}

export default SearchPanel;
