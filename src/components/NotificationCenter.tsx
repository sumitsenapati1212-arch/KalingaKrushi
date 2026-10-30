import React from 'react';
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export interface NotificationItem {
  id: string;
  type: 'alert' | 'market' | 'irrigation' | 'scheme';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  language,
  notifications,
  onMarkAllRead,
  onDismiss,
}) => {
  if (!isOpen) return null;
  const t = translations[language] || translations.en;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'market':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'irrigation':
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'scheme':
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-white dark:bg-stone-900 shadow-2xl border-l border-slate-200 dark:border-stone-800 flex flex-col justify-between p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.notifications}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {notifications.filter((n) => !n.read).length} unread alerts
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action to mark all as read */}
          <div className="flex justify-end">
            <button
              onClick={onMarkAllRead}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              {t.markAllRead}
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No new notifications. All polyhouse parameters optimal.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition relative group ${
                    n.read
                      ? 'bg-slate-50 dark:bg-stone-800/40 border-slate-200/60 dark:border-stone-800 text-slate-500'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-slate-900 dark:text-white shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-stone-800 shadow-sm mt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 pr-4">
                      <div className="text-xs font-bold">{n.title}</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {n.message}
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1 font-mono">{n.time}</div>
                    </div>
                    <button
                      onClick={() => onDismiss(n.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition"
                      title="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-stone-800 text-center text-[11px] text-slate-400">
          Connected to IoT Polyhouse Gateway • Auto-Sync 10s
        </div>
      </div>
    </div>
  );
};
