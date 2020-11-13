import React, { useState } from 'react';

import FrequencyContext from 'context/FrequencyContext';

import '../src/global.scss';

const MyApp = ({ Component, pageProps }) => {
  const [hertz, setHertz] = useState(100500200);
  const [hertzShift, setHertzShift] = useState();

  return (
    <FrequencyContext.Provider value={{ hertz: [hertz, setHertz], hertzShift: [hertzShift, setHertzShift]}}>
      <Component {...pageProps} />
    </FrequencyContext.Provider>
  );
};

export default MyApp