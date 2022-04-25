import React from "react";
import ReserveVisitByDate from "./ReserveVisitByDate";
import ReserveVisitByDoctor from "./ReserveVisitByDoctor";
import { Button, Box, CircularProgress } from "@mui/material";

export default function ReserveVisitByOption({
  option,
  isAllDataComplete,
  handleSubmitVisit,
  values,
  valueChangers,
  lists,
  loading,
}) {
  if (loading) {
    return (
      <Box
        sx={{
          width: "80%",
          height: "330px",
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "80%",
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        {option === "date" ? (
          <ReserveVisitByDate
            values={values}
            valueChangers={valueChangers}
            lists={lists}
          />
        ) : (
          <ReserveVisitByDoctor
            values={values}
            valueChangers={valueChangers}
            lists={lists}
          />
        )}

        {isAllDataComplete && (
          <Button
            variant="contained"
            color={"primary"}
            onClick={handleSubmitVisit}
          >
            CONFIRM VISIT
          </Button>
        )}
      </Box>
    </>
  );
}
