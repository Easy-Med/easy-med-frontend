import { Typography, Paper, Box, Dialog, Divider } from "@mui/material";
import VisitTileButton from "./VisitTileButton";
import { useState } from "react";
import moment from "moment";

const VisitDetailsField = ({ type, children }) => {
  return (
    <Typography
      sx={{
        py: 2,
      }}
    >
      {type}: <b>{(children === null || children === "") ? <span style={{color: "red"}}>No data found.</span> : children}</b>
    </Typography>
  );
};

function VisitTile({ visit, ...props }) {
  const [open, setOpen] = useState(false);

  const hour = moment(visit.startDate).format("HH:mm");

  const handleOnCloseVisitDetail = () => {
    setOpen((prevState) => !prevState);
  };

  const handleMakeVisitCompleted = () => {};

  return (
    <Box>
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
            {visit.patient.firstName} <b>{visit.patient.lastName}</b>
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Pesel: <b>{visit.patient.personalIdentityNumber}</b>
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
            onClick={() => setOpen(true)}
          />

          <VisitTileButton
            imgSrc={"/images/doctor/dashboard/good-pincode-icon.png"}
            bgColor={"0, 155, 155"}
            onClick={handleMakeVisitCompleted}
          />
        </Box>
      </Paper>
      <Dialog
        open={open}
        onClose={handleOnCloseVisitDetail}
        fullWidth
        maxWidth="md"
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color={"primary.main"}
            sx={{ my: 2 }}
            fontWeight={"bold"}
          >
            Visit details
          </Typography>
          <Divider sx={{ width: "80%" }} />
          <Typography variant={"h4"} sx={{
            pt: 3,
            width: "80%",
            textAlign: "center",
          }}>
            Patient:{" "}
            <b>
              {visit.patient.firstName} {visit.patient.lastName}
            </b>
          </Typography>
          <Box sx={{
            display: "flex",
            flexWrap: "no-wrap",
            justifyContent: "space-between",
            width: "80%",
            p: 2,
            m: 1
          }}>
            <Box>
              <VisitDetailsField type="pesel">{visit.patient.personalIdentityNumber}</VisitDetailsField>
              <VisitDetailsField type="e-mail">{visit.patient.emailAddress}</VisitDetailsField>
              <VisitDetailsField type="telephone">{visit.patient.telephoneNumber}</VisitDetailsField>
            </Box>
            <Box>
              <VisitDetailsField type="date">{moment(visit.startDate).format("DD.MM.YYYY HH:mm")}</VisitDetailsField>
              <VisitDetailsField type="location">{visit.location}</VisitDetailsField>
            </Box>
          </Box>
        </Paper>
      </Dialog>
    </Box>
  );
}

export default VisitTile;
