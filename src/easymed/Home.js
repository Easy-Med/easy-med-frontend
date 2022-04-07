import React, {useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../app/navbar/desktop/ThemeSwitcher";

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        // Because user is not logged in, redirect him!
        navigate('/login')
    })

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