import { supabase } from '../lib/supabase';

interface VisitData {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
  firstVisit: string;
  deviceId: string;
}

const STORAGE_KEY = 'portfolio_analytics';
const DEVICE_KEY = 'portfolio_device_id';

// Generate unique device ID
const generateDeviceId = (): string => {
  return 'device_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Get or create device ID
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem(DEVICE_KEY);
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem(DEVICE_KEY, deviceId);
  }
  return deviceId;
};

// Send analytics to Supabase
const sendToSupabase = async (deviceId: string): Promise<void> => {
  try {
    await supabase
      .from('analytics')
      .insert({
        device_id: deviceId,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      });
  } catch (error) {
    console.log('Analytics tracking failed:', error);
  }
};

// Track visit
export const trackVisit = (): void => {
  const deviceId = getDeviceId();
  const now = new Date().toISOString();
  
  // Local analytics
  let data: VisitData = {
    totalVisits: 0,
    uniqueVisitors: 0,
    lastVisit: now,
    firstVisit: now,
    deviceId: deviceId
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    data = JSON.parse(stored);
  }

  const visitedDevices = JSON.parse(localStorage.getItem('visited_devices') || '[]');
  const isNewDevice = !visitedDevices.includes(deviceId);

  if (isNewDevice) {
    visitedDevices.push(deviceId);
    localStorage.setItem('visited_devices', JSON.stringify(visitedDevices));
    data.uniqueVisitors += 1;
  }

  data.totalVisits += 1;
  data.lastVisit = now;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  // Send to Supabase
  sendToSupabase(deviceId);
};

// Get local analytics data
export const getAnalytics = (): VisitData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      lastVisit: '',
      firstVisit: '',
      deviceId: getDeviceId()
    };
  }
  return JSON.parse(stored);
};

// Get Supabase analytics
export const getServerAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    const totalVisits = data?.length || 0;
    const uniqueVisitors = new Set(data?.map(item => item.device_id).filter(Boolean)).size;
    const firstVisit = data?.[0]?.timestamp;
    const lastVisit = data?.[data.length - 1]?.timestamp;
    
    return {
      totalVisits,
      uniqueVisitors,
      firstVisit,
      lastVisit,
      recentVisits: data?.slice(-5).filter(item => item && item.device_id) || []
    };
  } catch (error) {
    console.log('Failed to fetch analytics:', error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      firstVisit: null,
      lastVisit: null,
      recentVisits: []
    };
  }
};