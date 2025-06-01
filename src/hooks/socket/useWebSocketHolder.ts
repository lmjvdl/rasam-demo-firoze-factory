// src/hooks/socket/useSocket.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import toast from "react-hot-toast";
import WsUrl from "@/utils/url/general/wsUrl";

const MAX_DATA_POINTS = 100;

const useWebSocketHolder = <T extends { device: number; time: number }>(
  id: number,
  initialDevices: T[] = []
) => {
  const [devicesHistory, setDevicesHistory] = useState<Record<number, T[]>>({});

  // تابع برای اضافه کردن داده جدید به تاریخچه
  const addDataToHistory = useCallback((newData: T) => {
    setDevicesHistory(prev => {
      const deviceId = newData.device;
      const currentDeviceData = prev[deviceId] || [];
      
      // بررسی آیا داده تکراری است (بر اساس زمان)
      const isDuplicate = currentDeviceData.some(
        item => item.time === newData.time
      );
      
      if (isDuplicate) {
        return prev;
      }

      // اضافه کردن داده جدید و محدود کردن تعداد نقاط
      const updatedData = [...currentDeviceData, newData].slice(-MAX_DATA_POINTS);

      return {
        ...prev,
        [deviceId]: updatedData,
      };
    });
  }, []);

  useEffect(() => {
    // مقداردهی اولیه با داده‌های دریافتی از API
    const initialHistory: Record<number, T[]> = {};
    initialDevices.forEach((device) => {
      initialHistory[device.device] = [device];
    });
    setDevicesHistory(initialHistory);
  }, [initialDevices]);

  useEffect(() => {
    const wsUrlInstance = WsUrl.getInstance();
    const wsUrl = `${wsUrlInstance.origin}${id}/`;
    
    const ws = new ReconnectingWebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data) as T;
        addDataToHistory(newData);
      } catch {
        toast.error("خطا در پردازش داده دریافتی!");
      }
    };

    ws.onerror = () => {
      toast.error("خطا در ارتباط با سرور!");
    };

    return () => ws.close();
  }, [id, addDataToHistory]);

  // آخرین داده هر دستگاه برای نمایش عمومی
  const lastDevicesData = useMemo(() => {
    return Object.entries(devicesHistory)
      .map(([deviceId, history]) => history[history.length - 1])
      .filter(Boolean);
  }, [devicesHistory]);

  return { 
    devices: lastDevicesData, 
    devicesHistory 
  };
};

export default useWebSocketHolder;