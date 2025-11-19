import * as React from 'react';
import CoralBranchDisplay from './components/CoralBranchDisplay';
import PhotoManagerModal from './components/PhotoManagerModal';
import AddEditItemsPage from './components/AddEditItemsPage';
import SideMenu from './components/SideMenu';
import { HamburgerIcon } from './components/Icons';
import RulesPage from './components/RulesPage';
import HealthReportsPage from './components/HealthReportsPage';
import GrowthReportsPage from './components/GrowthReportsPage';
import BackupRestorePage from './components/BackupRestorePage';
import ReportsPage from './components/ReportsPage';
import SpeciesIdPage from './components/SpeciesIdPage';
import ArchivePage from './components/ArchivePage';
import NotesToDoPage from './components/NotesToDoPage';
import MonitoringPage from './components/MonitoringPage';
import TreesPage from './components/TreesPage';
import ModelComparisonPage from './components/ModelComparisonPage';
import SitesPage from './components/SitesPage';
import AnchorsPage from './components/3dModelsPage';
import CollectionZonesPage from './components/CollectionZonesPage';
import BranchesPage from './components/BranchesPage';
import EnvironmentalPage from './components/EnvironmentalPage';
import DashboardPage from './components/DashboardPage';
import ExperimentsPage from './components/ExperimentsPage';
import TreeShadeExperimentPage from './components/TreeShadeExperimentPage';
import LongTermStudyPage from './components/LongTermStudyPage';
import TrendsPage from './components/TrendsPage';
import FloatManagementPage from './components/FloatManagementPage';
import LoginPage from './components/LoginPage';
import MoveItemsPage from './components/MoveItemsPage';
import { CoralBranch, Photo, HealthReport, GrowthReport, Site, CollectionZone, Anchor, Tree, Float, Rule, SpeciesInfo, ActivityLogItem, ToDoItem, VoiceNote, Page, AddEditSection, Reminder, BleachingLevel, TreeShadeExperiment, ExperimentReport, LongTermStudy, ObservationReport, TemperatureLogger, User, UserStatus, MaintenanceLog, ScheduleItem } from './types';


// MOCK DATA
const initialBranchesData: CoralBranch[] = [
  {
    id: 'branch-001',
    fragmentId: 'M1-A-CERVICORNIS',
    genus: 'Acropora',
    species: 'cervicornis',
    dateAdded: '2022-01-10T10:00:00Z',
    anchor: 'Anchor A',
    tree: 12,
    face: 3,
    position: 7,
    collectionZone: 'Zone 5 - North Reef',
    site: 'Moore Reef',
    photos: [
      { id: 'p1', url: 'https://picsum.photos/id/102/800/600', isMain: true },
      { id: 'p2', url: 'https://picsum.photos/id/103/800/600', isMain: false },
      { id: 'p3', url: 'https://picsum.photos/id/104/800/600', isMain: false },
      { id: 'p4', url: 'https://picsum.photos/id/106/800/600', isMain: false },
    ],
    healthReports: [
      { id: 'h1', date: '2024-05-15T10:00:00Z', healthPercentage: 100, notes: 'Good coloration, no signs of stress.', bleaching: 'None' },
      { id: 'h2', date: '2024-04-10T10:00:00Z', healthPercentage: 75, notes: 'Minor paling has subsided.', bleaching: 'Mild' },
      { id: 'h3', date: '2024-03-20T10:00:00Z', healthPercentage: 50, notes: 'Signs of bleaching observed.', bleaching: 'Medium' },
    ],
    growthReports: [
      { id: 'g1', date: '2024-05-15T10:00:00Z', surfaceAreaM2: 0.015, volumeM3: 0.00012 },
      { id: 'g2', date: '2024-02-15T10:00:00Z', surfaceAreaM2: 0.011, volumeM3: 0.00009 },
    ],
    isHeatTolerant: true,
    isArchived: false,
  },
  {
    id: 'branch-002',
    fragmentId: 'M2-A-PALMATA',
    genus: 'Acropora',
    species: 'palmata',
    dateAdded: '2021-11-20T10:00:00Z',
    anchor: 'Anchor A',
    tree: 12,
    face: 3,
    position: 8,
    collectionZone: 'Zone 5 - North Reef',
    site: 'Moore Reef',
    photos: [{ id: 'p5', url: 'https://picsum.photos/id/107/800/600', isMain: true }],
    healthReports: [{ id: 'h7', date: '2024-05-15T10:00:00Z', healthPercentage: 25, notes: 'Heavy algae growth.', bleaching: 'None' }],
    growthReports: [{ id: 'g4', date: '2024-05-15T10:00:00Z', surfaceAreaM2: 0.02, volumeM3: 0.00015 }],
    isHeatTolerant: false,
    isArchived: false,
  },
  {
    id: 'branch-003',
    fragmentId: 'M3-P-ASTREOIDES',
    genus: 'Porites',
    species: 'astreoides',
    dateAdded: '2024-01-20T10:00:00Z',
    anchor: 'Anchor A',
    tree: 12,
    face: 1,
    position: 2,
    collectionZone: 'Zone 5 - North Reef',
    site: 'Moore Reef',
    photos: [{ id: 'p6', url: 'https://picsum.photos/id/108/800/600', isMain: true }],
    healthReports: [{ id: 'h8', date: '2024-05-10T10:00:00Z', healthPercentage: 100, notes: 'Stable.', bleaching: 'None' }],
    growthReports: [{ id: 'g5', date: '2024-05-10T10:00:00Z', surfaceAreaM2: 0.005, volumeM3: 0.00004 }],
    isHeatTolerant: false,
    isArchived: false,
  },
  {
    id: 'branch-004',
    fragmentId: 'H4-O-FAVEOLATA',
    genus: 'Orbicella',
    species: 'faveolata',
    dateAdded: '2022-03-05T10:00:00Z',
    anchor: 'Anchor A',
    tree: 8,
    face: 1,
    position: 1,
    collectionZone: 'Zone 2 - West Reef',
    site: 'Hastings Reef',
    photos: [{ id: 'p7', url: 'https://picsum.photos/id/110/800/600', isMain: true }],
    healthReports: [{ id: 'h9', date: '2024-05-18T10:00:00Z', healthPercentage: 0, notes: 'Removed, confirmed dead.', bleaching: 'Strong' }],
    growthReports: [{ id: 'g6', date: '2024-05-18T10:00:00Z', surfaceAreaM2: 0.08, volumeM3: 0.0009 }],
    isHeatTolerant: true,
    isArchived: false,
  }
];


