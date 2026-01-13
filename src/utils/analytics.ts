interface VisitData {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
  firstVisit: string;
  deviceId: string;
}

const STORAGE_KEY = 'portfolio_analytics';
const DEVICE_KEY = 'portfolio_device_id';
const GLOBAL_KEY = 'portfolio_global_stats';

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
  
  // Global analytics (shared across all users)
  updateGlobalStats(deviceId, now);
};

// Update global stats (simulated)
const updateGlobalStats = (deviceId: string, timestamp: string): void => {
  let globalStats = JSON.parse(localStorage.getItem(GLOBAL_KEY) || '{}');
  
  if (!globalStats.totalVisits) globalStats.totalVisits = 0;
  if (!globalStats.uniqueVisitors) globalStats.uniqueVisitors = new Set();
  if (!globalStats.firstVisit) globalStats.firstVisit = timestamp;
  
  globalStats.totalVisits += 1;
  globalStats.uniqueVisitors = Array.from(new Set([...globalStats.uniqueVisitors, deviceId]));
  globalStats.lastVisit = timestamp;
  
  localStorage.setItem(GLOBAL_KEY, JSON.stringify({
    ...globalStats,
    uniqueVisitors: globalStats.uniqueVisitors
  }));
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

// Get simulated server analytics
export const getServerAnalytics = async () => {
  const globalStats = JSON.parse(localStorage.getItem(GLOBAL_KEY) || '{}');
  
  return {
    totalVisits: globalStats.totalVisits || 0,
    uniqueVisitors: globalStats.uniqueVisitors ? globalStats.uniqueVisitors.length : 0,
    firstVisit: globalStats.firstVisit || null,
    lastVisit: globalStats.lastVisit || null,
    recentVisits: []
  };
};