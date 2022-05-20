import React from "react";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";
import ReservedVisitMapper from "./ReservedVisitMapper";
import DeleteReservedVisitPopup from "../../generic/reservedVisits/DeleteReservedVisitPopup";
import CompleteReservedVisitPopup from "./CompleteReservedVisitPopup";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
  wordWrap: "break-word",
}));

const ReservedVisitDoctorCard = ({ reservedVisit }) => {
  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.down("md"));

  const gridItems = ReservedVisitMapper.map(reservedVisit);

  const orderGridItems = (arr) => {
    if (matchesTablet) {
      return arr;
    }

    const result = [];
    for (let i = 0; i < arr.length / 2; i++) {
      result.push(arr[i]);
      result.push(arr[i + arr.length / 2]);
    }

    return result;
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      elevation={2}
    >
      <Typography variant={"h4"}>
        {reservedVisit.patient.firstName}{" "}
        <strong>{reservedVisit.patient.lastName}</strong>
      </Typography>
      <Grid container>
        {orderGridItems(Object.keys(gridItems)).map((key) => [
          <Grid item xs={6} md={3} key={`${key}1`}>
            <Item>{key}:</Item>
          </Grid>,
          <Grid item xs={6} md={3} key={`${key}2`}>
            <Item>
              <strong>{gridItems[key]}</strong>
            </Item>
          </Grid>,
        ])}
      </Grid>
      {!reservedVisit.isCompleted && (
        <>
          <Divider flexItem sx={{ my: 2 }} />
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            sx={{ alignSelf: { xs: "stretch", sm: "flex-end" } }}
          >
            <CompleteReservedVisitPopup visitId={reservedVisit.id} />
            <DeleteReservedVisitPopup visitId={reservedVisit.id} />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ReservedVisitDoctorCard;
