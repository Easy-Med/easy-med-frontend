import React from "react";
import { Button, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
}));

const gridItems = {
  pesel: <strong>00220404437</strong>,
  "e-mail": <strong>kanecki@gmail.com</strong>,
  telephone: <strong>508 764 135</strong>,
  date: (
    <>
      03.04.2022 <strong>15:10</strong>
    </>
  ),
  location: (
    <strong>
      ul. Henryka Sienkiewicza 79a/lok. 301
      <br />
      02-677 Warszawa
    </strong>
  ),
  completed: <strong>No</strong>,
};

const ReservedVisitDoctorCard = ({ completed }) => {
  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.down("md"));

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
      <Typography variant={"h5"}>
        Zbigniew <strong>Kanecki</strong>
      </Typography>
      <Grid container>
        {orderGridItems(Object.keys(gridItems)).map((key) => (
          <>
            <Grid item xs={6} md={3} key={`${key}1`}>
              <Item>{key}:</Item>
            </Grid>
            <Grid item xs={6} md={3} key={`${key}2`}>
              <Item>{gridItems[key]}</Item>
            </Grid>
          </>
        ))}
      </Grid>
      {completed.toLowerCase() === "no" && (
        <>
          <Divider flexItem sx={{ my: 2 }} />
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            sx={{ alignSelf: { xs: "center", sm: "flex-end" } }}
          >
            <Button color={"info"} size={"small"} variant={"contained"}>
              Complete visit
            </Button>
            <Button color={"error"} size={"small"} variant={"contained"}>
              Cancel visit
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ReservedVisitDoctorCard;
