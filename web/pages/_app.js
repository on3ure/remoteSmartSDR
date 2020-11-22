import { AppProvider } from 'contexts/AppContext';

import '../src/global.scss';

const RemoteSmartSDR = ({ Component, pageProps }) => (
  <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
);

export default RemoteSmartSDR;
