import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux'
import store from '../utils/store';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ToastContainer />
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </Provider>
    </>
  )
}

function Auth({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() { router.push('/login') }
  });

  if (status === 'loading') {
    <div>Yükleniyor...</div>
  }
  return children
}

export default MyApp
