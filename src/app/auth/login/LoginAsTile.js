import React from 'react';
import {Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LoginAsTile = ({title, imgUrl, imgAlt, redirectUrl, ...props}) => {
    const navigate = useNavigate()

    return (
        <Paper elevation={5} onClick={() => navigate(redirectUrl)} sx={{
            width: '250px',
            height: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {opacity: 0.9}
        }}>
            <Typography variant={"h6"} sx={{my: 1}}>{title}</Typography>
            <img style={{objectFit: 'cover', objectPosition: 'top', width: '100%', overflow: 'hidden'}} src={imgUrl}
                 alt={imgAlt}/>
        </Paper>
    );
};

export default LoginAsTile;