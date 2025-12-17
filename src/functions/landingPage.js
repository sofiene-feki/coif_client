import axios from "axios";

// Backend base URL
const API_BASE_URL = "https://coif-server.onrender.com/api";

/* ================= LANDING PAGE ================= */

// ✅ Get landing page data
export const getLandingPage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/landing`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching landing page:", error.message);
    throw error;
  }
};

// ✅ Create or Update landing page
export const saveLandingPage = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/landing`, payload);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving landing page:", error.message);
    throw error;
  }
};

/* ================= SERVICES ================= */

// ✅ Add new service
export const addService = async (service) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/landing/service`,
      service
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error adding service:", error.message);
    throw error;
  }
};

// ✅ Update service
export const updateService = async (serviceId, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/landing/service/${serviceId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating service ${serviceId}:`, error.message);
    throw error;
  }
};

// ✅ Delete service
export const deleteService = async (serviceId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/landing/service/${serviceId}`
    );
    return response.data;
  } catch (error) {
    console.error(`❌ Error deleting service ${serviceId}:`, error.message);
    throw error;
  }
};
