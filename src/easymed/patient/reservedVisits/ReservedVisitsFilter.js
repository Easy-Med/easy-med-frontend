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

const ReservedVisitsFilter = () => {
  const [completed, setCompleted] = useState({
    yes: false,
    no: false,
  });

  const handleChange = (event) => {
    setCompleted({
      ...completed,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        px: 3,
        py: 2,
      }}
    >
      <Typography variant={"h6"}>Filters</Typography>
      <Button variant={"outlined"} size={"small"} sx={{ mt: 1, mb: 3 }}>
        Clear filters
      </Button>
      <Divider sx={{ width: "100%", mb: 1 }} />
      <FormControl component={"fieldset"} variant={"standard"}>
        <FormLabel component={"legend"}>Completed</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={completed.yes}
                onChange={handleChange}
                name="yes"
              />
            }
            label={"Yes"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={completed.no}
                onChange={handleChange}
                name="no"
              />
            }
            label={"No"}
          />
        </FormGroup>
      </FormControl>
    </Paper>
  );
};

export default ReservedVisitsFilter;