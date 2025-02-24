import { axiosInstance } from "./axiosConfig";

export const fetchLives = async () => {
  const response = await axiosInstance.get("/live");
  return response.data;
};

export const createLive = async (liveData) => {
  const response = await axiosInstance.post("/live", liveData);
  return response.data;
};

export const deleteLive = async (id) => {
  await axiosInstance.delete(`/live/${id}`);
};

export const updateLive = async (id, updatedLiveData) => {
  const response = await axiosInstance.patch(`/live/${id}`, updatedLiveData);
  return response.data;
};

