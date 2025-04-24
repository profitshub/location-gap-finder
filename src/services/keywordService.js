// src/services/keywordService.js

export function getKeywordData(businessType, location) {
  // Mock data for now
  return {
    totalMonthlySearches: 1500,
    keywordBreakdown: [
      { keyword: `${businessType} near me`, volume: 500 },
      { keyword: `${businessType} in ${location}`, volume: 300 },
      { keyword: `best ${businessType}`, volume: 250 },
      { keyword: `${businessType} reviews`, volume: 200 },
      { keyword: `${businessType} hours`, volume: 150 }
    ]
  };
}

export function getMockSearchVolume(businessType, location) {
  return getKeywordData(businessType, location);
}

export function calculateOpportunityMetrics(searchData, competitorCount) {
  const totalSearches = searchData.totalMonthlySearches;
  const estimatedClickRate = Math.max(0.1, 0.3 - (competitorCount * 0.05));
  const estimatedConversionRate = 0.1;

  return {
    estimatedMonthlyClicks: Math.round(totalSearches * estimatedClickRate),
    potentialCustomers: Math.round(totalSearches * estimatedClickRate * estimatedConversionRate)
  };
}
