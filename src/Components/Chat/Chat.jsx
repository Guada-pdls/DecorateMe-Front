import { UserContext } from '../../Context/UserContext'
// import './Chat.css'
import { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Typography } from '@mui/material'
import { Send } from '@mui/icons-material'

const Chat = () => {
	
	const [messages, setMessages] = useState([])
	const { user, socket } = useContext(UserContext)

	useEffect(() => {
		socket.on('allMessages', data => {
			setMessages(data)
		})
	
		return () => {
			socket.off('allMessages')
		}
	}, [socket])
	

	const chatBox = useRef(null)

	const sendMessage = () => {
		const msg = chatBox.current.firstChild.value
		if (msg) {
			socket.emit('newMessage', { message: msg, from: user.full_name })
			chatBox.current.firstChild.value = ''
		}
	}

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message])
		})

		return () => {
			socket.off('message')
		}

	}, [messages, socket])

	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			minHeight: '90vh',
			margin: '1rem auto'
		}}>
			<Paper sx={{
				width: '300px',
				padding: '16px 22px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}>
				<Box>
					<Typography textAlign='center' variant='h5'>Chat</Typography>
					<Box>
						{messages.length > 0 && messages.map(msg => <Message key={msg._id} msg={msg}/>)}
					</Box>
				</Box>
				<FormControl variant='standard'>
					<InputLabel htmlFor='send'>Message</InputLabel>
					<Input ref={chatBox} endAdornment={
						<InputAdornment position='end'>
							<IconButton onClick={sendMessage}>
								<Send/>
							</IconButton>
						</InputAdornment>
					}></Input>
				</FormControl>
				{/* <fieldset className="msg-input">
					<input type="text" placeholder="Message" ref={chatBox} />
					<button onClick={sendMessage}>
						<img src="/icons/send.svg" alt="Send" />
					</button>
				</fieldset> */}
			</Paper>
		</Box>
	)
}

export default Chat