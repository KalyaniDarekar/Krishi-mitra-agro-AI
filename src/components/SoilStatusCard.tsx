import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Beaker, Activity } from "lucide-react";

interface SoilData {
  pH: number;
  moisture: number;
  nutrients: { N: number; P: number; K: number; };
  nutrientStatuses: { N: string; P: string; K: string; };
  status: string;
}

const SoilStatusCard: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);

  const fetchSoilData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/soil-status');
      const data: SoilData = await response.json();
      setSoilData(data);
    } catch (error) {
      console.error("Error fetching soil data:", error);
    }
  };

  useEffect(() => {
    fetchSoilData();
    const interval = setInterval(fetchSoilData, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Good":
      case "Optimal":
        return "text-green-600";
      case "Moderate":
      case "Fair":
        return "text-yellow-600";
      case "Poor":
      case "Critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressBarColorClass = (status: string) => {
    switch (status) {
      case "Good":
      case "Optimal":
        return "bg-green-500";
      case "Moderate":
      case "Fair":
        return "bg-yellow-500";
      case "Poor":
      case "Critical":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  if (!soilData) {
    return <Card>
      <CardHeader>
        <CardTitle>Loading Soil Status...</CardTitle>
      </CardHeader>
    </Card>;
  }

  return (
    <Card className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <CardHeader className="border-b pb-4 mb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
          <Activity className="h-7 w-7 text-green-700" />
          Soil Status
        </CardTitle>
        <CardDescription className="text-gray-500">Live soil health metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* pH Level */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg flex items-center gap-2 font-medium text-gray-700">
              <Beaker className="h-5 w-5 text-blue-600" />
              pH Level
            </span>
            <span className={`text-lg font-bold ${getStatusColorClass(soilData.status)}`}>
              {soilData.pH.toFixed(1)}
            </span>
          </div>
          <Progress
            value={(soilData.pH / 14) * 100}
            className={`h-3 rounded-full ${getProgressBarColorClass(soilData.status)}`}
          />
        </div>

        {/* Moisture */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg flex items-center gap-2 font-medium text-gray-700">
              <Droplets className="h-5 w-5 text-blue-400" />
              Moisture
            </span>
            <span className={`text-lg font-bold ${getStatusColorClass(soilData.status)}`}>
              {soilData.moisture}%
            </span>
          </div>
          <Progress
            value={soilData.moisture}
            className={`h-3 rounded-full ${getProgressBarColorClass(soilData.status)}`}
          />
        </div>

        {/* Nutrients */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <p className="text-lg font-medium flex items-center gap-2 text-gray-700">
            <Leaf className="h-5 w-5 text-green-600" />
            Nutrients (kg/ha)
          </p>
          {
            Object.entries(soilData.nutrients).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-base text-gray-600">{key}: {value}</span>
                <Badge className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${getStatusColorClass(soilData.nutrientStatuses[key as keyof typeof soilData.nutrientStatuses])}
                  ${soilData.nutrientStatuses[key as keyof typeof soilData.nutrientStatuses] === "Optimal" ? "bg-green-100" : ""}
                  ${soilData.nutrientStatuses[key as keyof typeof soilData.nutrientStatuses] === "Low" ? "bg-yellow-100" : ""}
                  ${soilData.nutrientStatuses[key as keyof typeof soilData.nutrientStatuses] === "High" ? "bg-red-100" : ""}
                  `}
                >
                  {soilData.nutrientStatuses[key as keyof typeof soilData.nutrientStatuses]}
                </Badge>
              </div>
            ))
          }
        </div>

        {/* Overall Health */}
        <div className={`rounded-xl p-4 text-white font-semibold flex items-center justify-between
          ${soilData.status === "Good" ? "bg-green-600" : ""}
          ${soilData.status === "Moderate" ? "bg-yellow-600" : ""}
          ${soilData.status === "Poor" ? "bg-red-600" : ""}
        `}>
          <p className="text-xl">Overall Soil Health:</p>
          <p className="text-xl">{soilData.status} {soilData.status === "Good" ? "✓" : ""}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilStatusCard;