import React from "react";
import {Paper, Typography} from "@mui/material";
import IssueAPrescription from './prescription/IssueAPrescription'; 

const DoctorPrescriptions = () => {
    

    const styles = {
        root: theme => ({
            [theme.breakpoints.up('md')]: {
                width: '100%',
            },
            width: '100%',
            py: theme.spacing(3),
            px: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            justifyContent: 'center',
            backgroundColor: '#eee',
        }),
        topLabel: {
            alignSelf: "left",
            color: "#777",
            mb: 2,
        }
    };

    return (
        <Paper elevation={3} sx={styles.root}>
            <Typography variant="h3" sx={styles.topLabel}>
                Issue a prescription
            </Typography>
            <IssueAPrescription/>
        </Paper>
    );
};

export default DoctorPrescriptions;
