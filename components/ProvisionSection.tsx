import React, { useState } from 'react';
import { Provision } from '@/types';
import { RateCard } from './RateCard';
import { AppliesToList } from './AppliesToList';

interface ProvisionSectionProps {
  provision: Provision;
}

/**
 * Main section displaying standard rate, reduced rates, and exemptions
 */
export const ProvisionSection: React.FC<ProvisionSectionProps> = ({ provision }) => {
  const [showNativeLang, setShowNativeLang] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">Provision</h2>
        <button
          onClick={() => setShowNativeLang(!showNativeLang)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-1 border border-primary-300 rounded-md hover:bg-primary-50 transition-colors"
        >
          {showNativeLang ? 'Hide Native Lang Citations' : 'Show Native Lang Citations'}
        </button>
      </div>
      
      {/* Standard Rate */}
      <RateCard rate={provision.standard_rate} isStandard={true} showNativeLang={showNativeLang} />

      {/* Reduced Rates */}
      {provision.reduced_rates && provision.reduced_rates.length > 0 && (
        <div>
          <h3 className="subsection-title mb-4">
            Reduced Rates ({provision.reduced_rates.length})
          </h3>
          <div className="space-y-6">
            {provision.reduced_rates.map((reducedRate, index) => (
              <RateCard key={index} rate={reducedRate} isStandard={false} showNativeLang={showNativeLang} />
            ))}
          </div>
        </div>
      )}

      {/* Exemptions */}
      {provision.exemptions && provision.exemptions.length > 0 && (
        <div>
          <h3 className="subsection-title mb-4">
            Exemptions ({provision.exemptions.length})
          </h3>
          <div className="space-y-6">
            {provision.exemptions.map((exemption, index) => (
              <div key={index} className="card">
                <div className="mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {exemption.name}
                  </h4>
                </div>

                <AppliesToList items={exemption.applies_to} showNativeLang={showNativeLang} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
