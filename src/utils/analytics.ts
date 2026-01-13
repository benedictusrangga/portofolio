interface VisitData {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
  firstVisit: string;
  deviceId: string;
}

const STORAGE_KEY = 'portfolio_analytics';
const DEVICE_KEY = 'portfolio_device_id';
const JSONBIN_API = 'https://api.jsonbin.io/v3/b/679c8e2ead19ca34f8d4f8a2';
const JSONBIN_KEY = '$2a$10$8vQZ9K5L2mN3pR7sT1uV6eX4wY8qA9cB5dF2gH7jK3lM6nO0pS9tU';

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

// Send analytics to JSONBin
const sendToServer = async (deviceId: string): Promise<void> => {
  try {
    // Get current data
    const response = await fetch(JSONBIN_API + '/latest', {
      headers: {
        'X-Master-Key': JSONBIN_KEY
      }
    });
    
    let data = { totalVisits: 0, uniqueVisitors: [], firstVisit: null, lastVisit: null };
    if (response.ok) {
      const result = await response.json();
      data = result.record || data;
    }
    
    // Update data
    data.totalVisits += 1;
    if (!data.uniqueVisitors.includes(deviceId)) {
      data.uniqueVisitors.push(deviceId);
    }
    if (!data.firstVisit) {
      data.firstVisit = new Date().toISOString();
    }
    data.lastVisit = new Date().toISOString();
    
    // Save updated data
    await fetch(JSONBIN_API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY
      },
      body: JSON.stringify(data)
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
  
  // Send to real server
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

// Get real server analytics
export const getServerAnalytics = async () => {
  try {
    const response = await fetch(JSONBIN_API + '/latest', {
      headers: {
        'X-Master-Key': JSONBIN_KEY
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      const data = result.record;
      
      return {
        totalVisits: data.totalVisits || 0,
        uniqueVisitors: data.uniqueVisitors ? data.uniqueVisitors.length : 0,
        firstVisit: data.firstVisit,
        lastVisit: data.lastVisit,
        recentVisits: []
      };
    }
  } catch (error) {
    console.log('Failed to fetch server analytics:', error);
  }
  
  return {
    totalVisits: 0,
    uniqueVisitors: 0,
    firstVisit: null,
    lastVisit: null,
    recentVisits: []
  };
};