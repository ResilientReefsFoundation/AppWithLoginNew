import * as React from 'react';
import type { FormEvent } from 'react';
import type { AddEditSection, CoralBranch, Page } from '../types';

const SECTIONS: AddEditSection[] = ['Sites', 'Collection Zones', 'Anchors', 'Trees', 'Branches', 'Floats', 'Rules'];

interface AddEditItemsPageProps {
  initialSection: AddEditSection;
  activeBranches: CoralBranch[];
  onSelectBranch: (branchId: string) => void;
  onNavigateBack: () => void;
  onNavigateToPage: (page: Page) => void;
}

const AddEditItemsPage: React.FC<AddEditItemsPageProps> = ({
  initialSection,
  activeBranches,
  onSelectBranch,
  onNavigateBack,
  onNavigateToPage,
}) => {
  const [activeSection, setActiveSection] = React.useState<AddEditSection>(initialSection);
  const [quickAccessId, setQuickAccessId] = React.useState('');

  const handleQuickAccessSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAccessId.trim()) return;
    const foundBranch = activeBranches.find(b => b.fragmentId.toLowerCase() === quickAccessId.trim().toLowerCase());
    if (foundBranch) {
      onSelectBranch(foundBranch.id);
    } else {
      alert('Branch ID not found in active branches.');
    }
    setQuickAccessId('');
  };

  const handleSectionClick = (section: AddEditSection) => {
    if (section === 'Sites') {
      onNavigateToPage('sites');
    } else if (section === 'Trees') {
      onNavigateToPage('trees');
    } else if (section === 'Anchors') {
      onNavigateToPage('anchors');
    } else if (section === 'Collection Zones') {
      onNavigateToPage('collectionZones');
    } else if (section === 'Branches') {
        onNavigateToPage('branches');
    } else if (section === 'Rules') {
        onNavigateToPage('rules');
    } else if (section === 'Floats') {
        onNavigateToPage('floatManagement');
    } else {
      setActiveSection(section);
    }
  };

  const renderSectionContent = () => {
    // Most sections now navigate away, so this can be simplified.
    // Kept for potential future inline edits.
    return null; 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
       <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Quick access - Enter Branch number</h3>
            <form onSubmit={handleQuickAccessSearch} className="flex gap-2">
              <input
                type="text"
                value={quickAccessId}
                onChange={(e) => setQuickAccessId(e.target.value)}
                placeholder="e.g., M1-A-PALMATA"
                className="flex-grow block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900"
              />
              <button type="submit" className="bg-coral-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">Go</button>
            </form>
        </div>
       <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-coral-dark">Add/Edit/Move</h2>
        <button
          onClick={onNavigateBack}
          className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          &larr; Back to Details
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/3">
          <nav className="grid grid-cols-2 gap-2">
            {SECTIONS.map(section => (
              <button
                key={section}
                onClick={() => handleSectionClick(section)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-coral-dark`}
              >
                {section}
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
            {renderSectionContent()}
        </main>
      </div>
    </div>
  );
};

export default AddEditItemsPage;