import Head from 'next/head';

import Form from 'components/form/Form';

export default function Home() {
  return (
    <div>
      <Head>
        <title>RemoteSmartSDR</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      </Head>

      <main>
        <div className="container">
          <h1>
            RemoteSmartSDR
          </h1>

          <Form />
        </div>      
      </main>

      <footer>

      </footer>
    </div>
  );
}
