import { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";
// import "./Login.css";
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { SessionContext } from "../../Context/SessionContext";
import GithubWidget from "../GithubWidget";

const Login = () => {
  const { login, setUser, setSession } = useContext(SessionContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });

  let [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(formData)
      .then((res) => {
        setSession(true)
        const { email, role, cid } = res.data.user
        setUser({ email, role, cid })
        setFormData({
          email: "",
          password: "",
        });
        setValidation({
          email: true,
          password: true,
        });
        window.location.href = "/";
      })
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 411 || err.response.status === 401) {
          setValidation({
            email: false,
            password: false,
          });
          setMessage(err.response.data.response);
        } else if (err.response.status === 403) {
          setMessage(err.response.data.response);
        }
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => submitHandler(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={!validation.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            error={!validation.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
          />
          <Typography sx={{ color: "rgb(175, 175, 175)" }}>
            {message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <GithubWidget />
        </Box>
};

export default Login;
