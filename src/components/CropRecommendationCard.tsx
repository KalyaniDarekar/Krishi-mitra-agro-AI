import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, DollarSign, TreePine, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CropRecommendationCard = () => {
  const navigate = useNavigate();
  
  const recommendations = [
    {
      name: "Rice (Basmati)",
      yield: "45 quintals/acre",
      profit: 85,
      sustainability: 75,
      season: "Kharif",
      icon: "🌾"
    },
    {
      name: "Cotton",
      yield: "20 quintals/acre", 
      profit: 78,
      sustainability: 65,
      season: "Kharif",
      icon: "☁️"
    },
    {
      name: "Sugarcane",
      yield: "80 tons/acre",
      profit: 92,
      sustainability: 55,
      season: "Year-round",
      icon: "🎋"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          Recommended Crops
        </CardTitle>
        <CardDescription>Top 3 AI-suggested crops for your farm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((crop, index) => (
            <div 
              key={index}
              className="border rounded-lg p-4 hover:shadow-medium transition-all cursor-pointer"
              onClick={() => navigate("/crop-recommendation")}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-2xl mr-2">{crop.icon}</span>
                  <h3 className="font-semibold">{crop.name}</h3>
                </div>
                <Badge variant="secondary">{crop.season}</Badge>
              </div>

              <div className="space-y-3">
                {/* Expected Yield */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expected Yield</p>
                  <p className="text-sm font-medium">{crop.yield}</p>
                </div>

                {/* Profit Margin */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Profit Margin
                    </span>
                    <span className="text-xs font-bold text-harvest">{crop.profit}%</span>
                  </div>
                  <Progress value={crop.profit} className="h-2" />
                </div>

                {/* Sustainability Score */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TreePine className="h-3 w-3" />
                      Sustainability
                    </span>
                    <span className="text-xs font-bold text-primary">{crop.sustainability}%</span>
                  </div>
                  <Progress value={crop.sustainability} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="hero" 
          className="w-full mt-4"
          onClick={() => navigate("/crop-recommendation")}
        >
          View Detailed Analysis
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CropRecommendationCard;