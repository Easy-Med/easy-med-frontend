import { Typography, Paper, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const TileIcon = styled("img")(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: "50%",
  border: "solid transparent",
  borderWidth: "0px",
  backgroundColor: "lightGrey",
  boxShadow: theme.shadows["3"],
  width: "45px",
  height: "45px",
}));

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
        <IconButton sx={{p: 0}} disableRipple>
          <TileIcon
            src={"/images/doctor/dashboard/document-icon.png"}
            alt={""}
            sx={[{
              backgroundColor: `rgba(${"33, 150, 243"}, 1)`,
            },
          {
            '&:hover': {
              borderColor: `rgba(${"33, 150, 243"}, 1)`,
              borderWidth: "2px"
            },
          }]}
          />
          </IconButton>
        <IconButton sx={{p: 0}} disableRipple>
          <TileIcon
            src={"/images/doctor/dashboard/good-pincode-icon.png"}
            alt={""}
            sx={[{
              backgroundColor: `rgba(${"0, 155, 155"}, 1)`,
            },
          {
            '&:hover': {
              borderColor: `rgba(${"0, 155, 155"}, 1)`,
              borderWidth: "2px",
            },
          }]}
          />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default VisitTile;