const initialSpeciesInfo: SpeciesInfo = {
    photos: [
        { id: 'sp1', url: 'https://picsum.photos/id/201/800/600', isMain: true },
        { id: 'sp2', url: 'https://picsum.photos/id/202/800/600', isMain: false },
    ],
    notes: 'Key identifying features include thin, branching structures with prominent axial corallites. Coloration can vary from pale tan to brown, depending on light exposure and water conditions. Highly susceptible to white-band disease.',
};

const mockSites: Site[] = [
  { id: 's1', name: 'Moore Reef', photoUrl: 'https://picsum.photos/id/119/800/600', isArchived: false },
  { id: 's2', name: 'Hastings Reef', photoUrl: 'https://picsum.photos/id/124/800/600', isArchived: false }
];
const mockZones: CollectionZone[] = [
    { id: 'z1', name: 'Zone 5 - North Reef', siteId: 's1', latitude: 25.7630, longitude: -80.1900, isArchived: false },
    { id: 'z2', name: 'Zone 2 - West Reef', siteId: 's2', latitude: 25.7610, longitude: -80.1940, isArchived: false }
];
const mockAnchors: Anchor[] = [
    { id: 'a1', name: 'Anchor A', siteId: 's1', latitude: 25.7617, longitude: -80.1918, isDeepwater: true, depth: 25, isArchived: false },
    { id: 'a2', name: 'Anchor B', siteId: 's2', latitude: 25.7617, longitude: -80.1918, isDeepwater: false, isArchived: false }
];
const mockTrees: Tree[] = [
    { id: 't1', number: 12, anchorId: 'a1', currentDepth: 14, normalDepth: 8, lastMovedDate: '2024-05-01T10:00:00Z', isArchived: false },
    { id: 't2', number: 8, anchorId: 'a2', currentDepth: 8, normalDepth: 8, isArchived: false },
    { id: 't3', number: 15, anchorId: 'a1', currentDepth: 20, normalDepth: 10, lastMovedDate: '2024-05-10T10:00:00Z', isArchived: false }
];
const mockFloats: Float[] = [
  { id: 'f1', name: 'Float 1', treeId: 't1' },
  { id: 'f2', name: 'Float 1', treeId: 't2' },
  { id: 'f3', name: 'Float 1', treeId: 't3' },
];
const mockRules: Rule[] = [
  { id: 'r1', target: 'Branch', intervalMonths: 1, checkType: 'Health Report' },
  { id: 'r2', target: 'Branch', intervalMonths: 3, checkType: 'Scan' },
  { id: 'r3', target: 'Tree', intervalMonths: 6, checkType: 'Check' },
];

type LongTermStudyName = 'ropeOnRubble' | 'squareRopeFrame' | 'cubeRopeFrame';
type ArchiveableItemType = 'Site' | 'Collection Zone' | 'Anchor' | 'Tree' | 'Branch';

