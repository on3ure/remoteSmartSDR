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
                  description="Push-to-Talk release delay"
                  name="slider1"
                  min="0"
                  max="4"
                  steps={[100, 200, 300, 400 ,500]}
                />
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <Slider
                  label="Offset"
                  description="Push-to-Talk offset"
                  name="slider2"
                  min="0"
                  max="12"
                  steps={[1, 5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500, 1000]}
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
