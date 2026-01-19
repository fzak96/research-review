import React, { useState } from 'react';
import { Citation } from '@/types';

interface CitationCardProps {
  citation: Citation;
  index: number;
}

/**
 * Individual citation card with expand/collapse functionality
 */
export const CitationCard: React.FC<CitationCardProps> = ({ citation, index }) => {
  // Show translated quotes by default (reviewers usually want the English immediately)
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Source: {citation.source_id}
            </span>
            {citation.pinpoint && (
              <span className="text-xs text-gray-500">
                Pinpoint: {citation.pinpoint}
              </span>
            )}
          </div>
          
          <blockquote className="blockquote">
            {citation.quote}
          </blockquote>

          {citation.translated_quote && (
            <div className="mt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium mb-2"
              >
                {isExpanded ? 'Hide Translation' : 'Show Translation'}
              </button>
              {isExpanded && (
                <div className="bg-blue-50 border-l-4 border-blue-400 pl-4 py-2 rounded text-sm text-gray-700">
                  <p className="font-medium text-blue-900 mb-1">Translation:</p>
                  <p>{citation.translated_quote}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
