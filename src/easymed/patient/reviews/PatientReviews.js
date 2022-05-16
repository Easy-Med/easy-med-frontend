import React from "react";
import Box from "@mui/material/Box";
import PageBox from "../../generic/PageBox";
import { Typography } from "@mui/material";
import PostReviewCard from "./PostReviewCard";
import ReviewCard from "../../generic/reviews/ReviewCard";
import useAuth from "../../../app/auth/UseAuth";
import { useQuery } from "react-query";
import ReviewsService from "../../../app/api/ReviewsService";
import ReviewMapper from "./ReviewMapper";

const postReviewInfos = [
  {
    doctorName: "",
    doctorSpecialization: "Alergolog",
    dateOfVisit: "04.03.2022",
  },
  {
    doctorName: "",
    doctorSpecialization: "Alergolog",
    dateOfVisit: "04.03.2022",
  },
];

const PatientReviews = () => {
  const auth = useAuth();
  const { role, id } = auth.authData;

  const reviewQuery = useQuery(`${role}Reviews`, () =>
    ReviewsService.getReviewsFor(role, id)
  );

  if (reviewQuery.isError) {
    return (
      <Typography p={2} variant={"h5"}>
        Can't load reviews :/. Try again later!
      </Typography>
    );
  }

  if (reviewQuery.isLoading) {
    return (
      <PageBox bgcolor={"grey.900"}>
        <Typography variant={"h5"} mb={4}>
          Loading...
        </Typography>
      </PageBox>
    );
  }

  return (
    <PageBox>
      <Typography variant={"h5"} color={"info"}>
        Post Review
      </Typography>
      <Box sx={{ mt: 1, mb: 3 }}>
        {postReviewInfos.map((info, idx) => (
          <PostReviewCard key={idx} postReviewInfo={info} />
        ))}
      </Box>
      <Typography variant={"h5"} color={"info"}>
        Posted reviews
      </Typography>
      <Box
        sx={{ mt: 1, mb: 3, display: "flex", flexDirection: "column", gap: 4 }}
      >
        {reviewQuery.data.length !== 0 ? (
          reviewQuery.data.map((review) => (
            <ReviewCard
              key={review.id}
              review={ReviewMapper.map(review, role)}
            />
          ))
        ) : (
          <Typography variant={"h6"}>
            Write your first review today! ✨
          </Typography>
        )}
      </Box>
    </PageBox>
  );
};

export default PatientReviews;
