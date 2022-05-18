import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { Rating, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useMutation, useQueryClient } from "react-query";
import ReviewsService from "../../../app/api/ReviewsService";
import ResultSnackbar from "../../generic/ResultSnackbar";

const initFormData = {
  rating: "0",
  description: "",
};

const PostReviewDialog = ({ postReviewInfo }) => {
  const [formData, setFormData] = useState(initFormData);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const queryClient = useQueryClient();

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const postReviewMutation = useMutation(
    () =>
      ReviewsService.postReviewForDoctorId(postReviewInfo.doctor.id, {
        ...formData,
        rating: parseInt(formData.rating),
      }),
    {
      onSuccess: () => {
        handleClose();
        showSnackbar("success", "Review posted successfully");

        queryClient.invalidateQueries("postReviewInfo");
        queryClient.invalidateQueries("patientReviews");
      },
      onError: () => {
        showSnackbar("error", "Can't post review. Try again later.");
      },
    }
  );

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setFormData(initFormData);
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postReviewMutation.mutate();
  };

  return (
    <div>
      <Button
        sx={{ mt: { xs: 2, sm: 0 } }}
        variant={"outlined"}
        onClick={handleClickOpen}
      >
        Post review
      </Button>
      <Dialog open={dialogOpen} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle>Write your review ✨</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Tell us about how your visit went with{" "}
            <strong>
              Dr. {postReviewInfo.doctor.firstName}{" "}
              {postReviewInfo.doctor.lastName}
            </strong>
            .<br />
            The visit was{" "}
            <strong>{moment(postReviewInfo.dateOfVisit).fromNow()}</strong>.
          </DialogContentText>
          <Divider />
          <Typography mt={1} component="legend">
            Rating
          </Typography>
          <Rating
            name={"rating"}
            value={parseInt(formData.rating)}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            multiline
            rows={4}
            label="Description"
            fullWidth
            variant="filled"
            name={"description"}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "text.secondary" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <ResultSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
};

export default PostReviewDialog;