import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import UserListItem from './UserListItem'
import Swal from 'sweetalert2'
import Toast from '../Toast'

const Users = () => {

  const { user, getUsers } = useContext(UserContext)
  const [users, setUsers] = useState([])

  const [message, setMessage] = useState({ open: false })

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers(res.data.response.users)
      })
      .catch(error => {
        Swal.fire('Error', error.response.data.error, 'error')
      })
  }, [])

  return (
    user.role?.toUpperCase() === "ADMIN" ?
      (<Typography variant='h4'>Users</Typography>,
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Last connection</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <UserListItem key={user._id} user={user} setUsers={setUsers} users={users} setMessage={setMessage} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Toast msg={message.text} severity={message.success ? 'success' : 'error'} open={message.open} />
        </>)
      : <Typography>Not authorized</Typography>
  )
}

export default Users