import React from 'react';
import ReserveVisitDateTile from './ReserveVisitDateTile';
import ReserveVisitDoctorTile from './ReserveVisitDoctorTile'; 
import { Box, Typography }  from '@mui/material';


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
                <Typography varaint="h3" color={"primary.main"} fontWeight={"bold"}>
                  OR
                </Typography>
                <ReserveVisitDoctorTile optionFunc={setReservationOption} />
              </Box>
            </>
}