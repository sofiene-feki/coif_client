import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:8000/api";

/* ================= APPOINTMENTS ================= */

/**
 * ✅ Create new appointment (Public)
 */
export const createAppointment = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/appointment/create`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error creating appointment:", error.message);
    throw error;
  }
};

/**
 * ✅ Get availability by date (Public)
 * @param date YYYY-MM-DD
 */
export const getAvailabilityByDate = async (date) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/appointment/availability`,
      {
        params: { date },
      }
    );
    return response.data; // { "10:00": true, "11:00": false }
  } catch (error) {
    console.error("❌ Error fetching availability:", error.message);
    throw error;
  }
};
