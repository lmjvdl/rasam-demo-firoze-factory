import { useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import toast from "react-hot-toast";
import WsUrl from "@/utils/url/general/wsUrl";

const useWebSocket = <T extends { device: number }>(id: number, initialDevices: T[] = []) => {
  const [devices, setDevices] = useState<T[]>([]);
  
  useEffect(() => {
    setDevices(initialDevices);
  }, [initialDevices]);

  useEffect(() => {
    const wsUrlInstance = WsUrl.getInstance();
    const wsUrl = `${wsUrlInstance.origin}${id}/`;
    
    const ws = new ReconnectingWebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data) as T;
        setDevices(prev => {
          if (initialDevices.some(d => d.device === newData.device)) {
            return prev.map(device => 
              device.device === newData.device ? { ...device, ...newData } : device
            );
          }
          return prev;
        });
      } catch {
        toast.error("خطا در ارتباط با سرور!");
      }
    };

    ws.onerror = () => {
      toast.error("خطا در ارتباط با سرور!");
    };

    return () => ws.close();
  }, [id, initialDevices]);

  return { devices };
};
export default useWebSocket;