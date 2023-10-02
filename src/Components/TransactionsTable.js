import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TransactionTable.css";
import api_url from "../config";

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${api_url}/api/transactions?month=${selectedMonth}&search=${searchText}&page=${page}`
        );

        if (response.status === 200) {
          setTransactions(response.data.docs);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchText, page, perPage]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      setPage(1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="center">
      <h2>Transactions Table</h2>
      <div className="table-container">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {/* Your month options here */}
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div>
        <label className="center" style={{ alignItems: "center" }}>
          Search Transactions:
        </label>
        <input
          type="text"
          placeholder="Search transactions"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <table className="transactions-table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transactions) &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>${transaction.price.toFixed(2)}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    width="100"
                  />
                </td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevPage}>Previous</button>&nbsp;&nbsp;
        <span>
          Page {page} of {totalPages}
        </span>
        &nbsp;&nbsp;
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default TransactionsTable;
