import React from "react";
import ReserveVisitByDate from "./ReserveVisitByDate";
import ReserveVisitByDoctor from "./ReserveVisitByDoctor";
import { Button, Box, CircularProgress } from "@mui/material";
import ReserveVisitForm from "./ReserveVisitForm";

export default function ReserveVisitForm({
  option,
  isAllDataComplete,
  handleSubmitVisit,
  formData,
  handleFormData,
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
        <form style={{ width: "100%" }} onSubmit={handleSubmitVisit}>

        {option === "date" ? (
          <>
            <SelectOptionField
              type="date"
              label="Select date"
              value={formData.date}
              valueChanger={handleFormData}
              displayCondition={!formData.date}
            />
            <SelectOptionField
              type="specialization"
              label="Select specialization"
              value={formData.specialization}
              valueChanger={handleFormData}
              options={lists.specializations}
              getOptionLabel={(option) => option.toString()}
              displayCondition={!formData.specialization && formData.date}
            />
            <SelectOptionField
              type="doctor"
              label="Select doctor"
              value={formData.doctor}
              valueChanger={handleFormData}
              options={lists.doctors}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName} , lok: ${option.officeLocation}`
              }
              displayCondition={!formData.doctor && formData.specialization && formData.date}
            />
          </>
        ) : (
          <>
            <SelectOptionField
              type="specialization"
              label="Select specialization"
              value={formData.specialization}
              valueChanger={handleFormData}
              options={lists.specializations}
              getOptionLabel={(option) => option.toString()}
              displayCondition={!formData.specialization}
            />
            <SelectOptionField
              type="doctor"
              label="Select doctor"
              value={formData.doctor}
              valueChanger={handleFormData}
              options={lists.doctors}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName} , lok: ${option.officeLocation}`
              }
              displayCondition={!formData.doctor && formData.specialization}
            />
            <SelectOptionField
              type="date"
              label="Select date"
              value={formData.date}
              valueChanger={handleFormData}
              displayCondition={!formData.date && formData.specialization && formData.doctor}
            />
          </>
        )}

        <SelectOptionField
          type="term"
          label="Select term"
          value={formData.term}
          valueChanger={handleFormData}
          options={lists.terms}
          getOptionLabel={(option) =>
            `${moment(option.visitDateTime, "YYYY-MM-DDTHH:mm:ss.SSS").format(
              "d MMMM YYYY, h:mma"
            )} (${option.dayOfWeek})`
          }
          displayCondition={
            option === "date" ? formData.doctor : formData.date
          }
        />
     

        {isAllDataComplete && (
          <Button
            variant="contained"
            type="submit"
            color={"primary"}
            onClick={handleSubmitVisit}
          >
            CONFIRM VISIT
          </Button>
        )}
         </form>
      </Box>
    </>
  );
}
