import React from "react";
import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PostReviewDialog from "./PostReviewDialog";
import moment from "moment";

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
          Date of visit:{" "}
          <strong>
            {moment(postReviewInfo.dateOfVisit).format("DD.MM.YYYY")}
          </strong>
        </Typography>
      </Box>
      <PostReviewDialog postReviewInfo={postReviewInfo} />
    </Paper>
  );
};

export default PostReviewCard;