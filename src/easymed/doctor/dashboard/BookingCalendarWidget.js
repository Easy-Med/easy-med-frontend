import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import {Paper, useMediaQuery} from "@mui/material";
import { useQuery } from "react-query";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import CalendarWidgetMapper from "./CalendarWidgetMapper";
import useAuth from "../../../app/auth/UseAuth";
import {useTheme} from "@emotion/react";

const eventTimeFormat = {
  hour: "2-digit",
  minute: "2-digit",
  meridiem: false,
};

const BookingCalendarWidget = () => {
  const auth = useAuth();
  const { id } = auth.authData;
  const theme = useTheme()
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const reservedVisitsQuery = useQuery(`doctorVisits`, () =>
    ReservedVisitsService.getReservedVisitsFor("doctor", id, {})
  );

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={'100%'}
        contentHeight={matchesDesktop ? "" : "auto"}
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
