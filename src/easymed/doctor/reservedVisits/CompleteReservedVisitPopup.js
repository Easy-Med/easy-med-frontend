import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import useAuth from "../../../app/auth/UseAuth";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";

const CompleteReservedVisitPopup = ({ visitId }) => {
  const [openedDialog, setOpenedDialog] = useState(false);
  const queryClient = useQueryClient();
  const auth = useAuth();
  const { role } = auth.authData;

  const handleClose = () => {
    setOpenedDialog(false);
  };

  const completeVisitMutation = useMutation(
    () => ReservedVisitsService.completeVisit(visitId),{
      onSuccess: () => {
        queryClient.invalidateQueries(`${role}Visits`)
      }
    }
  );

  const handleCompleteVisit = () => {
    completeVisitMutation.mutate();
    handleClose();
  };

  return (
    <>
      <Button
        color={"info"}
        size={"small"}
        variant={"contained"}
        onClick={() => setOpenedDialog(true)}
      >
        Complete visit
      </Button>
      <Dialog
        open={openedDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "center",
            alignItems: "flex-start",
          },
        }}
        PaperProps={{
          sx: {
            m: 10,
            top: 10,
            left: 10,
          },
        }}
      >
        <Card>
          <CardContent>
            <Typography sx={{ mb: 3 }} variant="h5" component="div">
              <b>Are you sure you want to complete visit?</b>
            </Typography>
            <Typography sx={{ mb: 3 }} color="text.secondary">
              Completed visits are archived
            </Typography>
            <Typography variant="body2">
              For confirmation, click <b>“Complete Visit”.</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="info" onClick={handleCompleteVisit}>
              COMPLETE VISIT
            </Button>
            <Button size="small" color={"primary"} onClick={handleClose}>
              GO BACK
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
};

export default CompleteReservedVisitPopup;
