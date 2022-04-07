import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {CssBaseline} from "@mui/material";
import ThemeWrapper from "./app/theme/ThemeWrapper";

ReactDOM.render(
    <React.StrictMode>
        <ThemeWrapper>
            <CssBaseline />
            <App />
        </ThemeWrapper>
    </React.StrictMode>,
    document.getElementById('root')
);