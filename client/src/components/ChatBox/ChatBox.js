import React, { useEffect, useRef, useState } from 'react';
// import './ChatBox.css';
import { getUser } from '../../api/UserRequest';
import { addMessage, getMessages } from '../../api/MessageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find(id => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetching data for messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = newMessage => {
    setNewMessage(newMessage);
  };

  const handleSend = async e => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    // send message to db
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setMessages('');
    } catch (err) {
      console.log(err);
    }

    // send message to socket server
    const receiverId = chat.members.find(id => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className='ChatBox-container'>
        {chat ? (
          <>
            <div className='chat-header'>
              <div className='follower'>
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          'defaultProfile.png'
                    }
                    alt='profileImage'
                    className='followerImage'
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                  <div className='name' style={{ fontSize: '0.8rem' }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: '90%', border: '0.1px solid #ececec' }} />
            </div>
            {/* chatbox messages  */}
            <div className='chat-body'>
              {messages.map(message => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? 'message own'
                        : 'message'
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender  */}
            <div className='chat-sender'>
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className='send-button button' onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className='chatbox-empty-message'>
            Tap on Chat to start Conversation
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
