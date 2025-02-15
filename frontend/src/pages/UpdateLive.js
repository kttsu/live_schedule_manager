import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLives, updateLive } from "../services/api";
import { Box, Typography, TextField, Button } from "@mui/material";

const UpdateLive = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ユーザーが編集中のデータ
  const [live, setLive] = useState({
    schedule: "",
    name: "",
    location: "",
  });

  // 初期ロード時の「オリジナル」データを保存するためのステート
  const [originalLive, setOriginalLive] = useState(null);

  useEffect(() => {
    const loadLive = async () => {
      const lives = await fetchLives();
      const liveToUpdate = lives.find((item) => item.id.toString() === id);
      if (liveToUpdate) {
        // 編集用データをセット
        setLive(liveToUpdate);
        // オリジナルデータを保持
        setOriginalLive(liveToUpdate);
      }
    };
    loadLive();
  }, [id]);

  // 入力変更ハンドラ
  const handleChange = (e) => {
    setLive({ ...live, [e.target.name]: e.target.value });
  };

  // 送信ハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. originalLive と live が同じかチェック
    if (originalLive && JSON.stringify(originalLive) === JSON.stringify(live)) {
      alert("前回と同じ情報です！");
      return; // 更新リクエストをスキップ
    }

    // 2. 変更がある場合は更新処理
    try {
      await updateLive(id, live);
      alert("ライブ情報を更新しました！");
      navigate("/");
    } catch (error) {
      alert("ライブ情報を更新できませんでした。");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ maxWidth: 400, margin: "0 auto", paddingTop: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "#000",
          }}
        >
          ライブ情報を更新
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <TextField
            label="日時"
            type="datetime-local"
            variant="outlined"
            name="schedule"
            value={live.schedule}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="ライブ名"
            variant="outlined"
            name="name"
            value={live.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="場所"
            variant="outlined"
            name="location"
            value={live.location}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" size="large">
            更新
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateLive;

