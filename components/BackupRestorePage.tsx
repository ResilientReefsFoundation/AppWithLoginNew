import * as React from 'react';
import type { ChangeEvent } from 'react';
import type { CoralBranch, Rule, Site, CollectionZone, Anchor, Tree, Float } from '../types';

export interface BackupData {
  coralBranches: CoralBranch[];
  rules: Rule[];
  sites: Site[];
  zones: CollectionZone[];
  anchors: Anchor[];
  trees: Tree[];
  floats: Float[];
}

interface BackupRestorePageProps {
  onNavigateBack: () => void;
  backupData: BackupData;
  onWipeAllData: () => boolean;
  onRestoreData: (data: BackupData) => void;
}

const BackupRestorePage: React.FC<BackupRestorePageProps> = ({ onNavigateBack, backupData, onWipeAllData, onRestoreData }) => {
  const [deleteConfirmText, setDeleteConfirmText] = React.useState('');
  const restoreFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBackupNow = () => {
    alert('Backing up to cloud... \nBackup complete!');
  };

  const handleDownloadBackup = () => {
    const backupJson = JSON.stringify(backupData, null, 2);
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
    link.download = `coral-nursery-backup-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestoreClick = () => {
    restoreFileInputRef.current?.click();
  };

  const handleRestoreFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (window.confirm('Are you sure you want to restore from this backup? This will overwrite all current data (except Species ID).')) {
        if (window.confirm('THIS IS YOUR FINAL WARNING. All current data (except Species ID) will be permanently lost and replaced by the backup. Proceed?')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const result = event.target?.result;
              if (typeof result === 'string') {
                const parsedData = JSON.parse(result);
                // Add validation logic here if needed
                onRestoreData(parsedData);
              }
            } catch (error) {
              alert('Failed to read or parse backup file. Please ensure it is a valid backup.');
            }
          };
          reader.readAsText(file);
        }
      }
    }
    // Reset file input so the same file can be selected again
    if (restoreFileInputRef.current) {
      restoreFileInputRef.current.value = '';
    }
  };

  const handleWipeData = () => {
    if (deleteConfirmText === 'DELETE') {
      if (window.confirm('Are you absolutely sure you want to wipe all data? This action is irreversible (except for Species ID).')) {
        if (window.confirm('FINAL WARNING: All data (except for Species ID) will be permanently deleted. Are you sure you want to continue?')) {
          if(onWipeAllData()) {
            alert('All data has been wiped.');
            setDeleteConfirmText('');
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-coral-dark mb-2 sm:mb-0">Backup / Restore</h2>
        <button
          onClick={onNavigateBack}
          className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start sm:self-center"
        >
          &larr; Back to Details
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup Options */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">Backup Options</h3>
          <p className="text-sm text-gray-500">
            Create a backup of your current nursery data. It's recommended to do this regularly.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleBackupNow}
              className="bg-coral-blue hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Backup to Cloud
            </button>
            <button
              onClick={handleDownloadBackup}
              className="bg-coral-green hover:bg-opacity-90 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Download Local Backup
            </button>
          </div>
        </div>

        {/* Restore Option */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">Restore from Backup</h3>
          <p className="text-sm text-gray-500">
            Restore data from a previously downloaded backup file. <span className="font-bold">Warning:</span> This will overwrite all existing data except for Species ID.
          </p>
          <input
            type="file"
            ref={restoreFileInputRef}
            onChange={handleRestoreFileChange}
            className="hidden"
            accept=".json"
          />
          <button
            onClick={handleRestoreClick}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Restore from File
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-4 border-2 border-red-500 rounded-lg space-y-4 bg-red-50">
        <h3 className="font-bold text-red-800 text-xl">Danger Zone</h3>
        <p className="text-sm text-red-700">
          This is a permanent and destructive action. Wiping your data cannot be undone. Species ID data will be preserved.
        </p>
        <div>
          <label htmlFor="deleteConfirm" className="block text-sm font-medium text-red-800">
            To proceed, type <span className="font-bold">DELETE</span> in the box below:
          </label>
          <input
            type="text"
            id="deleteConfirm"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="mt-1 block w-full rounded-md border-red-400 shadow-sm focus:border-red-600 focus:ring-red-600 sm:text-sm p-2 bg-white text-gray-900"
          />
        </div>
        <button
          onClick={handleWipeData}
          disabled={deleteConfirmText !== 'DELETE'}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Wipe All Data
        </button>
      </div>
    </div>
  );
};

export default BackupRestorePage;