import React from 'react';
import { PenTool, X, Save } from 'lucide-react';
import { Button } from '../common/Button';

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
        <Button
          onClick={onStartDrawing}
          variant="primary"
          leftIcon={<PenTool size={18} />}
        >
          Draw New Zone
        </Button>
      ) : (
        <>
          <Button
            onClick={onCancelDrawing}
            variant="secondary"
            leftIcon={<X size={18} />}
          >
            Cancel
          </Button>
          <Button
            onClick={onSaveDraft}
            disabled={!canSave}
            variant="primary"
            leftIcon={<Save size={18} />}
          >
            Save Zone
          </Button>
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
