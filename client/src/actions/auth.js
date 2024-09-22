import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_USER,
  CLEAR_USERS,
  CLEAR_POSTS,
  CLEAR_REQUESTS,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
	const token = localStorage.getItem("token") || "dummy-token"; // Use dummy token if none found
	setAuthToken(token); // Set token in headers for authorization
	console.log("loadUser code is working till here");
	try {
	  const res = await axios.get("/api/auth"); // Fetch user data
	  dispatch({
		type: USER_LOADED,
		payload: res.data,
	  });
	} catch (error) {
	  console.log("error in the loadUser funciton");
	  console.error(error.message);
	  dispatch({
		type: AUTH_ERROR,
	  });
	}
  };
  

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  console.log("Login function called with:", { email, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  
  try {
    const res = await axios.post("/api/auth", body, config);
    console.log("Login response:", res.data);

    // Store the token in localStorage
    localStorage.setItem("token", res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });

    // Load the user after successful login
    dispatch(loadUser());
  } catch (e) {
	console.log("something is not working ");
    console.error(e.response);
    const errors = e.response?.data?.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Register User
export const register = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userData); // Prepare request body
  
  try {
    const res = await axios.post("/api/users/register", body, config);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Join Request sent to Admin", "safe"));
    dispatch(loadUser());
    return 1;
  } catch (e) {
    const errors = e.response?.data?.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    console.error(e);
    dispatch({
      type: REGISTER_FAIL,
    });
    return 0;
  }
};

// Forgot Password
export const forgotPassword = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post("/api/auth/forgot-password", formData, config);
    dispatch(setAlert("Check your email for Reset Link", "safe"));
  } catch (e) {
    const errors = e.response?.data?.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Reset Password
export const resetPassword = (formInput, user_id, reset_token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { ...formInput, user_id, reset_token }; // Combine inputs into one object

  try {
    await axios.post("/api/auth/reset-password", body, config);
    dispatch(setAlert("Password changed", "safe"));
  } catch (e) {
    const errors = e.response?.data?.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Verify Reset Link
export const verifyResetLink = (user_id, reset_token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { user_id, reset_token };

  try {
    await axios.post("/api/auth/verify-reset-link", body, config);
    return 1;
  } catch (e) {
    const errors = e.response?.data?.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    return 0;
  }
};

// Log Out
export const logOut = () => (dispatch) => {
  localStorage.removeItem("token"); // Clear token from localStorage
  dispatch({ type: LOG_OUT });
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_USERS });
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: CLEAR_REQUESTS });
};
