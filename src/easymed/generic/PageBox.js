import React from "react";
import Box from "@mui/material/Box";

const PageBox = ({ sx = [], children }) => {
  return (
    <Box
      sx={[
        {
          py: 2,
          px: { xs: 2, sm: 4 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
        (theme) => ({
          bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default PageBox;
