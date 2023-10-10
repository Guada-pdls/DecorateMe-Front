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
					Swal.fire({
						title: 'Successful purchase',
						html: `
					  <p>Ticket ID: ${res.data.response.ticket._id}</p>
					  <p>Date: ${res.data.response.ticket.purchase_date}</p>
					  <p>Purchaser: ${res.data.response.ticket.purchaser}</p>
					  <p>Purchased Items: 
						${res.data.response.purchasedItems.map(prod => `<p>- ${prod.name} x${prod.units}: ${prod.price}</p>`).join('')}
					  </p>
					  ${res.data.outOfStockItems ? `
						<p>Out of Stock: 
						  ${res.data.response.outOfStockItems.map(prod => `<p>- ${prod.name} x${prod.units}: ${prod.price}</p>`).join('')}
						</p>
					  ` : ''}
					  <p>Amount: ${res.data.response.ticket.amount}</p>
					`,
						icon: 'success'
					});

				})
		} catch (error) {
			console.log(error)
			Swal.fire('Error', error.response.data.error, 'error')
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