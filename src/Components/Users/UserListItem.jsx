/* eslint-disable react/prop-types */
import { Delete } from "@mui/icons-material"
import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material"

function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const UserListItem = ({ user }) => {
	console.log(user)
	return (
		<ListItem
			secondaryAction={
				<IconButton edge="end" aria-label="delete">
					<Delete />
				</IconButton>}>
			<ListItemAvatar>
				<Avatar {...stringAvatar(user.full_name)}>
					<Box component="img" src={user.photo} alt={user.full_name} ></Box>
					
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={user.full_name} />
		</ListItem>
	)
}

export default UserListItem