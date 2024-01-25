import axios from "axios";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const theme = createTheme();

function AuthPage() {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(
    location.pathname === "/register"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsRegister((prev) => !prev);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  useEffect(() => {
    setIsRegister(location.pathname === "/register");
  }, [location]);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Password and confirm password do not match");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.post(
          "https://marketilo.onrender.com/marketilo/register",
          {
            firstName,
            lastName,
            email,
            password,
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
        console.log(res);

        if (res.status === 201 && res.statusText === "Created") {
          // Registration successful, show a message and redirect to login
          setError("Registration successful! Please login.");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          // Handle other status codes if needed
          console.Error(
            "Unexpected status code or status text:",
            res.status,
            res.statusText
          );
        }
      } catch (err) {
        setIsLoading(false);

        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred during registration.");
        }
      }
    } else {
      // Login logic
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.post("https://marketilo.onrender.com/marketilo/login", {
          email,
          password,
        });

        // Store the token in local storage
        login(res.data.token, res.data.role);
        navigate("/");
        setIsLoading(false);
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        navigate("/");

        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred during login.");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isRegister ? "Register" : "Login"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleAuth}
              sx={{ mt: 1 }}
            >
              {isRegister && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="lname"
                        name="lastName"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        edge="end"
                        onChange={() => setShowPassword(!showPassword)}
                        checked={showPassword}
                        inputProps={{ "aria-labelledby": "password-toggle" }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        id="password-toggle"
                      >
                        Show
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {isRegister && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Checkbox
                          edge="end"
                          onChange={() => setShowPassword(!showPassword)}
                          checked={showPassword}
                          inputProps={{
                            "aria-labelledby": "confirm-password-toggle",
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          id="confirm-password-toggle"
                        >
                          Show
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading
                  ? isRegister
                    ? "Registering..."
                    : "Logging in..."
                  : isRegister
                    ? "Register Now"
                    : "Login"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    {isRegister
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}{" "}
                    <button
                      onClick={handleSwitch}
                      className="text-blue-500 hover:underline"
                      type="button"
                    >
                      {isRegister ? "Login" : "Register"}
                    </button>
                  </Typography>
                </Grid>
              </Grid>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 3, textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AuthPage;
