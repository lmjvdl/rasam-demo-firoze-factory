import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ReconnectingWebSocket from "reconnecting-websocket";

const useWebSocket = <T,>(id: number) => {
  const [devices, setDevices] = useState<T[]>([]);
  const wsRef = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `ws://172.20.10.6:8080/ws/admin/${id}/`;
    const ws = new ReconnectingWebSocket(wsUrl);

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      setDevices((prevDevices) =>
        prevDevices.map((device: any) =>
          device.device === newData.device ? { ...device, ...newData } : device
        )
      );
    };

    ws.onerror = () => toast.error("خطا در ارتباط با سرور!");

    wsRef.current = ws;
    return () => wsRef.current?.close();
  }, [id]);

  return { devices };
};

export default useWebSocket;
