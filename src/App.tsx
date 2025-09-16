import React from 'react';
import SoilStatusCard from './components/SoilStatusCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-green-800 text-center">Soil Health Dashboard</h1>
        <SoilStatusCard />
      </div>
    </div>
  );
}

export default App;
