import React, {useEffect, useState} from "react";
import {Button, Stack, Divider, Grid, ListSubheader, ListItemText, List, Autocomplete, TextField} from "@mui/material";
import PrescriptionInput from './PrescriptionInput';

const initialState = {
    patientName: "",
    medicineName: "",
    medicineCapacity: "",
};

const IssueAPrescription = () => {
    const [error, setError] = useState({})

    const [formData, setFormData] = useState(initialState);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        setError({})
    }, [])

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const addPrescription = (e) => {
        e.preventDefault();
        setPrescriptions(prev => [...prescriptions, formData]);
        setFormData(initialState);
        console.log("Prescription added!");
    };

    const addAllPrescriptions = (e) => {
        e.preventDefault();
        console.log("Prescriptions added!");
    };

    const styles = {
        root: theme => ({
            [theme.breakpoints.up('md')]: {
                width: '100%',
            },
            width: 800,
            py: theme.spacing(4),
            px: theme.spacing(5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: 'center'
        }),
        button: {
            my: 3,
            ml: 2,
            mr: 4,
        },
        listItem: {
            display: 'list-item', 
            ml: 4,
        },
        list: {
            listStyleType: 'circle',
        },
        topLabel: {
            mt: -2,
            ml: -1,
            fontSize: 24,
        }
    };
    return (
        <Grid sx={{backgroundColor: 'lightgray'}}>
            <Grid container spacing={{columnGap: 30,}} sx={{backgroundColor: 'white', pb: 2}}>
                <Grid item>
                    <form style={{paddingLeft: 20}} onSubmit={addPrescription}>
                        <Grid container spacing={2}>
                            <Autocomplete 
                                disablePortal
                                options={nameTable}
                                name="patientName"
                                inputValue={formData.patientName}
                                onChange={(event: any, value: string | null) => 
                                    setFormData({...formData, "patientName": value})}
                                sx={{pl: 2, width: "100%"}}
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        label='Patient name'
                                        variant="standard"/>)}
                                />
                            <PrescriptionInput
                                name="medicineName"
                                value={formData.medicineName}
                                label={"Medicine Name"}
                                onChange={onChange}
                                error={Boolean(error?.medicineName)}
                                helperText={error?.medicineName}
                            />
                            <PrescriptionInput
                                name="medicineCapacity"
                                value={formData.medicineCapacity}
                                label={"Medicine Capacity"}
                                onChange={onChange}
                                error={Boolean(error?.medicineCapacity)}
                                helperText={error?.medicineCapacity}
                            />
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                sx={styles.button}>
                                ADD MEDICINE
                            </Button>
                        </Grid>
                    </form>
                </Grid>
                
                <Divider orientation="vertical" flexItem  sx={{backgroundColor: "darkgrey"}}/>
                <Grid item>
                    <List sx={styles.list}>
                        <ListSubheader sx={styles.topLabel}>
                            Prescribed medicines:
                        </ListSubheader>
                        {prescriptions.map((item) => (
                            <ListItemText sx={styles.listItem}>
                                <div>{item.patientName}</div>
                                <div>{item.medicineName}</div>
                                <div>{item.medicineCapacity}</div>
                            </ListItemText>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="end">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={styles.button}>
                    SUBMIT
                </Button>
            </Stack>
        </Grid>
    );
};

const nameTable = ['Adrian Milewski', 'Franciszel Mały', 'Bogdan Bojny'];

export default IssueAPrescription;