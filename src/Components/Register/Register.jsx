import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import Swal from 'sweetalert2';

const theme = createTheme();

const Register = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post('http://localhost:8080/api/auth/register', {
            name: data.get('name'),
            email: data.get('email'),
            age: data.get('age'),
            password: data.get('password')
        }).then(res => {
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'User registred',
                    icon: 'success',
                })
            }
        }).catch(err => {
            if (err.response.status === 409) {
                Swal.fire({
                    title: 'Error',
                    text: 'User already authenticated',
                    icon: 'error',
                })
            } else if (err.response.status === 411) {
                Swal.fire({
                    title: 'Error',
                    text: err.response.data.response,
                    icon: 'error',
                })
            } else if (err.response.status !== 201) {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong, please try again',
                    icon: 'error',
                })
            }})
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
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    autoComplete="family-name"
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
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
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
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Register