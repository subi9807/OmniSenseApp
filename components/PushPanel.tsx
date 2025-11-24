import React, { useState, useEffect } from 'react';
import { NotificationLog } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const PushPanel: React.FC = () => {
  const { t } = useLanguage();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [logs, setLogs] = useState<NotificationLog[]>([]);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications');
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const sendTestNotification = () => {
    const title = t('push_alert_title');
    const body = `${t('push_alert_body')} ${new Date().toLocaleTimeString()}`;

    const newLog: NotificationLog = {
      id: Date.now().toString(),
      title,
      body,
      timestamp: new Date()
    };
    setLogs(prev => [newLog, ...prev]);

    if (permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'https://picsum.photos/200',
          vibrate: [200, 100, 200]
        } as any);
      } catch (e) {
        console.error("Notification trigger failed", e);
      }
    } else {
        alert(t('push_denied_msg'));
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full">
      <div className="bg-surface rounded-xl p-6 md:p-8 shadow-lg border border-slate-700 text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('push_title')}</h2>
        <p className="text-slate-400 mb-8">{t('push_status')} <span className={`font-bold uppercase px-2 py-1 rounded text-sm ${permission === 'granted' ? 'bg-green-900/30 text-green-400' : permission === 'denied' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>{permission}</span></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
                onClick={requestPermission}
                disabled={permission === 'granted'}
                className={`py-3 px-4 rounded-lg font-bold text-sm transition-colors
                    ${permission === 'granted' 
                        ? 'bg-green-900/30 text-green-400 border border-green-500/30 cursor-default' 
                        : 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20'
                    }`}
            >
                {permission === 'granted' ? t('push_btn_active') : t('push_btn_enable')}
            </button>
            <button
                onClick={sendTestNotification}
                className="bg-surface border border-slate-600 text-white hover:bg-slate-700 py-3 px-4 rounded-lg font-bold text-sm transition-colors active:scale-95"
            >
                {t('push_btn_test')}
            </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold text-white text-lg">{t('push_log_title')}</h3>
            <button onClick={clearLogs} className="text-xs md:text-sm text-slate-400 hover:text-red-400 font-medium px-3 py-1 hover:bg-slate-800 rounded transition-colors">{t('push_log_clear')}</button>
        </div>
        <div className="divide-y divide-slate-700 max-h-[400px] overflow-y-auto">
            {logs.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                    <p>{t('push_empty')}</p>
                </div>
            ) : (
                logs.map(log => (
                    <div key={log.id} className="p-4 md:p-5 hover:bg-slate-800/50 transition-colors flex items-start space-x-3">
                        <div className="mt-1">
                             <div className="h-2 w-2 rounded-full bg-accent"></div>
                        </div>
                        <div className="flex-1">
                             <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-slate-200">{log.title}</span>
                                <span className="text-xs text-slate-500 bg-dark px-2 py-1 rounded border border-slate-800">{log.timestamp.toLocaleTimeString()}</span>
                            </div>
                            <p className="text-sm text-slate-400">{log.body}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};