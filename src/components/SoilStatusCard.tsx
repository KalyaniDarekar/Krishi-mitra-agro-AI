import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Beaker, Activity } from "lucide-react";

const SoilStatusCard = () => {
  const soilData = {
    pH: { value: 6.8, optimal: [6.0, 7.0], label: "pH Level" },
    moisture: { value: 45, optimal: [40, 60], label: "Moisture" },
    nitrogen: { value: 180, optimal: [150, 250], label: "Nitrogen (kg/ha)" },
    phosphorus: { value: 35, optimal: [30, 50], label: "Phosphorus (kg/ha)" },
    potassium: { value: 220, optimal: [200, 300], label: "Potassium (kg/ha)" }
  };

  const getStatusColor = (value: number, optimal: number[]) => {
    if (value >= optimal[0] && value <= optimal[1]) return "text-primary";
    if (value < optimal[0] * 0.8 || value > optimal[1] * 1.2) return "text-destructive";
    return "text-harvest";
  };

  const getStatusBadge = (value: number, optimal: number[]) => {
    if (value >= optimal[0] && value <= optimal[1]) return { text: "Optimal", variant: "default" as const };
    if (value < optimal[0] * 0.8 || value > optimal[1] * 1.2) return { text: "Critical", variant: "destructive" as const };
    return { text: "Fair", variant: "secondary" as const };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-earth" />
          Soil Status
        </CardTitle>
        <CardDescription>Current soil health metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* pH Level */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm flex items-center gap-1">
              <Beaker className="h-4 w-4 text-muted-foreground" />
              {soilData.pH.label}
            </span>
            <span className={`text-sm font-bold ${getStatusColor(soilData.pH.value, soilData.pH.optimal)}`}>
              {soilData.pH.value}
            </span>
          </div>
          <Progress 
            value={(soilData.pH.value / 14) * 100} 
            className="h-2"
          />
        </div>

        {/* Moisture */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm flex items-center gap-1">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              {soilData.moisture.label}
            </span>
            <span className={`text-sm font-bold ${getStatusColor(soilData.moisture.value, soilData.moisture.optimal)}`}>
              {soilData.moisture.value}%
            </span>
          </div>
          <Progress value={soilData.moisture.value} className="h-2" />
        </div>

        {/* Nutrients */}
        <div className="space-y-2 pt-2 border-t">
          <p className="text-sm font-medium flex items-center gap-1">
            <Leaf className="h-4 w-4 text-primary" />
            Nutrients
          </p>
          
          {/* Nitrogen */}
          <div className="flex justify-between items-center">
            <span className="text-xs">N: {soilData.nitrogen.value} kg/ha</span>
            <Badge variant={getStatusBadge(soilData.nitrogen.value, soilData.nitrogen.optimal).variant}>
              {getStatusBadge(soilData.nitrogen.value, soilData.nitrogen.optimal).text}
            </Badge>
          </div>

          {/* Phosphorus */}
          <div className="flex justify-between items-center">
            <span className="text-xs">P: {soilData.phosphorus.value} kg/ha</span>
            <Badge variant={getStatusBadge(soilData.phosphorus.value, soilData.phosphorus.optimal).variant}>
              {getStatusBadge(soilData.phosphorus.value, soilData.phosphorus.optimal).text}
            </Badge>
          </div>

          {/* Potassium */}
          <div className="flex justify-between items-center">
            <span className="text-xs">K: {soilData.potassium.value} kg/ha</span>
            <Badge variant={getStatusBadge(soilData.potassium.value, soilData.potassium.optimal).variant}>
              {getStatusBadge(soilData.potassium.value, soilData.potassium.optimal).text}
            </Badge>
          </div>
        </div>

        {/* Overall Health */}
        <div className="bg-primary/10 rounded-lg p-3">
          <p className="text-sm font-medium text-primary">
            Overall Soil Health: Good ✓
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Suitable for most crops
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilStatusCard;