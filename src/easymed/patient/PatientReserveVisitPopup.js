import * as React from "react";
import { Box, Dialog } from "@mui/material";
import ReserveVisitTitle from "./reserve-visit-components/ReserveVisitTitle";
import ChooseReserveVisitOption from "./reserve-visit-components/ChooseReserveVisitOption";
import ReserveVisitForm from "./reserve-visit-components/ReserveVisitForm";
import ReserveVisitService from "../../app/api/ReserveVisitService";
import { useMutation } from "react-query";

const initialState = {
  date: null,
  specialization: null,
  doctor: null,
  term: null,
};

function PatientReserveVisitPopup({
  openDialog,
  setOpenDialog,
  setShowSuccessAlert,
  ...props
}) {
  const [reservationOption, setReservationOption] = React.useState("default");
  const [formData, setFormData] = React.useState(initialState);
  const [data, setData] = React.useState([]);

  const isAllDataComplete =
    formData.date &&
    formData.specialization &&
    formData.doctor &&
    formData.term;

  const handleResponse = (response) => {
    const { data } = response;
    setData(data);
    console.log(data);
  };

  const reserveVisitMutation = useMutation(() => {
    if (reservationOption === "date") {
      if (formData.date) {
        if (formData.specialization) {
          if (formData.doctor)
            return ReserveVisitService.getDoctorFreeterms(
              formData.doctor.id,
              formData.date,
              { onSuccess: handleResponse }
            );
          return ReserveVisitService.getDoctorsWthSpecialization(
            formData.specialization,
            { onSuccess: handleResponse }
          );
        }
        return ReserveVisitService.getSpecializations({
          onSuccess: handleResponse,
        });
      }
    }
  });

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setFormData(initialState);
      setReservationOption("default");
    }, 200);
  };

  const handleSubmitVisit = () => {
    setShowSuccessAlert(true);
    handleClose();
  };

  const formDataHandlers = {
    date: (newValue) => {
      setFormData({ ...formData, date: newValue});
      setTimeout(() => {reserveVisitMutation.mutate();}, 1000);
    },
    specialization: (newValue) => {
      setFormData({ ...formData, specialization: newValue });
      reserveVisitMutation.mutate();
    },
    doctor: (newValue) => {
      setFormData({ ...formData, doctor: newValue });
      reserveVisitMutation.mutate();
    },
    term: (newValue) => {
      setFormData({ ...formData, term: newValue });
      reserveVisitMutation.mutate();
    },
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
              formDataHandlers={formDataHandlers}
              selectOptions={data}
              loading={reserveVisitMutation.isLoading}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default PatientReserveVisitPopup;
