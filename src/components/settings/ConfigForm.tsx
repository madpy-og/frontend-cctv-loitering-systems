import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getConfig, updateConfig } from '../../api/configApi';
import type { SystemConfig, SystemConfigUpdate } from '../../types/config';

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
      <div className="animate-pulse flex flex-col space-y-6 w-full max-w-2xl">
        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        <div className="h-10 bg-gray-200 rounded-md w-32"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
      {/* Settings Group */}
      <div className="bg-white rounded-xl shadow-sm border border-cuslightgrey p-6 lg:p-8 transition-shadow hover:shadow-md">
        <h3 className="text-lg font-medium text-cusblack mb-6 border-b border-cuslightgrey pb-4">
          Detection Parameters
        </h3>

        <div className="space-y-6">
          {/* Loitering Threshold */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
            <div className="flex-1">
              <label htmlFor="loiteringThreshold" className="block text-sm font-medium text-cusblack">
                Loitering Threshold (seconds)
              </label>
              <p className="text-xs text-cuslightblack mt-1">
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
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-cusblue focus:border-cusblue transition-shadow hover:border-gray-400 pl-3 pr-10 py-2"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">sec</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Grace Period */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
            <div className="flex-1">
              <label htmlFor="gracePeriod" className="block text-sm font-medium text-cusblack">
                Grace Period (seconds)
              </label>
              <p className="text-xs text-cuslightblack mt-1">
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
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-cusblue focus:border-cusblue transition-shadow hover:border-gray-400 pl-3 pr-10 py-2"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t border-cuslightgrey flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition-all
              ${isSaving 
                ? 'bg-blue-400 cursor-wait' 
                : 'bg-cusblue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cusblue hover:-translate-y-0.5'}`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
