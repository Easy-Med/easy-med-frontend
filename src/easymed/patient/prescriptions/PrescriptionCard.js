import React from "react";
import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const doctor = "Dr. Agnieszka Pampuch";
const listOfMedicines = [
  "Dymista asfasfasf asf asf asf as fasfas asfpoinasf oiansf ioansf oiuasnfou asnfia nsoifu nas ",
  "Neozine asfuyafbawilfubi asiuofb aisufb o",
];

const PrescriptionCard = ({ sx = [] }) => {
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
          <Typography fontWeight={"bold"}>03.04.2022</Typography>
        </Box>
      </Box>
      <Typography sx={{ color: "text.secondary" }}>Issuing doctor</Typography>
      <Typography fontWeight={"bold"}>{doctor}</Typography>
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