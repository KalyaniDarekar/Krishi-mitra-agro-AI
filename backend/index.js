const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const generateSoilData = () => {
  const pH = parseFloat((Math.random() * (8.0 - 5.5) + 5.5).toFixed(1));
  const moisture = Math.floor(Math.random() * (70 - 20) + 20);
  const N = Math.floor(Math.random() * (250 - 100) + 100);
  const P = Math.floor(Math.random() * (60 - 20) + 20);
  const K = Math.floor(Math.random() * (300 - 150) + 150);

  const getNutrientStatus = (value, optimalRange) => {
    if (value < optimalRange.low) return "Low";
    if (value > optimalRange.high) return "High";
    return "Optimal";
  };

  const nutrientThresholds = {
    N: { low: 150, high: 200 },
    P: { low: 30, high: 50 },
    K: { low: 180, high: 250 },
  };

  const nutrients = {
    N: { value: N, status: getNutrientStatus(N, nutrientThresholds.N) },
    P: { value: P, status: getNutrientStatus(P, nutrientThresholds.P) },
    K: { value: K, status: getNutrientStatus(K, nutrientThresholds.K) },
  };

  let overallStatus = "Good";
  if (pH < 6.0 || pH > 7.5 || moisture < 30 || moisture > 60) {
    overallStatus = "Moderate";
  }
  if (N < 120 || N > 230 || P < 25 || P > 55 || K < 170 || K > 280) {
    overallStatus = "Moderate";
  }
  if (pH < 5.5 || pH > 8.0 || moisture < 20 || moisture > 70 || N < 100 || N > 250 || P < 20 || P > 60 || K < 150 || K > 300) {
    overallStatus = "Poor";
  }

  return {
    pH,
    moisture,
    nutrients: {
      N: nutrients.N.value,
      P: nutrients.P.value,
      K: nutrients.K.value,
    },
    nutrientStatuses: {
      N: nutrients.N.status,
      P: nutrients.P.status,
      K: nutrients.K.status,
    },
    status: overallStatus,
  };
};

app.get('/api/soil-status', (req, res) => {
  res.json(generateSoilData());
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
