import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";

const DeleteReservedVisitPopup = ({ visitId }) => {
  const [openedDialog, setOpenedDialog] = useState(false);

  const handleClose = () => {
    setOpenedDialog(false);
  };

  const cancelVisitMutation = useMutation(() =>
    ReservedVisitsService.cancelVisit(visitId)
  );

  const handleCancelVisit = () => {
    console.log("Handling");
    cancelVisitMutation.mutate();
    handleClose();
  };

  return (
    <>
      <Button
        color={"error"}
        size={"small"}
        variant={"contained"}
        onClick={() => setOpenedDialog(true)}
      >
        Cancel visit
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
              <b>Are you sure you want to cancel your visit?</b>
            </Typography>
            <Typography sx={{ mb: 3 }} color="text.secondary">
              Canceled visits cannot be retrieved!
            </Typography>
            <Typography variant="body2">
              For confirmation, click <b>“Cancel Visit”.</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="error" onClick={handleCancelVisit}>
              CANCEL VISIT
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

export default DeleteReservedVisitPopup;
