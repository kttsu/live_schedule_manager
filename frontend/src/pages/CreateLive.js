import React, { useState } from "react";
import { createLive } from "../api/liveApi";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

export function CreateLive() {
  const [schedule, setSchedule] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLive = { schedule, name, location };
    try {
      await createLive(newLive);
      window.alert("ライブを作成しました！");
      navigate("/");
    } catch (error) {
      console.error("作成エラー:", error);
      window.alert("作成に失敗しました。");
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
      <Box
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          paddingTop: 8,
        }}
      >
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
          ライブを登録
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
            label="ライブ名"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="日時"
            type="datetime-local"
            variant="outlined"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="場所"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" size="large">
            登録
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

