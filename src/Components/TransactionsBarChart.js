import React, { useState, useEffect } from "react";
import axios from "axios";
import api_url from "../config";
import Chart from "chart.js/auto";

function TransactionsBarChart() {
  const [selectedMonth, setSelectedMonth] = useState("2022-03"); // Set an initial month
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        // Destroy the existing chart instance if it exists
        destroyChart();

        const response = await axios.get(
          `${api_url}/api/bar-chart?month=${selectedMonth}`
        );
        const responseData = response.data;

        // Extract the data for labels and data points from the API response
        const labels = Object.keys(responseData);
        const data = Object.values(responseData);

        // Create a new chart
        const ctx = document.getElementById("myChart").getContext("2d");
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Number of Items",
                data: data,
                backgroundColor: "rgba(75,192,192,0.6)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                stepSize: 10,
              },
            },
          },
        });

        // Save the new chart reference
        setChartInstance(newChart);
      } catch (error) {
        console.error("Error while fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Function to destroy the chart
  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Bar Chart Stats</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="2022-01">January</option>
          <option value="2022-02">February</option>
          <option value="2022-03">March</option>
          <option value="2022-04">April</option>
          <option value="2022-05">May</option>
          <option value="2022-06">June</option>
          <option value="2022-07">July</option>
          <option value="2022-08">August</option>
          <option value="2022-09">September</option>
          <option value="2022-10">October</option>
          <option value="2022-11">November</option>
          <option value="2022-12">December</option>
        </select>
      </div>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          width: "500px",
          height: "500px",
          marginLeft: "400px",
        }}
      >
        <canvas id="myChart" width={400} height={400}></canvas>
      </div>
    </div>
  );
}

export default TransactionsBarChart;
