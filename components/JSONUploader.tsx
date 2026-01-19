'use client';

import React, { useRef, useState } from 'react';
import { TaxResearchOutput } from '@/types';

interface JSONUploaderProps {
  onDataLoaded: (data: TaxResearchOutput) => void;
  currentData?: TaxResearchOutput;
}

/**
 * Component for uploading and parsing JSON files
 */
export const JSONUploader: React.FC<JSONUploaderProps> = ({ 
  onDataLoaded, 
  currentData 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);
    setFileName(file.name);

    try {
      // Check file type
      if (!file.name.toLowerCase().endsWith('.json')) {
        throw new Error('Please upload a JSON file (.json)');
      }

      // Read file content
      const text = await file.text();
      
      // Parse JSON
      let parsedData: TaxResearchOutput;
      try {
        parsedData = JSON.parse(text);
      } catch (parseError) {
        throw new Error('Invalid JSON format. Please check your file.');
      }

      // Validate basic structure
      if (!parsedData.jurisdiction || !parsedData.vertical || !parsedData.provision) {
        throw new Error('Invalid data structure. Missing required fields (jurisdiction, vertical, or provision).');
      }

      // Success - pass data to parent
      onDataLoaded(parsedData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
      setFileName(null);
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Load JSON Data</h3>
          <p className="text-xs text-gray-500">
            Upload a tax research JSON file to generate the review UI
          </p>
        </div>
        {currentData && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            ✓ Loaded
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileSelect}
          className="hidden"
          id="json-file-input"
        />
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`
            px-4 py-2 rounded-md text-sm font-medium
            ${isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-primary-600 text-white hover:bg-primary-700'
            }
            transition-colors duration-200
          `}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Choose JSON File'
          )}
        </button>
        {fileName && !error && (
          <span className="text-sm text-gray-600">
            {fileName}
          </span>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {currentData && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800">
            <strong>Loaded:</strong> {currentData.jurisdiction.jurisdiction_name} - {currentData.vertical.label.replace(/_/g, ' ')}
          </p>
        </div>
      )}
    </div>
  );
};
