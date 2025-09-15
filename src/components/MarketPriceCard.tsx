import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketPriceCard = () => {
  const navigate = useNavigate();
  
  const marketPrices = [
    { crop: "Wheat", price: "₹2,250/quintal", change: 5, trend: "up" },
    { crop: "Rice", price: "₹3,100/quintal", change: -2, trend: "down" },
    { crop: "Cotton", price: "₹8,500/quintal", change: 12, trend: "up" },
    { crop: "Sugarcane", price: "₹350/quintal", change: 3, trend: "up" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-harvest" />
          Market Prices
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Nearest Mandi: Ludhiana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketPrices.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-sm">{item.crop}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.price}</span>
                <Badge 
                  variant={item.trend === "up" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {item.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="harvest" 
          className="w-full mt-4"
          onClick={() => navigate("/market-prices")}
        >
          View Full Market Analysis
        </Button>
      </CardContent>
    </Card>
  );
};

export default MarketPriceCard;