import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ColorModeContext from "./ColorModeContext";
import {blue, lightGreen} from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                primary: lightGreen,
                secondary: blue,
            }
            : {}),
    },
});

const ThemeWrapper = (props) => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ThemeWrapper;