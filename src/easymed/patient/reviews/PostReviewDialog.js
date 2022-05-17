import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from "moment";
import {Rating, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useState} from "react";

const initFormData = {
  rating: "0",
  description: ''
}

const PostReviewDialog = ({postReviewInfo}) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initFormData)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData(initFormData)
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('SUBMIT')
    console.log(formData)
    handleClose()
  }

  return (
    <div>
      <Button sx={{ mt: { xs: 2, sm: 0 } }} variant={"outlined"} onClick={handleClickOpen}>
        Post review
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle>Write your review ✨</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Tell us about how your visit went with <strong>Dr. {postReviewInfo.doctor.firstName} {postReviewInfo.doctor.lastName}</strong>.<br/>The visit was <strong>{moment(postReviewInfo.dateOfVisit).fromNow()}</strong>.
          </DialogContentText>
          <Divider />
          <Typography mt={1} component="legend">Rating</Typography>
          <Rating name={"rating"} value={parseInt(formData.rating)} onChange={handleChange} />
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
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'text.secondary'}} onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostReviewDialog;