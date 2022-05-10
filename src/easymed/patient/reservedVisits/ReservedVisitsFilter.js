import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

const initialFilters = {
  completed: {
    yes: false,
    no: false,
  },
};

const ReservedVisitsFilter = ({ applyFilters, resetFilters }) => {
  const [completed, setCompleted] = useState(initialFilters.completed);

  const handleSortingChange = (event) => {
    setCompleted({
      ...completed,
      [event.target.name]: event.target.checked,
    });
  };

  const onResetFilters = () => {
    setCompleted(initialFilters.completed);
    resetFilters();
  };

  const onApplyFilters = () => {
    applyFilters({ completed });
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: { xs: "auto", sm: "flex-start" },
        width: { md: "200px", xs: "auto" },
        px: 3,
        py: 2,
      }}
    >
      <Typography variant={"h6"}>Filters</Typography>

      <Divider sx={{ width: "100%", mb: 1 }} />
      <FormControl component={"fieldset"} variant={"standard"}>
        <FormLabel component={"legend"}>Completed</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={completed.yes}
                onChange={handleSortingChange}
                name="yes"
              />
            }
            label={"Yes"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={completed.no}
                onChange={handleSortingChange}
                name="no"
              />
            }
            label={"No"}
          />
        </FormGroup>
      </FormControl>
      <Button
        variant={"outlined"}
        size={"small"}
        sx={{ mt: 2, mb: 1, alignSelf: "stretch" }}
        onClick={onResetFilters}
      >
        Clear
      </Button>
      <Button
        variant={"contained"}
        size={"small"}
        sx={{ alignSelf: "stretch" }}
        onClick={onApplyFilters}
      >
        Apply
      </Button>
    </Paper>
  );
};

export default ReservedVisitsFilter;
