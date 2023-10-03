// combinedResponse.js

import axios from "axios";
import  api_url  from "../config";

// Function to fetch combined data
export const fetchCombinedData = async (selectedMonth, setCombinedData) => {
  try {
    const response = await axios.get(
      `${api_url}/api/combinedResponse?month=${selectedMonth}`
    );
    if (response.status === 200) {
      setCombinedData(response.data);
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching combined data:", error);
  }
};
