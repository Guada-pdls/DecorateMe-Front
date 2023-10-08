import { Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import UserListItem from './UserListItem'

const Users = () => {

	const { user, getUsers } = useContext(UserContext)
	const [users, setUsers] = useState([{}])

	useEffect(() => {
		getUsers().then(res => {
			setUsers(res.data.response.users)
		})
	}, [])

	return (
		user.role.toUpperCase() === "ADMIN" ?
		(<Typography variant='h4'>Users</Typography>,
		users.map(user => <UserListItem key={user._id} user={user}/>))
		: <Typography>Not authorized</Typography>
	)
}

export default Users