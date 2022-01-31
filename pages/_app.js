import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans';
import Head from 'next/head';
import { useState } from 'react';
import { AuthContextProvider } from '../src/contexts/AuthContext';
import '../styles/globals.scss';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WhatsApp 2</title>
      </Head>

      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
