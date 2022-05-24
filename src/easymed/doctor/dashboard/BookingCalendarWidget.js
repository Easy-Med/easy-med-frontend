import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import { Paper } from "@mui/material";
import { useQuery } from "react-query";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import CalendarWidgetMapper from "./CalendarWidgetMapper";
import useAuth from "../../../app/auth/UseAuth"; // a plugin!

const eventTimeFormat = {
  hour: "2-digit",
  minute: "2-digit",
  meridiem: false,
};

const BookingCalendarWidget = () => {
  const auth = useAuth();
  const { id } = auth.authData;

  const reservedVisitsQuery = useQuery(`doctorVisits`, () =>
    ReservedVisitsService.getReservedVisitsFor("doctor", id, {})
  );

  return (
    <Paper sx={{ p: 2, width: "fit-content" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        contentHeight={"auto"}
        events={
          reservedVisitsQuery.isSuccess
            ? reservedVisitsQuery.data.map(CalendarWidgetMapper.map)
            : []
        }
        eventTimeFormat={eventTimeFormat}
      />
    </Paper>
  );
};

export default BookingCalendarWidget;
