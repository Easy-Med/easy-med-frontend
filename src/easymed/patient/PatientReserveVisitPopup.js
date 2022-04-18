import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import SelectDateField from './reserve-visit-components/SelectDateField';
import ReserveVisitDateTile from './reserve-visit-components/ReserveVisitDateTile';
import ReserveVisitDoctorTile from './reserve-visit-components/ReserveVisitDoctorTile';
import ReserveVisitTitle from './reserve-visit-components/ReserveVisitTitle';

  function PatientReserveVisitPopup({children}) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleDateChange = (newSelectedDate) => {
        setSelectedDate(newSelectedDate);
    }
  
    return (
      <>
        <Button variant="contained" onClick={handleOpen} color={"primary"}>
          RESERVE VISIT
        </Button>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <Box
            sx={{
              width: "100%",
              mt: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              }}
            >
              <ReserveVisitTitle/>
              <Box
                sx={{
                  mt: 4,
                  mb: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <ReserveVisitDateTile />
                <Typography varaint="h3" color={"primary.main"} fontWeight={"bold"}>
                  OR
                </Typography>
                <ReserveVisitDoctorTile />
              </Box>
            </Box>
          </Dialog>
        
      </>
    );
  }

export default PatientReserveVisitPopup;
