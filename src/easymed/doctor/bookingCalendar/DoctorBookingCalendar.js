import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./bookingCalendarStyles.scss";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import BookingCalendarService from "../../../app/api/BookingCalendarService";
import useAuth from "../../../app/auth/UseAuth";

const localizer = momentLocalizer(moment);

const DoctorBookingCalendar = () => {
  const [fetchedAvailability, setFetchedAvailability] = useState([]);
  const [availabilityToSave, setAvailabilityToSave] = useState([]);
  const [displayedAvailability, setDisplayedAvailability] = useState([]);
  const auth = useAuth();
  const id = auth.authData.id;

  useQuery(
    "bookingCalendarAvailability",
    () => BookingCalendarService.getAvailabilityForDoctor(id),
    {
      onSuccess: (data) => {
        setFetchedAvailability(data);
      },
    }
  );

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setAvailabilityToSave((prev) => [
        ...prev,
        { start, end, title: "Available" },
      ]);
    },
    [setAvailabilityToSave]
  );

  useEffect(() => {
    setDisplayedAvailability([...fetchedAvailability, ...availabilityToSave]);
  }, [fetchedAvailability, availabilityToSave]);

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
    console.log("POST to DB with new events");
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
        events={displayedAvailability}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
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
    </Box>
  );
};

export default DoctorBookingCalendar;
