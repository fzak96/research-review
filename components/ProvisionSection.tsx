import React from 'react';
import { Provision } from '@/types';
import { RateCard } from './RateCard';
import { AppliesToList } from './AppliesToList';
import { CitationsPanel } from './CitationsPanel';

interface ProvisionSectionProps {
  provision: Provision;
}

/**
 * Main section displaying standard rate, reduced rates, and exemptions
 */
export const ProvisionSection: React.FC<ProvisionSectionProps> = ({ provision }) => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Provision</h2>
      
      {/* Standard Rate */}
      <RateCard rate={provision.standard_rate} isStandard={true} />

      {/* Reduced Rates */}
      {provision.reduced_rates && provision.reduced_rates.length > 0 && (
        <div>
          <h3 className="subsection-title mb-4">
            Reduced Rates ({provision.reduced_rates.length})
          </h3>
          <div className="space-y-6">
            {provision.reduced_rates.map((reducedRate, index) => (
              <RateCard key={index} rate={reducedRate} isStandard={false} />
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

                <AppliesToList items={exemption.applies_to} />

                {exemption.conditions && exemption.conditions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Conditions</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exemption.conditions.map((condition, i) => (
                        <li key={i} className="leading-relaxed">
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <CitationsPanel citations={exemption.citations} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
