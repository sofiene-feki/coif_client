import axios from "axios";

const API_BASE_URL = "https://coif-server.onrender.com/api";

/* ================= IMAGE ================= */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_BASE_URL}/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // { url, public_id }
  } catch (error) {
    console.error("❌ Image upload error:", error.message);
    throw error;
  }
};

/* ================= VIDEO ================= */
export const uploadVideo = async (file, duration = 0) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("duration", duration);

    const response = await axios.post(
      `${API_BASE_URL}/upload/video`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // { url, public_id, duration }
  } catch (error) {
    console.error("❌ Video upload error:", error.message);
    throw error;
  }
};
