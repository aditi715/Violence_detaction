import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, Eye, Zap } from 'lucide-react';

const mockAlerts = [
  {
    id: 1,
    type: 'Violence Detected',
    location: 'Main Entrance',
    time: '2 minutes ago',
    severity: 'high',
    status: 'pending',
  },
  {
    id: 2,
    type: 'Suspicious Activity',
    location: 'Parking Lot',
    time: '15 minutes ago',
    severity: 'medium',
    status: 'pending',
  },
  {
    id: 3,
    type: 'Violence Detected',
    location: 'Corridor 1',
    time: '1 hour ago',
    severity: 'high',
    status: 'resolved',
  },
];

export function RecentAlerts() {
  return (
    <Card className="border-2 border-violet-500/30 bg-gradient-to-br from-violet-950/30 to-black/30 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
          <CardTitle className="text-violet-100">Recent Alerts</CardTitle>
          <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`group flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:scale-102 ${
                alert.severity === 'high'
                  ? 'bg-gradient-to-r from-red-950/40 to-pink-950/40 border-red-500/40 hover:border-red-500/60 hover:shadow-xl hover:shadow-red-500/20'
                  : 'bg-gradient-to-r from-orange-950/40 to-amber-950/40 border-orange-500/40 hover:border-orange-500/60 hover:shadow-xl hover:shadow-orange-500/20'
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                  alert.severity === 'high' 
                    ? 'bg-red-500/20 border-2 border-red-500/40' 
                    : 'bg-orange-500/20 border-2 border-orange-500/40'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.severity === 'high' ? 'text-red-400' : 'text-orange-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-violet-100">{alert.type}</span>
                    <Badge 
                      variant={alert.status === 'pending' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-violet-300/60">{alert.location} • {alert.time}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-violet-500/40 text-violet-300 hover:bg-violet-500/20 hover:text-violet-100 hover:border-violet-500 transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
