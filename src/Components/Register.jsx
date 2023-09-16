import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";
import { LockOutlined, CloudUpload } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { UserContext } from '../Context/UserContext'
import GoogleWidget from "./GoogleWidget";
import styled from "@emotion/styled";

const theme = createTheme();

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Register = () => {

  const context = useContext(UserContext)

  const [selectedFile, setSelectedFile] = useState()

  const handleFileChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('photo'))
    context.register({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      age: data.get("age"),
      password: data.get("password"),
      photo: data.get("photo")
    })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            title: "Success",
            text: "User registred",
            icon: "success",
            confirmButtonText: 'Sign in'
          }).then(res => res.isConfirmed && (window.location.href = '/login'))
        }
        // window.location.href = "/";
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Swal.fire({
            title: "Error",
            text: "User already authenticated",
            icon: "error",
            confirmButtonText: 'Sign in'
          }).then(res => res.isConfirmed && (window.location.href = '/login'));
        } else if (err.response.status !== 201) {
          Swal.fire({
            title: "Error",
            text: "Something went wrong, please try again",
            icon: "error",
            footer: `Error: ${err.response.data.error}`
          });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#161616" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button component='label' startIcon={<CloudUpload />}
                  fullWidth
                  name="photo"
                  label="Photo"
                  id="photo"
                >
                  Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
                {selectedFile && 
                  <Typography textAlign='center'>
                    Selected file: {selectedFile.name}
                  </Typography>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <GoogleWidget/>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
