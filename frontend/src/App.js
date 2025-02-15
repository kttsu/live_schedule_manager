import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import LiveList from "./pages/LiveList";
import CreateLive from "./pages/CreateLive";
import UpdateLive from "./pages/UpdateLive";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              ライブスケジュール管理アプリ
            </Typography>

            <Button color="inherit" component={Link} to="/">
              ライブ一覧
            </Button>
            <Button color="inherit" component={Link} to="/create">
              新規作成
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<LiveList />} />
        <Route path="/create" element={<CreateLive />} />
        <Route path="/update/:id" element={<UpdateLive />} />
      </Routes>
    </Router>
  );
}

export default App;

