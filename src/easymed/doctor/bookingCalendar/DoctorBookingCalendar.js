import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./bookingCalendarStyles.scss";
import Box from "@mui/material/Box";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import BookingCalendarService from "../../../app/api/BookingCalendarService";
import useAuth from "../../../app/auth/UseAuth";
import BookingCalendarMapper from "./BookingCalendarMapper";
import ResultSnackbar from "../../generic/ResultSnackbar";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";

const localizer = momentLocalizer(moment);

const DoctorBookingCalendar = () => {
  const [fetchedAvailability, setFetchedAvailability] = useState([]);
  const [availabilityToSave, setAvailabilityToSave] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const auth = useAuth();
  const id = auth.authData.id;

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const reservedVisitsQuery = useQuery("reservedVisits", () =>
    ReservedVisitsService.getReservedVisitsFor("doctor", id, {})
  );

  const availabilityQuery = useQuery(
    "bookingCalendarAvailability",
    () => BookingCalendarService.getAvailabilityForDoctor(id),
    {
      onSuccess: (data) => {
        const mappedData = data.map(BookingCalendarMapper.mapAvailability);
        setFetchedAvailability(mappedData);
      },
    }
  );

  const addAvailabilityMutation = useMutation(
    "addAvailability",
    () =>
      BookingCalendarService.addAvailabilityForDoctor(
        id,
        BookingCalendarMapper.mapForAddAvailabilityRequest(availabilityToSave)
      ),
    {
      onSuccess: () => {
        setAvailabilityToSave([]);
        availabilityQuery.refetch();
        showSnackbar("success", "Availabilities added successfully!");
      },
      onError: () => {
        showSnackbar("error", "Can't add availability. Try again later!");
      },
    }
  );

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const isEventNotInterfering = (start, end) => {
        return !availabilityToSave.some(
          (savedDate) =>
            (savedDate.start < start && savedDate.end > start) ||
            (savedDate.start < end && savedDate.end > end) ||
            (+savedDate.start === +start && +savedDate.end === +end)
        );
      };

      if (isEventNotInterfering(start, end)) {
        setAvailabilityToSave((prev) => [
          ...prev,
          { start, end, title: "Available" },
        ]);
      }
    },
    [availabilityToSave]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: Date.now(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const saveNewEvents = () => {
    addAvailabilityMutation.mutate();
  };

  const removeEventsToSave = () => {
    setAvailabilityToSave([]);
  };

  return (
    <Box sx={{ flex: 1, mt: 1 }}>
      <Calendar
        dayLayoutAlgorithm={"no-overlap"}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={fetchedAvailability.concat(availabilityToSave)}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        backgroundEvents={
          reservedVisitsQuery.isSuccess
            ? reservedVisitsQuery.data.map(
                BookingCalendarMapper.mapReservedVisit
              )
            : []
        }
      />
      {availabilityToSave.length > 0 && (
        <div>
          <Button
            variant={"contained"}
            size={"small"}
            sx={{ position: "fixed", bottom: "80px", right: "20px" }}
            onClick={saveNewEvents}
          >
            Save changes
          </Button>
          <Button
            variant={"contained"}
            color={"error"}
            size={"small"}
            sx={{ position: "fixed", bottom: "40px", right: "20px" }}
            onClick={removeEventsToSave}
          >
            Cancel
          </Button>
        </div>
      )}
      <ResultSnackbar
        open={openSnackbar}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default DoctorBookingCalendar;
