import './Chat.css'
import { useRef } from 'react'
// import Message from './Message'

const Chat = () => {

    const sendBtn = useRef(null)
    const chatBox = useRef(null)

    return (
        <div className="chat">
            <h3>Chat</h3>
            <h5 id="userName"></h5>
            <div className="messages">
                {/* {messages.map(msg => <Message msg={msg}/>)} */}
            </div>
            <fieldset className="msg-input">
                <input type="text" placeholder="Message" ref={chatBox}/>
                    <button ref={sendBtn}>
                        <img src="/public/icons/send.svg" alt="Send"/>
                    </button>
            </fieldset>
        </div>
    )
}

export default Chat