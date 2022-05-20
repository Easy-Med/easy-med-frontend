import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import {
  CommaArrayParam,
  decodeQueryParamsForReservedVisits,
} from "../../../app/utils/serializeQueryParamsUtils";

const initialFilters = {
  completed: {
    yes: false,
    no: false,
  },
};

const ReservedVisitsFilter = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilters(decodeQuery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCompletedChange = (event) => {
    const selectedField = event.target.name.split(":");
    setFilters({
      ...filters,
      [selectedField[0]]: {
        ...filters[selectedField[0]],
        [selectedField[1]]: event.target.checked,
      },
    });
  };

  const encodeQuery = () => {
    const completed = [];
    for (const [option, checked] of Object.entries(filters.completed)) {
      if (checked) {
        completed.push(option);
      }
    }

    return {
      ...Object.fromEntries([...searchParams]),
      completed: CommaArrayParam.encode(completed),
    };
  };

  const decodeQuery = () => {
    const filters = initialFilters;
    const filtersFromQuery = decodeQueryParamsForReservedVisits(searchParams);

    Object.keys(filters.completed).forEach((option) => {
      filters.completed[option] = !!filtersFromQuery.completed.includes(option);
    });

    return filters;
  };

  const onResetFilters = () => {
    setFilters(initialFilters);
    setSearchParams({});
  };

  const onApplyFilters = () => {
    setSearchParams(encodeQuery());
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
        <FormGroup onChange={handleCompletedChange}>
          <FormControlLabel
            control={
              <Checkbox checked={filters.completed.yes} name="completed:yes" />
            }
            label={"Yes"}
          />
          <FormControlLabel
            control={
              <Checkbox checked={filters.completed.no} name="completed:no" />
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
