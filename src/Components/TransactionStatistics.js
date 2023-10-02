import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TransactionStatistics.css";
import api_url from "../config";

// Import statements...

function TransactionStatistics() {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState("2022-09"); // Set an initial month

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${api_url}/api/statistics?month=${selectedMonth}`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="center" style={{marginTop:"70px"}}>
      <h2>Transaction Statistics</h2>
      <div className="center-box">
        <label>Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <div className="transaction-statistics">
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalUnsoldItems}</p>
      </div>
    </div>
  );
}

export default TransactionStatistics;
