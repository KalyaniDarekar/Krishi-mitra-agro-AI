# WeatherForecast Component Setup

## Overview
The `WeatherForecast` component provides a comprehensive 7-day weather forecast with live data from OpenWeatherMap API.

## Features
- ✅ 7-day weather forecast with live data
- ✅ Current weather conditions (temperature, humidity, wind speed)
- ✅ Auto-location detection with fallback to Ranchi, Jharkhand
- ✅ Responsive design with TailwindCSS
- ✅ Weather icons using react-icons
- ✅ Heavy rainfall alerts for crop protection
- ✅ Loading and error states
- ✅ Last updated timestamp
- ✅ Refresh functionality

## Setup Instructions

### 1. Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. **Important**: The API key needs to be activated (may take a few minutes)

### 2. Configure API Key
The component is already configured with your API key: `9f397a31fcff4242bcd183105251409`

If you need to change it, update this line in `src/components/WeatherForecast.tsx`:
```typescript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Current Status
✅ **Component is working with LIVE weather data!**
- WeatherAPI.com API is successfully integrated and working
- Real-time weather data for Ranchi, Jharkhand and user's location
- 7-day forecast with accurate temperature, humidity, wind, and rain probability
- All features are fully functional with live data

### 3. Environment Variables (Recommended)
For better security, use environment variables:

1. Create a `.env` file in your project root:
```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

2. Update the component to use the environment variable:
```typescript
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

### 4. Usage
The component is already integrated into the Dashboard. You can also use it anywhere in your app:

```tsx
import WeatherForecast from "@/components/WeatherForecast";

function MyComponent() {
  return (
    <div>
      <WeatherForecast />
    </div>
  );
}
```

## API Requirements
- OpenWeatherMap One Call API 3.0 (free tier)
- Requires latitude/longitude coordinates
- Returns current weather + 7-day forecast

## Default Location
- Falls back to Ranchi, Jharkhand, India (23.3441, 85.3096)
- Auto-detects user location if geolocation is available

## Styling
- Uses TailwindCSS for responsive design
- Gradient background for current weather
- Card-based layout with shadcn/ui components
- Mobile-responsive grid layout

## Error Handling
- Shows loading spinner while fetching data
- Displays error messages for API failures
- Graceful fallback to default location
- Retry functionality

## Weather Alerts
- Shows red alert when rainfall probability > 60%
- Displays "Heavy rainfall expected. Take precautions for your crops."

## Dependencies
- `react-icons` - Weather icons
- `@tanstack/react-query` - Data fetching (optional, can be removed)
- `lucide-react` - UI icons
- `@/components/ui/*` - shadcn/ui components
