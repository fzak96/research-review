import React from 'react';

interface AppliesToListProps {
  items: string[];
}

/**
 * Displays a list of "applies to" items
 */
export const AppliesToList: React.FC<AppliesToListProps> = ({ 
  items
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <p className="text-base font-semibold text-gray-900 mb-2">Applies To</p>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
