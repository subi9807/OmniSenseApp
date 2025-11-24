import React, { useState, useEffect } from 'react';
import { BleDevice } from '../types';
import { SignalChart } from './SignalChart';
import { analyzeBleSignal } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

export const BlePanel: React.FC = () => {
  const { t, language } = useLanguage();
  const [devices, setDevices] = useState<BleDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>(t('ble_status_ready'));
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  // Reset status message when language changes
  useEffect(() => {
     if (!scanning) setStatusMsg(t('ble_status_ready'));
  }, [language, scanning, t]);

  const startScan = async () => {
    setScanning(true);
    setAiInsight(null);
    setStatusMsg(t('ble_status_init'));

    try {
      if ('bluetooth' in navigator) {
        setStatusMsg(t('ble_status_req'));
        const device = await (navigator as any).bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service'] 
        });
        
        const newDevice: BleDevice = {
          id: device.id,
          name: device.name || 'Unknown Device',
          rssi: -Math.floor(Math.random() * 40 + 40), 
          status: 'connected'
        };
        
        setDevices(prev => [...prev, newDevice]);
        setStatusMsg(`${t('status_connected')} ${newDevice.name}`);
      } else {
        throw new Error("Web Bluetooth API not found");
      }
    } catch (e) {
      console.warn("BLE Scan failed or not supported, switching to simulation.", e);
      setStatusMsg(t('ble_status_sim'));
      
      setTimeout(() => {
        const mockDevices: BleDevice[] = [
            { id: '1', name: 'Oura Ring', rssi: -55, status: 'disconnected' },
            { id: '2', name: 'Tile Tracker', rssi: -72, status: 'disconnected' },
            { id: '3', name: 'Smart Bulb X1', rssi: -88, status: 'disconnected' },
            { id: '4', name: 'Generic HRM', rssi: -60, status: 'disconnected' },
            { id: '5', name: 'Apple Watch', rssi: -45, status: 'disconnected' },
            { id: '6', name: 'Key Finder', rssi: -92, status: 'disconnected' },
        ];
        setDevices(mockDevices);
        setStatusMsg(t('ble_status_done'));
        
        analyzeBleSignal(mockDevices, language).then(setAiInsight);
        
      }, 1500);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* Scanner Control */}
      <div className="bg-surface rounded-xl p-6 shadow-lg border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center">
             <svg className="w-6 h-6 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.7 7.7L12 2h-1v7.6L6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 11 14.4V22h1l5.7-5.7L13.4 12l4.3-4.3zM13 5.8l1.9 1.9L13 9.6V5.8zm0 12.3v-3.8l1.9 1.9L13 18.1z" /></svg>
             {t('ble_title')}
          </h2>
          <div className={`h-3 w-3 rounded-full ${scanning ? 'bg-yellow-400 animate-ping' : 'bg-slate-600'}`}></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <button
            onClick={startScan}
            disabled={scanning}
            className={`w-full md:w-auto px-8 font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2
                ${scanning 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white active:scale-95 shadow-indigo-900/30'
                }`}
            >
                {scanning ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('ble_btn_scanning')}
                    </>
                ) : (
                    <>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.7 7.7L12 2h-1v7.6L6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 11 14.4V22h1l5.7-5.7L13.4 12l4.3-4.3zM13 5.8l1.9 1.9L13 9.6V5.8zm0 12.3v-3.8l1.9 1.9L13 18.1z" /></svg>
                        <span>{t('ble_btn_start')}</span>
                    </>
                )}
            </button>
            <p className="text-sm text-slate-500 md:ml-4">{statusMsg}</p>
        </div>
      </div>

      {/* Gemini Insight for BLE */}
        {aiInsight && (
             <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 p-6 rounded-xl animate-fade-in">
                <div className="flex items-start space-x-4">
                    <span className="text-2xl bg-purple-500/20 p-2 rounded-lg">🤖</span>
                    <div>
                        <h4 className="text-base font-bold text-purple-300 mb-2">{t('ble_insight_title')}</h4>
                        <p className="text-slate-300 leading-relaxed">{aiInsight}</p>
                    </div>
                </div>
             </div>
        )}

      {/* Device List */}
      <div className="space-y-3">
        {devices.length > 0 && <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider ml-1">{t('ble_disc_devices')}</h3>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
            <div key={device.id} className="bg-surface p-4 rounded-lg border border-slate-700 hover:border-primary/50 hover:bg-slate-800/50 transition-all group">
                <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-3">
                    <div className="bg-slate-800 p-2 rounded-full text-slate-300 group-hover:text-white group-hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.7 7.7L12 2h-1v7.6L6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 11 14.4V22h1l5.7-5.7L13.4 12l4.3-4.3zM13 5.8l1.9 1.9L13 9.6V5.8zm0 12.3v-3.8l1.9 1.9L13 18.1z" /></svg>
                    </div>
                    <div>
                    <h4 className="font-medium text-white truncate max-w-[150px]">{device.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">{device.id.substring(0, 8)}...</p>
                    </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${device.status === 'connected' ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-slate-400'}`}>
                    {device.status}
                </span>
                </div>
                
                {/* RSSI Visualization */}
                <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{t('ble_signal_str')}</span>
                    <span>{device.rssi} dBm</span>
                </div>
                <SignalChart strength={device.rssi} />
                </div>
            </div>
            ))}
        </div>

        {devices.length === 0 && !scanning && (
          <div className="text-center py-16 text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.7 7.7L12 2h-1v7.6L6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 11 14.4V22h1l5.7-5.7L13.4 12l4.3-4.3zM13 5.8l1.9 1.9L13 9.6V5.8zm0 12.3v-3.8l1.9 1.9L13 18.1z" /></svg>
            <p className="text-lg">{t('ble_no_devices')}</p>
            <p className="text-sm">{t('ble_scan_hint')}</p>
          </div>
        )}
      </div>
    </div>
  );
};