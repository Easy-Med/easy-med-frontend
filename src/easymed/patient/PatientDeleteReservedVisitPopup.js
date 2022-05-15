import {
  Dialog,
  Typography,
  Card,
  Button,
  CardContent,
  CardActions,
} from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import ReserveVisitService from "../../app/api/ReserveVisitService";

const PatientReservedVisits = () => {
  const [openCancelConfirmDialog, setOpenCancelConfirmDialog] =
    React.useState(false);


   // WYPEŁNIĆ DLA SUKCESU I DLA BŁĘDU JAK TAM POTRZEBA  
  const handleVisitCanceledSuccessfully = () => {};

  const handleVisitCanceledError = () => {};

  const cancelVisitMutation = useMutation(
    () => {
      // first param: visitId, then options
      ReserveVisitService.deleteVisit(null, null);
    },
    {
      onSuccess: handleVisitCanceledSuccessfully,
      onError: handleVisitCanceledError,
    }
  );

  const handleSubmitDeleteVisit = () => {
    cancelVisitMutation.mutate();
  }

  const handleCancelationDialog = () => {
    setOpenCancelConfirmDialog((prevState) => !prevState);
  };

  return (
    <div>
      <Dialog
        open={openCancelConfirmDialog}
        onClose={handleCancelationDialog}
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
            <Button size="small" color="error" onClick={handleSubmitDeleteVisit}>
              CANCEL VISIT
            </Button>
            <Button
              size="small"
              color={"primary"}
              onClick={handleCancelationDialog}
            >
              GO BACK
            </Button>
          </CardActions>
        </Card>
      </Dialog>
      <Typography variant={"h5"}>Patient reserved visits</Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleCancelationDialog}
      >
        CANCEL VISIT
      </Button>
    </div>
  );
};

export default PatientReservedVisits;
