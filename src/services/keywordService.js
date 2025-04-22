// src/services/keywordService.js
import axios from 'axios';

// Remove Google Ads API dependency and use axios
export async function getMockSearchVolume(businessCategory, locationName) {
  try {
    const keywords = generateKeywords(businessCategory, locationName);
    return fallbackToMockData(businessCategory, locationName);
  } catch (error) {
    console.error('Error fetching keyword data:', error);
    return fallbackToMockData(businessCategory, locationName);
  }
}

// Helper functions
function getBaseVolumeForCategory(category) {
  const volumeMap = {
    restaurant: 350,
    retail: 250,
    service: 180,
    healthcare: 220,
    education: 150,
    other: 100
  };
  
  return volumeMap[category] || 100;
}

function generateKeywords(category, location) {
  const templates = [
    `${category} in ${location}`,
    `${location} ${category}`,
    `best ${category} in ${location}`,
    `${category} near me`,
    `${category} ${location} contact`
  ];
  
  const variations = getCategoryVariations(category);
  
  const allKeywords = [];
  variations.forEach(variation => {
    templates.forEach(template => {
      allKeywords.push(template.replace(category, variation));
    });
  });
  
  return allKeywords;
}

function getCategoryVariations(category) {
  const variationMap = {
    restaurant: ['restaurant', 'dining', 'food', 'eatery', 'cafe'],
    retail: ['shop', 'store', 'retail', 'outlet', 'market'],
    service: ['service', 'provider', 'company', 'professional'],
    healthcare: ['hospital', 'clinic', 'doctor', 'healthcare', 'medical'],
    education: ['school', 'college', 'education', 'classes', 'training'],
    other: ['business', 'establishment', 'service']
  };
  
  return variationMap[category] || [category];
}

function fallbackToMockData(category, location) {
  // Keep existing mock data logic as fallback
  const baseVolume = getBaseVolumeForCategory(category);
  const keywords = generateKeywords(category, location);
  
  return {
    totalMonthlySearches: baseVolume * keywords.length,
    keywordBreakdown: keywords.map(keyword => ({
      keyword,
      volume: Math.round(baseVolume * (0.5 + Math.random()))
    })).sort((a, b) => b.volume - a.volume)
  };
}

// Calculate business opportunity metrics
export function calculateOpportunityMetrics(searchVolumeData, competitionCount = 0) {
  const totalSearches = searchVolumeData.totalMonthlySearches;
  const competitionLevel = Math.min(competitionCount / 10, 0.9); // Scale 0-0.9
  const estimatedCTR = 0.15; // 15% for businesses that appear in map pack
  
  const estimatedMonthlyClicks = totalSearches * estimatedCTR;
  const opportunityScore = estimatedMonthlyClicks * (1 - competitionLevel);
  
  return {
    opportunityScore: Math.round(opportunityScore * 10) / 10,
    estimatedMonthlyClicks: Math.round(estimatedMonthlyClicks),
    totalSearchVolume: totalSearches,
    competitionLevel: competitionLevel.toFixed(2),
    potentialCustomers: Math.round(estimatedMonthlyClicks * 0.1) // Conversion rate 10%
  };
}
