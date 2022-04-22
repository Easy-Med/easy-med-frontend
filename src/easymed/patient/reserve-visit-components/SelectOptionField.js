import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

export default function SelectOptionField({
  type,
  value,
  valueChanger,
  options,
  label,
  getOptionLabel,
  loading,
  displayCondition,
}) {

  if (loading) {
    return <CircularProgress/>;
  }
 
  
  return (
    <>
      {type === "date" ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            renderInput={(params) => <TextField fullWidth {...params} />}
            value={value}
            onChange={valueChanger}
            onAccept={(date) => {
              valueChanger(date);
            }}
            onError={(reason, value) => valueChanger(null)}
            disablePast
            disabled={!displayCondition}
          />
        </LocalizationProvider>
      ) : (
        <Autocomplete
          options={options}
          value={value}
          renderInput={(params) => <TextField {...params} label={label} />}
          fullWidth
          onChange={(event, newValue) => {
            valueChanger(newValue);
          }}
          getOptionLabel={getOptionLabel}
          disabled={!displayCondition}
        />
      )}
    </>
  );
}
