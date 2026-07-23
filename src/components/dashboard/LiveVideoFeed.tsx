import React, { useState } from 'react';
import { CameraOff, RefreshCw, Play, Settings2 } from 'lucide-react';
import { Card, CardHeader } from '../common/Card';
import { getVideoFeedUrl } from '../../api/videoApi';

export const LiveVideoFeed: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card padding={false} className="flex flex-col h-full bg-cusblack border-cusblack rounded-2xl overflow-hidden group">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-cusblack/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CardHeader
          title="Live Camera Feed"
          icon={<div className="w-2.5 h-2.5 bg-danger rounded-full animate-pulse"></div>}
          className="mb-0 text-white"
        />
      </div>
      <div className="flex-1 relative flex items-center justify-center bg-cusblack min-h-[400px]">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-cuslightgrey">
            <span className="text-cusdarkgrey text-text-bs animate-pulse font-medium">Connecting to stream...</span>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cuswhite bg-cusblack space-y-3">
            <CameraOff size={48} className="text-cusdarkgrey" />
            <p className="text-text-bs font-medium">Camera Feed Offline</p>
            <p className="text-text-capt text-cusgrey">Please check the connection or backend server.</p>
          </div>
        ) : (
          <img
            src={getVideoFeedUrl()}
            alt="Live CCTV Feed"
            className="w-full h-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        )}
      </div>
    </Card>
  );
};
