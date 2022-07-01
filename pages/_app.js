import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>

    </>
  )
}

export default MyApp
