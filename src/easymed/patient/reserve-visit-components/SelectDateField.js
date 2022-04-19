import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

export default function SelectDateField({currentDate, onChange}) {
    return  <>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker label="Select date" 
                              renderInput={(params) => <TextField fullWidth {...params}/>} 
                              value={currentDate}
                              onChange={onChange}
                              disablePast
                              />
                </LocalizationProvider>
            </>
}