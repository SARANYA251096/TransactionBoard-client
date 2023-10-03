import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../css/TransactionTable.css";
import api_url from "../config";

function TransactionsTable({ selectedMonth }) {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${api_url}/api/list-transactions?month=${selectedMonth}&search=${searchText}&page=${page}`
        );

        if (response.status === 200) {
          setTransactions(response.data.docs);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Unexpected response status:", response.status);
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchText, page, perPage]);

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
        <label>Select Month: {selectedMonth}</label>
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
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {transactions.length === 0 && !isLoading && !error && (
        <p>No transactions found.</p>
      )}
      {transactions.length > 0 && (
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
                  <td>
                    {new Date(transaction.dateOfSale).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

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

TransactionsTable.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
};

export default TransactionsTable;
