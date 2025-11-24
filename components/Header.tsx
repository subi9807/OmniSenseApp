import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-surface/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50 px-4 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="flex items-center space-x-3">
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                <button 
                    onClick={() => setLanguage('ko')} 
                    className={`px-2 py-1 text-xs rounded font-medium transition-colors ${language === 'ko' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    KR
                </button>
                <button 
                    onClick={() => setLanguage('en')} 
                    className={`px-2 py-1 text-xs rounded font-medium transition-colors ${language === 'en' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLanguage('ja')} 
                    className={`px-2 py-1 text-xs rounded font-medium transition-colors ${language === 'ja' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    JP
                </button>
            </div>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
        </div>
      </div>
    </header>
  );
};