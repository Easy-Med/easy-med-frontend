import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Paper } from "@mui/material";
import AuthInput from "../AuthInput";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  masterPassword: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();

  // There will be loading status from server
  const loading = false;

  // There will go errors from server
  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setError({});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sign up");
  };

  const styles = {
    root: (theme) => ({
      [theme.breakpoints.up("md")]: {
        minWidth: 500,
      },
      maxWidth: 400,
      minWidth: 350,
      p: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }),
    submitButton: {
      mt: 4,
      mb: 15,
    },
    signInArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    divider: {
      width: 1,
      mb: 3,
    },
    switchButton: {
      color: "text.secondary",
    },
  };

  return (
    <Paper elevation={3} sx={styles.root}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <AuthInput
            name="firstName"
            label={"First name"}
            handleChange={handleChange}
            autoFocus
            half
            error={Boolean(error?.firstName)}
            helperText={error?.firstName}
          />
          <AuthInput
            name="lastName"
            label={"Last name"}
            handleChange={handleChange}
            half
            error={Boolean(error?.lastName)}
            helperText={error?.lastName}
          />
          <AuthInput
            name="email"
            label={"Email"}
            handleChange={handleChange}
            type="email"
            error={Boolean(error?.email)}
            helperText={error?.email}
            autoComplete={"email"}
          />
          <AuthInput
            name="password"
            label={"Password"}
            handleChange={handleChange}
            error={Boolean(error?.password)}
            helperText={error?.password}
            type={showPassword ? "text" : "password"}
            autoComplete={"current-password"}
            handleShowPassword={handleShowPassword}
          />
          <AuthInput
            name="confirmPassword"
            label={"Confirm password"}
            handleChange={handleChange}
            error={Boolean(error?.confirmPassword)}
            helperText={error?.confirmPassword}
            type="password"
            autoComplete={"password"}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={styles.submitButton}
          disabled={loading}
        >
          Sign up
        </Button>
        <Box sx={styles.signInArea}>
          <Divider sx={styles.divider} />
          <Button onClick={navigateToLogin} sx={styles.switchButton}>
            Already have an account? Sign In
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RegisterForm;