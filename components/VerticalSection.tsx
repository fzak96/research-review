import React from 'react';
import { Vertical } from '@/types';
import { CitationsPanel } from './CitationsPanel';

interface VerticalSectionProps {
  vertical: Vertical;
}

/**
 * Section displaying vertical definition and tax type information
 */
export const VerticalSection: React.FC<VerticalSectionProps> = ({ vertical }) => {
  const hasCitations = vertical.definition.citations && vertical.definition.citations.length > 0;

  return (
    <div className="card">
      <h2 className="section-title">Vertical</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Label</p>
        <p className="font-medium text-gray-900 capitalize">
          {vertical.label.replace(/_/g, ' ')}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Definition</p>
        <p className="text-gray-700 leading-relaxed">{vertical.definition.description}</p>
      </div>

      {vertical.tax_names && vertical.tax_names.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Tax Names</p>
          <div className="flex flex-wrap gap-2">
            {vertical.tax_names.map((name, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-md text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasCitations && (
        <div className="mt-6">
          <CitationsPanel citations={vertical.definition.citations} />
        </div>
      )}
    </div>
  );
};
