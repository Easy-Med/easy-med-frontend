import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, MenuItem, TextField } from '@mui/material';
import SelectDateField from './reserve-visit-components/SelectDateField';
import ReserveVisitTitle from './reserve-visit-components/ReserveVisitTitle';
import ChooseReserveVisitOption from './reserve-visit-components/ChooseReserveVisitOption';

const specializationList = ['Orthopedic', 'Kardiologist','Radiologist'] 
const doctorsList = ['Maciej Bulwa', 'Adrian Kunsz','Barbara Telejko'] 

function PatientReserveVisitPopup({ openDialog, setOpenDialog, setShowSuccessAlert,  ...props }) {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [reservationOption, setReservationOption] = React.useState("default");
    const [selectedSpecialization, setSelectedSpecialization] = React.useState('');
    const [selectedDoctor, setSelectedDoctor] = React.useState("");
    const isAllDataComplete = (selectedDate && selectedSpecialization !== '' && selectedDoctor !== '');

    const handleClose = () => {
      setOpenDialog(false); 
      setTimeout(() => {
        setReservationOption("default"); 
        setSelectedDate(null); 
        setSelectedSpecialization('');
        setSelectedDoctor('');}
        , 400);   
    };

    const handleSubmitVisit = () => {
      setShowSuccessAlert(true);
      console.log("HELOOOOOO");
      handleClose();
    }
  
    return (
      <>
          <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
            <Box
            sx={{
              width: "100%",
              height: "100%",
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
              <ChooseReserveVisitOption setReservationOption={setReservationOption}/>
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
