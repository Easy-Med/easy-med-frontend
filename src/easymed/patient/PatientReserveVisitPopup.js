import * as React from "react";
import { Box, Dialog, Button, CircularProgress } from "@mui/material";
import SelectOptionField from "./reserve-visit-components/SelectOptionField";
import ReserveVisitTitle from "./reserve-visit-components/ReserveVisitTitle";
import ChooseReserveVisitOption from "./reserve-visit-components/ChooseReserveVisitOption";
import useFetch from "react-fetch-hook";
import moment from "moment";

const apiEndpoints = {
  specialization:
    "https://easy-med-api.herokuapp.com/api/doctor/specializations",
  doctorWithSpec: "https://easy-med-api.herokuapp.com/api/doctor",
  doctorFreeTerms: "https://easy-med-api.herokuapp.com/api/doctor/freeterms",
};

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
  const [selectedTerm, setSelectedTerm] = React.useState(null);

  const [doctorsList, setDoctorsList] = React.useState([]);
  const [specializationsList, setSpecializationsList] = React.useState([]);
  const [termsAvailable, setTermsAvailable] = React.useState([]);

  const [apiEndpoint, setApiEndpoint] = React.useState("");

  const isAllDataComplete =
    selectedDate && selectedSpecialization && selectedDoctor && selectedTerm;

  const { isLoading, data } = useFetch(apiEndpoint);


  React.useEffect(() => {
    if (data && apiEndpoint.startsWith(apiEndpoints.specialization)) {
      setSpecializationsList(data);
    }

    if (data && apiEndpoint.startsWith(apiEndpoints.doctorFreeTerms)) {
      setTermsAvailable(data);
    }

    if (data && apiEndpoint.startsWith(`${apiEndpoints.doctorWithSpec}?`)) {
      setDoctorsList(data);
    }

  }, [data, apiEndpoint]);

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setReservationOption("default");
      setSelectedDate(null);
      setSelectedSpecialization(null);
      setSelectedDoctor(null);
      setSelectedTerm(null);
    }, 200);
  };

  const handleSubmitVisit = () => {
    setShowSuccessAlert(true);
    handleClose();
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
        {isLoading ? (
          <CircularProgress />
        ) : (
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
                  label="Select date"
                  value={selectedDate}
                  valueChanger={(date) => {
                    setSelectedDate(date);
                    setSelectedSpecialization(null);
                    setApiEndpoint(apiEndpoints.specialization);
                  }}
                />
                {selectedDate && (
                  <SelectOptionField
                    type="specialization"
                    label="Select specialization"
                    value={selectedSpecialization}
                    valueChanger={(spec) => {
                      setSelectedSpecialization(spec);
                      setSelectedDoctor(null);
                      setSelectedTerm(null);
                      if (spec) {
                        setApiEndpoint(
                          `${apiEndpoints.doctorWithSpec}?specialization=${spec}`
                        );
                      } else {
                        setApiEndpoint(apiEndpoints.specialization);
                      }
                    }}
                    options={specializationsList}
                    getOptionLabel={(option) => option.toString()}
                    loading={isLoading}
                  />
                )}
                {selectedDate && selectedSpecialization && (
                  <SelectOptionField
                    type="doctor"
                    label="Select doctor"
                    value={selectedDoctor}
                    valueChanger={(doctor) => {
                      setSelectedDoctor(doctor);
                      setSelectedTerm(null);
                      if (doctor) {
                        setApiEndpoint(
                          `${apiEndpoints.doctorFreeTerms}?doctorId=${
                            doctor.id
                          }&visitDateTime=${moment(
                            selectedDate,
                            "DD/MM/YYYY"
                          ).format("YYYY-MM-DD")}`
                        );
                      } else {
                        setApiEndpoint(
                          `${apiEndpoints.doctorWithSpec}?specialization=${selectedSpecialization}`
                        );
                      }
                    }}
                    options={doctorsList}
                    getOptionLabel={(option) =>
                      `${option.firstName} ${option.lastName} , lok: ${option.officeLocation}`
                    }
                    loading={isLoading}
                  />
                )}

                {selectedDate && selectedSpecialization && selectedDoctor && (
                  <SelectOptionField
                    type="term"
                    label="Select term"
                    value={selectedTerm}
                    valueChanger={setSelectedTerm}
                    options={termsAvailable}
                    getOptionLabel={(option) =>
                      `${option.visitDateTime}, ${option.dayOfWeek}`
                    }
                    loading={isLoading}
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
                  options={data}
                />
                {selectedSpecialization && (
                  <SelectOptionField
                    type="doctor"
                    label="Select doctor"
                    value={selectedDoctor}
                    valueChanger={setSelectedDoctor}
                    options={data}
                  />
                )}

                {selectedDoctor && selectedSpecialization && (
                  <SelectOptionField
                    type="date"
                    value={selectedDate}
                    valueChanger={setSelectedDate}
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
            )}
          </Box>
        )}
      </Dialog>
    </>
  );
}

export default PatientReserveVisitPopup;
