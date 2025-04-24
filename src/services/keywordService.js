// src/services/keywordService.js
import axios from 'axios';

export function getKeywordData(businessType, location) {
  // Mock data for now - replace with actual API call later
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
