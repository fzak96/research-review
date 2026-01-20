import React from 'react';
import { Citation } from '@/types';

interface CitationCardProps {
  citation: Citation;
  index: number;
  showNativeLang: boolean;
}

/**
 * Individual citation card displaying both translations and original by default
 */
export const CitationCard: React.FC<CitationCardProps> = ({ citation, index, showNativeLang }) => {
  const citationNumber = index + 1;
  
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-2">
        {/* Citation Number */}
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-700 font-semibold text-xs flex-shrink-0">
          {citationNumber}
        </span>
        
        <div className="flex-1">
          {/* Translated Path and Quote (shown first) */}
          <div className="mb-4">
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-gray-900">
                {citation.translated_path}
              </h4>
            </div>
            <blockquote className="blockquote bg-white border-r-4 border-blue-400 pr-4 py-2">
              {citation.translated_quote}
            </blockquote>
          </div>

          {/* Original Path and Quote (shown when showNativeLang is true) */}
          {showNativeLang && (
            <div className="mb-4">
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  {citation.path}
                </h4>
              </div>
              <blockquote className="blockquote bg-white border-r-4 border-purple-400 pr-4 py-2">
                {citation.quote}
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
