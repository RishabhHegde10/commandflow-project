import axios from "axios";

const DEMO_BACKEND_URL = "http://localhost:5000/auth";

/**
 * Register a user on the Demo Backend
 */
export async function registerDemoBackend(data: unknown) {
  try {
    const response = await axios.post(`${DEMO_BACKEND_URL}/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to register on Demo Backend");
    }
    throw error;
  }
}

/**
 * Login to the Demo Backend to retrieve a JWT Token
 */
export async function loginDemoBackend(data: unknown) {
  try {
    const response = await axios.post(`${DEMO_BACKEND_URL}/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to login on Demo Backend");
    }
    throw error;
  }
}
