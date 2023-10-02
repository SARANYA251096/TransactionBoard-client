// CombinedResponse.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import api_url from "../config";

function CombinedResponse() {
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const response = await axios.get(`${api_url}/api/combinedResponse`);
        if (response.status === 200) {
          setCombinedData(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching combined data:", error);
      }
    };

    fetchCombinedData();
  }, []);

  return (
    <div>
      {/* Render components or data using combinedData */}
      {combinedData && (
        <div>
          <h3>Combined Data</h3>
          <table>
            <thead>
              <tr>
                <th>Price Range</th>
                <th>Number of Items</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(combinedData).map(([priceRange, count]) => (
                <tr key={priceRange}>
                  <td>{priceRange}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CombinedResponse;
