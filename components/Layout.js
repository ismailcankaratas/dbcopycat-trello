import React from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Ecommerce Website' />
                <link rel="icon" type="image/x-icon" href="https://a.trellocdn.com/prgb/dist/images/ios/apple-touch-icon-144x144-precomposed.b2a61dcb04053829cdcc.png" />
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}
