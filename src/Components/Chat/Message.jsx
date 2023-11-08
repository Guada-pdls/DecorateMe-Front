/* eslint-disable react/prop-types */
import { useContext } from 'react'
// import './Message.css'
import { UserContext } from '../../Context/UserContext'
import { Box, Typography } from '@mui/material'

const Message = ({msg}) => {
  
  const { user } = useContext(UserContext)

  return (
    <Box sx={{
      marginY: '8px'
    }} className='message'>
        <Typography variant='title'>- {user.full_name === msg.from ? 'Me' : msg.from}</Typography>
        <Typography>{msg.message}</Typography>
    </Box>
  )
}

export default Message