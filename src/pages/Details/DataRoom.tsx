import { useState, ChangeEvent } from 'react';
import { Header } from '../../components/Header/Header';
import { ChevronLeft,  StickyNote,  Upload} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DocumentPreview } from '../../components/Document/DocumentPreview';
import { CustomButton } from '../../components/Button/CustomButton';

export default function DataRoom() {
    const [documents, setDocuments] = useState<File[]>([]);

    const navigate = useNavigate();
    const handleGoBack = () => navigate(-1);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
          setDocuments(prev => [...prev, newFile]);
          e.target.value = ''; // clear file input value
        }
      };

      const handleIdeaPad = () => {
        console.log(`Going to ideapad`);
        // add real navigation or logic here
        const id = 1;
        navigate(`/startup/dataroom/${id}`)
      };
  return (
    <div>
           <Header
             name="Startup Data Room"
             containerStyle="bg-white h-[7vh]"
             handlePress={handleGoBack}
             textStyle="capitalize"
             icon={<ChevronLeft />}
           />
           <div className="px-5 py-4">
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
           <CustomButton name="Idea Pad" handlePress={handleIdeaPad} icon={<StickyNote size={30}/>} containerStyle='w-full text-dpurple border border-dpurple bg-white flex-row-reverse gap-4'/>
        </div>
      </div>
           </div>
  )
}
