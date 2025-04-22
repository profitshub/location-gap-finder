// src/components/BusinessForm.js
import React, { useState } from 'react';

function BusinessForm({ location, onSubmit }) {
  const [businessData, setBusinessData] = useState({
    name: '',
    category: '',
    contactPerson: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...businessData,
      location,
      timestamp: new Date().toISOString()
    });
  };

  return (
    
      Record Business Opportunity
      
      
        Business Name
        
      
      
      
        Business Category
        
          Select a category
          Restaurant
          Retail Shop
          Service Provider
          Healthcare
          Education
          Other
        
      
      
      
        Contact Person
        
      
      
      
        Phone Number
        
      
      
      
        Email
        
      
      
      
        Notes
        
      
      
      Save Business Opportunity
    
  );
}

export default BusinessForm;
```