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
        setSession(true);
        const { email, role } = res.data;
        setUser({ email, role });
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
        if (err.response.status === 400 || err.response.status === 401) {
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
        </Box>
        <GithubWidget />
      </Box>
    </Container>
  );
  // <Box sx={{display: 'flex'}}>
  //   <Box sx={{maxWidth: '50vw'}}>
  //     <Typography variant="h4">Welcome to DecorateMe</Typography>
  //     <Typography>Sign In to Continue</Typography>

  //     <Button variant="outlined" startIcon={<GoogleIcon color="primary" />}>
  //       Log In with Google
  //     </Button>
  //     <Divider/>
  //     <form className="loginForm" onSubmit={submitHandler}>
  //       {/* <label htmlFor="email">Email</label>
  //       <input
  //         placeholder="email@example.com"
  //         type="email"
  //         name="email"
  //         value={formData.email}
  //         onChange={changeHandler}
  //         className={validation.email ? "" : "invalid"}
  //       /> */}
  //       <TextField label="Email" variant="outlined" type="email" name="email" value={formData.email} onChange={changeHandler} />
  //       {/* <label htmlFor="password">Password</label>
  //       <input
  //         type="password"
  //         name="password"
  //         value={formData.password}
  //         onChange={changeHandler}
  //         className={validation.password ? "" : "invalid"}
  //       /> */}
  //       <TextField label="Password" variant="outlined" name="password" value={formData.password} onChange={changeHandler} />
  //       <Typography>{message}</Typography>
  //       <Link>Forgot Password?</Link>
  //       <Button size="large" variant="contained" sx={{bgcolor: '#161616'}}>Log In</Button>
  //     </form>
  //     <Typography>
  //       Dont have an account?
  //       <Link to="/register"> Create a account for free</Link>
  //     </Typography>
  //   </Box>
  //   <Box className="imgContainer">
  //     <Typography variant="h4">Discovering the Best Furniture for Four Home</Typography>
  //     <img
  //       className="loginImg"
  //       src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
  //       alt="login image"
  //     />
  //   </Box>
  // </Box>
  //   );
};

export default Login;
