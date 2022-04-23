import React from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { capitalize } from "../../utils/stringUtils";

const availableRoles = ["patient", "doctor"];

const RoleSelect = ({
  half,
  name,
  label,
  handleChange,
  error,
  helperText,
  ...props
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <FormControl fullWidth>
        <InputLabel id="role-select-label">{label}</InputLabel>
        <Select
          name={name}
          labelId="role-select-label"
          label={label}
          defaultValue={availableRoles[0]}
          onChange={handleChange}
          error={error}
        >
          {availableRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {capitalize(role)}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default RoleSelect;
