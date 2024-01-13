import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //toast

  const success = () =>
    toast.success("Login successful !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const error = () =>
    toast.error(" Login failed !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  //navigation
  const navigate = useNavigate();

  const validatePassword = (input) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,}$/;
    return passwordRegex.test(input);
  };

  const validateUsername = (input) => {
    const usernameRegex = /^[a-zA-Z0-9]{1,10}$/;
    return usernameRegex.test(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    setErrorMessage("");

    if (username.trim() === "" || password.trim() === "") {
      setUsernameError(true);
      setPasswordError(true);
      setErrorMessage("Username and Password is required");
      error();
    } else if (!validateUsername(username)) {
      setUsernameError(true);
      setErrorMessage(
        "Username should contain up to 10 alphanumeric characters"
      );
    } else if (!validatePassword(password)) {
      setPasswordError(true);
      setErrorMessage(
        "Password should contain at least 6 characters, one uppercase letter, one number, and one special character"
      );
    } else {
    success();
      setTimeout(() => {
        console.log("Logged in!");
        navigate("/home");
      }, 2000);
    }
  };

  return (
    <div style={{ background: "#E2F1FA" }}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "500px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            padding: "5rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              color="Highlight"
              component="div"
              sx={{ mb: 2 }}
            >
              Login Form
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameError && errorMessage}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError && errorMessage}
              fullWidth
              sx={{
                marginTop: "2rem",
              }}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: "2rem",
              }}
            >
              Login
            </Button>
            {/* {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )} */}
          </form>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
