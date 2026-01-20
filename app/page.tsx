'use client';

import React, { useState } from 'react';
import { TaxResearchOutput } from '@/types';
import { JurisdictionSummary } from '@/components/JurisdictionSummary';
import { VerticalSection } from '@/components/VerticalSection';
import { ProvisionSection } from '@/components/ProvisionSection';
import { SourcesSection } from '@/components/SourcesSection';
import { JSONUploader } from '@/components/JSONUploader';

/**
 * Main App component rendering the tax research review UI
 */
export default function Home() {
  const [data, setData] = useState<TaxResearchOutput | null>(null);

  const handleDataLoaded = (newData: TaxResearchOutput) => {
    setData(newData);
  };

  // Show empty state until data is loaded
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tax Research Review UI
            </h1>
            <p className="text-lg text-gray-600">
              Upload a tax research JSON file to begin reviewing
            </p>
          </div>
          <JSONUploader onDataLoaded={handleDataLoaded} />
        </div>
      </div>
    );
  }

  const taxType = data.vertical.tax_types_at_this_level?.[0] || 'VAT';
  const verticalLabel = data.vertical.label.replace(/_/g, ' ');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {data.jurisdiction.jurisdiction_name}
              </h1>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{taxType}</span>
                <span className="text-gray-400">•</span>
                <span className="capitalize">{verticalLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <JSONUploader onDataLoaded={handleDataLoaded} currentData={data} />
          
          <JurisdictionSummary jurisdiction={data.jurisdiction} />
          <VerticalSection vertical={data.vertical} />
          <ProvisionSection provision={data.provision} />
          {data.sources && data.sources.length > 0 && (
            <SourcesSection sources={data.sources} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            Tax Research Review UI • For verification and validation purposes
          </p>
        </div>
      </footer>
    </div>
  );
}
