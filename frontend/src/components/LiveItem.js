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

const LiveItem = ({ live, onDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 「削除」ボタンを押したらダイアログを開く
  const handleDeleteClick = () => {
    setOpen(true);
  };

  // 「はい」を選択した場合 → 削除実行
  const handleConfirmYes = () => {
    onDelete(live.id);
    setOpen(false);
  };

  // 「いいえ」を選択した場合 → ダイアログ閉じて一覧へ
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

export default LiveItem;