const App: React.FC = () => {
  // Authentication State
  const [users, setUsers] = React.useState<User[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  // App Data State
  const [coralBranches, setCoralBranches] = React.useState<CoralBranch[]>(initialBranchesData);
  const [activeBranchId, setActiveBranchId] = React.useState<string>('branch-001');

  const [speciesInfo, setSpeciesInfo] = React.useState<SpeciesInfo>(initialSpeciesInfo);
  const [rules, setRules] = React.useState<Rule[]>(mockRules);
  const [isBranchModalOpen, setIsBranchModalOpen] = React.useState(false);
  const [isSpeciesModalOpen, setIsSpeciesModalOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard');
  const [pageData, setPageData] = React.useState<any>(null);
  const [initialSection, setInitialSection] = React.useState<AddEditSection>('Sites');
  const [activityLog, setActivityLog] = React.useState<ActivityLogItem[]>([]);
  
  // State for nursery items to allow wipe/restore
  const [sites, setSites] = React.useState<Site[]>(mockSites);
  const [zones, setZones] = React.useState<CollectionZone[]>(mockZones);
  const [anchors, setAnchors] = React.useState<Anchor[]>(mockAnchors);
  const [trees, setTrees] = React.useState<Tree[]>(mockTrees);
  const [floats, setFloats] = React.useState<Float[]>(mockFloats);
  const [tempLoggers, setTempLoggers] = React.useState<TemperatureLogger[]>([]);
  const [maintenanceLogs, setMaintenanceLogs] = React.useState<MaintenanceLog[]>([]);

  // State for Notes/ToDo page
  const [toDoItems, setToDoItems] = React.useState<ToDoItem[]>([]);
  const [voiceNotes, setVoiceNotes] = React.useState<VoiceNote[]>([]);

  // State for Depth Scheduler
  const [schedule, setSchedule] = React.useState<Map<string, ScheduleItem[]>>(new Map());
  
  // State for Experiments
  const [treeShadeExperiment, setTreeShadeExperiment] = React.useState<TreeShadeExperiment | null>(null);
  const [ropeOnRubbleExperiment, setRopeOnRubbleExperiment] = React.useState<LongTermStudy | null>(null);
  const [squareRopeFrameExperiment, setSquareRopeFrameExperiment] = React.useState<LongTermStudy | null>(null);
  const [cubeRopeFrameExperiment, setCubeRopeFrameExperiment] = React.useState<LongTermStudy | null>(null);

  // Memoized lists for active vs archived items
  const activeBranches = React.useMemo(() => coralBranches.filter(b => !b.isArchived), [coralBranches]);
  const archivedBranches = React.useMemo(() => coralBranches.filter(b => b.isArchived), [coralBranches]);
  const activeSites = React.useMemo(() => sites.filter(s => !s.isArchived), [sites]);
  const archivedSites = React.useMemo(() => sites.filter(s => s.isArchived), [sites]);
  const activeZones = React.useMemo(() => zones.filter(z => !z.isArchived), [zones]);
  const archivedZones = React.useMemo(() => zones.filter(z => z.isArchived), [zones]);
  const activeAnchors = React.useMemo(() => anchors.filter(a => !a.isArchived), [anchors]);
  const archivedAnchors = React.useMemo(() => anchors.filter(a => a.isArchived), [anchors]);
  const activeTrees = React.useMemo(() => trees.filter(t => !t.isArchived), [trees]);
  const archivedTrees = React.useMemo(() => trees.filter(t => t.isArchived), [trees]);
  
  const activeBranch = coralBranches.find(b => b.id === activeBranchId) || activeBranches[0];

  // --- AUTHENTICATION HANDLERS ---
  const handleSignUp = (email: string, password_hash: string): User | { error: string } => {
    if (users.find(u => u.email === email)) {
      return { error: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      password_hash,
      status: 'pending_verification',
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const handleVerifyEmail = (userId: string) => {
    setUsers(users => users.map(u => u.id === userId ? { ...u, status: 'pending_approval' } : u));
  };

  const handleApproveUser = (userId: string) => {
    setUsers(users => users.map(u => u.id === userId ? { ...u, status: 'approved' } : u));
  };

  const handleLogin = (email: string, password_hash: string): User | { error: string } => {
    const user = users.find(u => u.email === email);
    if (!user) {
      return { error: 'No account found with this email.' };
    }
    if (user.password_hash !== password_hash) {
      return { error: 'Incorrect password.' };
    }
    if (user.status !== 'approved') {
      return { error: `Account status: ${user.status.replace('_', ' ')}.` };
    }
    setCurrentUser(user);
    setCurrentPage('dashboard');
    return user;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleDevLogin = () => {
    let devUser = users.find(u => u.email === 'dev@rrf.org.au');
    if (!devUser) {
        devUser = {
            id: 'dev-user-001',
            email: 'dev@rrf.org.au',
            password_hash: 'hashed_devpassword',
            status: 'approved',
        };
        setUsers(prev => [...prev, devUser!]);
    }
    setCurrentUser(devUser);
    setCurrentPage('dashboard');
  };

  // --- REGULAR APP HANDLERS ---
  const logActivity = (message: string) => {
    const newLogItem: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      message,
    };
    setActivityLog(prev => [newLogItem, ...prev]);
  };

  const updateBranchById = (branchId: string, updater: (branch: CoralBranch) => CoralBranch) => {
      setCoralBranches(prev => prev.map(b => b.id === branchId ? updater(b) : b));
  };

  const handleBranchAddPhotos = (files: File[]) => {
    const newPhotos: Photo[] = files.map(file => ({
      id: `new-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      isMain: false,
    }));
    updateBranchById(activeBranch.id, branch => ({ ...branch, photos: [...newPhotos, ...branch.photos] }));
    logActivity(`Added ${files.length} photo(s) to branch ${activeBranch.fragmentId}.`);
  };

  const handleBranchDeletePhotos = (photoIds: string[]) => {
    updateBranchById(activeBranch.id, branch => {
        const remainingPhotos = branch.photos.filter(p => !photoIds.includes(p.id));
        const mainPhoto = branch.photos.find(p => p.isMain);
        const mainPhotoWasDeleted = mainPhoto ? photoIds.includes(mainPhoto.id) : true;

        if (remainingPhotos.length === 0) {
            return { ...branch, photos: [] };
        }

        if (mainPhotoWasDeleted) {
            remainingPhotos[0].isMain = true;
        }
        return { ...branch, photos: remainingPhotos };
    });
    logActivity(`Deleted ${photoIds.length} photo(s) from branch ${activeBranch.fragmentId}.`);
  };

  const handleBranchSetMainPhoto = (photoId: string) => {
    updateBranchById(activeBranch.id, branch => ({
      ...branch,
      photos: branch.photos.map(p => ({ ...p, isMain: p.id === photoId })),
    }));
    logActivity(`Set new main photo for branch ${activeBranch.fragmentId}.`);
  };
  
  const handleSpeciesAddPhotos = (files: File[]) => {
    const newPhotos: Photo[] = files.map(file => ({
      id: `new-species-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      isMain: false,
    }));
    setSpeciesInfo(prev => ({ ...prev, photos: [...newPhotos, ...prev.photos] }));
    logActivity(`Added ${files.length} photo(s) to Species ID.`);
  };

  const handleSpeciesDeletePhotos = (photoIds: string[]) => {
    setSpeciesInfo(prev => {
      const remainingPhotos = prev.photos.filter(p => !photoIds.includes(p.id));
      if (remainingPhotos.length > 0 && !remainingPhotos.some(p => p.isMain)) {
        remainingPhotos[0].isMain = true;
      }
      return { ...prev, photos: remainingPhotos };
    });
     logActivity(`Deleted ${photoIds.length} photo(s) from Species ID.`);
  };

  const handleSpeciesSetMainPhoto = (photoId: string) => {
    setSpeciesInfo(prev => ({
      ...prev,
      photos: prev.photos.map(p => ({ ...p, isMain: p.id === photoId })),
    }));
    logActivity(`Set new main photo for Species ID.`);
  };

  const handleUpdateSpeciesNotes = (notes: string) => {
    setSpeciesInfo(prev => ({ ...prev, notes }));
    logActivity(`Updated Species ID notes.`);
  };
  
  const handleAddTree = (anchorId: string) => {
    const maxTreeNumber = Math.max(0, ...trees.map(t => t.number));
    const newTreeNumber = maxTreeNumber + 1;
    const newTreeId = `t-${Date.now()}`;
    const newTree: Tree = {
      id: newTreeId,
      number: newTreeNumber,
      anchorId: anchorId,
      // Default depths for a new tree
      currentDepth: 8,
      normalDepth: 8,
      isArchived: false,
    };
    
    const newFloat: Float = {
      id: `f-${Date.now()}`,
      name: `Float 1`,
      treeId: newTreeId,
    };

    setTrees(prev => [...prev, newTree]);
    setFloats(prev => [...prev, newFloat]);
    logActivity(`Added new Tree #${newTreeNumber}.`);
    alert(`Tree #${newTreeNumber} has been added.`);
  };
  
  const handleAddFloat = (treeId: string) => {
    const existingFloats = floats.filter(f => f.treeId === treeId);
    const newFloatNumber = existingFloats.length + 1;
    const newFloat: Float = {
      id: `f-${Date.now()}`,
      name: `Float ${newFloatNumber}`,
      treeId: treeId,
    };
    setFloats(prev => [...prev, newFloat]);
    const tree = trees.find(t => t.id === treeId);
    logActivity(`Added Float ${newFloatNumber} to Tree #${tree?.number}.`);
  };

  const handleRemoveFloat = (floatId: string) => {
    const floatToRemove = floats.find(f => f.id === floatId);
    if (!floatToRemove) return;

    const floatsOnTree = floats.filter(f => f.treeId === floatToRemove.treeId);
    if (floatsOnTree.length <= 1) {
        alert("Cannot remove the last float from a tree.");
        return;
    }

    setFloats(prev => prev.filter(f => f.id !== floatId));
    const tree = trees.find(t => t.id === floatToRemove.treeId);
    logActivity(`Removed float "${floatToRemove.name}" from Tree #${tree?.number}.`);
    alert(`Float "${floatToRemove.name}" removed.`);
  };

  const handleAddSite = (name: string, photoUrl: string) => {
    const newSite: Site = {
      id: `s-${Date.now()}`,
      name,
      photoUrl,
      isArchived: false,
    };
    setSites(prev => [...prev, newSite]);
    logActivity(`Added new site: ${name}`);
  };

  const handleUpdateSite = (updatedSite: Site) => {
    setSites(prev => prev.map(site => site.id === updatedSite.id ? updatedSite : site));
    logActivity(`Updated site: ${updatedSite.name}`);
  };

  const handleAddAnchor = (name: string, siteId: string, latitude: number, longitude: number, isDeepwater: boolean, depth: number | undefined) => {
    const newAnchor: Anchor = {
      id: `a-${Date.now()}`,
      name,
      siteId,
      latitude,
      longitude,
      isDeepwater,
      depth: isDeepwater ? depth : undefined,
      isArchived: false,
    };
    setAnchors(prev => [...prev, newAnchor]);
    const site = sites.find(s => s.id === siteId);
    logActivity(`Added new anchor "${name}" to site ${site?.name}.`);
    alert(`Anchor "${name}" has been added.`);
  };

  const handleAddCollectionZone = (name: string, siteId: string, latitude: number, longitude: number) => {
    const newZone: CollectionZone = {
      id: `z-${Date.now()}`,
      name,
      siteId,
      latitude,
      longitude,
      isArchived: false,
    };
    setZones(prev => [...prev, newZone]);
    const site = sites.find(s => s.id === siteId);
    logActivity(`Added new collection zone "${name}" to site ${site?.name}.`);
    alert(`Collection Zone "${name}" has been added.`);
  };
  
  const handleAddBranch = (siteId: string, treeId: string, face: 1 | 2 | 3 | 4, position: number, isHeatTolerant: boolean, genus: string, species: string) => {
    const tree = trees.find(t => t.id === treeId);
    const site = sites.find(s => s.id === siteId);
    if (!tree || !site) {
        alert('Selected site or tree is invalid.');
        return;
    }
    
    const nextBranchNum = coralBranches.length + 1;
    const siteInitial = site.name.charAt(0).toUpperCase();
    const genusInitial = genus.charAt(0).toUpperCase();
    const speciesUpper = species.toUpperCase();
    const newFragmentId = `${siteInitial}${nextBranchNum}-${genusInitial}-${speciesUpper}`;

    const newBranch: CoralBranch = {
        id: `branch-${Date.now()}`,
        fragmentId: newFragmentId,
        genus,
        species,
        dateAdded: new Date().toISOString(),
        anchor: anchors.find(a => a.id === tree.anchorId)?.name || 'Unknown',
        tree: tree.number,
        face,
        position,
        collectionZone: zones.find(z => z.siteId === siteId)?.name || 'Unknown',
        site: site.name,
        photos: [],
        healthReports: [],
        growthReports: [],
        isHeatTolerant,
        isArchived: false,
    };

    setCoralBranches(prev => [...prev, newBranch]);
    logActivity(`Added new branch ${newFragmentId} to Tree #${tree.number}.`);
    alert(`Branch ${newFragmentId} has been added.`);
  };

  const handleSelectBranch = (branchId: string) => {
    setActiveBranchId(branchId);
    handleNavigateToPage('details');
  };

  const handleArchiveItem = (itemType: ArchiveableItemType, itemId: string) => {
    let itemName = '';
    let isBranch = false;

    switch (itemType) {
        case 'Site':
            setSites(prev => prev.map(i => i.id === itemId ? { ...i, isArchived: true } : i));
            itemName = sites.find(i => i.id === itemId)?.name || itemId;
            break;
        case 'Collection Zone':
            setZones(prev => prev.map(i => i.id === itemId ? { ...i, isArchived: true } : i));
            itemName = zones.find(i => i.id === itemId)?.name || itemId;
            break;
        case 'Anchor':
            setAnchors(prev => prev.map(i => i.id === itemId ? { ...i, isArchived: true } : i));
            itemName = anchors.find(i => i.id === itemId)?.name || itemId;
            break;
        case 'Tree':
            setTrees(prev => prev.map(i => i.id === itemId ? { ...i, isArchived: true } : i));
            const treeNum = trees.find(i => i.id === itemId)?.number;
            itemName = treeNum ? `Tree #${treeNum}` : itemId;
            break;
        case 'Branch':
            const branchToArchive = coralBranches.find(b => b.id === itemId);
            if (!branchToArchive) return;

            setCoralBranches(prev => prev.map(b => b.id === itemId ? { ...b, isArchived: true } : b));
            const reminderText = `Collect replacement for ${branchToArchive.species} from ${branchToArchive.collectionZone}.`;
            const newTodo: ToDoItem = { id: `todo-replace-${Date.now()}`, text: reminderText };
            setToDoItems(prev => [newTodo, ...prev]);
            itemName = branchToArchive.fragmentId;
            isBranch = true;
            break;
    }

    logActivity(`Archived ${itemType}: ${itemName}.`);
    if (isBranch) {
        alert(`${itemType} ${itemName} has been archived. A replacement reminder has been added to your ToDo list.`);
    } else {
        alert(`${itemType} ${itemName} has been archived.`);
    }
  };


  const handleNavigateToPage = (page: Page, data?: any) => {
    setPageData(data || null);
    setCurrentPage(page);
    setIsMenuOpen(false);
  };
  
  const handleNavigateToAddEdit = (section: AddEditSection) => {
    setInitialSection(section);
    setCurrentPage('addEditItems');
    setIsMenuOpen(false);
  };
  
  const handleUpdateBranch = (updatedBranch: CoralBranch) => {
    updateBranchById(updatedBranch.id, () => updatedBranch);
    logActivity(`Updated details for branch ${updatedBranch.fragmentId}.`);
    alert('Branch details updated!');
    setCurrentPage('details');
  }

  const handleAddHealthReport = (branchId: string, newReportData: Omit<HealthReport, 'id'>, showAlert: boolean = true) => {
    const newReport: HealthReport = { ...newReportData, id: `h-${Date.now()}` };
    const branch = coralBranches.find(b => b.id === branchId);

    if (newReport.healthPercentage === 0) {
      // Defer archiving to the archive page
    }

    logActivity(`Added health report for branch ${branch?.fragmentId}.`);
    if (showAlert) {
        alert(`Health report added for branch ${branch?.fragmentId}!`);
    }

    updateBranchById(branchId, branch => ({
        ...branch,
        healthReports: [newReport, ...branch.healthReports],
    }));
  };

  const handleAddRule = (newRule: Omit<Rule, 'id'>) => {
    const newRuleWithId = { ...newRule, id: `r-${Date.now()}` };
    setRules(prev => [...prev, newRuleWithId]);
    logActivity(`Added new rule: "${newRule.checkType}" for ${newRule.target} every ${newRule.intervalMonths} month(s).`);
    alert('New rule added!');
  };

  const handleWipeAllData = () => {
    setCoralBranches(initialBranchesData);
    setActiveBranchId(initialBranchesData[0].id);
    setRules(mockRules);
    setSites(mockSites);
    setZones(mockZones);
    setAnchors(mockAnchors);
    setTrees(mockTrees);
    setFloats(mockFloats);
    logActivity('All nursery data has been wiped.');
    return true; 
  };
  
  const handleRestoreData = (backup: any) => {
    try {
        if (!backup.coralBranches || !backup.rules) throw new Error("Invalid backup file structure.");
        
        setCoralBranches(backup.coralBranches);
        setActiveBranchId(backup.coralBranches[0]?.id || '');
        setRules(backup.rules);
        setSites(backup.sites || []);
        setZones(backup.zones || []);
        setAnchors(backup.anchors || []);
        setTrees(backup.trees || []);
        setFloats(backup.floats || []);
        
        logActivity('Data restored from backup file.');
        alert('Data restored successfully!');
    } catch(error) {
        alert(`Failed to restore data: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  const handleClearLog = () => {
      setActivityLog([]);
  };

  const handleAddToDo = (text: string) => {
    const newItem: ToDoItem = { id: `todo-${Date.now()}`, text };
    setToDoItems(prev => [newItem, ...prev]);
    logActivity(`Added ToDo: "${text}"`);
  };

  const handleDeleteToDo = (id: string) => {
    setToDoItems(prev => prev.filter(item => item.id !== id));
    logActivity(`Deleted ToDo item.`);
  };

  const handleAddVoiceNote = (audioUrl: string, duration: number) => {
    const newNote: VoiceNote = { id: `voice-${Date.now()}`, audioUrl, duration };
    setVoiceNotes(prev => [newNote, ...prev]);
    logActivity(`Added voice note (${Math.round(duration)}s).`);
  };

  const handleDeleteVoiceNote = (id: string) => {
    setVoiceNotes(prev => prev.filter(note => note.id !== id));
    logActivity(`Deleted voice note.`);
  };
  
  const handleMoveTreeUp = (treeId: string) => {
    setTrees(prevTrees => prevTrees.map(tree => {
        if (tree.id === treeId) {
            const now = new Date();
            const twoWeeksInMillis = 14 * 24 * 60 * 60 * 1000;

            if (tree.currentDepth <= 6) {
                alert("Tree is already at the minimum depth of 6m.");
                return tree;
            }
            if (tree.lastMovedDate && (now.getTime() - new Date(tree.lastMovedDate).getTime() < twoWeeksInMillis)) {
                alert("Cannot move tree up. Must wait 14 days between upward movements.");
                return tree;
            }
            logActivity(`Moved Tree #${tree.number} up to ${tree.currentDepth - 2}m.`);
            return { ...tree, currentDepth: tree.currentDepth - 2, lastMovedDate: now.toISOString() };
        }
        return tree;
    }));
  };

  const handleMoveTreeDown = (treeId: string, targetDepth: number) => {
    setTrees(prevTrees => prevTrees.map(tree => {
        if (tree.id === treeId) {
            if (tree.currentDepth >= targetDepth) {
                alert(`Tree is already at or deeper than the target depth (${targetDepth}m).`);
                return tree;
            }
            logActivity(`Moved Tree #${tree.number} down to ${targetDepth}m.`);
            // Moving down does not reset the lastMovedDate for the upward restriction
            return { ...tree, currentDepth: targetDepth };
        }
        return tree;
    }));
  };
  
  const handleUpdateTreeNormalDepth = (treeId: string, newNormalDepth: number) => {
    setTrees(prevTrees => prevTrees.map(tree => {
        if (tree.id === treeId) {
            logActivity(`Updated target working depth for Tree #${tree.number} to ${newNormalDepth}m.`);
            return { ...tree, normalDepth: newNormalDepth };
        }
        return tree;
    }));
  };

  const handleGenerateSchedule = (targetDateString: string) => {
    const newSchedule = new Map<string, ScheduleItem[]>();
    const targetDate = new Date(targetDateString);

    activeTrees.forEach(tree => {
      if (tree.currentDepth > tree.normalDepth) {
        const depthDiff = tree.currentDepth - tree.normalDepth;
        const movesNeeded = Math.ceil(depthDiff / 2);

        for (let i = 0; i < movesNeeded; i++) {
          const moveDate = new Date(targetDate);
          moveDate.setDate(targetDate.getDate() - (movesNeeded - 1 - i) * 14);
          const dateKey = moveDate.toISOString().split('T')[0];
          
          const fromDepth = tree.currentDepth - (i * 2);
          const toDepth = Math.max(tree.normalDepth, fromDepth - 2);

          const scheduleItem: ScheduleItem = {
              tree,
              fromDepth,
              toDepth,
          };

          if (!newSchedule.has(dateKey)) {
            newSchedule.set(dateKey, []);
          }
          newSchedule.get(dateKey)!.push(scheduleItem);
        }
      }
    });

    setSchedule(newSchedule);
    logActivity(`Generated a new restoration schedule.`);
    alert('Restoration schedule has been generated!');
  };

  const handleAddTempLogger = (siteId: string, anchorId: string, depth: number) => {
    const newLogger: TemperatureLogger = {
        id: `logger-${Date.now()}`,
        siteId,
        anchorId,
        depth
    };
    setTempLoggers(prev => [...prev, newLogger]);
    const siteName = sites.find(s => s.id === siteId)?.name || 'Unknown Site';
    const anchorName = anchors.find(a => a.id === anchorId)?.name || 'Unknown Anchor';
    logActivity(`Registered temp logger at ${siteName}, ${anchorName}, Depth: ${depth}m.`);
    alert(`Temperature logger registered.`);
  };

  const handleRemoveTempLogger = (loggerId: string) => {
    if (window.confirm('Are you sure you want to remove this registered logger? This will not delete any uploaded data.')) {
        setTempLoggers(prev => prev.filter(l => l.id !== loggerId));
        logActivity(`Removed temp logger registration.`);
        alert('Logger registration removed.');
    }
  };

  const handleLogMaintenance = (siteId: string, treeId: string, tasks: string[], notes?: string) => {
    const newLog: MaintenanceLog = {
      id: `maint-${Date.now()}`,
      timestamp: new Date().toISOString(),
      siteId,
      treeId,
      tasks,
      notes,
    };
    setMaintenanceLogs(prev => [newLog, ...prev]);

    const site = sites.find(s => s.id === siteId);
    const tree = trees.find(t => t.id === treeId);
    if (!site || !tree) return;

    let message = `Performed maintenance on Tree #${tree.number} at ${site.name}: ${tasks.join(', ')}.`;
    if (notes?.trim()) {
        message += ` Notes: ${notes.trim()}`;
    }
    logActivity(message);
    alert('Maintenance log saved!');
  };

  const handleMoveTree = (treeId: string, newAnchorId: string) => {
    const treeToMove = trees.find(t => t.id === treeId);
    const newAnchor = activeAnchors.find(a => a.id === newAnchorId);
    if (!treeToMove || !newAnchor) {
        alert('Invalid tree or new anchor selected.');
        return;
    }

    setTrees(prev => prev.map(t => t.id === treeId ? { ...t, anchorId: newAnchorId } : t));
    logActivity(`Moved Tree #${treeToMove.number} to Anchor "${newAnchor.name}".`);
    alert(`Tree #${treeToMove.number} has been moved successfully.`);
  };

  const handleMoveBranch = (branchId: string, newTreeId: string, newFace: 1 | 2 | 3 | 4, newPosition: number) => {
    const branchToMove = coralBranches.find(b => b.id === branchId);
    const newTree = activeTrees.find(t => t.id === newTreeId);
    if (!branchToMove || !newTree) {
        alert('Invalid branch or new tree selected.');
        return;
    }
    
    const newAnchor = activeAnchors.find(a => a.id === newTree.anchorId);
    if (!newAnchor) {
        alert('Could not find anchor for the new tree.');
        return;
    }
    
    const newSite = activeSites.find(s => s.id === newAnchor.siteId);
    if (!newSite) {
        alert('Could not find site for the new tree.');
        return;
    }

    const isOccupied = coralBranches.some(b => 
        b.id !== branchId &&
        b.tree === newTree.number &&
        b.site === newSite.name &&
        b.face === newFace &&
        b.position === newPosition
    );

    if (isOccupied) {
        alert(`Position ${newPosition} on Face ${newFace} of Tree #${newTree.number} is already occupied.`);
        return;
    }

    setCoralBranches(prev => prev.map(b => b.id === branchId ? {
        ...b,
        tree: newTree.number,
        anchor: newAnchor.name,
        site: newSite.name,
        face: newFace,
        position: newPosition
    } : b));

    logActivity(`Moved Branch ${branchToMove.fragmentId} to Tree #${newTree.number}, Face ${newFace}, Position ${newPosition}.`);
    alert(`Branch ${branchToMove.fragmentId} moved successfully.`);
  };

  const reminders = React.useMemo<Reminder[]>(() => {
    const allReminders: Reminder[] = [];
    const healthRule = rules.find(r => r.target === 'Branch' && r.checkType === 'Health Report');

    if (!healthRule) return allReminders;

    const now = new Date();
    const nowTime = now.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    activeBranches.forEach(branch => {
      const lastCheckDate = branch.healthReports.length > 0
        ? new Date(branch.healthReports.reduce((latest, report) =>
            new Date(report.date) > new Date(latest.date) ? report : latest
          ).date)
        : new Date(branch.dateAdded);

      const dueDate = new Date(lastCheckDate);
      dueDate.setMonth(dueDate.getMonth() + healthRule.intervalMonths);
      
      const dueTime = dueDate.getTime();
      const diffDays = (dueTime - nowTime) / oneDay;

      let status: Reminder['status'] | null = null;
      let message = '';

      if (diffDays < 0) {
        status = 'overdue';
        message = `Health check is overdue. Was due on ${dueDate.toLocaleDateString()}.`;
      } else if (diffDays <= 14) {
        status = 'due';
        message = `Health check is due on ${dueDate.toLocaleDateString()}.`;
      }

      if (status) {
        allReminders.push({
          branchId: branch.id,
          branchFragmentId: branch.fragmentId,
          site: branch.site,
          tree: branch.tree,
          face: branch.face,
          position: branch.position,
          message,
          dueDate: dueDate.toISOString(),
          status,
        });
      }
    });

    return allReminders.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [activeBranches, rules]);

  // Experiment Handlers
  const handleStartTreeShadeExperiment = (controlTreeId: string, shadedTreeId: string, shadeLevel: 30 | 50) => {
    setTreeShadeExperiment({
        isActive: true,
        controlTreeId,
        shadedTreeId,
        shadeLevel,
        startDate: new Date().toISOString(),
        reports: [],
    });
    logActivity(`Started Tree Shade experiment between Tree #${trees.find(t=>t.id===controlTreeId)?.number} and Tree #${trees.find(t=>t.id===shadedTreeId)?.number}.`);
    alert('Tree Shade experiment started!');
  };

  const handleAddExperimentReport = (notes: string) => {
    if (!treeShadeExperiment || !treeShadeExperiment.isActive) return;

    const { controlTreeId, shadedTreeId } = treeShadeExperiment;
    const controlTree = trees.find(t => t.id === controlTreeId);
    const shadedTree = trees.find(t => t.id === shadedTreeId);
    if (!controlTree || !shadedTree) return;

    const calculateStats = (treeNumber: number) => {
        const relevantBranches = activeBranches.filter(b => b.tree === treeNumber);
        if (relevantBranches.length === 0) return { health: 0, bleaching: 0 };
        
        let totalHealth = 0;
        let bleachingCount = 0;

        relevantBranches.forEach(branch => {
            const latestReport = [...branch.healthReports].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            if (latestReport) {
                totalHealth += latestReport.healthPercentage;
                if (latestReport.bleaching !== 'None') {
                    bleachingCount++;
                }
            }
        });

        return {
            health: totalHealth / relevantBranches.length,
            bleaching: bleachingCount
        };
    };
    
    const controlStats = calculateStats(controlTree.number);
    const shadedStats = calculateStats(shadedTree.number);

    const newReport: ExperimentReport = {
        id: `exp-rep-${Date.now()}`,
        date: new Date().toISOString(),
        notes,
        controlTreeHealth: controlStats.health,
        shadedTreeHealth: shadedStats.health,
        controlTreeBleachingCount: controlStats.bleaching,
        shadedTreeBleachingCount: shadedStats.bleaching,
    };

    setTreeShadeExperiment(prev => prev ? ({ ...prev, reports: [newReport, ...prev.reports] }) : null);
    logActivity(`Logged new report for Tree Shade experiment.`);
    alert('New experiment report logged.');
  };

  const handleEndTreeShadeExperiment = () => {
    if (window.confirm('Are you sure you want to end this experiment? The results will be saved.')) {
        setTreeShadeExperiment(prev => prev ? ({ ...prev, isActive: false }) : null);
        logActivity('Ended Tree Shade experiment.');
        alert('Experiment ended.');
    }
  };
  
  const longTermStudySetters: Record<LongTermStudyName, React.Dispatch<React.SetStateAction<LongTermStudy | null>>> = {
    ropeOnRubble: setRopeOnRubbleExperiment,
    squareRopeFrame: setSquareRopeFrameExperiment,
    cubeRopeFrame: setCubeRopeFrameExperiment,
  };

  const handleStartLongTermStudy = (studyName: LongTermStudyName) => {
    const setter = longTermStudySetters[studyName];
    setter({
        isActive: true,
        startDate: new Date().toISOString(),
        reports: [],
    });
    logActivity(`Started ${studyName} study.`);
    alert(`${studyName} study started!`);
  };

  const handleAddObservationReport = (studyName: LongTermStudyName, notes: string) => {
    const setter = longTermStudySetters[studyName];
    const newReport: ObservationReport = {
        id: `obs-rep-${Date.now()}`,
        date: new Date().toISOString(),
        notes,
    };
    setter(prev => prev ? ({ ...prev, reports: [newReport, ...prev.reports] }) : null);
    logActivity(`Logged new report for ${studyName} study.`);
    alert('New observation report logged.');
  };
  
  const handleEndLongTermStudy = (studyName: LongTermStudyName) => {
      if (window.confirm('Are you sure you want to end this study? The results will be saved.')) {
        const setter = longTermStudySetters[studyName];
        setter(prev => prev ? ({ ...prev, isActive: false }) : null);
        logActivity(`Ended ${studyName} study.`);
        alert('Study ended.');
    }
  };


  const renderPage = () => {
    switch (currentPage) {
        case 'trends':
            return (
                <TrendsPage
                    coralBranches={coralBranches}
                    maintenanceLogs={maintenanceLogs}
                    sites={activeSites}
                    trees={activeTrees}
                    anchors={activeAnchors}
                    onNavigateBack={() => setCurrentPage('dashboard')}
                />
            );
        case 'floatManagement':
            return (
                <FloatManagementPage
                    sites={activeSites}
                    trees={activeTrees}
                    floats={floats}
                    branches={activeBranches}
                    onAddFloat={handleAddFloat}
                    onRemoveFloat={handleRemoveFloat}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                />
            );
        case 'moveItems':
            return (
                <MoveItemsPage
                    activeSites={activeSites}
                    activeAnchors={activeAnchors}
                    activeTrees={activeTrees}
                    activeBranches={activeBranches}
                    onMoveTree={handleMoveTree}
                    onMoveBranch={handleMoveBranch}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                />
            );
        case 'dashboard':
            return (
                <DashboardPage
                    reminders={reminders}
                    branches={activeBranches}
                    sites={activeSites}
                    trees={activeTrees}
                    onSelectBranch={handleSelectBranch}
                />
            );
        case 'experiments':
            return (
                <ExperimentsPage
                    onNavigateToPage={handleNavigateToPage}
                />
            );
        case 'treeShadeExperiment':
            return (
                <TreeShadeExperimentPage
                    experiment={treeShadeExperiment}
                    trees={activeTrees}
                    branches={activeBranches}
                    onStart={handleStartTreeShadeExperiment}
                    onAddReport={handleAddExperimentReport}
                    onEnd={handleEndTreeShadeExperiment}
                    onNavigateBack={() => setCurrentPage('experiments')}
                />
            );
        case 'ropeOnRubbleExperiment':
            return (
                <LongTermStudyPage
                    title="Rope on Rubble"
                    experiment={ropeOnRubbleExperiment}
                    onStart={() => handleStartLongTermStudy('ropeOnRubble')}
                    onAddReport={(notes) => handleAddObservationReport('ropeOnRubble', notes)}
                    onEnd={() => handleEndLongTermStudy('ropeOnRubble')}
                    onNavigateBack={() => setCurrentPage('experiments')}
                />
            );
        case 'squareRopeFrameExperiment':
            return (
                <LongTermStudyPage
                    title="Square Rope Frame"
                    experiment={squareRopeFrameExperiment}
                    onStart={() => handleStartLongTermStudy('squareRopeFrame')}
                    onAddReport={(notes) => handleAddObservationReport('squareRopeFrame', notes)}
                    onEnd={() => handleEndLongTermStudy('squareRopeFrame')}
                    onNavigateBack={() => setCurrentPage('experiments')}
                />
            );
        case 'cubeRopeFrameExperiment':
            return (
                <LongTermStudyPage
                    title="Cube Rope Frame"
                    experiment={cubeRopeFrameExperiment}
                    onStart={() => handleStartLongTermStudy('cubeRopeFrame')}
                    onAddReport={(notes) => handleAddObservationReport('cubeRopeFrame', notes)}
                    onEnd={() => handleEndLongTermStudy('cubeRopeFrame')}
                    onNavigateBack={() => setCurrentPage('experiments')}
                />
            );
        case 'environmental':
            return (
                <EnvironmentalPage
                    onNavigateBack={() => setCurrentPage('details')}
                    tempLoggers={tempLoggers}
                    sites={activeSites}
                    anchors={activeAnchors}
                    onAddTempLogger={handleAddTempLogger}
                    onRemoveTempLogger={handleRemoveTempLogger}
                />
            );
        case 'branches':
            return (
                <BranchesPage
                    sites={activeSites}
                    anchors={activeAnchors}
                    trees={activeTrees}
                    branches={activeBranches}
                    onAddBranch={handleAddBranch}
                    onSelectBranch={handleSelectBranch}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                    onMoveBranch={handleMoveBranch}
                />
            );
        case 'collectionZones':
            return (
                <CollectionZonesPage
                    sites={activeSites}
                    zones={activeZones}
                    onAddZone={handleAddCollectionZone}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                />
            );
        case 'anchors':
            return (
                <AnchorsPage
                    sites={activeSites}
                    anchors={activeAnchors}
                    onAddAnchor={handleAddAnchor}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                />
            );
        case 'sites':
            return (
                <SitesPage
                    sites={activeSites}
                    onAddSite={handleAddSite}
                    onUpdateSite={handleUpdateSite}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                />
            );
        case 'modelComparison':
            return (
                <ModelComparisonPage
                    onNavigateBack={() => setCurrentPage('dashboard')}
                />
            );
        case 'trees':
            return (
                <TreesPage
                    sites={activeSites}
                    anchors={activeAnchors}
                    trees={activeTrees}
                    floats={floats}
                    branches={activeBranches}
                    onAddTree={handleAddTree}
                    onAddFloat={handleAddFloat}
                    onMoveTreeUp={handleMoveTreeUp}
                    onMoveTreeDown={handleMoveTreeDown}
                    schedule={schedule}
                    onGenerateSchedule={handleGenerateSchedule}
                    onNavigateBack={() => setCurrentPage('addEditItems')}
                    onUpdateTreeNormalDepth={handleUpdateTreeNormalDepth}
                    onMoveTree={handleMoveTree}
                />
            );
        case 'rules':
            return (
                <RulesPage
                    rules={rules}
                    onAddRule={handleAddRule}
                    onNavigateBack={() => setCurrentPage('details')}
                />
            );
        case 'healthReports':
            return (
                <HealthReportsPage
                    reports={activeBranch.healthReports}
                    onNavigateBack={() => setCurrentPage('details')}
                />
            );
        case 'growthReports':
            return (
                <GrowthReportsPage
                    reports={activeBranch.growthReports}
                    onNavigateBack={() => setCurrentPage('details')}
                />
            );
        case 'addEditItems':
            return (
                <AddEditItemsPage
                    initialSection={initialSection}
                    onNavigateBack={() => setCurrentPage('details')}
                    onNavigateToPage={handleNavigateToPage}
                    activeBranches={activeBranches}
                    onSelectBranch={handleSelectBranch}
                />
            );
        case 'backupRestore':
            return (
                <BackupRestorePage
                    onNavigateBack={() => setCurrentPage('details')}
                    backupData={{ coralBranches, rules, sites, zones, anchors, trees, floats }}
                    onWipeAllData={handleWipeAllData}
                    onRestoreData={handleRestoreData}
                />
            );
        case 'reports':
            return (
                <ReportsPage
                    onNavigateBack={() => setCurrentPage('details')}
                    coralBranches={activeBranches}
                />
            );
        case 'speciesId':
            return (
                <SpeciesIdPage
                    speciesInfo={speciesInfo}
                    onOpenPhotoManager={() => setIsSpeciesModalOpen(true)}
                    onUpdateNotes={handleUpdateSpeciesNotes}
                    onNavigateBack={() => setCurrentPage('details')}
                />
            );
        case 'archive':
            return (
                <ArchivePage
                    activityLog={activityLog}
                    activeSites={activeSites}
                    archivedSites={archivedSites}
                    activeZones={activeZones}
                    archivedZones={archivedZones}
                    activeAnchors={activeAnchors}
                    archivedAnchors={archivedAnchors}
                    activeTrees={activeTrees}
                    archivedTrees={archivedTrees}
                    activeBranches={activeBranches}
                    archivedBranches={archivedBranches}
                    onArchiveItem={handleArchiveItem}
                    onClearLog={handleClearLog}
                    onNavigateBack={() => setCurrentPage('details')}
                />
            );
        case 'notesToDo':
            return (
                <NotesToDoPage
                    toDoItems={toDoItems}
                    voiceNotes={voiceNotes}
                    onAddToDo={handleAddToDo}
                    onDeleteToDo={handleDeleteToDo}
                    onAddVoiceNote={handleAddVoiceNote}
                    onDeleteVoiceNote={handleDeleteVoiceNote}
                    onNavigateBack={() => setCurrentPage('details')}
                />
            );
        case 'monitoring':
            return (
                <MonitoringPage
                    branches={activeBranches}
                    sites={activeSites}
                    trees={activeTrees}
                    anchors={activeAnchors}
                    onAddHealthReport={handleAddHealthReport}
                    onNavigateBack={() => setCurrentPage('details')}
                    onSelectBranch={handleSelectBranch}
                    onLogMaintenance={handleLogMaintenance}
                />
            );
        case 'details':
        default:
            if (!activeBranch) return <div>No active branch selected. Please select a branch from the dashboard or another page.</div>;
            return (
                <CoralBranchDisplay
                  branch={activeBranch}
                  onOpenPhotoManager={() => setIsBranchModalOpen(true)}
                  onNavigateToHealthReports={() => setCurrentPage('healthReports')}
                  onNavigateToGrowthReports={() => setCurrentPage('growthReports')}
                />
            );
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
        case 'trends': return 'Nursery Trends';
        case 'floatManagement': return 'Float Management';
        case 'moveItems': return 'Move Items';
        case 'dashboard': return 'Dashboard';
        case 'experiments': return 'Experiments';
        case 'treeShadeExperiment': return 'Experiment: Tree Shade';
        case 'ropeOnRubbleExperiment': return 'Experiment: Rope on Rubble';
        case 'squareRopeFrameExperiment': return 'Experiment: Square Rope Frame';
        case 'cubeRopeFrameExperiment': return 'Experiment: Cube Rope Frame';
        case 'environmental': return 'Environmental Monitoring';
        case 'branches': return 'Manage Branches';
        case 'collectionZones': return 'Manage Collection Zones';
        case 'anchors': return 'Manage Anchors';
        case 'sites': return 'Manage Sites';
        case 'modelComparison': return '3D Model View/Compare';
        case 'trees': return 'Manage Trees';
        case 'addEditItems': return 'Add/Edit/Move';
        case 'rules': return 'Rules Management';
        case 'healthReports': return 'All Health Reports';
        case 'growthReports': return 'All Growth Reports';
        case 'backupRestore': return 'Backup / Restore';
        case 'reports': return 'Reports';
        case 'speciesId': return 'Species ID';
        case 'archive': return 'Archive & Activity Log';
        case 'notesToDo': return 'Notes / ToDo';
        case 'monitoring': return 'Monitoring/Maintenance';
        case 'details':
        default: return 'Branch Details';
    }
  }

  if (!currentUser) {
    return (
        <LoginPage
            users={users}
            onSignUp={handleSignUp}
            onLogin={handleLogin}
            onVerifyEmail={handleVerifyEmail}
            onApproveUser={handleApproveUser}
            onDevLogin={handleDevLogin}
        />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateToAddEdit={handleNavigateToAddEdit}
        onNavigateToPage={handleNavigateToPage}
        onLogout={handleLogout}
      />

      <div className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-64' : ''}`}>
        <header className="bg-coral-dark text-white shadow-lg">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-4">
             <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md hover:bg-white/10" aria-label="Open menu">
                <HamburgerIcon className="w-6 h-6"/>
             </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-coral-green">Coral Nursery Monitor</h1>
              <p className="mt-1 text-gray-300">{getPageTitle()}</p>
            </div>
          </div>
        </header>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>

       {activeBranch && <PhotoManagerModal
            isOpen={isBranchModalOpen}
            onClose={() => setIsBranchModalOpen(false)}
            photos={activeBranch.photos}
            onAddPhotos={handleBranchAddPhotos}
            onDeletePhotos={handleBranchDeletePhotos}
            onSetMainPhoto={handleBranchSetMainPhoto}
        />}
      
      <PhotoManagerModal
        isOpen={isSpeciesModalOpen}
        onClose={() => setIsSpeciesModalOpen(false)}
        photos={speciesInfo.photos}
        onAddPhotos={handleSpeciesAddPhotos}
        onDeletePhotos={handleSpeciesDeletePhotos}
        onSetMainPhoto={handleSpeciesSetMainPhoto}
      />
    </div>
  );
};

export default App;