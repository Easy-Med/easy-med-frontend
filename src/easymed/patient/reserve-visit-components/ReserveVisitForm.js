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
                valueChanger={formDataHandlers.date}
                displayCondition={!formData.date}
              />
              <SelectOptionField
                type="specialization"
                label="Select specialization"
                value={formData.specialization}
                valueChanger={formDataHandlers.specialization}
                options={selectOptions}
                getOptionLabel={(option) => option.toString()}
                displayCondition={!formData.specialization && formData.date}
              />
              <SelectOptionField
                type="doctor"
                label="Select doctor"
                value={formData.doctor}
                valueChanger={formDataHandlers.doctor}
                options={selectOptions}
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
                options={selectOptions}
                getOptionLabel={(option) => option.toString()}
                displayCondition={!formData.specialization}
              />
              <SelectOptionField
                type="doctor"
                label="Select doctor"
                value={formData.doctor}
                valueChanger={formDataHandlers.doctor}
                options={selectOptions}
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
              />
            </>
          )}

          <SelectOptionField
            type="term"
            label="Select term"
            value={formData.term}
            valueChanger={formDataHandlers.term}
            options={selectOptions}
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
