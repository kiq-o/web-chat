import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';

export default function Login() {
  const router = useRouter();

  const { user, login } = useContext(AuthContext);
  const [userName, setUserName] = useState(null);

  return (
    <>
      <Center padding="96" pt="14" pb="14" verticalAlign="middle" bg="gray.100">
        <div style={{ width: '100%', position: 'relative' }}>
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
            <Box borderRadius="50px" bg="gray.200" p={2}>
              <Container>
                {user
                  ? `Logado como ${user}`
                  : 'Crie uma conta para usar o chat.'}
              </Container>
            </Box>
            <Center>
              <div style={{ marginTop: '8rem', display: 'flex' }}>
                <Input
                  _focus={{}}
                  placeholder="Seu nome"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></Input>
                <Button
                  _focus={{}}
                  bg={'green.200'}
                  ml="5"
                  onClick={async () => {
                    var nameError = document.getElementById('nameError');
                    var loggedIn = document.getElementById('loggedIn');

                    nameError.style.display = 'none';
                    loggedIn.style.display = 'none';

                    if (!userName) {
                      nameError.style.display = 'inherit';
                    } else {
                      loggedIn.style.display = 'inherit';
                      login(userName);
                      router.push('/');
                      //router.push('/');
                    }
                  }}
                >
                  Login
                </Button>
              </div>
            </Center>
            <Center>
              <Alert
                id="nameError"
                display="none"
                mt="5"
                w="70%"
                borderRadius="25px"
                status="error"
              >
                <AlertIcon />
                Digite um nome.
              </Alert>

              <Alert
                id="loggedIn"
                display="none"
                mt="5"
                w="70%"
                borderRadius="25px"
                status="success"
              >
                <AlertIcon />
                Logado!
              </Alert>
            </Center>
          </Box>
        </div>
      </Center>
    </>
  );
}
