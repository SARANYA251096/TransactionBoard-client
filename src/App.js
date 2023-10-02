import React from "react";
import "./App.css";
import TransactionStatistics from "./Components/TransactionStatistics";
import TransactionsBarChart from "./Components/TransactionsBarChart";
import TransactionsTable from "./Components/TransactionsTable";
// import CombinedResponse from "./Components/CombinedResponse"; 

function App() {
  return (
    <div>
      {/* <CombinedResponse />  */}
      <TransactionsTable />
      <TransactionStatistics />
      <TransactionsBarChart />
    </div>
  );
}

export default App;
