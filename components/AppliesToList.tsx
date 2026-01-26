import React from 'react';
import { AppliesToItem } from '@/types';
import { CitationsPanel } from './CitationsPanel';

interface AppliesToListProps {
  items: AppliesToItem[];
  showNativeLang: boolean;
}

/**
 * Displays a list of "applies to" items with their conditions and citations
 */
export const AppliesToList: React.FC<AppliesToListProps> = ({ 
  items,
  showNativeLang
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <p className="text-base font-semibold text-gray-900 mb-3">Applies To</p>
      <div className="space-y-4">
        {items.map((appliesToItem, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-600 text-white font-semibold text-sm flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed flex-1">
                {appliesToItem.item}
              </p>
            </div>
            
            {appliesToItem.conditions && appliesToItem.conditions.length > 0 && (
              <div className="mt-3 mb-3 ml-9">
                <p className="text-sm font-semibold text-gray-700 mb-1">Conditions:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {appliesToItem.conditions.map((condition, condIndex) => (
                    <li key={condIndex} className="leading-relaxed">
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {appliesToItem.citations && appliesToItem.citations.length > 0 && (
              <div className="mt-4 ml-9">
                <CitationsPanel 
                  citations={appliesToItem.citations} 
                  showNativeLang={showNativeLang}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
