import React from 'react';
import {Box, Typography} from "@mui/material";
import ThemeSwitcher from "../app/navbar/desktop/ThemeSwitcher";

const Home = () => {
    return (
        <Box sx={{width: '100%', mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant={"h1"}>Here will be our App! 🩺</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Typography variant={"h5"}>Change me:</Typography>
                <ThemeSwitcher />
            </Box>
        </Box>
    );
};

export default Home;