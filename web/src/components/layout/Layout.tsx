import React, { FC } from 'react';
import Head from 'next/head';

import { Nav } from 'components/nav/Nav';

export const Layout:FC = ({ children }) => (
  <>
    <Head>
      <title>remoteSmartSDR</title>
      <link rel="icon" href="/favicon.png" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
    </Head>

    <Nav />

    <main>
      <div className="container">
        {children}
      </div>      
    </main>
  </>
);