import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Autocomplete } from "@mui/material";

export default function SelectOptionField({
  type,
  value,
  valueChanger,
  options,
  label,
  getOptionLabel,
  isOptionEqualToValue,
  displayCondition,
  disableDateFunc,
}) {
  
  return (
    <>
      {type === "date" ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            renderInput={(params) => <TextField fullWidth {...params}/>}
            value={value}
            onChange={valueChanger}
            disablePast
            disabled={!displayCondition}
            shouldDisableDate={disableDateFunc}
          />
        </LocalizationProvider>
      ) : (
        <Autocomplete
          options={options}
          value={value}
          renderInput={(params) => <TextField {...params} label={label}/>}
          onChange={valueChanger}
          fullWidth
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          disabled={!displayCondition}
        />
      )}
    </>
  );
}
