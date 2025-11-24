import React from 'react';
import { ViewState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: ViewState.DASHBOARD, label: t('nav_home'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: ViewState.GPS, label: t('nav_gps'), icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z m-5.657-8.121a3 3 0 10-6 6 3 3 0 006-6z' },
    { id: ViewState.BLE, label: t('nav_ble'), icon: 'M17.7 7.7L12 2h-1v7.6L6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 11 14.4V22h1l5.7-5.7L13.4 12l4.3-4.3zM13 5.8l1.9 1.9L13 9.6V5.8zm0 12.3v-3.8l1.9 1.9L13 18.1z' },
    { id: ViewState.NOTIFICATIONS, label: t('nav_alerts'), icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  ];

  return (
    <nav className={`
      z-50 bg-surface/95 backdrop-blur-lg border-slate-700
      fixed bottom-0 w-full border-t h-[80px] pb-safe pt-2 px-4
      md:relative md:w-64 md:h-full md:border-t-0 md:border-r md:pt-0 md:px-0 md:pb-0 md:flex md:flex-col
    `}>
      {/* Desktop Logo Area */}
      <div className="hidden md:flex h-20 items-center px-6 border-b border-slate-700 mb-4">
         <div className="h-8 w-8 bg-primary rounded-lg mr-3 flex items-center justify-center text-white font-bold">O</div>
         <span className="text-xl font-bold text-white">{t('app_name')}</span>
      </div>

      <div className="
        flex justify-between items-center h-full pb-2
        md:flex-col md:justify-start md:items-stretch md:space-y-2 md:h-auto md:px-3 md:pb-0
      ">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                flex items-center transition-all duration-200 rounded-xl
                flex-col justify-center w-full space-y-1
                md:flex-row md:justify-start md:px-4 md:py-3 md:space-y-0 md:space-x-3 md:w-full
                ${isActive 
                  ? 'text-primary md:bg-primary/10 md:text-primary md:font-semibold' 
                  : 'text-slate-400 hover:text-slate-200 md:hover:bg-slate-800'
                }
              `}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={item.icon} />
              </svg>
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Desktop Footer */}
      <div className="hidden md:block mt-auto p-6 border-t border-slate-700">
        <p className="text-xs text-slate-500">{t('footer_ver')}</p>
      </div>
    </nav>
  );
};