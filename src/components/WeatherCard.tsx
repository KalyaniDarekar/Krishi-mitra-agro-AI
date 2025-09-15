import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Sun, Wind, Droplets, ThermometerSun } from "lucide-react";

const WeatherCard = () => {
  const weekForecast = [
    { day: "Mon", temp: 28, condition: "sunny", icon: Sun, rain: 0 },
    { day: "Tue", temp: 26, condition: "cloudy", icon: Cloud, rain: 20 },
    { day: "Wed", temp: 24, condition: "rainy", icon: CloudRain, rain: 80 },
    { day: "Thu", temp: 25, condition: "rainy", icon: CloudRain, rain: 70 },
    { day: "Fri", temp: 27, condition: "cloudy", icon: Cloud, rain: 30 },
    { day: "Sat", temp: 29, condition: "sunny", icon: Sun, rain: 5 },
    { day: "Sun", temp: 30, condition: "sunny", icon: Sun, rain: 0 }
  ];

  const currentWeather = {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-sky" />
          Weather Forecast
        </CardTitle>
        <CardDescription>7-day forecast for your region</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="bg-gradient-sky rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center text-sky-foreground">
            <div>
              <p className="text-3xl font-bold">{currentWeather.temp}°C</p>
              <p className="text-sm">{currentWeather.condition}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm">
                <Droplets className="h-4 w-4" />
                <span>{currentWeather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wind className="h-4 w-4" />
                <span>{currentWeather.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Week Forecast */}
        <div className="grid grid-cols-7 gap-2">
          {weekForecast.map((day, index) => (
            <div 
              key={index} 
              className={`text-center p-2 rounded-lg ${
                day.rain > 60 ? 'bg-destructive/10' : 'bg-muted'
              }`}
            >
              <p className="text-xs font-medium mb-1">{day.day}</p>
              <day.icon className={`h-6 w-6 mx-auto mb-1 ${
                day.rain > 60 ? 'text-destructive' : 'text-sky'
              }`} />
              <p className="text-sm font-bold">{day.temp}°</p>
              {day.rain > 0 && (
                <p className="text-xs text-muted-foreground">{day.rain}%</p>
              )}
            </div>
          ))}
        </div>

        {/* Weather Alert */}
        {weekForecast.some(day => day.rain > 60) && (
          <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
            <p className="text-sm font-medium text-destructive">
              ⚠️ Heavy rainfall expected. Take precautions for your crops.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;