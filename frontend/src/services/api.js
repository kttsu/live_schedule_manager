import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const fetchLives = async () => {
  const response = await axios.get(`${API_BASE_URL}/live`);
  return response.data;
};

export const createLive = async (liveData) => {
  const response = await axios.post(`${API_BASE_URL}/live`, liveData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteLive = async (id) => {
  await axios.delete(`${API_BASE_URL}/live/${id}`);
};

export const updateLive = async (id, updatedLiveData) => {
    const response = await axios.patch(`${API_BASE_URL}/live/${id}`, updatedLiveData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

