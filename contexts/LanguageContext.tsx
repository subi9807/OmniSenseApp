import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ko' | 'ja';

export const translations = {
  en: {
    app_name: "OmniSense",
    nav_home: "Home",
    nav_gps: "GPS",
    nav_ble: "Bluetooth",
    nav_alerts: "Alerts",
    
    // Dashboard
    dash_welcome: "OmniSense Active",
    dash_desc: "System monitoring is online. Access real-time geolocation, bluetooth spectrum analysis, and notification systems from any device.",
    dash_card_gps_title: "GPS Tracker",
    dash_card_gps_desc: "Position & Analysis",
    dash_card_ble_title: "Bluetooth Scanner",
    dash_card_ble_desc: "Device Discovery",
    dash_card_push_title: "Push Alerts",
    dash_card_push_desc: "System Notifications",
    sys_integrity: "System Integrity",
    sys_geo: "Geolocation API",
    sys_ble: "Bluetooth Adapter",
    sys_ai: "Gemini AI Core",
    status_ready: "Ready",
    status_standby: "Standby",
    status_connected: "Connected",
    footer_ver: "v1.0.2 Stable",

    // GPS
    gps_title: "Coordinates",
    gps_live: "Live",
    gps_lat: "Latitude",
    gps_lng: "Longitude",
    gps_acc: "Accuracy",
    gps_no_data: "No location data",
    gps_hint: "Click update to track",
    gps_btn_update: "Update Location",
    gps_btn_loading: "Acquiring...",
    gps_ai_title: "AI Analysis",
    gps_ai_btn: "Analyze Context",
    gps_ai_analyzing: "Analyzing...",
    gps_map_error: "Update location to view map",
    gps_api_error: "Google Maps API Key Required",
    gps_api_hint: "To view the map, please add your API key to the environment variables.",

    // BLE
    ble_title: "Bluetooth Scanner",
    ble_btn_start: "Start Discovery",
    ble_btn_scanning: "Scanning...",
    ble_insight_title: "AI Bluetooth Analysis",
    ble_disc_devices: "Discovered Devices",
    ble_signal_str: "Signal Strength",
    ble_no_devices: "No devices found yet.",
    ble_scan_hint: "Start a scan to discover nearby Bluetooth peripherals",
    ble_status_ready: "Ready to scan",
    ble_status_init: "Initializing Bluetooth adapter...",
    ble_status_req: "Requesting device...",
    ble_status_sim: "Simulating Scan (Web Bluetooth unavailable)...",
    ble_status_done: "Scan complete",

    // Push
    push_title: "Push Services",
    push_status: "Status:",
    push_btn_enable: "Enable Push",
    push_btn_active: "Permissions Active",
    push_btn_test: "Trigger Test Alert",
    push_log_title: "Notification Log",
    push_log_clear: "Clear History",
    push_empty: "No notifications recorded.",
    push_alert_title: "OmniSense Alert",
    push_alert_body: "System check complete.",
    push_denied_msg: "Notification simulated (Permission not granted or required)",
  },
  ko: {
    app_name: "옴니센스",
    nav_home: "홈",
    nav_gps: "GPS",
    nav_ble: "블루투스",
    nav_alerts: "알림",
    
    // Dashboard
    dash_welcome: "옴니센스 활성화",
    dash_desc: "시스템 모니터링이 온라인 상태입니다. 모든 기기에서 실시간 위치, 블루투스 스펙트럼 분석 및 알림 시스템에 액세스하십시오.",
    dash_card_gps_title: "GPS 추적",
    dash_card_gps_desc: "위치 및 분석",
    dash_card_ble_title: "블루투스 스캐너",
    dash_card_ble_desc: "주변 기기 탐색",
    dash_card_push_title: "푸시 알림",
    dash_card_push_desc: "시스템 알림 테스트",
    sys_integrity: "시스템 무결성",
    sys_geo: "위치정보 API",
    sys_ble: "블루투스 어댑터",
    sys_ai: "Gemini AI 코어",
    status_ready: "준비됨",
    status_standby: "대기 중",
    status_connected: "연결됨",
    footer_ver: "v1.0.2 안정판",

    // GPS
    gps_title: "좌표 정보",
    gps_live: "라이브",
    gps_lat: "위도",
    gps_lng: "경도",
    gps_acc: "정확도",
    gps_no_data: "위치 데이터 없음",
    gps_hint: "추적하려면 업데이트를 클릭하세요",
    gps_btn_update: "위치 업데이트",
    gps_btn_loading: "수신 중...",
    gps_ai_title: "AI 상황 분석",
    gps_ai_btn: "주변 환경 분석",
    gps_ai_analyzing: "분석 중...",
    gps_map_error: "지도를 보려면 위치를 업데이트하세요",
    gps_api_error: "Google Maps API 키 필요",
    gps_api_hint: "지도를 보려면 환경 변수에 API 키를 추가해주세요.",

    // BLE
    ble_title: "블루투스 스캐너",
    ble_btn_start: "탐색 시작",
    ble_btn_scanning: "스캔 중...",
    ble_insight_title: "AI 블루투스 분석",
    ble_disc_devices: "발견된 기기",
    ble_signal_str: "신호 강도",
    ble_no_devices: "발견된 기기가 없습니다.",
    ble_scan_hint: "주변 블루투스 기기를 찾으려면 스캔을 시작하세요",
    ble_status_ready: "스캔 준비 완료",
    ble_status_init: "블루투스 어댑터 초기화 중...",
    ble_status_req: "기기 요청 중...",
    ble_status_sim: "스캔 시뮬레이션 (웹 블루투스 사용 불가)...",
    ble_status_done: "스캔 완료",

    // Push
    push_title: "푸시 서비스",
    push_status: "상태:",
    push_btn_enable: "알림 켜기",
    push_btn_active: "권한 활성화됨",
    push_btn_test: "테스트 알림 발송",
    push_log_title: "알림 기록",
    push_log_clear: "기록 삭제",
    push_empty: "기록된 알림이 없습니다.",
    push_alert_title: "옴니센스 알림",
    push_alert_body: "시스템 점검 완료.",
    push_denied_msg: "알림 시뮬레이션 (권한이 없거나 필요하지 않음)",
  },
  ja: {
    app_name: "オムニセンス",
    nav_home: "ホーム",
    nav_gps: "GPS",
    nav_ble: "Bluetooth",
    nav_alerts: "通知",
    
    // Dashboard
    dash_welcome: "オムニセンス 稼働中",
    dash_desc: "システム監視がオンラインです。どのデバイスからでもリアルタイムの位置情報、Bluetoothスペクトル分析、通知システムにアクセスできます。",
    dash_card_gps_title: "GPSトラッカー",
    dash_card_gps_desc: "位置と分析",
    dash_card_ble_title: "Bluetoothスキャナー",
    dash_card_ble_desc: "デバイス検出",
    dash_card_push_title: "プッシュ通知",
    dash_card_push_desc: "システム通知テスト",
    sys_integrity: "システム整合性",
    sys_geo: "位置情報 API",
    sys_ble: "Bluetooth アダプター",
    sys_ai: "Gemini AI コア",
    status_ready: "準備完了",
    status_standby: "待機中",
    status_connected: "接続済み",
    footer_ver: "v1.0.2 安定版",

    // GPS
    gps_title: "座標情報",
    gps_live: "ライブ",
    gps_lat: "緯度",
    gps_lng: "経度",
    gps_acc: "精度",
    gps_no_data: "位置データなし",
    gps_hint: "追跡するには更新をクリック",
    gps_btn_update: "位置情報を更新",
    gps_btn_loading: "取得中...",
    gps_ai_title: "AI 分析",
    gps_ai_btn: "コンテキスト分析",
    gps_ai_analyzing: "分析中...",
    gps_map_error: "地図を表示するには位置情報を更新してください",
    gps_api_error: "Google Maps APIキーが必要です",
    gps_api_hint: "地図を表示するには、環境変数にAPIキーを追加してください。",

    // BLE
    ble_title: "Bluetoothスキャナー",
    ble_btn_start: "検出開始",
    ble_btn_scanning: "スキャン中...",
    ble_insight_title: "AI 信号分析",
    ble_disc_devices: "検出されたデバイス",
    ble_signal_str: "信号強度",
    ble_no_devices: "デバイスが見つかりません。",
    ble_scan_hint: "スキャンを開始して近くのBLE周辺機器を探します",
    ble_status_ready: "スキャン準備完了",
    ble_status_init: "Bluetoothアダプターを初期化中...",
    ble_status_req: "デバイスを要求中...",
    ble_status_sim: "スキャンをシミュレート中 (Web Bluetooth不可)...",
    ble_status_done: "スキャン完了",

    // Push
    push_title: "プッシュサービス",
    push_status: "ステータス:",
    push_btn_enable: "通知を有効化",
    push_btn_active: "権限有効",
    push_btn_test: "テストアラート送信",
    push_log_title: "通知ログ",
    push_log_clear: "履歴を消去",
    push_empty: "記録された通知はありません。",
    push_alert_title: "オムニセンス アラート",
    push_alert_body: "システムチェック完了。",
    push_denied_msg: "通知シミュレーション (権限がないか不要)",
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko'); // Default to Korean as requested

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};