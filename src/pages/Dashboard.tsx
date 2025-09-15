import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Droplets, 
  ThermometerSun, 
  Wind,
  Leaf,
  TrendingUp,
  AlertTriangle,
  Camera,
  MessageSquare,
  WifiOff,
  DollarSign,
  BarChart3,
  Calendar,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherForecast from "@/components/WeatherForecast";
import SoilStatusCard from "@/components/SoilStatusCard";
import CropRecommendationCard from "@/components/CropRecommendationCard";
import MarketPriceCard from "@/components/MarketPriceCard";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const farmerData = {
    name: "Rajesh Kumar",
    location: "Punjab",
    farmSize: "5 acres",
    lastCrop: "Wheat"
  };

  const quickActions = [
    {
      icon: Camera,
      label: "Upload Image",
      action: () => navigate("/disease-detection"),
      color: "text-destructive"
    },
    {
      icon: MessageSquare,
      label: "Ask AI Assistant",
      action: () => navigate("/ai-assistant"),
      color: "text-sky"
    },
    {
      icon: DollarSign,
      label: "Check Market Prices",
      action: () => navigate("/market-prices"),
      color: "text-harvest"
    },
    {
      icon: WifiOff,
      label: "Offline Advice",
      action: () => navigate("/offline-support"),
      color: "text-earth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">KrishiMitra AI</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {farmerData.location} • {farmerData.farmSize}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Welcome, {farmerData.name}!
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/")}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 hover:shadow-medium transition-all"
              onClick={action.action}
            >
              <action.icon className={`h-8 w-8 ${action.color}`} />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weather Forecast */}
          <div className="lg:col-span-2">
            <WeatherForecast />
          </div>

          {/* Soil Status */}
          <div>
            <SoilStatusCard />
          </div>

          {/* Crop Recommendations */}
          <div className="lg:col-span-2">
            <CropRecommendationCard />
          </div>

          {/* Market Prices */}
          <div>
            <MarketPriceCard />
          </div>
        </div>

        {/* Alert Section */}
        <Card className="mt-6 border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Important Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="destructive">Weather</Badge>
                <p className="text-sm">Heavy rainfall expected in next 48 hours. Protect your crops.</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary">Market</Badge>
                <p className="text-sm">Wheat prices are expected to rise by 15% next week.</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-primary">Tip</Badge>
                <p className="text-sm">Best time to apply fertilizer is tomorrow morning.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;