/* eslint-disable react/prop-types */
import { Delete } from "@mui/icons-material"
import { MenuItem, Select, TableCell, TableRow } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"

const UserListItem = ({ user, setUsers, users, setMessage }) => {

	const { updateUser, deleteUser } = useContext(UserContext)

	const currentDate = Date.now()
	const timeSinceLastConnection = (lastConnection) => {

		if (lastConnection === undefined) return 'Never' 

		const difference = currentDate - lastConnection
		const seconds = Math.floor(difference / 1000)

		if (seconds < 60) {
			return 'A few seconds ago'
		} else if (seconds < 3600) {
			const minutes = Math.floor(seconds / 60)
			return `${minutes} minutes ago`
		} else if (seconds < 86400) {
			const hours = Math.floor(seconds / 3600)
			return `${hours} hours ago`
		} else {
			const days = Math.floor(seconds / 86400)
			return `${days} days ago`
		}
	}

	const changeHandler = e => {
		updateUser(user._id, { role: e.target.value })
			.then(res => console.log(res))
			.catch(error => console.log(error))
	}

	const clickHandler = () => {
		deleteUser(user._id)
		.then(res => {
			setMessage({ success: true, open: true, text: res.data.response })
			console.log(res.data.response)
			setUsers(users.filter(dbUser => dbUser._id !== user._id))
		})
		.catch(error => {
			setMessage({ success: false, open: true, text: error.response.data.error})
		})
		// TODO: Success or failure message
	}

	return (
		<>
			<TableRow
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component="th" scope="row">
					{user.full_name}
				</TableCell>
				<TableCell align="right">{timeSinceLastConnection(user.last_connection)}</TableCell>
				<TableCell align="right">{user.email}</TableCell>
				<TableCell align="right">
					<Select onChange={changeHandler} defaultValue={user.role}>
						<MenuItem value="user">user</MenuItem>
						<MenuItem value="premium">premium</MenuItem>
						<MenuItem value="admin">admin</MenuItem>
					</Select>
				</TableCell>
				<TableCell align="right">
					<Delete onClick={clickHandler} />
				</TableCell>
			</TableRow>
		</>
	)
}

export default UserListItem