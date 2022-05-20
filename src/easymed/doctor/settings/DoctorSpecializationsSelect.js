import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useQuery } from "react-query";
import SettingsService from "../../../app/api/SettingsService";

const DoctorSpecializationsSelect = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  const query = useQuery("doctorSpecializations", () =>
    SettingsService.getDoctorSpecializations()
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="role-select-label">{label}</InputLabel>
      <Select
        name={name}
        labelId="role-select-label"
        label={label}
        value={query.isSuccess ? value : ""}
        onChange={onChange}
        error={error}
        autoWidth
        MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
        disabled={query.isLoading}
      >
        {query.isSuccess &&
          query.data.map((specialization) => (
            <MenuItem key={specialization} value={specialization}>
              {specialization}
            </MenuItem>
          ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default DoctorSpecializationsSelect;
