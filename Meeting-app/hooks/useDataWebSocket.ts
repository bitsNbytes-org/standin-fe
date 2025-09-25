import { useEffect } from 'react';

const useDataWebSocket = () => {
  useEffect(() => {
    const ws = new WebSocket('wss://echo.websocket.org');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log('websocket data', data);
    };

    return () => ws.close();
  }, []);
};

export default useDataWebSocket;
