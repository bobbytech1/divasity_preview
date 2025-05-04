import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

type DocumentPreviewProps = {
  file: string | File;
};

export function DocumentPreview({ file }: DocumentPreviewProps) {
  return (
    <div className="p-2">
      <div
        className="w-36 h-48 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm
                   hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
      >
        <Document
          file={file}
          loading={<div className="text-xs text-gray-500">Loading PDF...</div>}
          className="w-full h-full"
        >
          <Page
            pageNumber={1}
            width={144}
            className="!m-0"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
