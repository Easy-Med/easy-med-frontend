import React, {useEffect, useState} from "react";
import {Box, Button, Divider, ListSubheader, ListItem, List} from "@mui/material";


const PrescribedMedicines = () => {
    

    const styles = {
        topLabel: {
            mb: 8,
            fontSize: 24,
        },
    };

    return (
        <List sx={{ listStyleType: 'list-item' }}>
            <ListSubheader sx={styles.topLabel}>
                Prescribed medicines:
            </ListSubheader>
            <ListItem></ListItem>
        </List>
    );
};

export default PrescribedMedicines;