'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { TaxResearchPDF } from '@/lib/pdfGenerator';
import { TaxResearchOutput } from '@/types';

interface DownloadPDFButtonProps {
  data: TaxResearchOutput;
}

/**
 * Button component that generates and downloads a PDF with all sections expanded
 */
export const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Generate PDF blob
      const blob = await pdf(<TaxResearchPDF data={data} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const jurisdiction = data.jurisdiction.jurisdiction_name;
      const vertical = data.vertical.label.replace(/_/g, '-');
      const timestamp = new Date().toISOString().split('T')[0];
      link.download = `tax-research-${jurisdiction}-${vertical}-${timestamp}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-primary-600 text-white rounded-md 
        hover:bg-primary-700 
        disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-colors duration-200
        font-medium text-sm
        shadow-sm hover:shadow-md
      `}
      title="Download PDF with all sections expanded"
    >
      {isGenerating ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
};
