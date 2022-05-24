import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import moment from "moment";

const PatientInfoDialog = ({ visit }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size={"small"}
        sx={{ height: "40px", width: "40px", boxShadow: 2 }}
        color={"info"}
        onClick={handleClickOpen}
      >
        <img
          width={"40px"}
          height={"auto"}
          src={"/images/others/info-icon.png"}
          alt={""}
        />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>{"Visit information"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start: <strong>{moment(visit.startDate).format("HH:mm")}</strong>
            <br />
            End: <strong>{moment(visit.endDate).format("HH:mm")}</strong>
            <br />
            Location: <strong>{visit.location}</strong>
            <br />
            <br />
            Patient <br />
            First Name: <strong>{visit.patient.firstName}</strong>
            <br />
            Last Name: <strong>{visit.patient.lastName}</strong>
            <br />
            Pesel: <strong>{visit.patient.personalIdentityNumber}</strong>
            <br />
            Email: <strong>{visit.patient.emailAddress}</strong>
            <br />
            Telephone: <strong>{visit.patient.telephoneNumber}</strong>
            <br />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientInfoDialog;