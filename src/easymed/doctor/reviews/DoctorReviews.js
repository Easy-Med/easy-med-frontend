import React from "react";
import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import ReviewCard from "../../generic/reviews/ReviewCard";
import PageBox from "../../generic/PageBox";
import { useQuery } from "react-query";
import ReviewsService from "../../../app/api/ReviewsService";
import useAuth from "../../../app/auth/UseAuth";
import ReviewMapper from "../../patient/reviews/ReviewMapper";

const DoctorReviews = () => {
  const auth = useAuth();
  const { role, id } = auth.authData;

  const reviewQuery = useQuery(`${role}Reviews`, () =>
    ReviewsService.getReviewsFor(role, id)
  );

  if (reviewQuery.isError) {
    return (
      <PageBox>
        <Typography p={2} variant={"h5"}>
          Can't load reviews :/. Try again later!
        </Typography>
      </PageBox>
    );
  }

  if (reviewQuery.isLoading) {
    return (
      <PageBox bgcolor={"grey.900"}>
        <Typography variant={"h5"} mb={4}>
          Reviews about you ✨
        </Typography>
        <Skeleton variant="rectangular" width={"100%"} height={210} />
      </PageBox>
    );
  }

  if (reviewQuery.isSuccess && reviewQuery.data.length === 0) {
    return (
      <PageBox>
        <Typography color={"info"} variant={"h5"}>
          Do your best and get your first review today! ✨
        </Typography>
      </PageBox>
    );
  }

  return (
    <PageBox bgcolor={"grey.900"}>
      <Typography variant={"h5"} mb={4}>
        Reviews about you ✨
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        {reviewQuery.data.map((review) => (
          <ReviewCard key={review.id} review={ReviewMapper.map(review, role)} />
        ))}
      </Box>
    </PageBox>
  );
};

export default DoctorReviews;
