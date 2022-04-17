import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import AuthInput from "../AuthInput";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  masterPassword: "",
};

const LoginForm = () => {
  // There will be loading status from server
  const loading = false;

  // There will go errors from server
  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    setError({});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      console.log("Sign up");
    } else {
      console.log("Sign in");
      navigate("/");
    }
  };

  const styles = {
    root: (theme) => ({
      [theme.breakpoints.up("md")]: {
        maxWidth: 500,
      },
      maxWidth: 400,
      minWidth: 350,
      p: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }),
    topLabel: {
      mb: 8,
    },
    submitButton: {
      mt: 8,
      mb: 15,
    },
    signUpArea: {
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
      <Typography variant="h5" sx={styles.topLabel}>
        {isSignup ? "Sign up" : "Sign in"}
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {isSignup && (
            <>
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
            </>
          )}
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
          {isSignup && (
            <>
              <AuthInput
                name="confirmPassword"
                label={"Confirm password"}
                handleChange={handleChange}
                error={Boolean(error?.confirmPassword)}
                helperText={error?.confirmPassword}
                type="password"
                autoComplete={"password"}
              />
            </>
          )}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={styles.submitButton}
          disabled={loading}
        >
          {isSignup ? "Sign up" : "Sign in"}
        </Button>
        <Box sx={styles.signUpArea}>
          <Divider sx={styles.divider} />
          <Button onClick={switchMode} sx={styles.switchButton}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginForm;
