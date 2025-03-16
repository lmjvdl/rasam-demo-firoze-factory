import { useState, useEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

export type SocketDataType = {
  online: boolean;
  device: string;
  time: string;
  product_line_part: number;
  data: {
    temperature?: number;
    current?: number;
    frequency?: number;
    dcVoltage?: number;
    acVoltage?: number;
  };
};

const useWebSocket = (id: string) => {
  const [devices, setDevices] = useState<SocketDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `ws://192.168.229.28:8080/ws/admin/${id}/`;

    const ws = new ReconnectingWebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const transformedData = transformData(message);

      setDevices((prevDevices) => {
        // بررسی آیا دستگاه قبلاً در لیست وجود دارد یا خیر
        const deviceIndex = prevDevices.findIndex(
          (device) => device.device === transformedData.device
        );

        if (deviceIndex === -1) {
          // اگر دستگاه جدید است، به لیست اضافه کنید
          return [...prevDevices, transformedData];
        } else {
          // اگر دستگاه تکراری است، اطلاعات آن را به‌روزرسانی کنید
          const updatedDevices = [...prevDevices];
          updatedDevices[deviceIndex] = transformedData;
          return updatedDevices;
        }
      });

      setLoading(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket Error: ", err);
      setError("Error connecting to WebSocket");
      setLoading(false);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [id]);

  const transformData = (data: any): SocketDataType => {
    return {
      online: data.online,
      device: data.device,
      time: data.time,
      product_line_part: data.product_line_part,
      data: {
        temperature: data.data.temperature,
        current: data.data.current || 0,
        frequency: data.data.frequency || 0,
        dcVoltage: data.data.dcVoltage || 0,
        acVoltage: data.data.acVoltage || 0,
      },
    };
  };

  return { devices, loading, error };
};

export default useWebSocket;