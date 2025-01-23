import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  ChartOptions,
  ChartData,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart as ChartJS } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);

  // Fetch product data (replace this with your actual data fetching logic)
  useEffect(() => {
    // Example of fetching data
    const fetchData = async () => {
      const response = await fetch("your-api-endpoint-here");
      const data = await response.json();
      setProducts(data); // Assuming the data is an array of products
    };

    fetchData();
  }, []);

  // Chart.js data processing function
  const processData = (products: any[]) => {
    return {
      labels: products.map((product) => product.name), // Example: product name as labels
      datasets: [
        {
          label: "Sales",
          data: products.map((product) => product.sales), // Example: sales data
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart options configuration
  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Admin Dashboard Chart",
        font: {
          size: 18,
          weight: "bold", // Use valid string or numeric values for the weight
        },
        color: "#000",
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <h2>Admin Dashboard</h2>
      <div style={{ height: "100%" }}>
        <Chart
          type="bar"
          data={processData(products)} // Pass processed data
          options={chartOptions} // Pass chart options
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
