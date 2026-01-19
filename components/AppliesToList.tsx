import React, { useState } from 'react';

interface AppliesToListProps {
  items: string[];
  maxVisible?: number;
}

/**
 * Displays a list of "applies to" items with expand/collapse functionality
 */
export const AppliesToList: React.FC<AppliesToListProps> = ({ 
  items, 
  maxVisible = 3 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowToggle = items.length > maxVisible;
  const visibleItems = isExpanded ? items : items.slice(0, maxVisible);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <p className="text-sm text-gray-500 mb-2">Applies To</p>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {visibleItems.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {isExpanded ? 'Show Less' : `Show All (${items.length} items)`}
        </button>
      )}
    </div>
  );
};
