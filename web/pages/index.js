import Head from 'next/head';

import { Main } from 'pages/Main';
import { Nav } from 'components/nav/Nav';

const Home = () => {
  return (
    <div>
      <Head>
        <title>remoteSmartSDR</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      </Head>

      <Nav />

      <main>
        <div className="container">
          <Main />
        </div>      
      </main>
    </div>
  );
}

export default Home;
