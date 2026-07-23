import React from 'react';
import { PenTool, X, Save } from 'lucide-react';

interface ZoneCanvasToolbarProps {
  isDrawing: boolean;
  canSave: boolean;
  onStartDrawing: () => void;
  onCancelDrawing: () => void;
  onSaveDraft: () => void;
}

export const ZoneCanvasToolbar: React.FC<ZoneCanvasToolbarProps> = ({
  isDrawing,
  canSave,
  onStartDrawing,
  onCancelDrawing,
  onSaveDraft
}) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      {!isDrawing ? (
        <button
          onClick={onStartDrawing}
          className="flex items-center gap-2 px-4 py-2 bg-cusblack text-cuswhite rounded-xl hover:bg-cusdarkgrey transition-colors text-text-bs font-medium shadow-sm"
        >
          <PenTool size={18} />
          Draw New Zone
        </button>
      ) : (
        <>
          <button
            onClick={onCancelDrawing}
            className="flex items-center gap-2 px-4 py-2 bg-cuswhite text-cusblack border border-cuslightgrey rounded-xl hover:bg-cuslightgrey transition-colors text-text-bs font-medium"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={onSaveDraft}
            disabled={!canSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-text-bs font-medium transition-colors ${
              canSave 
                ? 'bg-cusblack text-cuswhite hover:bg-cusdarkgrey shadow-sm' 
                : 'bg-cuslightgrey text-cusdarkgrey cursor-not-allowed opacity-60'
            }`}
          >
            <Save size={18} />
            Save Zone
          </button>
        </>
      )}
      
      {isDrawing && (
        <span className="text-text-capt text-cusdarkgrey ml-2">
          Click on the canvas to draw points. You need at least 3 points.
        </span>
      )}
    </div>
  );
};
