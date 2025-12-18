import { useEffect, useRef, useState, useMemo } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  namespace: string;
  events?: Record<string, (data: unknown) => void>;
  onConnect?: (socket: Socket) => void;
  onDisconnect?: () => void;
}

export const useSocket = (options: UseSocketOptions) => {
  const { namespace, events, onConnect, onDisconnect } = options;
  const eventsRef = useRef<Record<string, (data: unknown) => void>>({});
  const onConnectRef = useRef<((socket: Socket) => void) | undefined>(
    undefined
  );
  const onDisconnectRef = useRef<(() => void) | undefined>(undefined);
  const [data, setData] = useState<unknown>(null);

  // Memoize the events object to prevent recreation
  const memoizedEvents = useMemo(() => events || {}, [events]);

  useEffect(() => {
    // Update refs when callbacks change
    eventsRef.current = memoizedEvents;
    onConnectRef.current = onConnect;
    onDisconnectRef.current = onDisconnect;

    const baseUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const socket = io(`${baseUrl}${namespace}`);

    // Get namespace name without leading slash
    const namespaceName = namespace.replace("/", "");

    // Set up default update event listener
    socket.on(`${namespaceName}:update`, (updateData) => {
      setData(updateData);
    });

    // Set up custom events
    Object.entries(eventsRef.current).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Connection callbacks
    socket.on("connect", () => {
      console.log(`Connected to ${namespace}`);
      // Automatically emit request event
      socket.emit(`${namespaceName}:request`);
      onConnectRef.current?.(socket);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from ${namespace}`);
      onDisconnectRef.current?.();
    });

    return () => {
      socket.disconnect();
    };
  }, [namespace, memoizedEvents]); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
};
