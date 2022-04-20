import React, { useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import AuthInput from "../AuthInput";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useAuth from "../UseAuth";

const initialState = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  repeatPassword: "",
};

const LoginForm = ({ role, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation(
    () => {
      return isSignup ? auth.signUp(formData) : auth.signIn(formData);
    },
    {
      onSuccess: (data, variables, context) => {
        navigate(`/${data.role.toLowerCase()}/`);
      },
      onError: (error, variables, context) => {
        if (typeof error.data === "string" || error.data instanceof String) {
          setError({ EmailAddress: error.data });
        } else {
          let errors = error.data.errors;
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              errors[key] = errors[key].reduce(
                (total, desc) => total + ", " + desc
              );
            }
          }
          setError(errors);
        }
      },
    }
  );

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
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
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
                error={Boolean(error?.FirstName)}
                helperText={error?.FirstName}
              />
              <AuthInput
                name="lastName"
                label={"Last name"}
                handleChange={handleChange}
                half
                error={Boolean(error?.LastName)}
                helperText={error?.LastName}
              />
            </>
          )}
          <AuthInput
            name="emailAddress"
            label={"Email"}
            handleChange={handleChange}
            type="email"
            error={Boolean(error?.EmailAddress)}
            helperText={error?.EmailAddress}
            autoComplete={"email"}
          />
          <AuthInput
            name="password"
            label={"Password"}
            handleChange={handleChange}
            error={Boolean(error?.Password)}
            helperText={error?.Password}
            type={showPassword ? "text" : "password"}
            autoComplete={"current-password"}
            handleShowPassword={handleShowPassword}
          />
          {isSignup && (
            <>
              <AuthInput
                name="repeatPassword"
                label={"Repeat password"}
                handleChange={handleChange}
                error={Boolean(error?.RepeatPassword)}
                helperText={error?.RepeatPassword}
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
          disabled={mutation.isLoading}
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
