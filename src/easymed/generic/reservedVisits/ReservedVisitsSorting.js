import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const availableDateSortOptions = [
  { label: "Date - latest", value: "latest" },
  { label: "Date - oldest", value: "oldest" },
];

const ReservedVisitsSorting = ({ sx = [] }) => {
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortFromParams = searchParams.get("sort");
    setSort(sortFromParams ? sortFromParams : "");
  }, [searchParams]);

  const handleChangeSort = (e) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      sort: e.target.value,
    });
  };

  return (
    <FormControl sx={[{ minWidth: 150 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <InputLabel id="date-sort-select-label">Sort by</InputLabel>
      <Select
        labelId="date-sort-select-label"
        value={sort}
        label="Sort by"
        onChange={handleChangeSort}
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

export default ReservedVisitsSorting;
