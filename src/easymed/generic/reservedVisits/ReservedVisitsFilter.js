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
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (event) => {
    const selectedField = event.target.name.split(':')
    setFilters({
      ...filters,
      [selectedField[0]]: {...filters[selectedField[0]], [selectedField[1]]: event.target.checked},
    });
  };

  const onResetFilters = () => {
    setFilters(initialFilters);
    resetFilters();
  };

  const onApplyFilters = () => {
    applyFilters({ completed: ((!filters.completed.yes && filters.completed.no) || (filters.completed.yes && !filters.completed.no)) ? filters.completed.yes : undefined});
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
        <FormGroup onChange={handleFilterChange}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.completed.yes}
                name="completed:yes"
              />
            }
            label={"Yes"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.completed.no}
                name="completed:no"
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
