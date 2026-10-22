import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Download, Plus, Send, Zap, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface IncidentReport {
  id: number;
  title: string;
  location: string;
  zone: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'closed';
  description: string;
  actionTaken: string;
  reportedBy: string;
}

const mockReports: IncidentReport[] = [
  {
    id: 1,
    title: 'Physical Altercation - Main Entrance',
    location: 'Main Entrance',
    zone: 'A',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    severity: 'high',
    status: 'investigating',
    description: 'Two individuals engaged in physical violence. Security responded immediately.',
    actionTaken: 'Security personnel dispatched. Individuals separated. Police notified.',
    reportedBy: 'System Auto-detect',
  },
  {
    id: 2,
    title: 'Crowd Disturbance - Lobby',
    location: 'Lobby',
    zone: 'B',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    severity: 'medium',
    status: 'closed',
    description: 'Large gathering with elevated noise levels and aggressive behavior.',
    actionTaken: 'Security dispersed the crowd. No injuries reported.',
    reportedBy: 'System Auto-detect',
  },
  {
    id: 3,
    title: 'Suspicious Activity - Parking Lot',
    location: 'Parking Lot',
    zone: 'B',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    severity: 'low',
    status: 'closed',
    description: 'Individual loitering for extended period with unusual movement patterns.',
    actionTaken: 'Security approached individual. No threat identified.',
    reportedBy: 'System Auto-detect',
  },
];

export function IncidentReports() {
  const [reports, setReports] = useState<IncidentReport[]>(mockReports);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    location: '',
    severity: 'medium' as 'high' | 'medium' | 'low',
    description: '',
  });

  const handleCreateReport = () => {
    if (!newReport.location || !newReport.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const report: IncidentReport = {
      id: reports.length + 1,
      title: `Manual Report - ${newReport.location}`,
      location: newReport.location,
      zone: 'A',
      timestamp: new Date().toISOString(),
      severity: newReport.severity,
      status: 'open',
      description: newReport.description,
      actionTaken: 'Pending investigation',
      reportedBy: 'Manual Entry',
    };

    setReports([report, ...reports]);
    setIsCreateDialogOpen(false);
    setNewReport({ location: '', severity: 'medium', description: '' });
    toast.success('Incident report created successfully', {
      className: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-400',
    });
  };

  const handleExport = () => {
    toast.success('Report exported successfully', {
      className: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-400',
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const severityConfig = {
    high: {
      badge: 'bg-red-500/20 text-red-300 border-red-500/40',
      bg: 'from-red-950/30 to-pink-950/30',
      border: 'border-red-500/40',
    },
    medium: {
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      bg: 'from-orange-950/30 to-amber-950/30',
      border: 'border-orange-500/40',
    },
    low: {
      badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      bg: 'from-yellow-950/30 to-amber-950/30',
      border: 'border-yellow-500/40',
    },
  };

  const statusConfig = {
    open: {
      badge: 'bg-red-500/20 text-red-300 border-red-500/40',
      icon: '🔴',
    },
    investigating: {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: '🔍',
    },
    closed: {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: '✅',
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
            <h2 className="text-violet-100">Incident Reports</h2>
            <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <p className="text-violet-300/60">View and manage incident reports</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="border-violet-500/50 text-violet-300 hover:bg-violet-500/20 hover:text-violet-100 hover:border-violet-500 transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-violet-500/30">
                <Plus className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-violet-950 to-black border-2 border-violet-500/50">
              <DialogHeader>
                <DialogTitle className="text-violet-100">Create Incident Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="text-violet-200">Location</Label>
                  <Select value={newReport.location} onValueChange={(value) => setNewReport({ ...newReport, location: value })}>
                    <SelectTrigger id="location" className="bg-violet-950/50 border-violet-500/30 text-violet-100">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-violet-950 border-violet-500/50">
                      <SelectItem value="Main Entrance">Main Entrance</SelectItem>
                      <SelectItem value="Parking Lot">Parking Lot</SelectItem>
                      <SelectItem value="Corridor 1">Corridor 1</SelectItem>
                      <SelectItem value="Back Exit">Back Exit</SelectItem>
                      <SelectItem value="Lobby">Lobby</SelectItem>
                      <SelectItem value="Stairwell">Stairwell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity" className="text-violet-200">Severity</Label>
                  <Select value={newReport.severity} onValueChange={(value: 'high' | 'medium' | 'low') => setNewReport({ ...newReport, severity: value })}>
                    <SelectTrigger id="severity" className="bg-violet-950/50 border-violet-500/30 text-violet-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-violet-950 border-violet-500/50">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description" className="text-violet-200">Description</Label>
                  <Textarea
                    id="description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                    placeholder="Describe the incident..."
                    rows={4}
                    className="bg-violet-950/50 border-violet-500/30 text-violet-100 placeholder:text-violet-300/40 focus:border-violet-500"
                  />
                </div>
                <Button 
                  onClick={handleCreateReport} 
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-violet-500/30"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => {
          const sevConfig = severityConfig[report.severity];
          const statConfig = statusConfig[report.status];
          
          return (
            <Card 
              key={report.id} 
              className={`border-2 ${sevConfig.border} bg-gradient-to-br ${sevConfig.bg} backdrop-blur-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 hover:scale-[1.01] group`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-4 bg-violet-500/20 rounded-xl border-2 border-violet-500/40 transition-transform duration-300 group-hover:scale-110">
                      <FileText className="w-6 h-6 text-violet-300" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-3 text-violet-100">{report.title}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`capitalize border-2 ${sevConfig.badge}`}>
                          {report.severity} Priority
                        </Badge>
                        <Badge className={`capitalize border-2 ${statConfig.badge}`}>
                          {statConfig.icon} {report.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-violet-300/60">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(report.timestamp)}
                    </div>
                    <div className="text-xs">ID: #{report.id.toString().padStart(4, '0')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-violet-300/60">Location:</span> 
                      <span className="text-violet-200">{report.location}</span>
                      <Badge variant="outline" className="text-xs border-violet-500/40 text-violet-300">
                        Zone {report.zone}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-violet-300/60">Reported By:</span> 
                      <span className="text-violet-200">{report.reportedBy}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-violet-950/40 rounded-lg border border-violet-500/20">
                    <h4 className="text-sm text-violet-300/80 mb-2">Description</h4>
                    <p className="text-violet-200/90">{report.description}</p>
                  </div>
                  <div className="p-4 bg-violet-950/40 rounded-lg border border-violet-500/20">
                    <h4 className="text-sm text-violet-300/80 mb-2">Action Taken</h4>
                    <p className="text-violet-200/90">{report.actionTaken}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
