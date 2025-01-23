'use client';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardData {
  sales: number;
  users: number;
  revenue: number;
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  // Replace with your actual API fetch or static data
  return {
    sales: 150,
    users: 1200,
    revenue: 5000,
  };
};

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDashboardData();
      setDashboardData(data);
    };
    loadData();
  }, []);

  const chartData: ChartData<'bar'> = {
    labels: ['Sales', 'Users', 'Revenue'],
    datasets: [
      {
        label: 'Admin Dashboard Data',
        data: dashboardData ? [dashboardData.sales, dashboardData.users, dashboardData.revenue] : [0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {dashboardData ? (
        <div className="dashboard-stats">
          <div className="stat">
            <h3>Sales</h3>
            <p>{dashboardData.sales}</p>
          </div>
          <div className="stat">
            <h3>Users</h3>
            <p>{dashboardData.users}</p>
          </div>
          <div className="stat">
            <h3>Revenue</h3>
            <p>${dashboardData.revenue}</p>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      <div className="chart">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
