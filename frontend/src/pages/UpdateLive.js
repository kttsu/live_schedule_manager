import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLives, updateLive } from "../services/api";
import { Box, Typography, TextField, Button } from "@mui/material";

const UpdateLive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [live, setLive] = useState({
    schedule: "",
    name: "",
    location: "",
  });

  const [originalLive, setOriginalLive] = useState(null);

  useEffect(() => {
    const loadLive = async () => {
      const lives = await fetchLives();
      const liveToUpdate = lives.find((item) => item.id.toString() === id);
      if (liveToUpdate) {
        setLive(liveToUpdate);
        setOriginalLive(liveToUpdate);
      }
    };
    loadLive();
  }, [id]);

  const handleChange = (e) => {
    setLive({ ...live, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (originalLive && JSON.stringify(originalLive) === JSON.stringify(live)) {
      alert("前回と同じ情報です！");
      return; 
    }

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
            label="ライブ名"
            variant="outlined"
            name="name"
            value={live.name}
            onChange={handleChange}
            required
          />
              
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

