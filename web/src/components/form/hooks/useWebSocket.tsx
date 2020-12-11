import { useEffect, useState } from 'react';

export const useHomepageWebSocket = () => {
    const [homepageWsValues, setHomepageWsValues] = useState<any[]>([]);

    useEffect(() => {
      const ws = new WebSocket('ws://' + location.host + ':8080');
      console.log('init ws', ws);
      ws.onmessage = evt => {
        const data = JSON.parse(evt.data);

        console.log('on messaga', data);

        setHomepageWsValues(data);
      };
    }, []);

    const submitHomepageWsValues = (values) => {
      const ws = new WebSocket('ws://' + location.host + ':8080');
      ws.send(JSON.stringify(values));
    };

    return [homepageWsValues, submitHomepageWsValues];
};
