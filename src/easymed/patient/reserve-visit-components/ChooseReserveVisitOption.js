import React from 'react';
import ReserveVisitDateTile from './ReserveVisitDateTile';
import ReserveVisitDoctorTile from './ReserveVisitDoctorTile'; 
import { Box }  from '@mui/material';


export default function ChooseReserveVisitOption({ setReservationOption }) {
    return <>
            <Box
                sx={{
                  width: "100%",
                  mt: 4,
                  mb: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <ReserveVisitDateTile optionFunc={setReservationOption} />
                <ReserveVisitDoctorTile optionFunc={setReservationOption} />
              </Box>
            </>
}