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

  // Deduplicate citations based on source_id to ensure each source appears only once
  const uniqueCitations = citations.filter((citation, index, self) =>
    index === self.findIndex((c) => c.source_id === citation.source_id)
  );

  // Sort citations by source_id numerically (c1, c2, c3, etc.)
  const sortedCitations = [...uniqueCitations].sort((a, b) => {
    // Extract numeric part from source_id (e.g., "c1" -> 1, "c2" -> 2)
    const getNumericId = (id: string) => {
      const match = id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return getNumericId(a.source_id) - getNumericId(b.source_id);
  });

  const visibleCitations = isExpanded ? sortedCitations : sortedCitations.slice(0, 2);
  const hasMore = sortedCitations.length > 2;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="subsection-title">
          {title} ({sortedCitations.length})
        </h3>
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {isExpanded ? 'Collapse' : `Show All ${sortedCitations.length} Citations`}
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {visibleCitations.map((citation, index) => (
          <CitationCard key={citation.source_id} citation={citation} index={index} />
        ))}
      </div>
    </div>
  );
};
