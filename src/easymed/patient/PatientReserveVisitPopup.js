import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Box, MenuItem, TextField, Alert } from '@mui/material';
import SelectDateField from './reserve-visit-components/SelectDateField';
import ReserveVisitDateTile from './reserve-visit-components/ReserveVisitDateTile';
import ReserveVisitDoctorTile from './reserve-visit-components/ReserveVisitDoctorTile';
import ReserveVisitTitle from './reserve-visit-components/ReserveVisitTitle';
import { useFetchUrl } from './reserve-visit-components/useFetchUrl';
import CheckIcon from '@mui/icons-material/Check';

const specializationList = ['Orthopedic', 'Kardiologist','Radiologist'] 
const doctorsList = ['Maciej Bulwa', 'Adrian Kunsz','Barbara Telejko'] 

function PatientReserveVisitPopup() {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [reservationOption, setReservationOption] = React.useState("default");
    const [selectedSpecialization, setSelectedSpecialization] = React.useState('');
    const [selectedDoctor, setSelectedDoctor] = React.useState("");
    const isAllDataComplete = (selectedDate && selectedSpecialization !== '' && selectedDoctor !== '');
  
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false); 
      setTimeout(() => {
        setReservationOption("default"); 
        setSelectedDate(null); 
        setSelectedSpecialization('');
        setSelectedDoctor('');}
        , 400);   
    };

    const handleSubmitVisit = () => {
      console.log(selectedDate);
      console.log(selectedSpecialization);
      console.log(selectedDoctor);
      handleClose();
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
            {reservationOption === "default"   
              ? 
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
                  :
                  (reservationOption === "date" ? 
                  <Box
                  sx={{
                    width: "80%",
                    mt: 4,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <SelectDateField currentDate={selectedDate} onChange={setSelectedDate}/>
                  {selectedDate
                        ? 
                        <TextField label="Select specialization" 
                          value={selectedSpecialization} 
                          onChange={(event) => {setSelectedSpecialization(event.target.value)}} 
                          select
                          fullWidth
                          >
                     {specializationList.map((spec, idx) => <MenuItem key={idx} value={`S${idx}`}>{spec}</MenuItem>)}
                      </TextField> 
                        : 
                        null}

                  {(selectedDate && selectedSpecialization !== '')
                    ?
                    <TextField label="Select doctor" 
                          value={selectedDoctor} 
                          onChange={(event) => {setSelectedDoctor(event.target.value)}} 
                          select
                          fullWidth
                          >
                     {doctorsList.map((doc, idx) => <MenuItem key={idx} value={`S${idx}`}>{doc}</MenuItem>)}
                  </TextField> 
                    :
                    null
                  }

                  {isAllDataComplete ? <Button variant="contained" color={"primary"} onClick={handleSubmitVisit}>CONFIRM VISIT</Button> : null}
                  
                </Box> 
                : <Box
                    sx={{
                      width: "80%",
                      mt: 4,
                      mb: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                    }}>
                
                <TextField label="Select specialization" 
                        value={selectedSpecialization} 
                        onChange={(event) => {setSelectedSpecialization(event.target.value)}} 
                        select
                        fullWidth
                        >
                   {specializationList.map((spec, idx) => <MenuItem key={idx} value={`S${idx}`}>{spec}</MenuItem>)}
                </TextField> 
                {selectedSpecialization !== ''
                      ? 
                      <TextField label="Select doctor" 
                        value={selectedDoctor} 
                        onChange={(event) => {setSelectedDoctor(event.target.value)}} 
                        select
                        fullWidth
                        >
                   {doctorsList.map((doc, idx) => <MenuItem key={idx} value={`S${idx}`}>{doc}</MenuItem>)}
                </TextField> 
                      : 
                      null}

                {(selectedDoctor !== '' && selectedSpecialization !== '')
                  ?
                  <SelectDateField currentDate={selectedDate} onChange={setSelectedDate}/>
                  :
                  null
                }

                {isAllDataComplete ? <Button variant="contained" color={"primary"} onClick={handleSubmitVisit}>CONFIRM VISIT</Button> : null}
                
              </Box>
                )}
          </Box>
          </Dialog>
      </>
    );
  }

export default PatientReserveVisitPopup;
