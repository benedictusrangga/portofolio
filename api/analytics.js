// Simple analytics API for Vercel
let visits = [];
let uniqueVisitors = new Set();

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const { deviceId, timestamp } = req.body;
    
    visits.push({
      deviceId,
      timestamp,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    
    uniqueVisitors.add(deviceId);
    
    return res.status(200).json({ success: true });
  }
  
  if (req.method === 'GET') {
    const stats = {
      totalVisits: visits.length,
      uniqueVisitors: uniqueVisitors.size,
      firstVisit: visits[0]?.timestamp || null,
      lastVisit: visits[visits.length - 1]?.timestamp || null,
      recentVisits: visits.slice(-5).reverse()
    };
    
    return res.status(200).json(stats);
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}