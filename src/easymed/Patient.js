import React from 'react';
import { Box, TextField, Typography } from "@mui/material";

const Patient = () => {
      return (
            <Box sx={{ width: '100%', mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant={"h1"}>Here will be our App! 🩺</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                        <Typography variant="h5">Patient's information</Typography>
                        <TextField
                              label="Name"
                              defaultValue="Michal"
                              InputProps={{
                                    readOnly: true,
                              }}
                              margin="normal"
                        />
                        <TextField
                              label="Surname"
                              defaultValue="FereniecjestKoksem"
                              InputProps={{
                                    readOnly: true,
                              }}
                              margin="normal"
                        />
                        <TextField
                              label="Age"
                              defaultValue="22"
                              InputProps={{
                                    readOnly: true,
                              }}
                              margin="normal"
                        />
                        <TextField
                              label="Date of birth"
                              defaultValue="01-01-2000"
                              InputProps={{
                                    readOnly: true,
                              }}
                              margin="normal"
                        />
                  </Box>

            </Box>
      );
};

export default Patient;