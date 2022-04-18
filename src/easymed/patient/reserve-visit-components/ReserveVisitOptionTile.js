import React from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReserveVisitOptionTile = ({ title, imgUrl, imgAlt, redirectUrl, ...props }) => {

  return (
    <Paper
      elevation={10}
      onClick={null}
      sx={{
        width: "250px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": { opacity: 0.9 },
        backgroundColor: "primary.main"
      }}
    >
      <Typography variant={"h6"} color="white" sx={{ my: 1 }}>
        {title}
      </Typography>
      <img
        style={{
          objectFit: "cover",
          objectPosition: "top",
          width: "80%",
          overflow: "hidden",
        }}
        src={imgUrl}
        alt={imgAlt}
      />
      <br/>
    </Paper>
  );
};

export default ReserveVisitOptionTile;