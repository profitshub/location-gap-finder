# Location Gap Finder

A web application that helps identify business opportunities by finding locations that are missing from Google Maps.

## Features

- Detect the user's current location
- Check for existing businesses at the location
- Record business opportunities
- Generate opportunity reports with estimated search volumes and potential customer data
- Export reports as PDF documents

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/location-gap-finder.git
   cd location-gap-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

   Note: You'll need a Google Maps API key with the Places API and Geocoding API enabled.

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser
2. Allow location access when prompted
3. The app will check for existing businesses at your location
4. If no businesses are found, you can record a business opportunity
5. Fill out the business form with relevant details
6. View the opportunity metrics and generate a report

## Development Roadmap

### Phase 1: MVP (Current Implementation)
- Basic location detection
- Google Maps integration
- Business opportunity recording
- Mock keyword data
- PDF report generation

### Phase 2: Enhanced Features
- User accounts and saved opportunities
- Real keyword data integration with SEMrush API
- Competitor analysis
- Improved UI/UX

### Phase 3: Enterprise Version
- Multi-user teams
- Advanced analytics
- Integration with CRM systems
- White-label options

## Technologies Used

- React.js
- Google Maps API
- HTML2PDF.js
- Browser Geolocation API

## License

MIT

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).