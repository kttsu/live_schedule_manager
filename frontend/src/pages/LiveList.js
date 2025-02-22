import React, { useEffect, useState } from "react";
import { fetchLives, deleteLive } from "../api/liveApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Link } from "react-router-dom";

export function LiveList() {
  const [lives, setLives] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadLives = async () => {
    try {
      const data = await fetchLives();
      const sortedLives = data.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));
      setLives(sortedLives);
    } catch (error) {
      console.error("ライブ一覧の取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    loadLives();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmYes = async () => {
    try {
      if (selectedId !== null) {
        await deleteLive(selectedId);
        loadLives();
        alert("ライブを削除しました！"); 
      }
    } catch (error) {
      console.error("ライブの削除に失敗しました:", error);
    } finally {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleConfirmNo = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">ライブ一覧</h2>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500,
          borderRadius: 2,
          border: "1px solid #ddd",
          boxShadow: 3,
          overflowY: "auto"
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "#fff" }}>
                ライブ名
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "#fff" }}>
                日時
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "#fff" }}>
                会場
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "#fff" }}>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lives.map((live) => (
              <TableRow key={live.id} hover>
                <TableCell align="center">{live.name}</TableCell>
                <TableCell align="center">{new Date(live.schedule).toLocaleString()}</TableCell>
                <TableCell align="center">{live.location}</TableCell>
                <TableCell align="center">
                  <Link to={`/update/${live.id}`} style={{ textDecoration: "none", marginRight: "8px" }}>
                    <Button variant="contained" color="primary" size="small">
                      更新
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(live.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleConfirmNo}>
        <DialogContent>本当に削除しますか？</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo} color="primary">
            いいえ
          </Button>
          <Button onClick={handleConfirmYes} color="error">
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

