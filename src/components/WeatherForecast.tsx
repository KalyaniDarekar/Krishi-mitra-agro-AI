import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm, 
  WiFog,
  WiDayCloudy,
  WiNightClear,
  WiNightCloudy,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiTime1
} from 'react-icons/wi';
import { MapPin, RefreshCw, AlertTriangle } from 'lucide-react';

interface WeatherData {
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avghumidity: number;
        maxwind_kph: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
    }>;
  };
}

interface Location {
  lat: number;
  lon: number;
  name: string;
}

const WeatherForecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location>({ lat: 23.3441, lon: 85.3096, name: 'Ranchi, Jharkhand' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // WeatherAPI.com API key
  const API_KEY = '9f397a31fcff4242bcd183105251409';
  const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json';

  // Get weather icon based on WeatherAPI.com condition text
  const getWeatherIcon = (conditionText: string, size: string = 'text-4xl') => {
    const condition = conditionText.toLowerCase();
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return <WiDaySunny className={size} />;
    } else if (condition.includes('cloudy') || condition.includes('overcast')) {
      return <WiCloudy className={size} />;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return <WiRain className={size} />;
    } else if (condition.includes('thunderstorm') || condition.includes('storm')) {
      return <WiThunderstorm className={size} />;
    } else if (condition.includes('snow')) {
      return <WiSnow className={size} />;
    } else if (condition.includes('fog') || condition.includes('mist')) {
      return <WiFog className={size} />;
    } else {
      return <WiDaySunny className={size} />;
    }
  };

  // Get weather condition text
  const getWeatherCondition = (weather: any) => {
    const conditionMap: { [key: string]: string } = {
      'Clear': 'Clear Sky',
      'Clouds': 'Cloudy',
      'Rain': 'Rainy',
      'Drizzle': 'Light Rain',
      'Thunderstorm': 'Thunderstorm',
      'Snow': 'Snow',
      'Mist': 'Misty',
      'Fog': 'Foggy',
      'Haze': 'Hazy',
    };
    return conditionMap[weather.main] || weather.description;
  };

  // Get day name from timestamp
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Mock data for demonstration when API is not available
  const getMockWeatherData = () => {
    const mockForecast = [];
    const baseTemp = 28;
    const conditions = ['Sunny', 'Cloudy', 'Rain', 'Sunny', 'Cloudy', 'Rain', 'Sunny'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      mockForecast.push({
        date: date.toISOString().split('T')[0],
        day: {
          maxtemp_c: baseTemp + Math.random() * 6 - 3,
          mintemp_c: baseTemp + Math.random() * 4 - 6,
          avghumidity: 60 + Math.random() * 30,
          maxwind_kph: 5 + Math.random() * 10,
          condition: {
            text: conditions[i],
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
          },
          daily_chance_of_rain: Math.random() * 80
        }
      });
    }

    return {
      current: {
        temp_c: baseTemp + Math.random() * 4 - 2,
        humidity: 65 + Math.random() * 20,
        wind_kph: 8 + Math.random() * 8,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
        }
      },
      location: {
        name: 'Ranchi',
        region: 'Jharkhand',
        country: 'India'
      },
      forecast: {
        forecastday: mockForecast
      }
    };
  };

  // Fetch weather data from WeatherAPI.com
  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch real data from WeatherAPI.com
      try {
        const response = await fetch(
          `${WEATHER_API_URL}?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
        );

        if (response.ok) {
          const data = await response.json();
          
          // Update location with actual location from API
          setLocation({
            lat: data.location.lat,
            lon: data.location.lon,
            name: `${data.location.name}, ${data.location.region || data.location.country}`
          });

          setWeatherData(data);
          setLastUpdated(new Date());
          return;
        } else {
          throw new Error(`WeatherAPI error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('WeatherAPI not available, using mock data:', apiError);
      }

      // Fallback to mock data
      const mockData = getMockWeatherData();
      setWeatherData(mockData);
      setLastUpdated(new Date());
      setError('Using demo data. Please check your WeatherAPI.com API key for live weather data.');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get location name
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );
            const locationData = await response.json();
            
            if (locationData.length > 0) {
              const locationName = `${locationData[0].name}, ${locationData[0].state || locationData[0].country}`;
              setLocation({ lat: latitude, lon: longitude, name: locationName });
              await fetchWeatherData(latitude, longitude);
            } else {
              setLocation({ lat: latitude, lon: longitude, name: 'Current Location' });
              await fetchWeatherData(latitude, longitude);
            }
          } catch (err) {
            console.error('Geocoding error:', err);
            setLocation({ lat: latitude, lon: longitude, name: 'Current Location' });
            await fetchWeatherData(latitude, longitude);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default location (Ranchi)
          fetchWeatherData(location.lat, location.lon);
        }
      );
    } else {
      // Fallback to default location if geolocation is not supported
      fetchWeatherData(location.lat, location.lon);
    }
  };

  // Refresh weather data
  const refreshWeather = () => {
    fetchWeatherData(location.lat, location.lon);
  };

  // Load weather data on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Check if there's heavy rainfall expected
  const hasHeavyRainfall = weatherData?.forecast.forecastday.some(day => day.day.daily_chance_of_rain > 60) || false;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WiDaySunny className="h-6 w-6 text-sky-500" />
            Weather Forecast
          </CardTitle>
          <CardDescription>7-day forecast for your region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-sky-500" />
            <span className="ml-2 text-muted-foreground">Loading weather data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WiDaySunny className="h-6 w-6 text-sky-500" />
            Weather Forecast
          </CardTitle>
          <CardDescription>7-day forecast for your region</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error}. Please check your API key and try again.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <button
              onClick={refreshWeather}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <WiDaySunny className="h-6 w-6 text-sky-500" />
              Weather Forecast
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              7-day forecast for {location.name}
            </CardDescription>
          </div>
          <button
            onClick={refreshWeather}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Refresh weather data"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <WiTime1 className="h-3 w-3" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg p-6 mb-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {getWeatherIcon(weatherData.current.condition.text, 'text-5xl')}
                <div>
                  <p className="text-4xl font-bold">{Math.round(weatherData.current.temp_c)}°C</p>
                  <p className="text-lg opacity-90">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <WiHumidity className="h-5 w-5" />
                <span className="text-sm">{weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <WiStrongWind className="h-5 w-5" />
                <span className="text-sm">{Math.round(weatherData.current.wind_kph)} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-4">
          {weatherData.forecast.forecastday.map((day, index) => (
            <div
              key={index}
              className={`text-center p-3 rounded-lg transition-colors ${
                day.day.daily_chance_of_rain > 60 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <div className="mb-2">
                {getWeatherIcon(day.day.condition.text, 'text-3xl')}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold">{Math.round(day.day.maxtemp_c)}°</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(day.day.mintemp_c)}°
                </p>
                {day.day.daily_chance_of_rain > 0 && (
                  <Badge 
                    variant={day.day.daily_chance_of_rain > 60 ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {Math.round(day.day.daily_chance_of_rain)}%
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Demo Data Notice */}
        {error && error.includes('demo data') && (
          <Alert className="mb-4 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Heavy Rainfall Alert */}
        {hasHeavyRainfall && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              ⚠ Heavy rainfall expected. Take precautions for your crops.
            </AlertDescription>
          </Alert>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <WiThermometer className="h-4 w-4" />
            <span>Feels like {Math.round(weatherData.current.temp_c)}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <WiHumidity className="h-4 w-4" />
            <span>Humidity {weatherData.current.humidity}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
