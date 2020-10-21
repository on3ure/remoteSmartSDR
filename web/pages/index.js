import Head from 'next/head'

import Slider from '~/src/components/slider/Slider';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          RemoteSmartSDR
        </h1>

        <Slider
          name="slider1"
        />

        <Slider
          name="slider2"
        />
        
      </main>

      <footer>

      </footer>
    </div>
  )
}
