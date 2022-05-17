import React from "react";
import { Divider, Typography } from "@mui/material";

export default function ReserveVisitTitle() {
  return (
    <>
      <Typography
        variant="h5"
        color={"primary.main"}
        sx={{ my: 2 }}
        fontWeight={"bold"}
      >
        Reserve your visit today!
      </Typography>
      <Divider sx={{ width: "80%" }} />
    </>
  );
}