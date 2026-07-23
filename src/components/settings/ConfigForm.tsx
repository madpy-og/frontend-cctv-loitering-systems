import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getConfig, updateConfig } from '../../api/configApi';
import type { SystemConfig, SystemConfigUpdate } from '../../types/config';
import { Button } from '../common/Button';
import { Card, CardHeader } from '../common/Card';
import { Skeleton } from '../common/LoadingSpinner';

export const ConfigForm: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [loiteringThreshold, setLoiteringThreshold] = useState<string>('');
  const [gracePeriod, setGracePeriod] = useState<string>('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getConfig();
        setConfig(data);
        setLoiteringThreshold(data.loitering_threshold_seconds.toString());
        setGracePeriod(data.grace_period_seconds.toString());
      } catch (error) {
        toast.error('Failed to load system configuration');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const thresholdNum = parseInt(loiteringThreshold, 10);
    const graceNum = parseInt(gracePeriod, 10);

    if (isNaN(thresholdNum) || thresholdNum <= 0) {
      toast.error('Loitering threshold must be a positive number');
      return;
    }
    if (isNaN(graceNum) || graceNum < 0) {
      toast.error('Grace period must be a non-negative number');
      return;
    }

    setIsSaving(true);
    try {
      const updateData: SystemConfigUpdate = {
        loitering_threshold_seconds: thresholdNum,
        grace_period_seconds: graceNum,
      };
      const updatedConfig = await updateConfig(updateData);
      setConfig(updatedConfig);
      toast.success('Configuration updated successfully!');
    } catch (error) {
      toast.error('Failed to update configuration');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 mt-8">
        <Skeleton height="h-10" />
        <Skeleton height="h-10" />
        <Skeleton width="w-32" height="h-10" />
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader 
        title="System Settings"
        icon={
          <svg className="w-5 h-5 text-cusblack" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
        className="mb-8 pb-4 border-b border-cuslightgrey"
      />
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
            <div className="flex-1">
              <label htmlFor="loiteringThreshold" className="block text-bs font-medium text-cusblack">
                Loitering Threshold (seconds)
              </label>
              <p className="text-capt text-cuslightblack mt-1">
                The continuous time a person must remain in a zone before triggering an alert.
              </p>
            </div>
            <div className="sm:w-32 relative">
              <input
                id="loiteringThreshold"
                type="number"
                min="1"
                value={loiteringThreshold}
                onChange={(e) => setLoiteringThreshold(e.target.value)}
                className="w-full text-bs border-cuslightgrey rounded-xl shadow-sm focus:ring-information focus:border-information transition-shadow hover:border-cusgrey pl-3 pr-10 py-2"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-cusgrey sm:text-bs">sec</span>
              </div>
            </div>
          </div>

          <hr className="border-cuslightgrey" />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
            <div className="flex-1">
              <label htmlFor="gracePeriod" className="block text-bs font-medium text-cusblack">
                Grace Period (seconds)
              </label>
              <p className="text-capt text-cuslightblack mt-1">
                The cooldown time after an alert before the same person can trigger another alert.
              </p>
            </div>
            <div className="sm:w-32 relative">
              <input
                id="gracePeriod"
                type="number"
                min="0"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(e.target.value)}
                className="w-full text-bs border-cuslightgrey rounded-xl shadow-sm focus:ring-information focus:border-information transition-shadow hover:border-cusgrey pl-3 pr-10 py-2"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-cusgrey sm:text-bs">sec</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cuslightgrey flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            isLoading={isSaving}
            variant="primary"
            className="bg-information hover:bg-information/90 border-transparent shadow-sm px-6 py-2"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};
