import React from "react";
import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const PrescriptionCard = ({
  sx = [],
  isForPatient,
  personOnPx,
  dateOfIssue,
  listOfMedicines,
}) => {
  return (
    <Paper
      sx={[
        {
          p: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      elevation={2}
    >
      <Box display={"flex"} mb={3}>
        <img
          src={"/images/prescription/prescription-logo.png"}
          alt={""}
          width={60}
          height={"auto"}
        />
        <Box sx={{ ml: "auto" }}>
          <Typography sx={{ color: "text.secondary" }}>
            Date of issue
          </Typography>
          <Typography fontWeight={"bold"}>{dateOfIssue}</Typography>
        </Box>
      </Box>
      <Typography sx={{ color: "text.secondary" }}>
        {isForPatient ? "Issuing doctor" : "Assigned to patient"}
      </Typography>
      <Typography fontWeight={"bold"}>{personOnPx}</Typography>
      <Typography sx={{ color: "text.secondary", mt: 2 }}>
        List of medicines:
      </Typography>
      <ul style={{ marginTop: 0 }}>
        {listOfMedicines.map((medicine) => (
          <li>
            <Typography>{medicine}</Typography>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default PrescriptionCard;
