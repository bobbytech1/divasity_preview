import { useState, ChangeEvent } from 'react';
import { TabHeader } from '../../components/Header/TabHeader';
import { Bell, Upload } from 'lucide-react';
import { DocumentPreview } from '../../components/Document/DocumentPreview';
import { Link } from 'react-router-dom';

export function DataRoom() {
  const [documents, setDocuments] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setDocuments(prev => [...prev, newFile]);
      e.target.value = ''; // clear file input value
    }
  };

  return (
    <div>
      <TabHeader
        name="Data Room"
        containerStyle="flex-row-reverse bg-white"
        icon={<Bell />}
      />

      <div className="bg-white pt-18 px-5 overflow-y-auto">
        {/* Documents Grid */}
        {documents.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pb-6">
            {documents.map((file, index) => (
               <div key={index} className="flex flex-col items-center gap-2">
               <DocumentPreview file={file} />
               <p className="text-sm text-gray-600 text-center break-words max-w-[90%] font-opensans">{file.name}</p>
             </div>
            ))}
          </div>
        )}

<div className="pb-6 flex items-center justify-center">
  <label
    htmlFor="file-upload"
    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
  >
    <Upload className="w-4 h-4" />
    Upload document
  </label>
  <input
    id="file-upload"
    type="file"
    accept="application/pdf"
    onChange={handleFileChange}
    className="hidden"
  />
</div>

        {/* Navigation Card */}
        <div className="pt-10 pb-30">
          <Link to="/ideapad">
            <div className="bg-purple-100 p-6 rounded-lg text-center hover:bg-purple-200 transition-colors">
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                Divasity.com Idea Pad
              </h3>
              <p className="text-sm text-purple-600">
                Click here to navigate to Idea Pad
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
