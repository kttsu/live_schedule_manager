import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions
} from "@mui/material";

export function LiveItem({ live, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirmYes = () => {
    onDelete(live.id);
    setOpen(false);
  };

  const handleConfirmNo = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <Box
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        mb={2}
        sx={{ border: "1px solid #ccc", borderRadius: 2 }}
      >
        <Typography>
          <strong>{live.name}</strong> - {new Date(live.schedule).toLocaleString()} - {live.location}
        </Typography>
        <Box>
          <Link to={`/update/${live.id}`} style={{ textDecoration: "none", marginRight: "8px" }}>
            <Button variant="contained" color="primary" size="small">
              更新
            </Button>
          </Link>
          <Button variant="contained" color="error" size="small" onClick={handleDeleteClick}>
            削除
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleConfirmNo}>
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
    </>
  );
};


