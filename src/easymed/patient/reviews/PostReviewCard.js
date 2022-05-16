import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const PostReviewCard = ({ sx = [], postReviewInfo }) => {
  return (
    <Paper
      sx={[
        {
          p: 2,
          display: "flex",
          alignItems: { xs: "initial", sm: "flex-start" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box>
        <Box mb={3}>
          <Typography variant={"h5"}>
            <strong>Dr.</strong> {postReviewInfo.doctor.firstName}{" "}
            <strong>{postReviewInfo.doctor.lastName}</strong>
          </Typography>
          <Typography variant={"subtitle1"}>
            {postReviewInfo.doctor.medicalSpecialization}
          </Typography>
        </Box>
        <Typography>
          Date of visit: <strong>{postReviewInfo.dateOfVisit}</strong>
        </Typography>
      </Box>
      <Button sx={{ mt: { xs: 2, sm: 0 } }} variant={"outlined"}>
        Post review
      </Button>
    </Paper>
  );
};

export default PostReviewCard;