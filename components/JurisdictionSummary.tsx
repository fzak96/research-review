import React from 'react';
import { Jurisdiction } from '@/types';

interface JurisdictionSummaryProps {
  jurisdiction: Jurisdiction;
}

/**
 * Compact summary card displaying jurisdiction information
 */
export const JurisdictionSummary: React.FC<JurisdictionSummaryProps> = ({ jurisdiction }) => {
  return (
    <div className="card">
      <h2 className="section-title">Jurisdiction</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Country Name</p>
          <p className="font-medium text-gray-900">{jurisdiction.jurisdiction_name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Level</p>
          <p className="font-medium text-gray-900 capitalize">{jurisdiction.level_name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">ISO Code</p>
          <p className="font-medium text-gray-900">{jurisdiction.country_iso}</p>
        </div>
      </div>
    </div>
  );
};
