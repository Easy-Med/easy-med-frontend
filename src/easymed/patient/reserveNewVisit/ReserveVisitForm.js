import React from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import SelectOptionField from "./SelectOptionField";
import moment from "moment";

export default function ReserveVisitForm({
  option,
  isAllDataComplete,
  handleSubmitVisit,
  formData,
  formDataHandlers,
  selectOptions,
  loading,
}) {
  const handleDoctorFreeDays = (date) => {
    const convertedDate = moment(date).format("YYYY-MM-DD");

    return !selectOptions.find((element) => element.day === convertedDate);
  };

  const disableTodayAndDatesAfterMonth = (date) => {
    const today = new Date();
    const lastDateToChoose = new Date();
    lastDateToChoose.setDate(lastDateToChoose.getDate() + 30);


    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) || date > lastDateToChoose;
  };

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
          <>
            <SelectOptionField
              type="date"
              label="Select date"
              value={formData.date}
              valueChanger={formDataHandlers.date}
              displayCondition={!formData.date}
              disableDateFunc={disableTodayAndDatesAfterMonth}
            />
            <SelectOptionField
              type="specialization"
              label="Select specialization"
              value={formData.specialization}
              valueChanger={formDataHandlers.specialization}
              options={formData.specialization ? [] : selectOptions}
              displayCondition={!formData.specialization && formData.date}
            />
            <SelectOptionField
              type="doctor"
              label="Select doctor"
              value={formData.doctor}
              valueChanger={formDataHandlers.doctor}
              options={formData.doctor ? [] : selectOptions}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName} , lok: ${option.officeLocation}`
              }
              displayCondition={
                !formData.doctor && formData.specialization && formData.date
              }
            />
          </>
        ) : (
          <>
            <SelectOptionField
              type="specialization"
              label="Select specialization"
              value={formData.specialization}
              valueChanger={formDataHandlers.specialization}
              options={formData.specialization ? [] : selectOptions}
              getOptionLabel={(option) => option.toString()}
              displayCondition={!formData.specialization}
            />
            <SelectOptionField
              type="doctor"
              label="Select doctor"
              value={formData.doctor}
              valueChanger={formDataHandlers.doctor}
              options={formData.doctor ? [] : selectOptions}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName} , lok: ${option.officeLocation}`
              }
              displayCondition={!formData.doctor && formData.specialization}
            />
            <SelectOptionField
              type="date"
              label="Select date"
              value={formData.date}
              valueChanger={formDataHandlers.date}
              displayCondition={
                !formData.date && formData.specialization && formData.doctor
              }
              disableDateFunc={handleDoctorFreeDays}
            />
          </>
        )}

        <SelectOptionField
          type="term"
          label="Select term"
          value={formData.term}
          valueChanger={formDataHandlers.term}
          options={formData.term ? [] : selectOptions}
          getOptionLabel={(option) =>
            `${moment(option.visitDateTime).format("DD MMMM,  HH:mm")} (${
              option.dayOfWeek
            })`
          }
          displayCondition={option === "date" ? formData.doctor : formData.date}
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
      </Box>
    </>
  );
}
