import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TransactionStatistics.css";
import api_url from "../config";

function TransactionStatistics() {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });
    const [selectedMonth, setSelectedMonth] = useState("2022-03");

  

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
    <div className="center" style={{ marginTop: "70px" }}>
      <h2>Transaction Statistics</h2>
      <div className="center-box">
        <label>Select Month:{selectedMonth}</label>
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
      <div className="transaction-statistics">
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalUnsoldItems}</p>
      </div>
    </div>
  );
}

export default TransactionStatistics;
