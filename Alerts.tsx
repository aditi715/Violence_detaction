import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertTriangle, Check, Search, X, Filter, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Alert {
  id: number;
  type: string;
  location: string;
  zone: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  status: 'pending' | 'acknowledged' | 'resolved' | 'dismissed';
  description: string;
}

const mockAlertsData: Alert[] = [
  {
    id: 1,
    type: 'Violence Detected',
    location: 'Main Entrance',
    zone: 'A',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    severity: 'high',
    status: 'pending',
    description: 'Physical altercation detected between two individuals',
  },
  {
    id: 2,
    type: 'Suspicious Activity',
    location: 'Parking Lot',
    zone: 'B',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    severity: 'medium',
    status: 'pending',
    description: 'Unusual movement pattern detected',
  },
  {
    id: 3,
    type: 'Violence Detected',
    location: 'Corridor 1',
    zone: 'C',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    severity: 'high',
    status: 'resolved',
    description: 'Aggressive behavior detected and resolved',
  },
  {
    id: 4,
    type: 'Crowd Disturbance',
    location: 'Lobby',
    zone: 'B',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    severity: 'medium',
    status: 'acknowledged',
    description: 'Large gathering with elevated activity',
  },
];

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlertsData);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAcknowledge = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'acknowledged' as const } : alert
    ));
    toast.success('Alert acknowledged', {
      className: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-400',
    });
  };

  const handleResolve = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' as const } : alert
    ));
    toast.success('Alert resolved', {
      className: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400',
    });
  };

  const handleDismiss = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'dismissed' as const } : alert
    ));
    toast.info('Alert dismissed', {
      className: 'bg-gradient-to-r from-gray-700 to-gray-800 text-white border-gray-600',
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  };

  const severityConfig = {
    high: {
      bg: 'from-red-950/40 to-pink-950/40',
      border: 'border-red-500/50',
      badge: 'bg-red-500/20 text-red-300 border-red-500/40',
      glow: 'hover:shadow-red-500/30',
    },
    medium: {
      bg: 'from-orange-950/40 to-amber-950/40',
      border: 'border-orange-500/50',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      glow: 'hover:shadow-orange-500/30',
    },
    low: {
      bg: 'from-yellow-950/40 to-amber-950/40',
      border: 'border-yellow-500/50',
      badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      glow: 'hover:shadow-yellow-500/30',
    },
  };

  const statusColors = {
    pending: 'destructive',
    acknowledged: 'default',
    resolved: 'secondary',
    dismissed: 'outline',
  } as const;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-violet-500/30 bg-gradient-to-br from-violet-950/30 to-black/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <CardTitle className="text-violet-100">Alert Management</CardTitle>
              <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-violet-950/30 border-violet-500/30 text-violet-100 placeholder:text-violet-300/40 focus:border-violet-500"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 bg-violet-950/30 border-violet-500/30 text-violet-100">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-violet-950 border-violet-500/50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const config = severityConfig[alert.severity];
              return (
                <div
                  key={alert.id}
                  className={`group p-5 border-2 rounded-xl bg-gradient-to-r ${config.bg} ${config.border} ${config.glow} hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className={`p-3 rounded-xl border-2 ${config.badge} transition-transform duration-300 group-hover:scale-110`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-violet-100">{alert.type}</h3>
                          <Badge variant={statusColors[alert.status]} className="text-xs">
                            {alert.status}
                          </Badge>
                          <Badge variant="outline" className={`capitalize text-xs ${config.badge} border-2`}>
                            {alert.severity} priority
                          </Badge>
                        </div>
                        <p className="text-violet-200/80 mb-3">{alert.description}</p>
                        <div className="flex items-center gap-4 text-sm text-violet-300/60">
                          <span className="flex items-center gap-1">
                            📍 {alert.location} <span className="text-violet-400">(Zone {alert.zone})</span>
                          </span>
                          <span className="flex items-center gap-1">
                            🕐 {getTimeAgo(alert.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {alert.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="border-violet-500/50 text-violet-300 hover:bg-violet-500/20 hover:text-violet-100 hover:border-violet-500 transition-all"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Acknowledge
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-violet-500/30"
                          >
                            Resolve
                          </Button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <Button
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-violet-500/30"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                      {(alert.status === 'pending' || alert.status === 'acknowledged') && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDismiss(alert.id)}
                          className="text-violet-300 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
