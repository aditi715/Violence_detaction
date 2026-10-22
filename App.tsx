import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { IncidentReports } from './components/IncidentReports';
import { Alerts } from './components/Alerts';
import { Bell, Camera, FileText, LayoutDashboard, Shield } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'incidents'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black">
      <Toaster />
      
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-violet-500/20 backdrop-blur-xl bg-black/40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-purple-700 p-3 rounded-xl">
                  <Shield className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Violence Detection System
                </h1>
                <p className="text-violet-300/60 text-sm">Real-time AI-Powered CCTV Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-violet-300/60">System Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-emerald-400">Monitoring Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative border-b border-violet-500/20 backdrop-blur-xl bg-black/20">
        <div className="px-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'border-violet-500 text-violet-300 bg-violet-500/10'
                  : 'border-transparent text-violet-300/60 hover:text-violet-300 hover:bg-violet-500/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 ${
                activeTab === 'alerts'
                  ? 'border-violet-500 text-violet-300 bg-violet-500/10'
                  : 'border-transparent text-violet-300/60 hover:text-violet-300 hover:bg-violet-500/5'
              }`}
            >
              <Bell className="w-4 h-4" />
              Alerts
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 ${
                activeTab === 'incidents'
                  ? 'border-violet-500 text-violet-300 bg-violet-500/10'
                  : 'border-transparent text-violet-300/60 hover:text-violet-300 hover:bg-violet-500/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              Incident Reports
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'alerts' && <Alerts />}
        {activeTab === 'incidents' && <IncidentReports />}
      </main>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
