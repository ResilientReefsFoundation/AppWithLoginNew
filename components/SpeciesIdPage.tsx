import * as React from 'react';
import type { ChangeEvent } from 'react';
import type { SpeciesInfo } from '../types';
import { BookOpenIcon } from './Icons';

interface SpeciesIdPageProps {
  speciesInfo: SpeciesInfo;
  onOpenPhotoManager: () => void;
  onUpdateNotes: (notes: string) => void;
  onNavigateBack: () => void;
}

const SpeciesIdPage: React.FC<SpeciesIdPageProps> = ({
  speciesInfo,
  onOpenPhotoManager,
  onUpdateNotes,
  onNavigateBack,
}) => {
  const [notes, setNotes] = React.useState(speciesInfo.notes);
  const mainPhoto = speciesInfo.photos.find(p => p.isMain) || speciesInfo.photos[0];

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  
  const handleSaveNotes = () => {
    onUpdateNotes(notes);
    alert('Notes saved!');
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-coral-dark mb-2 sm:mb-0">Species Identification</h2>
        <button
          onClick={onNavigateBack}
          className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start sm:self-center"
        >
          &larr; Back to Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Photo Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">Reference Photos</h3>
          {mainPhoto ? (
             <div 
                onClick={onOpenPhotoManager} 
                className="cursor-pointer group aspect-video"
                aria-label="Open photo gallery"
                role="button"
            >
                <img 
                    src={mainPhoto.url} 
                    alt="Species main photo" 
                    className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
                />
            </div>
          ) : (
             <div 
                onClick={onOpenPhotoManager} 
                className="cursor-pointer group aspect-video flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed"
                aria-label="Open photo gallery"
                role="button"
            >
                <p className="text-gray-500">Click to add photos</p>
            </div>
          )}
           <p className="text-xs text-center text-gray-500">Click image to manage photo album.</p>
        </div>

        {/* Notes & Links Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">Notes</h3>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            rows={10}
            className="w-full p-2 border rounded-md shadow-sm focus:ring-coral-blue focus:border-coral-blue bg-white text-gray-900"
            placeholder="Enter key identification features, observations, etc."
          />
           <div className="flex justify-end">
            <button
              onClick={handleSaveNotes}
              className="bg-coral-green hover:bg-opacity-90 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Save Notes
            </button>
          </div>
          
           <div className="border-t pt-4">
             <h3 className="font-semibold text-gray-700 text-lg mb-2">External Resources</h3>
                <a 
                    href="https://www.coralsoftheworld.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-coral-blue hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                    <BookOpenIcon className="w-5 h-5"/>
                    View Fact Sheet (Corals of the World)
                </a>
           </div>

        </div>
      </div>
    </div>
  );
};

export default SpeciesIdPage;