import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
}));

const ReservedVisitCard = () => {
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
      <Typography variant={"h5"}>
        Reserved visit nr. <strong>19874</strong>
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Item>Date:</Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            03.04.2022 <strong>15:10</strong>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>Location:</Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            ul. <strong>Generala Bema 15</strong>
            <br />
            15-458 <strong>Bialystok</strong>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>Doctor:</Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            <strong>Dr. </strong>Kondrad <strong>Zabrzecki</strong>
            <br />
            Chirurg
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>Completed:</Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            <strong>No</strong>
          </Item>
        </Grid>
      </Grid>
      <Button
        color={"error"}
        size={"small"}
        variant={"contained"}
        sx={{ mt: 1, alignSelf: "flex-end" }}
      >
        Cancel visit
      </Button>
    </Paper>
  );
};

export default ReservedVisitCard;