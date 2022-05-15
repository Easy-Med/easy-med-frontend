import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Paper, Rating, Typography, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";

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
          {review.name} <strong>{review.surname}</strong>
        </Typography>
        <Rating
          sx={{ ml: -0.5, mb: 0.5 }}
          defaultValue={review.stars}
          precision={0.5}
          readOnly
        />
        <Typography variant={"body2"} color={"info"}>
          {review.date}
        </Typography>
      </Box>
      <Divider
        orientation={matchesMobile ? "horizontal" : "vertical"}
        flexItem
      />
      <Typography width={"100%"} p={2} textAlign={"center"}>
        {review.content}
      </Typography>
    </Paper>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    date: PropTypes.string,
    stars: PropTypes.number,
  }).isRequired,
};

export default ReviewCard;