"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const styles: Record<NotificationType, string> = {
  success: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
  error: "border-rose-500/30 bg-rose-500/15 text-rose-200",
  warning: "border-amber-500/30 bg-amber-500/15 text-amber-200",
  info: "border-fuchsia-500/30 bg-fuchsia-500/15 text-fuchsia-200",
};

const icons: Record<NotificationType, string> = {
  success: "✅",
  error: "⚠️",
  warning: "⚡",
  info: "ℹ️",
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      const id = Date.now() + Math.random();
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3500);
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl transition-all ${styles[n.type]}`}
          >
            <span>{icons[n.type]}</span>
            <span className="font-medium">{n.message}</span>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
