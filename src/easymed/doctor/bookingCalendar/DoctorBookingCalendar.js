import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./bookingCalendarStyles.scss";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";

const initEvents = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
];

const localizer = momentLocalizer(moment);

const DoctorBookingCalendar = () => {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [eventsToSave, setEventsToSave] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setEventsToSave((prev) => [...prev, { start, end, title: "Available" }]);
    },
    [setEventsToSave]
  );

  useEffect(() => {
    setDisplayedEvents([...fetchedEvents, ...eventsToSave]);
  }, [fetchedEvents, eventsToSave]);

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
    setEventsToSave([]);
  };

  return (
    <Box sx={{ flex: 1, mt: 1 }}>
      <Calendar
        dayLayoutAlgorithm={"no-overlap"}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={displayedEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
      />
      {eventsToSave.length > 0 && (
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
