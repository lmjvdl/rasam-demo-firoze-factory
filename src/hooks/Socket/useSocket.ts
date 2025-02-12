import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/constants/baseURL";

/**
 * Custom React hook to manage a persistent Socket.IO connection.
 * Handles automatic reconnection attempts and notifies when connection is lost.
 */
const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [data, setData] = useState<any>(null); // Store received data

  const connectSocket = useCallback(() => {
    
    if (!socketRef.current) {
      socketRef.current = io(BASE_URL, {
        /**
         * Priority is given to the websocket, and if the web socket connection is interrupted, 
         * By using (tryAllTransports) variable,
         * the polling method is used, which causes new tunnels to be opened, 
         * and we try to establish the connection through these tunnels.
         */
        transports: ["websocket", "polling"],
        tryAllTransports: true,
        reconnection: false, // We handle reconnection manually
        closeOnBeforeunload: true,  // Disconnects the socket when the user leaves the page
        // *********************** // We should add attribute (auth) feature // ************************ //
      });

      socketRef.current.on("connect", () => {
        setIsConnected(true);
        setReconnectAttempts(0);
        setIsNetworkError(false);
      });

      socketRef.current.on("disconnect", (reason) => {
        setIsConnected(false);
        console.log("Disconnected from the server. Reason:", reason);

        if (reason === "io server disconnect") {
          console.log("Disconnected by server, trying to reconnect...");
          attemptReconnect();
        } else if (reason === "transport close") {
          setIsNetworkError(true);
          attemptReconnect();
        }
      });

      // Listen for data from server
      socketRef.current.on("data_event", (payload) => {
        console.log("Received data:", payload);
        setData(payload);
      });
    }
  }, []);

  const attemptReconnect = useCallback(() => {
    let attempt = 1;
    const interval = setInterval(() => {
      if (attempt > 6) {
        clearInterval(interval);
        return;
      }

      console.log(`Reconnection attempt ${attempt}...`);
      setReconnectAttempts(attempt);
      attempt++;

      if (!socketRef.current?.connected) {
        socketRef.current?.connect();
      }
    }, 10000); // 10 seconds interval
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectSocket]);

  return {
    socket: socketRef.current,
    isConnected,
    isNetworkError,
    reconnectAttempts,
    reconnect: connectSocket,
    data, // Expose received data
  };
};

export default useSocket;
