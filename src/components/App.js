// src/components/App.js
import React, { useState } from 'react';
import LocationDetector from './LocationDetector';
import BusinessForm from './BusinessForm';
import ReportGenerator from './ReportGenerator';
import { checkForExistingBusinesses, getAddressFromCoordinates } from '../services/googleMapsService';
import { getMockSearchVolume, calculateOpportunityMetrics } from '../services/keywordService';
import { generateReport, createPrintableReport } from '../services/pdfService';
import { storeData, retrieveData } from '../utils/helpers';

function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [opportunityData, setOpportunityData] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [step, setStep] = useState(1); // 1: Detect Location, 2: Check Business, 3: Form, 4: Report
  const [savedOpportunities, setSavedOpportunities] = useState(() => retrieveData('savedOpportunities') || []);

  const handleLocationDetected = async (coords) => {
    setLocation(coords);
    setLoading(true);
    
    try {
      // Get address from coordinates
      const addr = await getAddressFromCoordinates(coords.latitude, coords.longitude);
      setAddress(addr);
      
      // Check for existing businesses
      const nearbyBusinesses = await checkForExistingBusinesses(coords.latitude, coords.longitude);
      setBusinesses(nearbyBusinesses);
      
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessFormSubmit = (data) => {
    setBusinessData(data);
    
    // Extract location name from address for keyword targeting
    const locationName = getLocationNameFromAddress(address);
    
    // Get mock search volume data
    const searchVolumeData = getMockSearchVolume(data.category, locationName);
    setSearchData(searchVolumeData);
    
    // Calculate opportunity metrics
    const opportunityMetrics = calculateOpportunityMetrics(searchVolumeData, businesses.length);
    setOpportunityData(opportunityMetrics);
    
    // Save opportunity to local storage
    const newOpportunity = {
      id: Date.now(),
      businessData: {...data, address},
      searchData: searchVolumeData,
      opportunityData: opportunityMetrics,
      timestamp: new Date().toISOString()
    };
    
    const updatedOpportunities = [...savedOpportunities, newOpportunity];
    setSavedOpportunities(updatedOpportunities);
    storeData('savedOpportunities', updatedOpportunities);
    
    setStep(4);
  };

  const getLocationNameFromAddress = (address) => {
    // Extract city or area name from address
    // This is a simplified version - in a real app, you would use a more robust method
    const parts = address.split(',');
    if (parts.length >= 2) {
      return parts[1].trim();
    }
    return parts[0].trim();
  };

  const handleGenerateReport = () => {
    const reportData = {
      ...businessData,
      address
    };
    
    generateReport(reportData, searchData, opportunityData);
  };

  const handleShowPrintableReport = () => {
    const reportData = {
      ...businessData,
      address
    };
    
    createPrintableReport(reportData, searchData, opportunityData, 'printable-report');
    setShowReport(true);
  };

  const handleDeleteOpportunity = (id) => {
    const updatedOpportunities = savedOpportunities.filter(opp => opp.id !== id);
    setSavedOpportunities(updatedOpportunities);
    storeData('savedOpportunities', updatedOpportunities);
  };

  const handleViewSavedOpportunity = (opportunity) => {
    setBusinessData(opportunity.businessData);
    setSearchData(opportunity.searchData);
    setOpportunityData(opportunity.opportunityData);
    setAddress(opportunity.businessData.address);
    setStep(4);
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <LocationDetector onLocationDetected={handleLocationDetected} />
            
            {savedOpportunities.length > 0 && (
              <div className="saved-opportunities">
                <h2>Saved Opportunities</h2>
                <ul className="opportunity-list">
                  {savedOpportunities.map(opp => (
                    <li key={opp.id} className="opportunity-item">
                      <div className="opportunity-info">
                        <strong>{opp.businessData.name}</strong>
                        <span>{opp.businessData.address}</span>
                        <span>{new Date(opp.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="opportunity-actions">
                        <button onClick={() => handleViewSavedOpportunity(opp)}>View</button>
                        <button onClick={() => handleDeleteOpportunity(opp.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );
      
      case 2:
        return (
          <div className="business-check">
            <h2>Location Check</h2>
            <p><strong>Address:</strong> {address}</p>
            
            {businesses.length > 0 ? (
              <div>
                <p>Found {businesses.length} businesses at this location:</p>
                <ul>
                  {businesses.map((business, index) => (
                    <li key={index}>{business.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="opportunity-alert">
                <p>No businesses found on Google Maps at this location!</p>
                <p>This looks like a business opportunity.</p>
              </div>
            )}
            
            <button 
              onClick={() => setStep(3)} 
              className="next-button"
            >
              Record Business Opportunity
            </button>
            <button 
              onClick={() => setStep(1)} 
              className="back-button"
            >
              Back to Location Detection
            </button>
          </div>
        );
      
      case 3:
        return (
          <>
            <BusinessForm 
              location={location} 
              onSubmit={handleBusinessFormSubmit} 
            />
            <button 
              onClick={() => setStep(2)} 
              className="back-button"
            >
              Back to Location Check
            </button>
          </>
        );
      
      case 4:
        return (
          <div className="opportunity-summary">
            <h2>Business Opportunity Summary</h2>
            <p><strong>Business Name:</strong> {businessData.name}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Category:</strong> {businessData.category}</p>
            
            <div className="metrics">
              <div className="metric-box">
                <h3>Monthly Searches</h3>
                <p className="metric-value">{searchData.totalMonthlySearches}</p>
              </div>
              
              <div className="metric-box">
                <h3>Potential Clicks</h3>
                <p className="metric-value">{opportunityData.estimatedMonthlyClicks}</p>
              </div>
              
              <div className="metric-box">
                <h3>Potential Customers</h3>
                <p className="metric-value">{opportunityData.potentialCustomers}</p>
              </div>
            </div>
            
            <h3>Top Keywords</h3>
            <ul className="keyword-list">
              {searchData.keywordBreakdown.slice(0, 5).map((kw, index) => (
                <li key={index}>
                  <span>{kw.keyword}</span>
                  <span className="keyword-volume">{kw.volume}/mo</span>
                </li>
              ))}
            </ul>
            
            <ReportGenerator 
              businessData={{...businessData, address}} 
              searchData={searchData} 
              opportunityData={opportunityData} 
            />
            
            <div className="actions">
              <button onClick={handleGenerateReport} className="action-button">
                Generate PDF Report
              </button>
              <button onClick={handleShowPrintableReport} className="action-button">
                Show Printable Report
              </button>
              <button onClick={() => setStep(1)} className="action-button secondary">
                Start Over
              </button>
            </div>
            
            {showReport && (
              <div className="report-container">
                <div id="printable-report"></div>
                <button onClick={() => window.print()} className="print-button">
                  Print Report
                </button>
              </div>
            )}
          </div>
        );
      
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Location Gap Finder</h1>
        <p>Find businesses missing from Google Maps</p>
      </header>
      
      <main className="app-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          renderStepContent()
        )}
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 Location Gap Finder</p>
      </footer>
    </div>
  );
}

export default App;