import axios from "axios";

// Set the token in the request headers
const setAuthToken = (token) => {
  if (token) {
    // If token exists, add it to the headers for all requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove token from headers if it's not available
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
