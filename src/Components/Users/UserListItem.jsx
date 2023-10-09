/* eslint-disable react/prop-types */
import { Delete } from "@mui/icons-material"
import { MenuItem, Select, TableCell, TableRow } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"

const UserListItem = ({ user }) => {

	const { updateUser, deleteUser } = useContext(UserContext)

	const changeHandler = e => {
		updateUser(user._id, { role: e.target.value })
			.then(res => console.log(res))
			.catch(error => console.log(error))
	}

	const clickHandler = () => {
		deleteUser(user._id)
		.then(res => console.log(res))
		.catch(error => console.log(error))
		// TODO: Success or failure message
	}

	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row">
				{user.full_name}
			</TableCell>
			<TableCell align="right">{user.last_connection}</TableCell>
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
	)
}

export default UserListItem