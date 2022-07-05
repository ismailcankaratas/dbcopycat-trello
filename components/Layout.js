import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title ? title + " | Dbcopycat" : "Dbcopycat"}</title>
                <meta name='description' content='Dbcopycat trello clone uygulaması' />
                <link rel="icon" type="image/x-icon" href="https://a.trellocdn.com/prgb/dist/images/ios/apple-touch-icon-144x144-precomposed.b2a61dcb04053829cdcc.png" />
            </Head>
            <div className="flex flex-no-wrap dark ">
                <div className="fixed left-0 top-0 h-full">
                    <Sidebar />
                </div>
                {/* Remove class [ h-64 ] when adding a card block */}
                <div className="container mx-auto py-10 md:w-4/5 w-11/12 md:pr-10">
                    {children}
                </div>
            </div>
        </>
    )
}
