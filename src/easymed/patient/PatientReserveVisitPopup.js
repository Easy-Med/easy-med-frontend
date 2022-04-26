import * as React from "react";
import { Box, Dialog } from "@mui/material";
import ReserveVisitTitle from "./reserve-visit-components/ReserveVisitTitle";
import ChooseReserveVisitOption from "./reserve-visit-components/ChooseReserveVisitOption";
import ReserveVisitByOption from "./reserve-visit-components/ReserveVisitForm";
import ReserveVisitService from "../../app/api/ReserveVisitService";
import { useMutation } from 'react-query';

function PatientReserveVisitPopup({
  openDialog,
  setOpenDialog,
  setShowSuccessAlert,
  ...props
}) { 
  const [reservationOption, setReservationOption] = React.useState("default");
  const [formData, setFormData] = REact.useState(initialState);

  const [doctorsList, setDoctorsList] = React.useState([]);
  const [specializationsList, setSpecializationsList] = React.useState([]);
  const [termsAvailable, setTermsAvailable] = React.useState([]);

  const isAllDataComplete =
    selectedDate && selectedSpecialization && selectedDoctor && selectedTerm;

  const reserveVisitMutation = useMutation(() => {
    
  });  

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

  const handleFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }


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
            <ReserveVisitForm
              option={reservationOption}
              isAllDataComplete={isAllDataComplete}
              handleSubmitVisit={handleSubmitVisit}
              formData={formData}
              handleFormData={handleFormData}
              lists={lists}
              loading={reserveVisitMutation.isLoading}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default PatientReserveVisitPopup;
