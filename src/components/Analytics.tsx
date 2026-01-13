import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Calendar, X, Globe, Monitor } from 'lucide-react';
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
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            Portfolio Analytics
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
              Data Global (Semua Pengunjung)
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
          </div>
        )}

        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
          <p className="text-gray-400 text-sm">
            <strong>Device ID:</strong> {localAnalytics.deviceId}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Data lokal disimpan di browser. Data global dikumpulkan dari semua pengunjung.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;