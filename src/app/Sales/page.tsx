"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
  const monthlyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Monthly sales
    datasets: [
      {
        label: 'Monthly Sales in 2025',
        data: [1200, 1900, 3000, 4000, 2500, 2700], // Monthly data
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const yearlyData = {
    labels: ['2021', '2022', '2023', '2024', '2025'], // Yearly sales
    datasets: [
      {
        label: 'Yearly Sales',
        data: [15000, 18000, 22000, 25000, 30000], // Yearly data
        fill: false,
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Sales Data Overview',
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 p-8 bg-gray-50 shadow-xl rounded-lg">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center text-black mb-12">Sales Data Overview</h1>

      {/* Graph Container */}
      <div className="flex flex-col sm:flex-row gap-8 overflow-hidden">
        {/* Monthly Sales Graph */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex-1 max-w-full h-[400px] sm:h-[350px]">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Monthly Sales in 2025</h2>
          <Line data={monthlyData} options={options} height={350} width={600} />
        </div>

        {/* Yearly Sales Graph */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex-1 max-w-full h-[400px] sm:h-[350px]">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Yearly Sales</h2>
          <Line data={yearlyData} options={options} height={350} width={600} />
        </div>
      </div>
    </div>
  );
};

export default Home;
