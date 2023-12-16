import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import styles from './Chat.module.css';

function Chat({ uuid, roomId, sender }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 가장 최신 메세지로 포커스
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 발신 메세지
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

  // 컴포넌트가 마운트 될 때 웹소켓 연결 및 구독
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

    // 컴포넌트가 마운트될 때 이전 대화 내용 불러오기 (추가)
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

  // 이전 대화 내용을 불러오는 함수 (추가)
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
    <div className={styles.Mock}>
      <div className={styles.chat} ref={scrollContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.type === 'ENTER'
                ? styles.enter
                : message.sender === `${sender}`
                ? styles.send
                : styles.receive
            }
          >
            {message.type === 'ENTER' ? (
              <div className={styles.enterMessage}>{message.message}</div>
            ) : message.sender === `${sender}` ? (
              <div className={styles.send}>
                <div className={styles.sender}>{message.sender}</div>
                <span className={styles.sendChat}>{message.message}</span>
                <div className={styles.time}>{message.time}</div>
              </div>
            ) : (
              <div className={styles.receive}>
                <div className={styles.receiver}>{message.sender}</div>
                <span className={styles.receiveChat}>{message.message}</span>
                <div className={styles.time}>{message.time}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.text}>
        <input
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
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default Chat;
