import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import { useMutation, useQueryClient } from "react-query";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import useAuth from "../../../app/auth/UseAuth";

const CompleteVisitDialog = ({ visitId }) => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { role } = auth.authData;
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const completeVisitMutation = useMutation(
    () => ReservedVisitsService.completeVisit(visitId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${role}Visits`);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompleteVisit = () => {
    completeVisitMutation.mutate();
    handleClose();
  };

  return (
    <>
      <IconButton
        size={"small"}
        sx={{ height: "40px", width: "40px", boxShadow: 2 }}
        color={"success"}
        onClick={handleClickOpen}
      >
        <img
          width={"40px"}
          height={"auto"}
          src={"/images/others/done-icon.png"}
          alt={""}
        />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>{"Complete visit?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to complete visit? That operation cannot be undo!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"success"} onClick={handleCompleteVisit} autoFocus>
            Complete
          </Button>
          <Button sx={{ color: "text.secondary" }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompleteVisitDialog;
