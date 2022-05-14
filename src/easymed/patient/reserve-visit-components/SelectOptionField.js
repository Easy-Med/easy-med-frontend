import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Autocomplete, MenuItem } from "@mui/material";

export default function SelectOptionField({
  type,
  value,
  valueChanger,
  options,
  label,
  getOptionLabel,
  loading,
}) {
  if (type === "term") {
    console.log(options);
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
          loading={loading}
          loadingText={
            type === "specialization"
              ? "Checking specializations... "
              : type === "doctor" ? "Searching for doctors..." : "Preparing free terms..."
          }
        />
      )}
    </>
  );
}
