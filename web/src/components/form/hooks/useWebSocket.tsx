import { useEffect, useState, useRef } from 'react';

import { HomepageFormValues } from 'components/form/interfaces/Interfaces';

export const useHomepageWebSocket = () => {
    const ws = useRef(null);
    const [homepageWsValues, setHomepageWsValues] = useState<HomepageFormValues>({
      SmartSDRfrequency: '0',
      SmartSDRfrequencyShift: null,
      SmartSDRptt: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      ws.current = new WebSocket('ws://' + location.host + ':8080');
    }, [ws]);

    useEffect(() => {
      if (ws.current) {
        ws.current.onmessage = evt => {
          const data = JSON.parse(evt.data);
          let dataObject: HomepageFormValues | {} = {};

          data.forEach(({ channel, message }) => {
            dataObject[channel] = message;
          });

          setHomepageWsValues(dataObject);
        };
      }
    }, [ws.current]);

    useEffect(() => {
      if (homepageWsValues.SmartSDRfrequency !== null
          && homepageWsValues.SmartSDRfrequencyShift !== null
          && homepageWsValues.SmartSDRptt != null) {
        setLoading(false);
      }
    }, [homepageWsValues]);

    const submitHomepageWsValues = (values: HomepageFormValues): void => {
      const channels = Object.keys(values);
      const finalValues = channels.map((channel) => ({
        message: values[channel],
        channel: channel,
      }));

      console.log('values', values);
      console.log('posting web socket', finalValues);

      if (ws.current) {
        ws.current.send(JSON.stringify(finalValues));
      }
    };

    return [homepageWsValues, submitHomepageWsValues, loading];
};
