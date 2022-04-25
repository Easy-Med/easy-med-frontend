import * as React from "react";
import { Box, Dialog } from "@mui/material";
import ReserveVisitTitle from "./reserve-visit-components/ReserveVisitTitle";
import ChooseReserveVisitOption from "./reserve-visit-components/ChooseReserveVisitOption";
import useFetch from "react-fetch-hook";
import ReserveVisitByOption from "./reserve-visit-components/ReserveVisitByOption";
import { apiEndpoints } from './reserve-visit-components/backendApi';

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
    // GET PATIENT ID AND POST VISIT
    setShowSuccessAlert(true);
    handleClose();
  };

  const values = {
    date: selectedDate,
    specialization: selectedSpecialization,
    doctor: selectedDoctor,
    term: selectedTerm,
  };

  const valueChangers = {
    date: setSelectedDate,
    specialization: setSelectedSpecialization,
    doctor: setSelectedDoctor,
    term: setSelectedTerm,
    api: setApiEndpoint,
  };

  const lists = {
    specializations: specializationsList,
    doctors: doctorsList,
    terms: termsAvailable,
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
          ) : (
            <ReserveVisitByOption
              option={reservationOption}
              isAllDataComplete={isAllDataComplete}
              handleSubmitVisit={handleSubmitVisit}
              values={values}
              valueChangers={valueChangers}
              lists={lists}
              loading={isLoading}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default PatientReserveVisitPopup;
