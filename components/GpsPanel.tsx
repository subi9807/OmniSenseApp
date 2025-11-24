import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LocationData } from '../types';
import { analyzeLocation } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

// Declare google namespace for TypeScript
declare const google: any;

export const GpsPanel: React.FC = () => {
  const { t, language } = useLanguage();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Use process.env or fallback to the provided key
  // Note: The provided key looks like a Client ID. Ensure you have a valid Maps JavaScript API Key (starts with AIza) for production.
  const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY || "433036341825-l4c8hthp9ovshcoa318hjb1aeicprvpn.apps.googleusercontent.com";

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Ensure permissions are granted.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleAnalyze = async () => {
    if (!location) return;
    setAnalyzing(true);
    const result = await analyzeLocation(location.latitude, location.longitude, language);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  // Clear analysis when language changes so user re-analyzes in correct language
  useEffect(() => {
    if (aiAnalysis) {
        handleAnalyze();
    }
  }, [language]);

  // Initialize Google Map
  useEffect(() => {
    if (!mapsApiKey || !location || !mapRef.current) return;

    const initMap = () => {
      if (!mapInstanceRef.current) {
        const mapOptions = {
          center: { lat: location.latitude, lng: location.longitude },
          zoom: 15,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
          ],
          disableDefaultUI: true,
          zoomControl: true,
        };
        mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
      } else {
        mapInstanceRef.current.panTo({ lat: location.latitude, lng: location.longitude });
      }

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: mapInstanceRef.current,
        title: "Current Location",
        animation: google.maps.Animation.DROP,
      });
    };

    if (!(window as any).google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [location, mapsApiKey]);

  return (
    <div className="space-y-6 animate-fade-in max-w-full mx-auto w-full h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z m-5.657-8.121a3 3 0 10-6 6 3 3 0 006-6z" /></svg>
                {t('gps_title')}
              </h2>
              {location && (
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium animate-pulse">{t('gps_live')}</span>
              )}
            </div>

            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-slate-700 rounded w-full"></div>
                <div className="h-12 bg-slate-700 rounded w-full"></div>
              </div>
            ) : location ? (
              <div className="space-y-4">
                <div className="bg-dark p-4 rounded-lg border border-slate-800">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t('gps_lat')}</p>
                  <p className="text-xl font-mono text-white">{location.latitude.toFixed(6)}</p>
                </div>
                <div className="bg-dark p-4 rounded-lg border border-slate-800">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t('gps_lng')}</p>
                  <p className="text-xl font-mono text-white">{location.longitude.toFixed(6)}</p>
                </div>
                <div className="bg-dark p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-xs">{t('gps_acc')}</span>
                  <span className="text-accent font-bold text-sm">±{location.accuracy.toFixed(1)}m</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 bg-dark/30 rounded-lg border border-slate-800 border-dashed">
                <p className="text-sm mb-2">{error || t('gps_no_data')}</p>
                <p className="text-xs">{t('gps_hint')}</p>
              </div>
            )}

            <button
              onClick={getLocation}
              className="mt-6 w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all active:scale-95 shadow-lg shadow-primary/25 flex items-center justify-center"
            >
              {loading ? (
                <><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> {t('gps_btn_loading')}</>
              ) : t('gps_btn_update')}
            </button>
          </div>

          {/* Gemini Analysis Block */}
          {location && (
            <div className="bg-gradient-to-br from-surface to-slate-900 rounded-xl p-6 shadow-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center">
                  <span className="mr-2 text-xl">✨</span> {t('gps_ai_title')}
                </h3>
              </div>
              
              {aiAnalysis ? (
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 max-h-60 overflow-y-auto custom-scrollbar">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <p className="whitespace-pre-line text-slate-300 leading-relaxed">{aiAnalysis}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full border border-slate-600 hover:border-primary hover:text-primary text-slate-300 py-2 rounded-lg transition-all text-sm font-medium flex justify-center items-center"
                >
                  {analyzing ? t('gps_ai_analyzing') : t('gps_ai_btn')}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-2 h-[500px] lg:h-auto bg-surface rounded-xl shadow-lg border border-slate-700 overflow-hidden relative">
          {!location ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-900">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" /></svg>
                <p>{t('gps_map_error')}</p>
             </div>
          ) : !mapsApiKey ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-900 p-6 text-center">
                <svg className="w-12 h-12 mb-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <h3 className="text-lg font-bold text-white mb-2">{t('gps_api_error')}</h3>
                <p className="text-sm max-w-md mb-4">{t('gps_api_hint')}</p>
                <div className="bg-black/50 p-3 rounded text-xs font-mono text-slate-300 border border-slate-700">
                    GOOGLE_MAPS_API_KEY=your_key_here
                </div>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full" />
          )}
        </div>
      </div>
    </div>
  );
};