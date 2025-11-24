export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  GPS = 'GPS',
  BLE = 'BLE',
  NOTIFICATIONS = 'NOTIFICATIONS',
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface BleDevice {
  id: string;
  name: string;
  rssi: number; // Signal strength
  status: 'connected' | 'disconnected' | 'connecting';
}

export interface NotificationLog {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
}
