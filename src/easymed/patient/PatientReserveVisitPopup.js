import * as React from "react";
import { Box, Dialog, Button } from "@mui/material";
import SelectOptionField from "./reserve-visit-components/SelectOptionField";
import ReserveVisitTitle from "./reserve-visit-components/ReserveVisitTitle";
import ChooseReserveVisitOption from "./reserve-visit-components/ChooseReserveVisitOption";

const specializationsList = ["Orthopedic", "Kardiologist", "Radiologist"];
const doctorsList = ["Maciej Bulwa", "Adrian Kunsz", "Barbara Telejko"];

function PatientReserveVisitPopup({
  openDialog,
  setOpenDialog,
  setShowSuccessAlert,
  ...props
}) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [reservationOption, setReservationOption] = React.useState("default");
  const [selectedSpecialization, setSelectedSpecialization] =
    React.useState(null);
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);
  const isAllDataComplete =
    selectedDate && selectedSpecialization && selectedDoctor;

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setReservationOption("default");
      setSelectedDate(null);
      setSelectedSpecialization(null);
      setSelectedDoctor(null);
    }, 400);
  };

  const handleSubmitVisit = () => {
    setShowSuccessAlert(true);
    handleClose();
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            mt: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ReserveVisitTitle />
          {reservationOption === "default" ? (
            <ChooseReserveVisitOption
              setReservationOption={setReservationOption}
            />
          ) : reservationOption === "date" ? (
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
              <SelectOptionField
                type="date"
                value={selectedDate}
                valueChanger={setSelectedDate}
              />
              {selectedDate ? (
                <SelectOptionField
                  type="specialization"
                  label="Select specialization"
                  value={selectedSpecialization}
                  valueChanger={setSelectedSpecialization}
                  options={specializationsList}
                />
              ) : null}

              {selectedDate && selectedSpecialization ? (
                <SelectOptionField
                  type="doctor"
                  label="Select doctor"
                  value={selectedDoctor}
                  valueChanger={setSelectedDoctor}
                  options={doctorsList}
                />
              ) : null}

              {isAllDataComplete ? (
                <Button
                  variant="contained"
                  color={"primary"}
                  onClick={handleSubmitVisit}
                >
                  CONFIRM VISIT
                </Button>
              ) : null}
            </Box>
          ) : (
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
              <SelectOptionField
                type="specialization"
                label="Select specialization"
                value={selectedSpecialization}
                valueChanger={setSelectedSpecialization}
                options={specializationsList}
              />
              {selectedSpecialization ? (
                <SelectOptionField
                  type="doctor"
                  label="Select doctor"
                  value={selectedDoctor}
                  valueChanger={setSelectedDoctor}
                  options={doctorsList}
                />
              ) : null}

              {selectedDoctor && selectedSpecialization ? (
                <SelectOptionField
                  type="date"
                  value={selectedDate}
                  valueChanger={setSelectedDate}
                />
              ) : null}

              {isAllDataComplete ? (
                <Button
                  variant="contained"
                  color={"primary"}
                  onClick={handleSubmitVisit}
                >
                  CONFIRM VISIT
                </Button>
              ) : null}
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default PatientReserveVisitPopup;
