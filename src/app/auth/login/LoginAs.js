import React from 'react';
import LoginAd from "./LoginAd";
import {Box, useMediaQuery} from "@mui/material";
import LoginForm from "./LoginForm";
import {useTheme} from "@emotion/react";

const LoginAs = ({imgUrl, imgAlt, ...props}) => {
    const theme = useTheme();
    const matchesDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            pt: 5,
            px: 18,
            display: 'flex',
            justifyContent: 'center',
        }}>
            {matchesDesktop &&
                <>
                    <LoginAd imgUrl={imgUrl} imgAlt={imgAlt}/>
                    <Box sx={{flex: '1', minWidth: '50px'}}/>
                </>
            }
            <Box sx={{mt: 10}}>
                <LoginForm/>
            </Box>
        </Box>
    );
};

export default LoginAs;