import { useEffect } from "react";
import { socketService } from "@/api/communications/socket/socketService";
/* eslint-disable @typescript-eslint/no-explicit-any */

type Listener<T = any> = {
  event: string;
  callback: (data: T) => void;
};

export function useSocketListeners(listeners: Listener[]) {
  useEffect(() => {
    listeners.forEach(({ event, callback }) => {
      socketService.listen(event, callback);
    });

    return () => {
      listeners.forEach(({ event, callback }) => {
        socketService.off(event, callback);
      });
    };
  }, [listeners]);
}
