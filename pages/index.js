import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  HStack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import SocketIOClient from 'socket.io-client';
import { AuthContext, getCookie } from '../src/contexts/AuthContext';

export default function Home({ initialMessages }) {
  const router = useRouter();

  const [messages, setMessages] = useState(initialMessages.messages);
  const [connected, setConnected] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const { username } = parseCookies();

    if (!username) {
      router.push('/login');
    }

    const socket = SocketIOClient.connect('http://localhost:3000', {
      path: '/api/socketio',
    });

    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on('message', (user, message, date) => {
      setMessages([{ user: user, message: message, date: date }, ...messages]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  });

  return (
    <>
      <Center pt="14" pb="14" verticalAlign="middle" bg="gray.100">
        <div style={{ width: '50%', position: 'relative' }}>
          <Box
            margin="auto"
            bg="white"
            w="full"
            h="400px"
            color="black"
            boxShadow="md"
            rounded="lg"
            padding={'4'}
          >
            <Box borderRadius="50px" bg="gray.200">
              <div style={{ padding: '5px 15px' }}>
                {user
                  ? `Logado como ${user}`
                  : 'Crie uma conta para usar o chat.'}
              </div>
            </Box>
            <div
              style={{
                height: '90%',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column-reverse',
                overflowY: 'auto',
              }}
              id="chat-box"
            >
              {messages.map((msg, index) => (
                /*<div
                  key={index}
                  className={`message ${msg.user == user ? 'self' : null}`}
                >
                  <Text>{msg.user}</Text>
                  <Text>{msg.message}</Text>
                </div>*/

                <Box
                  key={index}
                  bg={msg.user == user ? 'green.100' : 'orange.100'}
                  w="40%"
                  padding="15px"
                  borderRadius="15px"
                  marginTop="10px"
                  alignSelf={msg.user == user ? 'end' : 'start'}
                >
                  <Text fontWeight="bold" fontSize="medium">
                    {msg.user}
                  </Text>
                  <Text fontSize="small">{msg.message}</Text>
                  <Text color="gray.700" fontSize="smaller" textAlign="end">
                    {msg.date}
                  </Text>
                </Box>
              ))}
            </div>
          </Box>
          <Textarea
            id="textArea"
            placeholder="Digite a mensagem..."
            resize="none"
          ></Textarea>
          <Circle
            cursor="pointer"
            size="30px"
            bg="green.200"
            position="absolute"
            left="90%"
            top="89%"
            zIndex="5"
            onClick={(e) => {
              e.preventDefault();

              const textArea = document.getElementById('textArea');

              if (textArea.value == '') {
                return;
              }

              setMessages([
                {
                  user: user,
                  message: textArea.value,
                  date: new Date().toLocaleTimeString('pt-BR', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }),
                },
                ...messages,
              ]);

              fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user: user,
                  message: textArea.value,
                  date: new Date().toLocaleTimeString('pt-BR', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }),
                }),
              });

              textArea.value = '';
            }}
          >
            <CheckIcon />
          </Circle>
        </div>
      </Center>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/chat');
  const json = await res.json();

  return { initialMessages: json };
};
