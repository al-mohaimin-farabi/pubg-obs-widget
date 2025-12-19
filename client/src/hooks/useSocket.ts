import { useEffect, useRef, useState } from "react";
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
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Always keep latest refs
  useEffect(() => {
    eventsRef.current = events || {};
    onConnectRef.current = onConnect;
    onDisconnectRef.current = onDisconnect;
  });

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const socket = io(`${baseUrl}${namespace}`);
    socketRef.current = socket;

    const namespaceName = namespace.replace("/", "");

    // Default update listener
    socket.on(`${namespaceName}:update`, (data) => {
      setData(data);
    });

    // Custom events - bind once, delegate to ref
    // We assume keys don't change frequently. If they do, this effect should list keys as dep.
    const eventKeys = Object.keys(events || {});
    eventKeys.forEach((event) => {
      socket.on(event, (data) => {
        eventsRef.current[event]?.(data);
      });
    });

    socket.on("connect", () => {
      console.log(`Connected to ${namespace}`);
      setIsConnected(true);
      socket.emit(`${namespaceName}:request`);
      onConnectRef.current?.(socket);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from ${namespace}`);
      setIsConnected(false);
      onDisconnectRef.current?.();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
    // Re-run ONLY if namespace or the *set* of event keys changes
  }, [namespace, JSON.stringify(Object.keys(events || {}))]);

  return { socket: socketRef.current, isConnected, data };
};
