import Head from 'next/head'

import Card from '~/src/components/card/Card';
import Slider from '~/src/components/slider/Slider';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      </Head>

      <main>
        <div className="container">
          <h1>
            RemoteSmartSDR
          </h1>

          <div className="grid grid--gap-sm">
            <div className="column-xs-6 column-lg-4 column-xl-3">
              <Card>
                <Slider
                  label="SmartSDRip"
                  description="Test"
                  name="slider1"
                />
              </Card>
            </div>
            <div className="column-xs-6 column-lg-4 column-xl-3">
              <Card>
                <Slider
                  label="SmartSDRport"
                  description="Test"
                  name="slider2"
                />
              </Card>
            </div>
          </div>
        </div>      
      </main>

      <footer>

      </footer>
    </div>
  )
}
