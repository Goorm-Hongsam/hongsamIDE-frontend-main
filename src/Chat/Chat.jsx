import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

function Chat({ uuid, roomId, sender }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (stompClient && message) {
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${roomId}`,
          sender: `${sender}`,
          message: message,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString().slice(0, -3),
          uuid: `${uuid}`,
        }),
      });
      setMessage('');
    }
  };

  useEffect(() => {
    const socket = new SockJS('https://chat.hong-sam.online/ws/chat');
    const stompClient = new Client();
    stompClient.webSocketFactory = () => socket;
    stompClient.onConnect = () => {
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'ENTER',
          roomId: `${roomId}`,
          sender: `${sender}`,
          message: null,
          uuid: `${uuid}`,
        }),
      });
      setStompClient(stompClient);
    };
    stompClient.activate();

    fetchMessages();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (frame) => {
        const receivedMessage = JSON.parse(frame.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }
  }, [stompClient]);

  const fetchMessages = () => {
    if (!isLoading) {
      setIsLoading(true);

      axios
        .get(`https://chat.hong-sam.online/chat/message/${roomId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const newMessages = response.data;
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <ChatContainer>
      <ChatWrapper ref={scrollContainerRef}>
        {messages.map((message, index) => (
          <MessageContainer
            key={index}
            alignEnd={
              message.type === 'ENTER' || message.sender === `${sender}`
            }
          >
            {message.type === 'ENTER' ? (
              <EnterMessage>{message.message}</EnterMessage>
            ) : message.sender === `${sender}` ? (
              <div>
                <SenderReceiver>{message.sender}</SenderReceiver>
                <ChatMessage isSender={true}>{message.message}</ChatMessage>
                <TimeStamp>{message.time}</TimeStamp>
              </div>
            ) : (
              <div>
                <SenderReceiver>{message.sender}</SenderReceiver>
                <ChatMessage isSender={false}>{message.message}</ChatMessage>
                <TimeStamp>{message.time}</TimeStamp>
              </div>
            )}
          </MessageContainer>
        ))}
      </ChatWrapper>
      <TextContainer>
        <InputText
          type="text"
          placeholder="메시지를 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </TextContainer>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  width: 400px;
  height: 500px;
  border: 1px solid gray;
  margin: 0 auto;
  position: relative;
`;

const ChatWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 410px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
`;

const EnterMessage = styled.div`
  text-align: center;
  padding: 10px 0;
`;

const TextContainer = styled.div`
  display: flex;
  padding-top: 20px;
  gap: 5px;
  margin: 0 10px;
`;

const InputText = styled.input`
  height: 40px;
  width: 350px;
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'flex-start')};
  padding: 5px 0;
`;

const SenderReceiver = styled.div`
  font-size: 16px;
  padding-bottom: 5px;
`;

const ChatMessage = styled.div`
  background-color: ${({ isSender }) =>
    isSender ? 'var(--main-color)' : '#0079ff'};
  padding: 10px;
  border-radius: 10px;
  max-width: 200px;
  font-size: 14px;
  line-height: 1.4;
  color: white;
`;

const TimeStamp = styled.div`
  padding-top: 5px;
  font-size: 12px;
`;

export default Chat;
