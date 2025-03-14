// hooks/useWebSocket.ts
import { useState, useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const useWebSocket = (id: string) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `ws://172.25.10.63:8080/ws/admin/${id}/`;

    const ws = new ReconnectingWebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
      setLoading(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket Error: ', err);
      setError('Error connecting to WebSocket');
      setLoading(false);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [id]);

  return { data, loading, error };
};

export default useWebSocket;
