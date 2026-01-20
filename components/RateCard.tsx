import React from 'react';
import { StandardRate, ReducedRate } from '@/types';
import { AppliesToList } from './AppliesToList';
import { CitationsPanel } from './CitationsPanel';

interface RateCardProps {
  rate: StandardRate | ReducedRate;
  isStandard?: boolean;
  showNativeLang: boolean;
}

/**
 * Card displaying rate information with applies-to list and citations
 */
export const RateCard: React.FC<RateCardProps> = ({ rate, isStandard = false, showNativeLang }) => {
  const rateLabel = isStandard ? 'Standard Rate' : (rate as ReducedRate).name;
  const rateValue = `${rate.amount}${rate.unit || '%'}`;
  const conditions = (rate as ReducedRate).conditions || [];

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="subsection-title">{rateLabel}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-gray-900">{rateValue}</span>
            {rate.rate_type && (
              <span className="ml-2 text-sm text-gray-500 capitalize">
                {rate.rate_type.toLowerCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      <AppliesToList items={rate.applies_to} />

      {conditions.length > 0 && (
        <div className="mt-4">
          <p className="text-base font-semibold text-gray-900 mb-2">Conditions</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {conditions.map((condition, index) => (
              <li key={index} className="leading-relaxed">
                {condition}
              </li>
            ))}
          </ul>
        </div>
      )}

      <CitationsPanel citations={rate.citations} showNativeLang={showNativeLang} />
    </div>
  );
};
