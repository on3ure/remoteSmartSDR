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

          <div className="grid grid--gap">
            <div className="column-xs-12 column-sm-6">
              <Card>
                <div>
                  <label htmlFor="ip">IP address</label>
                  <input type="text" id="ip" name="ip" maxLength="15" />
                </div>
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <div>
                  <label htmlFor="port">TCP port</label>
                  <input type="text" id="port" name="port" maxLength="5" />
                </div>
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <Slider
                  label="PTT release delay"
                  description="Test"
                  name="slider1"
                  min="100"
                  max="500"
                />
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <Slider
                  label="Offset"
                  description="Test"
                  name="slider2"
                  min="1"
                  max="1000"
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
