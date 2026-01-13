interface VisitData {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
  firstVisit: string;
  deviceId: string;
}

const STORAGE_KEY = 'portfolio_analytics';
const DEVICE_KEY = 'portfolio_device_id';
const API_URL = '/api/analytics';

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

// Send analytics to server
const sendToServer = async (deviceId: string): Promise<void> => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, timestamp: new Date().toISOString() })
    });
  } catch (error) {
    console.log('Analytics tracking failed:', error);
  }
};

// Track visit
export const trackVisit = (): void => {
  const deviceId = getDeviceId();
  const now = new Date().toISOString();
  
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

  // Check if this device has visited before
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
  
  // Send to server
  sendToServer(deviceId);
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

// Get server analytics data
export const getServerAnalytics = async () => {
  try {
    const response = await fetch('/api/analytics');
    return await response.json();
  } catch (error) {
    console.log('Failed to fetch server analytics:', error);
    return null;
  }
};