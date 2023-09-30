import { UserContext } from '../../Context/UserContext'
// import './Chat.css'
import { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { Box, Typography } from '@mui/material'

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
		const msg = chatBox.current.value
		if (msg) {
			socket.emit('newMessage', { message: msg, from: user.full_name })
			chatBox.current.value = ''
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
		<Box>
			<Typography textAlign='center' variant='h5'>Chat</Typography>
			<Box>
				{messages.map(msg => <Message key={msg._id} msg={msg}/>)}
			</Box>
			<fieldset className="msg-input">
				<input type="text" placeholder="Message" ref={chatBox} />
				<button onClick={sendMessage}>
					<img src="/icons/send.svg" alt="Send" />
				</button>
			</fieldset>
		</Box>
	)
}

export default Chat