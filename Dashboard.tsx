import { useState, useEffect } from 'react';
import { CameraFeed } from './CameraFeed';
import { StatsCard } from './StatsCard';
import { RecentAlerts } from './RecentAlerts';
import { Camera, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const mockCameras = [
  { id: 1, location: 'Main Entrance', status: 'active', zone: 'A' },
  { id: 2, location: 'Parking Lot', status: 'active', zone: 'B' },
  { id: 3, location: 'Corridor 1', status: 'active', zone: 'C' },
  { id: 4, location: 'Back Exit', status: 'active', zone: 'A' },
  { id: 5, location: 'Lobby', status: 'active', zone: 'B' },
  { id: 6, location: 'Stairwell', status: 'active', zone: 'C' },
];

export function Dashboard() {
  const [stats, setStats] = useState({
    totalCameras: 6,
    activeCameras: 6,
    todayIncidents: 3,
    pendingAlerts: 2,
  });

  useEffect(() => {
    // Simulate random violence detection alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const camera = mockCameras[Math.floor(Math.random() * mockCameras.length)];
        toast.error(`⚠️ Violence detected at ${camera.location}!`, {
          description: `Zone ${camera.zone} - Camera ${camera.id} | Immediate action required`,
          duration: 5000,
          className: 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-red-400',
        });
        setStats(prev => ({
          ...prev,
          todayIncidents: prev.todayIncidents + 1,
          pendingAlerts: prev.pendingAlerts + 1,
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Cameras"
          value={stats.totalCameras}
          icon={<Camera className="w-5 h-5" />}
          color="violet"
          trend="+2 this week"
        />
        <StatsCard
          title="Active Cameras"
          value={stats.activeCameras}
          icon={<Activity className="w-5 h-5" />}
          color="emerald"
          trend="100% uptime"
        />
        <StatsCard
          title="Today's Incidents"
          value={stats.todayIncidents}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
          trend="-15% from yesterday"
        />
        <StatsCard
          title="Pending Alerts"
          value={stats.pendingAlerts}
          icon={<Clock className="w-5 h-5" />}
          color="amber"
          trend="Requires attention"
        />
      </div>

      {/* Camera Feeds */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
          <h2 className="text-violet-100">Live Camera Feeds</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-violet-500/50 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCameras.map((camera) => (
            <CameraFeed key={camera.id} camera={camera} />
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <RecentAlerts />
    </div>
  );
}
