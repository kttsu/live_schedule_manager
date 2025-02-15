import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// 全ライブを取得
export const fetchLives = async () => {
  const response = await axios.get(`${API_BASE_URL}/live`);
  return response.data;
};

// 新しいライブを登録
export const createLive = async (liveData) => {
  const response = await axios.post(`${API_BASE_URL}/live`, liveData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// 指定したライブを削除
export const deleteLive = async (id) => {
  await axios.delete(`${API_BASE_URL}/live/${id}`);
};

// 指定したライブを更新
export const updateLive = async (id, updatedLiveData) => {
    const response = await axios.patch(`${API_BASE_URL}/live/${id}`, updatedLiveData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

