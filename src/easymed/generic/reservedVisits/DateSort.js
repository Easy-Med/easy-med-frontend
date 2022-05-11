import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const availableDateSortOptions = [
  { label: "Date - latest", value: "latest" },
  { label: "Date - oldest", value: "oldest" },
];

const DateSort = ({ value, onChange, sx = [] }) => {
  return (
    <FormControl sx={[{ minWidth: 150 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <InputLabel id="date-sort-select-label">Sort by</InputLabel>
      <Select
        labelId="date-sort-select-label"
        value={value}
        label="Sort by"
        onChange={onChange}
      >
        {availableDateSortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DateSort;
