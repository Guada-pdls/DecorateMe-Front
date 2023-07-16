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
import { UserContext } from "../Context/UserContext";
import GithubWidget from "./GithubWidget";
import Swal from "sweetalert2";

const Login = () => {
  const { login, setUser } = useContext(UserContext);

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
      .then(async (res) => {
        const { email, role, cid } = res.data.payload.user
        await setUser({ email, role, cid })
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
        if (err.response.status === 400) {
          setMessage(err.response.data.error)
        } else if (err.response.status === 401) {
          Swal.fire({
            title: 'Error',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Return home'
          }).then((res) => { if (res.isConfirmed) { window.location.href = '/' } })
        } else if (err.response.data.error === 404) {
          Swal.fire({
            title: 'Error',
            text: err.response.data.error,
            icon: 'error',
            confirmButtonText: 'Register'
          }).then((res) => { if (res.isConfirmed) { window.location.href = '/register' } })
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
          <Typography sx={{ color: "black" }}>
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
      </Box>
    </Container>
  )
};

export default Login;
