import React from "react";
import ReserveVisitByDate from "./ReserveVisitByDate";
import ReserveVisitByDoctor from "./ReserveVisitByDoctor";


export default function ReserveVisitByOption({
  option,
  isAllDataComplete,
  handleSubmitVisit,
  values,
  valueChangers,
  lists,
  loading,
}) {
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
            loading={loading}
          />
        ) : (
          <ReserveVisitByDoctor
            values={values}
            valueChangers={valueChangers}
            lists={lists}
            loading={loading}
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
