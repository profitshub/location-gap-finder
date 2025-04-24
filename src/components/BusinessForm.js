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
    <div className="business-form">
      <h2>Record Business Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name</label>
          <input
            type="text"
            name="name"
            value={businessData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Business Category</label>
          <select
            name="category"
            value={businessData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Retail Shop">Retail Shop</option>
            <option value="Service Provider">Service Provider</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={businessData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={businessData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={businessData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={businessData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Business Opportunity</button>
      </form>
    </div>
  );
}

export default BusinessForm;