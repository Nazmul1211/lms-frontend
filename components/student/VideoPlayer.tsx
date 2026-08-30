"use client";

import React, { useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  onEnded?: () => void;
}

export default function VideoPlayer({ videoUrl, title, onEnded }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl aspect-video relative group">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={onEnded}
          className="w-full h-full object-contain"
          playsInline
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Play className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-500 max-w-sm">
            Interactive text lesson guide available below.
          </p>
        </div>
      )}
    </div>
  );
}
