import * as React from 'react';
import type { Site, Anchor, Tree, Float, CoralBranch, ScheduleItem } from '../types';
import { ArrowUpIcon } from './Icons';

interface TreesPageProps {
  sites: Site[];
  anchors: Anchor[];
  trees: Tree[];
  floats: Float[];
  branches: CoralBranch[];
  onAddTree: (anchorId: string) => void;
  onAddFloat: (treeId: string) => void;
  onMoveTreeUp: (treeId: string) => void;
  onMoveTreeDown: (treeId: string, targetDepth: number) => void;
  onMoveTree: (treeId: string, newAnchorId: string) => void;
  onUpdateTreeNormalDepth: (treeId: string, newNormalDepth: number) => void;
  schedule: Map<string, ScheduleItem[]>;
  onGenerateSchedule: (targetDate: string) => void;
  onNavigateBack: () => void;
}

const DEPTH_OPTIONS = [10, 12, 14, 16, 18, 20, 22, 24];
const TARGET_DEPTH_OPTIONS = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

const TreesPage: React.FC<TreesPageProps> = ({
  sites: activeSites,
  anchors: activeAnchors,
  trees: activeTrees,
  floats,
  branches,
  onAddTree,
  onAddFloat,
  onMoveTreeUp,
  onMoveTreeDown,
  onMoveTree,
  onUpdateTreeNormalDepth,
  schedule,
  onGenerateSchedule,
  onNavigateBack
}) => {
  const [selectedSiteId, setSelectedSiteId] = React.useState<string>('');
  const [selectedAnchorId, setSelectedAnchorId] = React.useState<string>('');
  const [targetDate, setTargetDate] = React.useState('');
  const [moveToAnchorIds, setMoveToAnchorIds] = React.useState<{ [key: string]: string }>({});

  const handleAddTree = () => {
    if (selectedAnchorId) {
      onAddTree(selectedAnchorId);
    } else {
      alert('Please select a site and an anchor first.');
    }
  };

  const handleGenerateClick = () => {
    if (!targetDate) {
      alert('Please select a target restoration date.');
      return;
    }
    onGenerateSchedule(targetDate);
  };

  const handleMoveTreeClick = (treeId: string) => {
    const newAnchorId = moveToAnchorIds[treeId];
    if (!newAnchorId) {
        alert('Please select a new anchor to move the tree to.');
        return;
    }
    onMoveTree(treeId, newAnchorId);
    setMoveToAnchorIds(prev => ({...prev, [treeId]: ''}));
  };

  const filteredAnchors = selectedSiteId ? activeAnchors.filter(a => a.siteId === selectedSiteId) : [];
  
  const getBranchCountForTree = (treeNumber: number) => {
    return branches.filter(b => b.tree === treeNumber).length;
  };

  const isEligibleToMoveUp = (tree: Tree): boolean => {
    if (!tree.lastMovedDate) return true; // Can always move if never moved before
    const lastMoved = new Date(tree.lastMovedDate).getTime();
    const now = new Date().getTime();
    const fourteenDaysInMillis = 14 * 24 * 60 * 60 * 1000;
    return now - lastMoved > fourteenDaysInMillis;
  };

  const sortedSchedule = React.useMemo(() => {
    return Array.from(schedule.entries()).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());
  }, [schedule]);


  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 print-hidden">
        <h2 className="text-2xl font-bold text-coral-dark mb-2 sm:mb-0">Manage Trees</h2>
        <button
          onClick={onNavigateBack}
          className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start sm:self-center"
        >
          &larr; Back to Add/Edit/Move
        </button>
      </div>

      {/* Add New Tree Section */}
      <div className="p-4 border rounded-lg space-y-4 bg-gray-50 print-hidden">
        <h3 className="font-semibold text-gray-700 text-lg">Add New Tree</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="siteSelect" className="block text-sm font-medium text-gray-700">Site</label>
            <select id="siteSelect" value={selectedSiteId} onChange={e => { setSelectedSiteId(e.target.value); setSelectedAnchorId(''); }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900">
              <option value="">-- Choose site --</option>
              {activeSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="anchorSelect" className="block text-sm font-medium text-gray-700">Anchor</label>
            <select id="anchorSelect" value={selectedAnchorId} onChange={e => setSelectedAnchorId(e.target.value)} disabled={!selectedSiteId} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white disabled:bg-gray-100 text-gray-900">
              <option value="">-- Choose anchor --</option>
              {filteredAnchors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end">
            <button onClick={handleAddTree} disabled={!selectedAnchorId} className="bg-coral-blue hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400">
              Add Tree
            </button>
          </div>
        </div>
      </div>
      
      {/* Existing Trees List */}
      <div className="print-hidden">
        <h3 className="font-semibold text-gray-700 text-lg mb-4">Edit Existing Tree</h3>
        <div className="space-y-4">
          {activeTrees.length > 0 ? (
            activeTrees.sort((a,b) => a.number - b.number).map(tree => {
              const treeFloats = floats.filter(f => f.treeId === tree.id);
              const branchCount = getBranchCountForTree(tree.number);
              const canMoveUp = isEligibleToMoveUp(tree) && tree.currentDepth > 6;
              const eligibleDepthOptions = DEPTH_OPTIONS.filter(depth => depth > tree.currentDepth);
              const anchorOptions = activeAnchors.filter(a => a.id !== tree.anchorId);


              return (
                <div key={tree.id} className="p-4 border rounded-lg flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-grow">
                      <h4 className="font-bold text-coral-dark text-xl">Tree #{tree.number}</h4>
                      <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-x-4 gap-y-2">
                          <p>Branches:</p><p className="font-medium">{branchCount} / 40</p>
                          <p className="self-center">Target working depth:</p>
                          <select
                            value={tree.normalDepth}
                            onChange={(e) => onUpdateTreeNormalDepth(tree.id, parseInt(e.target.value, 10))}
                            className="font-medium p-1 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-coral-blue focus:border-coral-blue -my-1"
                          >
                            {TARGET_DEPTH_OPTIONS.map(depth => (
                              <option key={depth} value={depth}>{depth}m</option>
                            ))}
                          </select>
                          <p>Current Depth:</p><p className="font-medium">{tree.currentDepth}m</p>
                          <p>Last Moved:</p><p className="font-medium">{tree.lastMovedDate ? new Date(tree.lastMovedDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Floats:</span>
                        <ul className="list-disc list-inside ml-4">
                          {treeFloats.map(f => <li key={f.id}>{f.name}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-stretch gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onAddFloat(tree.id)}
                        className="bg-coral-green hover:bg-opacity-90 text-coral-dark font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        Add Float
                      </button>
                      <div className="flex gap-2">
                          <button
                              onClick={() => onMoveTreeUp(tree.id)}
                              disabled={!canMoveUp}
                              title={!isEligibleToMoveUp(tree) ? 'Cannot move up for 14 days' : 'Move Up 2m'}
                              className="flex-1 flex justify-center items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-3 rounded-lg transition-colors text-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                          >
                              <ArrowUpIcon className="w-4 h-4" /> Up
                          </button>
                          <select
                            value=""
                            onChange={(e) => {
                              const depth = parseInt(e.target.value, 10);
                              if (depth) onMoveTreeDown(tree.id, depth);
                            }}
                            disabled={eligibleDepthOptions.length === 0}
                            title="Lower to a specific depth"
                            className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-3 rounded-lg transition-colors text-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                          >
                            <option value="" disabled>Lower to...</option>
                            {eligibleDepthOptions.map(depth => (
                                <option key={depth} value={depth}>{depth}m</option>
                            ))}
                          </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-dashed">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Move Tree</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                          <div>
                              <label htmlFor={`move-anchor-${tree.id}`} className="block text-xs font-medium text-gray-600">New Anchor</label>
                              <select 
                                  id={`move-anchor-${tree.id}`}
                                  value={moveToAnchorIds[tree.id] || ''}
                                  onChange={e => setMoveToAnchorIds(prev => ({ ...prev, [tree.id]: e.target.value }))}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900 text-sm"
                              >
                                  <option value="">-- Select new anchor --</option>
                                  {anchorOptions.map(a => <option key={a.id} value={a.id}>{a.name} ({activeSites.find(s=>s.id === a.siteId)?.name})</option>)}
                              </select>
                          </div>
                           <button 
                              onClick={() => handleMoveTreeClick(tree.id)}
                              disabled={!moveToAnchorIds[tree.id]}
                              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                            >
                              Move Tree
                            </button>
                      </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 py-8">No trees have been added yet.</p>
          )}
        </div>
      </div>
      
       {/* Schedule Generator */}
      <div className="p-4 border rounded-lg space-y-4 bg-gray-50 print-hidden">
        <h3 className="font-semibold text-gray-700 text-lg">Generate Restoration Schedule</h3>
        <p className="text-sm text-gray-600">
          Select a target date to have all trees returned to their normal depth. The system will calculate the required moves at 14-day intervals.
        </p>
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-grow">
            <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">Target Restoration Date</label>
            <input
              type="date"
              id="targetDate"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900"
            />
          </div>
          <button
            onClick={handleGenerateClick}
            className="w-full sm:w-auto bg-coral-blue hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Generate Schedule
          </button>
        </div>
      </div>
      
       {/* Schedule Display */}
      <div id="schedule-to-print">
        <div className="flex justify-between items-center mb-4 print:hidden">
            <h3 className="font-semibold text-gray-700 text-lg">Generated Schedule</h3>
            {sortedSchedule.length > 0 && (
                <button
                    onClick={() => window.print()}
                    className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-semibold py-1 px-3 rounded-lg text-sm"
                >
                    Print Schedule
                </button>
            )}
        </div>
        {sortedSchedule.length > 0 ? (
          <div className="space-y-6">
            {sortedSchedule.map(([date, scheduleItems]) => (
              <div key={date}>
                <h4 className="font-medium bg-gray-100 p-3 rounded-t-md text-coral-dark text-lg">
                  {new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h4>
                <div className="border border-t-0 rounded-b-md">
                   <ul className="divide-y divide-gray-200">
                     {scheduleItems.map(item => (
                       <li key={item.tree.id + '-' + item.fromDepth} className="p-3">
                         <p>Move <span className="font-bold">Tree #{item.tree.number}</span> from {item.fromDepth}m to {item.toDepth}m.</p>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8 print:hidden">No schedule generated yet, or no trees require moving.</p>
        )}
      </div>
      
    </div>
  );
};

export default TreesPage;