import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { Box, TextField } from '@mui/material'
import CustomButton from './CustomButton'
import Swal from 'sweetalert2'

const Checkout = () => {

	const { cid } = useParams()
	const { purchase } = useContext(UserContext)

	const submitHandler = async (e) => {
		try {
			e.preventDefault()
			await purchase(cid)
			.then(res => {
				console.log(res)
				Swal.fire('Successful purchase', 'View ticket ->', 'success')
			})
		} catch (error) {
			Swal.fire('Error', error.response.data.error, 'error')
			console.log(error)
		}
	}

	const changeHandler = (e) => {
		console.log(e)
	}

	return (
		<Box
			component="form"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '12px',
				padding: '1rem'
			}}
			onSubmit={(e) => submitHandler(e)}
			noValidate
		>
			<TextField
				required
				fullWidth
				name="cardName"
				label="Card Name"
				onChange={changeHandler}
			/>
			<Box sx={{
				display: 'flex',
			}}>
				<TextField
					required
					fullWidth
					name="expirationDate"
					label="Expiration Date"
					onChange={changeHandler}
				/>
				<TextField
					required
					fullWidth
					name="cvc-cvv"
					label="CVC/CVV"
					onChange={changeHandler}
				/>
			</Box>
			<TextField
				required
				fullWidth
				name="country"
				label="Country"
				onChange={changeHandler}
			/>
			{/* <Typography sx={{ color: "black" }}>
            {message}
          </Typography> */}
			<CustomButton type='submit' text='Buy' />
		</Box>
	)
}

export default Checkout