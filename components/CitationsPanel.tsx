import React, { useState } from 'react';
import { Citation } from '@/types';
import { CitationCard } from './CitationCard';

interface CitationsPanelProps {
  citations: Citation[];
  title?: string;
}

/**
 * Panel displaying citations with deduplication and expand/collapse functionality
 */
export const CitationsPanel: React.FC<CitationsPanelProps> = ({ 
  citations, 
  title = 'Citations' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!citations || citations.length === 0) {
    return null;
  }

  // Deduplicate citations based on quote text
  const uniqueCitations = citations.filter((citation, index, self) =>
    index === self.findIndex((c) => c.quote === citation.quote)
  );

  const visibleCitations = isExpanded ? uniqueCitations : uniqueCitations.slice(0, 2);
  const hasMore = uniqueCitations.length > 2;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="subsection-title">
          {title} ({uniqueCitations.length})
        </h3>
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {isExpanded ? 'Collapse' : `Show All ${uniqueCitations.length} Citations`}
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {visibleCitations.map((citation, index) => (
          <CitationCard key={index} citation={citation} index={index} />
        ))}
      </div>
    </div>
  );
};
