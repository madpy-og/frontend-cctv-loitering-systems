import React, { useState } from 'react';
import { CameraOff } from 'lucide-react';
import { getVideoFeedUrl } from '../../api/videoApi';

export const LiveVideoFeed: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cuslightgrey overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-cuslightgrey flex justify-between items-center bg-cuswhite">
        <h2 className="text-text-bd font-semibold text-cusblack flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cusblack animate-pulse"></span>
          Live Camera Feed
        </h2>
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
    </div>
  );
};
