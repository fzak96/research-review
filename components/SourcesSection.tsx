import React from 'react';
import { Source } from '@/types';

interface SourcesSectionProps {
  sources: Source[];
}

/**
 * Section displaying all sources with deduplication
 */
export const SourcesSection: React.FC<SourcesSectionProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  // Deduplicate sources by id
  const uniqueSources = sources.filter((source, index, self) =>
    index === self.findIndex((s) => s.id === source.id)
  );

  // Sort sources by ID numerically (c1, c2, c3, etc.)
  const sortedSources = [...uniqueSources].sort((a, b) => {
    // Extract numeric part from ID (e.g., "c1" -> 1, "c2" -> 2)
    const getNumericId = (id: string) => {
      const match = id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return getNumericId(a.id) - getNumericId(b.id);
  });

  return (
    <div className="card">
      <h2 className="section-title">Sources ({sortedSources.length})</h2>
      
      <div className="space-y-4">
        {sortedSources.map((source, index) => (
          <div
            key={source.id}
            className="border border-gray-200 rounded-md p-4 bg-gray-50"
          >
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                {source.id}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{source.title}</h3>
            
            {source.url && (
              <p className="text-sm text-gray-600 mb-2 break-all">
                <span className="font-medium">URL:</span> {source.url}
              </p>
            )}
            
            {source.snippet && (
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                <span className="font-medium">Snippet:</span> {source.snippet}
              </p>
            )}
            
            {(source.author || source.publisher) && (
              <div className="text-xs text-gray-500 mt-2">
                {source.author && <span>Author: {source.author}</span>}
                {source.author && source.publisher && <span> • </span>}
                {source.publisher && <span>Publisher: {source.publisher}</span>}
              </div>
            )}
            
            {source.publishedAt && (
              <p className="text-xs text-gray-500 mt-1">
                Published: {new Date(source.publishedAt).toLocaleDateString()}
              </p>
            )}
            
            {source.accessedAt && (
              <p className="text-xs text-gray-500 mt-1">
                Accessed: {new Date(source.accessedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
