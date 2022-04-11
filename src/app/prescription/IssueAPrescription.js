import React, {useEffect, useState} from "react";
import {Box, Button, Stack, Divider, Grid, ListSubheader, ListItem, List} from "@mui/material";
import PrescriptionInput from './PrescriptionInput'; 
import PrescribedMedicines from './PrescribedMedicines'

const initialState = {
    patient: "",
    medicineName: "",
    medicineCapacity: "",
};

const listI = [
  {
    med: 'a',
    name: 'Robin',
  },
  {
    med: 'b',
    name: 'Dennis',
  },
];


const prescription = [
    {patient: "",},
    {medicineName: "",},
    {medicineCapacity: "",},
];

const IssueAPrescription = () => {
    
    // There will go errors from server
    const [error, setError] = useState({})
    const [prescriptionData, setPrescriptionData] = useState(prescription);
    
    const [name, setName] = useState({})

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setError({})
    }, [])

    const handleChange = (e) => {
        setName(e.target.value);
        setPrescriptionData({...prescriptionData, [e.target.name]: e.target.value});
        setPrescriptionData(prescriptionData.concat({[e.target.name]: e.target.value});
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const addPrescription = (e) => {
        e.preventDefault();
        setPrescriptionData(...prescriptionData, prescriptionData);
        console.log("Prescription added!");
    };

    const addAllPrescriptions = (e) => {
        e.preventDefault();
        
        console.log("Prescriptions added!");
    };

    const styles = {
        root: theme => ({
            [theme.breakpoints.up('md')]: {
                width: 500,
            },
            width: 400,
            py: theme.spacing(4),
            px: theme.spacing(5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: 'center',
            padding:"10px"
        }),
        button: {
            mt: 8,
            mb: 15,
        },
    };

    return (
        <form style={{width: '100%'}} onSubmit={addAllPrescriptions}>
            <Grid container spacing={{columnGap: 30,}}>
                <Grid item>
                    <form style={{width: '100%'}} onSubmit={addPrescription}>
                        <Grid container spacing={2}>
                            <PrescriptionInput
                                name="patientName"
                                label={"Patient name"}
                                handleChange={handleChange}
                                autoFocus
                                error={Boolean(error?.patientName)}
                                helperText={error?.patientName}
                            />
                            <Divider flexItem/>
                            <PrescriptionInput
                                name="medicineName"
                                label={"Medicine Name"}
                                handleChange={handleChange}
                                error={Boolean(error?.medicineName)}
                                helperText={error?.medicineName}
                            />
                            <PrescriptionInput
                                name="medicineCapacity"
                                label={"Medicine Capacity"}
                                handleChange={handleChange}
                                error={Boolean(error?.medicineCapacity)}
                                helperText={error?.medicineCapacity}
                            />
                        </Grid>
                    </form>
                    
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        sx={styles.button}
                    >
                        ADD MEDICINE
                    </Button>
                </Grid>
                
                <Divider orientation="vertical" flexItem/>
                <Grid item sx={6}>
                    <List sx={{ listStyleType: 'list-item' }}>
                        <ListSubheader sx={styles.topLabel}>
                            Prescribed medicines:
                        </ListSubheader>
                        <ListItem>{prescriptionData.patient}</ListItem>
                    </List>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="end">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={styles.button}
                >
                    SUBMIT
                </Button>
            </Stack>
        </form>
    );
};

export default IssueAPrescription;