/* eslint-disable react/prop-types */
import './Message.css'

const Message = ({msg}) => {
  return (
    <div className='message'>
        <h6>- {msg.userName}</h6>
        <p>{msg.message}</p>
    </div>
  )
}

export default Message