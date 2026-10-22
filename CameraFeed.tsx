import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Radio, Eye, Maximize2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Camera {
  id: number;
  location: string;
  status: string;
  zone: string;
}

interface CameraFeedProps {
  camera: Camera;
}

export function CameraFeed({ camera }: CameraFeedProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 5) + 1);

  useEffect(() => {
    // Simulate random detection
    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        setIsDetecting(true);
        setTimeout(() => setIsDetecting(false), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`overflow-hidden border-2 transition-all duration-500 group hover:scale-105 ${
      isDetecting 
        ? 'border-red-500 shadow-2xl shadow-red-500/50 animate-pulse' 
        : 'border-violet-500/30 hover:border-violet-500/60 hover:shadow-2xl hover:shadow-violet-500/30'
    }`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-black to-violet-950 overflow-hidden">
          {/* Simulated Camera Feed */}
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop`}
            alt={camera.location}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
          />
          
          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-scan"></div>
          </div>
          
          {/* Detection Overlay */}
          {isDetecting && (
            <>
              <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center animate-pulse">
                <div className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl border-2 border-red-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    ⚠️ VIOLENCE DETECTED
                  </div>
                </div>
              </div>
              {/* Detection corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-red-500 animate-pulse"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-red-500 animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-red-500 animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-red-500 animate-pulse"></div>
            </>
          )}
          
          {/* Camera Info Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex gap-2">
              <Badge className="bg-red-600/90 text-white border-0 backdrop-blur-sm">
                <Radio className="w-3 h-3 mr-1 animate-pulse" />
                LIVE
              </Badge>
              <Badge className="bg-violet-600/90 text-white border-0 backdrop-blur-sm">
                Zone {camera.zone}
              </Badge>
            </div>
            <button className="p-2 bg-black/60 hover:bg-violet-600/80 rounded-lg transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100">
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Bottom overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs border border-violet-500/30">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs border border-violet-500/30">
              <Eye className="w-3 h-3" />
              {viewers}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-violet-950/50 to-black/50 backdrop-blur-sm border-t border-violet-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span className="text-violet-100">{camera.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <span className="text-sm text-emerald-400">Active</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <style>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </Card>
  );
}
