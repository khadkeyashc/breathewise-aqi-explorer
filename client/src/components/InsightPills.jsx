function getInsights(categoryCode) {
  if (!categoryCode) {
    return ['No specific advice available.'];
  }

  if (categoryCode === 'good') {
    return [
      'Great time for outdoor workouts.',
      'Keep windows open to let fresh air in.'
    ];
  }

  if (categoryCode === 'moderate') {
    return [
      'Outdoor activities are fine for most people.',
      'Sensitive groups should monitor symptoms.'
    ];
  }

  if (categoryCode === 'unhealthy-sensitive') {
    return [
      'Sensitive groups: shorten outdoor exposure.',
      'Consider a mask during long outdoor trips.'
    ];
  }

  if (categoryCode === 'unhealthy') {
    return [
      'Limit prolonged outdoor exercise.',
      'Close windows near high-traffic roads.'
    ];
  }

  if (categoryCode === 'very-unhealthy') {
    return [
      'Avoid outdoor activities where possible.',
      'Use air purifiers indoors if available.'
    ];
  }

  if (categoryCode === 'hazardous') {
    return [
      'Stay indoors and avoid all outdoor exertion.',
      'Follow local health advisories closely.'
    ];
  }

  return ['No specific advice available.'];
}

function InsightPills({ category }) {
  const insights = getInsights(category && category.code);

  return (
    <div className="insight-pills">
      {insights.map((text, index) => (
        <span key={index} className="insight-pill">
          {text}
        </span>
      ))}
    </div>
  );
}

export default InsightPills;
