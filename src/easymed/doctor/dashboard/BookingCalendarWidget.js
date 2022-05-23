import React from "react";
import Box from "@mui/material/Box";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const BookingCalendarWidget = () => {
  return (
    <Box width={"100%"}>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        contentHeight={'auto'}
      />
    </Box>
  );
};

export default BookingCalendarWidget;
