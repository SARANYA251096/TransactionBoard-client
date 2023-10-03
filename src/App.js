import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionStatistics from "./Components/TransactionStatistics";
import TransactionsBarChart from "./Components/TransactionsBarChart";
import TransactionsTable from "./Components/TransactionsTable";
import { fetchCombinedData } from "./Components/CombinedResponse";

function App() {
  // State to store the selected month (initialize with a default month)
  const [selectedMonth, setSelectedMonth] = useState("2022-04");
  const [combinedData, setCombinedData] = useState(null);

  // Function to handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    // Fetch the combinedResponse data for the selected month
    fetchCombinedData(selectedMonth, setCombinedData);
  }, [selectedMonth]);

  return (
    <div>
  
      
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
      

      {/* Pass combinedData as props to other components */}
      <TransactionsTable
        selectedMonth={selectedMonth}
        combinedData={combinedData}
      />
      <TransactionStatistics
        selectedMonth={selectedMonth}
        combinedData={combinedData}
      />
      <TransactionsBarChart
        selectedMonth={selectedMonth}
        combinedData={combinedData}
      />
    </div>
  );
}

export default App;
