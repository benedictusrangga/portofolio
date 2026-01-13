import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Calendar, X, Globe, Monitor, Clock, TrendingUp } from 'lucide-react';
import { getAnalytics, getServerAnalytics } from '../utils/analytics';

interface AnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ isOpen, onClose }) => {
  const [localAnalytics, setLocalAnalytics] = useState(getAnalytics());
  const [serverAnalytics, setServerAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalAnalytics(getAnalytics());
      fetchServerAnalytics();
    }
  }, [isOpen]);

  const fetchServerAnalytics = async () => {
    setLoading(true);
    const data = await getServerAnalytics();
    setServerAnalytics(data);
    setLoading(false);
  };

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('id-ID');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            Portfolio Analytics Dashboard
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Local Analytics */}
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Data Lokal (Browser Ini)
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Visits:</span>
                <span className="text-cyan-400 font-bold">{localAnalytics.totalVisits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Unique Visitors:</span>
                <span className="text-blue-400 font-bold">{localAnalytics.uniqueVisitors}</span>
              </div>
              <div className="text-xs text-gray-500">
                Last: {formatDate(localAnalytics.lastVisit)}
              </div>
            </div>
          </div>

          {/* Server Analytics */}
          <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Data Global (Real Analytics)
            </h3>
            {loading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : serverAnalytics ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Visits:</span>
                  <span className="text-green-400 font-bold">{serverAnalytics.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Unique Visitors:</span>
                  <span className="text-blue-400 font-bold">{serverAnalytics.uniqueVisitors}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Last: {formatDate(serverAnalytics.lastVisit)}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">Data tidak tersedia</div>
            )}
          </div>
        </div>

        {/* Detailed Stats */}
        {serverAnalytics && (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">Total Views</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">{serverAnalytics.totalVisits}</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">Unique Users</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">{serverAnalytics.uniqueVisitors}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">Avg/User</span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {serverAnalytics.uniqueVisitors > 0 ? (serverAnalytics.totalVisits / serverAnalytics.uniqueVisitors).toFixed(1) : '0'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-300">Days Active</span>
                </div>
                <p className="text-2xl font-bold text-purple-400">
                  {serverAnalytics.firstVisit ? Math.ceil((new Date().getTime() - new Date(serverAnalytics.firstVisit).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-green-400">Statistik Detail</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 text-sm">Kunjungan Pertama:</span>
                  <p className="text-green-400 font-medium">{formatDate(serverAnalytics.firstVisit)}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Kunjungan Terakhir:</span>
                  <p className="text-green-400 font-medium">{formatDate(serverAnalytics.lastVisit)}</p>
                </div>
              </div>
              
              {serverAnalytics.recentVisits && serverAnalytics.recentVisits.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-gray-300 mb-2">Recent Visits:</h5>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {serverAnalytics.recentVisits.map((visit: any, index: number) => (
                      <div key={index} className="text-xs text-gray-500 flex justify-between">
                        <span>{visit.deviceId.substring(0, 12)}...</span>
                        <span>{formatDate(visit.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
          <p className="text-gray-400 text-sm">
            <strong>Device ID:</strong> {localAnalytics.deviceId}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Data lokal tersimpan di browser. Data global adalah real analytics dari semua pengunjung menggunakan JSONBin.io.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;