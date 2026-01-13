import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const { deviceId, timestamp } = req.body;
    
    try {
      // Increment total visits
      await redis.incr('total_visits');
      
      // Add to unique visitors set
      await redis.sadd('unique_visitors', deviceId);
      
      // Store visit data
      const visitData = {
        deviceId,
        timestamp,
        ip: req.headers['x-forwarded-for'] || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      };
      
      // Store latest visits (keep last 50)
      await redis.lpush('recent_visits', JSON.stringify(visitData));
      await redis.ltrim('recent_visits', 0, 49);
      
      // Update first/last visit timestamps
      const firstVisit = await redis.get('first_visit');
      if (!firstVisit) {
        await redis.set('first_visit', timestamp);
      }
      await redis.set('last_visit', timestamp);
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Analytics error:', error);
      return res.status(500).json({ error: 'Failed to store analytics' });
    }
  }
  
  if (req.method === 'GET') {
    try {
      const [totalVisits, uniqueVisitors, firstVisit, lastVisit, recentVisits] = await Promise.all([
        redis.get('total_visits'),
        redis.scard('unique_visitors'),
        redis.get('first_visit'),
        redis.get('last_visit'),
        redis.lrange('recent_visits', 0, 4)
      ]);
      
      const stats = {
        totalVisits: Number(totalVisits) || 0,
        uniqueVisitors: Number(uniqueVisitors) || 0,
        firstVisit,
        lastVisit,
        recentVisits: recentVisits ? recentVisits.map(visit => JSON.parse(visit)) : []
      };
      
      return res.status(200).json(stats);
    } catch (error) {
      console.error('Analytics fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}