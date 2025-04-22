// src/components/ReportGenerator.js
import React, { useState } from 'react';
import { generateReport } from '../services/pdfService';
import { formatNumber } from '../utils/helpers';

function ReportGenerator({ businessData, searchData, opportunityData }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await generateReport(businessData, searchData, opportunityData);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="report-generator">
      <h2>Report Generator</h2>
      <p>Generate a detailed report of this business opportunity.</p>
      
      <div className="report-actions">
        <button 
          onClick={handleGenerateReport} 
          className="action-button"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate PDF Report'}
        </button>
        
        <button 
          onClick={handleTogglePreview} 
          className="action-button secondary"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>
      
      {showPreview && (
        <div className="report-preview">
          <h3>Report Preview</h3>
          
          <div className="report-section">
            <h4>Business Information</h4>
            <p><strong>Business Name:</strong> {businessData.name}</p>
            <p><strong>Category:</strong> {businessData.category}</p>
            <p><strong>Address:</strong> {businessData.address}</p>
            <p><strong>Contact:</strong> {businessData.contactPerson}</p>
          </div>
          
          <div className="report-section">
            <h4>Market Opportunity</h4>
            <p><strong>Monthly Searches:</strong> {formatNumber(searchData.totalMonthlySearches)}</p>
            <p><strong>Potential Clicks:</strong> {formatNumber(opportunityData.estimatedMonthlyClicks)}</p>
            <p><strong>Estimated New Customers:</strong> {formatNumber(opportunityData.potentialCustomers)}</p>
            <p><strong>Opportunity Score:</strong> {opportunityData.opportunityScore}/10</p>
          </div>
          
          <div className="report-section">
            <h4>Top Keywords</h4>
            <table className="keyword-table">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Monthly Volume</th>
                </tr>
              </thead>
              <tbody>
                {searchData.keywordBreakdown.slice(0, 5).map((keyword, index) => (
                  <tr key={index}>
                    <td>{keyword.keyword}</td>
                    <td>{formatNumber(keyword.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="report-section">
            <h4>Recommendations</h4>
            <ul>
              <li>Create a Google My Business listing for your business</li>
              <li>Optimize your listing with high-quality photos and complete information</li>
              <li>Encourage customers to leave positive reviews</li>
              <li>Create a simple website optimized for the top keywords</li>
              <li>Monitor your local search rankings and adjust strategy as needed</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportGenerator;