import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Grid, Paper, Typography} from "@mui/material";
import IssueAPrescription from './IssueAPrescription'; 

const Prescriptions = () => {
    

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
            justifyContent: 'center',
        }),
        topLabel: {
            alignSelf: "left",
            mb: 8,
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

export default Prescriptions;