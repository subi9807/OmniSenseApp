import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { GpsPanel } from './components/GpsPanel';
import { BlePanel } from './components/BlePanel';
import { PushPanel } from './components/PushPanel';
import { ViewState } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const DashboardContent: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto w-full">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 md:p-10 text-white shadow-lg shadow-primary/20">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">{t('dash_welcome')}</h2>
                <p className="text-blue-100 text-sm md:text-base opacity-90 max-w-2xl">
                  {t('dash_desc')}
                </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <div onClick={() => setView(ViewState.GPS)} className="bg-surface p-5 rounded-xl border border-slate-700 hover:border-primary/50 hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="text-accent mb-3 p-3 bg-accent/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z m-5.657-8.121a3 3 0 10-6 6 3 3 0 006-6z" /></svg>
                    </div>
                    <h3 className="font-bold text-slate-200 text-lg">{t('dash_card_gps_title')}</h3>
                    <p className="text-xs text-slate-500 mt-1">{t('dash_card_gps_desc')}</p>
                </div>
                <div onClick={() => setView(ViewState.BLE)} className="bg-surface p-5 rounded-xl border border-slate-700 hover:border-yellow-500/50 hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="text-yellow-400 mb-3 p-3 bg-yellow-400/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.7 7.7L12 2h-1v7.6L6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 11 14.4V22h1l5.7-5.7L13.4 12l4.3-4.3zM13 5.8l1.9 1.9L13 9.6V5.8zm0 12.3v-3.8l1.9 1.9L13 18.1z" /></svg>
                    </div>
                    <h3 className="font-bold text-slate-200 text-lg">{t('dash_card_ble_title')}</h3>
                    <p className="text-xs text-slate-500 mt-1">{t('dash_card_ble_desc')}</p>
                </div>
                 <div onClick={() => setView(ViewState.NOTIFICATIONS)} className="bg-surface p-5 rounded-xl border border-slate-700 hover:border-pink-500/50 hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="text-pink-400 mb-3 p-3 bg-pink-400/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </div>
                    <h3 className="font-bold text-slate-200 text-lg">{t('dash_card_push_title')}</h3>
                    <p className="text-xs text-slate-500 mt-1">{t('dash_card_push_desc')}</p>
                </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">{t('sys_integrity')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center text-sm bg-slate-800/50 p-3 rounded-lg">
                        <span className="text-slate-300">{t('sys_geo')}</span>
                        <span className="text-green-400 flex items-center text-xs font-bold"><span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>{t('status_ready')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-slate-800/50 p-3 rounded-lg">
                        <span className="text-slate-300">{t('sys_ble')}</span>
                        <span className="text-yellow-400 flex items-center text-xs font-bold"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>{t('status_standby')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-slate-800/50 p-3 rounded-lg">
                        <span className="text-slate-300">{t('sys_ai')}</span>
                        <span className="text-purple-400 flex items-center text-xs font-bold"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>{t('status_connected')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppInner: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const { t } = useLanguage();

  const renderContent = () => {
    switch (view) {
      case ViewState.GPS:
        return <GpsPanel />;
      case ViewState.BLE:
        return <BlePanel />;
      case ViewState.NOTIFICATIONS:
        return <PushPanel />;
      case ViewState.DASHBOARD:
      default:
        return <DashboardContent setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-dark text-slate-100">
      {/* Navigation - Moves to side on desktop */}
      <Navigation currentView={view} onViewChange={setView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header title={t('app_name')} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 md:pb-8 no-scrollbar scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
};

export default App;