import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material"
import ReturnButton from "./ReturnButton"
import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import Swal from "sweetalert2"

const ForgotPassword = () => {

	const { forgotPassword } = useContext(UserContext)

	const [load, setLoad] = useState(false)

	const submitHandler = async e => {
		e.preventDefault();
		if(e.target[0].value) {
			try {
				const res = await forgotPassword(e.target[0].value)
				Swal.fire('Success', res.dara.response, 'success')
			} catch (error) {
				Swal.fire('Error', error.response.data.error, 'error')
			} finally {
				setLoad(false)
			}
		}
	}

	return (
		<>
			<ReturnButton/>
			<Paper sx={{
				margin: '2rem auto',
				maxWidth: '350px',
				padding: '1.5rem 2rem'
			}}>
				<Box onSubmit={submitHandler} component='form' sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				}}>
					<Typography fontSize='2rem' variant='h1'>Find your account</Typography>
					<Divider />
					<Typography sx={{ margin: '6px 0 2px 0'}}>Please enter your email</Typography>
					<TextField type="email" variant="outlined" label="Email" />
					<Button variant="contained" type="submit">{load ? "..." : "Search"}</Button>
				</Box>
			</Paper>
		</>
	)
}

export default ForgotPassword