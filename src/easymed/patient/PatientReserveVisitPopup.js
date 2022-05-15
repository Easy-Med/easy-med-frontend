import * as React from "react";
import { useState } from "react";
import { Box, Dialog } from "@mui/material";
import ReserveVisitTitle from "./reserveNewVisit/ReserveVisitTitle";
import ChooseReserveVisitOption from "./reserveNewVisit/ChooseReserveVisitOption";
import ReserveVisitForm from "./reserveNewVisit/ReserveVisitForm";
import ReserveVisitService from "../../app/api/ReserveVisitService";
import { useMutation } from "react-query";
import useAuth from "../../app/auth/UseAuth";

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
  const [reservationOption, setReservationOption] = useState("default");
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState([]);
  const auth = useAuth();

  const isAllDataComplete =
    formData.date &&
    formData.specialization &&
    formData.doctor &&
    formData.term;

  const { mutate, isLoading } = useMutation(() => {
    if (isAllDataComplete) {
      return ReserveVisitService.reserveVisit(
        formData.date,
        formData.doctor.id,
        auth.authData.id,
        {
          onSuccess: handleSuccessfulVisitReservation,
        }
      );
    }

    if (reservationOption === "date") {
      if (formData.date) {
        if (formData.specialization) {
          if (formData.doctor)
            return ReserveVisitService.getDoctorFreeterms(
              formData.doctor.id,
              formData.date,
              { onSuccess: handleResponseData }
            );
          return ReserveVisitService.getDoctorsWthSpecialization(
            formData.specialization,
            { onSuccess: handleResponseData }
          );
        }
        return ReserveVisitService.getSpecializations({
          onSuccess: handleResponseData,
        });
      }
    }

    if (reservationOption === "doctor") {
      if (formData.specialization) {
        if (formData.doctor) {
          if (formData.date) {
            return ReserveVisitService.getDoctorFreeterms(
              formData.doctor.id,
              formData.date,
              { onSuccess: handleResponseData }
            );
          }
          return ReserveVisitService.getDoctorFreeDates(formData.doctor.id, {
            onSuccess: handleResponseData,
          });
        }
        return ReserveVisitService.getDoctorsWthSpecialization(
          formData.specialization,
          { onSuccess: handleResponseData }
        );
      }
      return ReserveVisitService.getSpecializations({
        onSuccess: handleResponseData,
      });
    }
  });

  React.useEffect(() => {
    if (!formData.term) mutate();
  }, [formData, mutate, reservationOption]);

  const handleResponseData = (response) => {
    const { data } = response;
    setData(data);
  };

  const handleSuccessfulVisitReservation = (response) => {
    setShowSuccessAlert(true);
    handleClose();
  }

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setFormData(initialState);
      setReservationOption("default");
    }, 200);
  };

  const handleSubmitVisit = () => {
    mutate();
  };

  const formDataHandlers = {
    date: (newValue) => {
      setFormData({ ...formData, date: newValue });
    },
    specialization: (event, newValue) => {
      setFormData({ ...formData, specialization: newValue });
    },
    doctor: (event, newValue) => {
      setFormData({ ...formData, doctor: newValue });
    },
    term: (event, newValue) => {
      setFormData({ ...formData, term: newValue });
    },
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            my: 2,
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
              loading={isLoading}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default PatientReserveVisitPopup;
