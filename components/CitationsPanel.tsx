import React, { useState } from 'react';
import { Citation } from '@/types';
import { CitationCard } from './CitationCard';

interface CitationsPanelProps {
  citations: Citation[];
  title?: string;
  showNativeLang: boolean;
}

/**
 * Panel displaying citations with deduplication
 */
export const CitationsPanel: React.FC<CitationsPanelProps> = ({ 
  citations, 
  title = 'Citations',
  showNativeLang
}) => {
  if (!citations || citations.length === 0) {
    return null;
  }

  // Sort citations by docId, then by path alphabetically
  const sortedCitations = [...citations].sort((a, b) => {
    // First sort by docId
    if (a.docId !== b.docId) {
      return a.docId.localeCompare(b.docId);
    }
    // If same docId, sort by path
    return a.path.localeCompare(b.path);
  });

  return (
    <div className="mt-4">
      <div className="mb-3">
        <h3 className="subsection-title">
          {title} ({sortedCitations.length})
        </h3>
      </div>
      
      <div className="space-y-3">
        {sortedCitations.map((citation, index) => (
          <CitationCard 
            key={`${citation.docId}-${citation.path}-${index}`} 
            citation={citation} 
            index={index}
            showNativeLang={showNativeLang}
          />
        ))}
      </div>
    </div>
  );
};
