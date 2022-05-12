import React, { useState } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import AuthInput from "./AuthInput";
import RoleSelect from "./signUp/RoleSelect";

const initialState = {
  firstName: "",
  lastName: "",
  role: "",
  emailAddress: "",
  password: "",
  repeatPassword: "",
};

const AuthForm = ({ isSignUp, initialRole }) => {
  const [formData, setFormData] = useState({
    ...initialState,
    role: initialRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();

  const onSuccess = (data) => {
    navigate(`/${data.role.toLowerCase()}`);
  };

  const onError = (error) => {
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
  };

  const mutation = useMutation(
    () => (isSignUp ? auth.signUp(formData) : auth.signIn(formData)),
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleBottomButtonClick = (e) => {
    if (isSignUp) {
      navigate("/signIn");
    } else {
      navigate("/signUp");
    }
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
    topLabel: {
      mb: 8,
    },
    submitButton: {
      mt: 4,
      mb: 10,
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
      {!isSignUp && (
        <Typography variant="h5" sx={styles.topLabel}>
          Sign in
        </Typography>
      )}
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {isSignUp && (
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
              <RoleSelect
                name="role"
                label={"Role"}
                handleChange={handleChange}
                error={Boolean(error?.Role)}
                helperText={error?.Role}
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
          {isSignUp && (
            <AuthInput
              name="repeatPassword"
              label={"Repeat password"}
              handleChange={handleChange}
              error={Boolean(error?.RepeatPassword)}
              helperText={error?.RepeatPassword}
              type="password"
              autoComplete={"password"}
            />
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
          {isSignUp ? "Sign up" : "Sign in"}
        </Button>
        <Box sx={styles.signInArea}>
          <Divider sx={styles.divider} />
          <Button onClick={handleBottomButtonClick} sx={styles.switchButton}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AuthForm;
