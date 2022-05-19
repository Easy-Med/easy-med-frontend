import { Typography, Paper, Box } from "@mui/material";
import VisitTileButton from "./VisitTileButton";

function VisitTile({ hour, firstName, lastName, pesel, ...props }) {
  return (
    <Paper
      sx={{
        px: 1,
        py: 2,
        my: 2,
        display: "flex",
        justifyContent: "space-between",
        gap: 3,
        width: "100%",
        flexWrap: "wrap",
      }}
      elevation={2}
    >
      <Typography variant={"h4"} fontWeight={"bold"}>
        {hour}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexWrap: "no-wrap",
        }}
      >
        <Typography variant={"h8"}>
          {firstName} <b>{lastName}</b>
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>
          Pesel: <b>{pesel}</b>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
          pr: 3,
        }}
      >
        <VisitTileButton
          imgSrc={"/images/doctor/dashboard/document-icon.png"}
          bgColor={"33, 150, 243"}
        />

        <VisitTileButton
          imgSrc={"/images/doctor/dashboard/good-pincode-icon.png"}
          bgColor={"0, 155, 155"}
        />
      </Box>
    </Paper>
  );
}

export default VisitTile;
