import React, { useMemo } from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import ColorModeContext from "./ColorModeContext";
import { CssBaseline } from "@mui/material";
import { getStorageItem, setStorageItem } from "../utils/storage";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#009B9B",
          },
          secondary: {
            main: "#BA5252",
          },
        }
      : {}),
  },
});

const ThemeWrapper = (props) => {
  const [mode, setMode] = React.useState(
    getStorageItem("theme") ? getStorageItem("theme") : "light"
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          setStorageItem("theme", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeWrapper;
