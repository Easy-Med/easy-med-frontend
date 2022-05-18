import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Paper, Rating, Typography, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";
import moment from "moment";

const ReviewCard = ({ review, sx = [] }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={[
        {
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box display={"flex"} flexDirection={"column"} p={2} mr={2}>
        <Typography variant={"h6"} mb={4}>
          {review.firstName} <strong>{review.lastName}</strong>
        </Typography>
        <Rating
          sx={{ ml: -0.5, mb: 0.5 }}
          defaultValue={review.rating}
          precision={1}
          readOnly
        />
        <Typography variant={"body2"} color={"info"}>
          {moment(review.createdAt).fromNow()}
        </Typography>
      </Box>
      <Divider
        orientation={matchesMobile ? "horizontal" : "vertical"}
        flexItem
      />
      <Typography width={"100%"} p={2} textAlign={"center"}>
        {review.description}
      </Typography>
    </Paper>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    createdAt: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default ReviewCard;