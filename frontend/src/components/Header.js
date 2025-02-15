import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2, // 要素間の隙間（8px = 1 * theme.spacing(2)）
          }}
        >
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
  );
};

export default Header;

