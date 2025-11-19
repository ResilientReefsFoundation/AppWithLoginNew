import * as React from 'react';
import type { FormEvent } from 'react';
import { SunIcon, GlobeAltIcon, ArrowUpIcon, ArrowDownIcon, TrashIcon } from './Icons';
import type { TemperatureLogger, Site, Anchor } from '../types';

interface EnvironmentalPageProps {
  onNavigateBack: () => void;
  tempLoggers: TemperatureLogger[];
  sites: Site[];
  anchors: Anchor[];
  onAddTempLogger: (siteId: string, anchorId: string, depth: number) => void;
  onRemoveTempLogger: (loggerId: string) => void;
}

const DataUploadCard: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
    <div className="p-4 border rounded-lg space-y-3 bg-gray-50">
        <h3 className="font-semibold text-gray-700 text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex justify-end pt-2">
            <input
                type="file"
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral-blue/10 file:text-coral-blue hover:file:bg-coral-blue/20 cursor-pointer"
            />
        </div>
    </div>
);

interface TideData {
    currentHeight: number;
    trend: 'rising' | 'falling';
    nextHigh: { time: string; height: number };
    nextLow: { time: string; height: number };
}

interface UvData {
    currentIndex: number;
    maxIndex: number;
}

const getUvInfo = (index: number): { level: string; color: string; textColor: string; } => {
    if (index <= 2) return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-600' };
    if (index <= 5) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    if (index <= 7) return { level: 'High', color: 'bg-orange-500', textColor: 'text-orange-600' };
    if (index <= 10) return { level: 'Very High', color: 'bg-red-500', textColor: 'text-red-600' };
    return { level: 'Extreme', color: 'bg-purple-600', textColor: 'text-purple-700' };
};

const LiveDataCardSkeleton: React.FC = () => (
    <div className="p-4 border rounded-lg bg-gray-50 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    </div>
);


const EnvironmentalPage: React.FC<EnvironmentalPageProps> = ({
  onNavigateBack,
  tempLoggers,
  sites: activeSites,
  anchors: activeAnchors,
  onAddTempLogger,
  onRemoveTempLogger
}) => {
    const [tideData, setTideData] = React.useState<TideData | null>(null);
    const [uvData, setUvData] = React.useState<UvData | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Form state for new temp logger
    const [loggerSiteId, setLoggerSiteId] = React.useState('');
    const [loggerAnchorId, setLoggerAnchorId] = React.useState('');
    const [loggerDepth, setLoggerDepth] = React.useState('');

    React.useEffect(() => {
        setIsLoading(true);
        // Simulate fetching data
        const timer = setTimeout(() => {
            setTideData({
                currentHeight: 1.82,
                trend: 'falling',
                nextHigh: { time: '08:45 PM', height: 2.5 },
                nextLow: { time: '02:30 PM', height: 0.9 },
            });
            setUvData({
                currentIndex: 7,
                maxIndex: 12,
            });
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleAddLoggerSubmit = (e: FormEvent) => {
        e.preventDefault();
        const depthNum = parseFloat(loggerDepth);
        if (!loggerSiteId || !loggerAnchorId || isNaN(depthNum) || depthNum < 0) {
            alert('Please select a site, anchor, and enter a valid depth.');
            return;
        }
        onAddTempLogger(loggerSiteId, loggerAnchorId, depthNum);
        // Reset form
        setLoggerSiteId('');
        setLoggerAnchorId('');
        setLoggerDepth('');
    };

    const uvInfo = uvData ? getUvInfo(uvData.currentIndex) : null;
    const filteredAnchors = loggerSiteId ? activeAnchors.filter(a => a.siteId === loggerSiteId) : [];

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4">
                <h2 className="text-2xl font-bold text-coral-dark mb-2 sm:mb-0">Environmental Monitoring</h2>
                <button
                    onClick={onNavigateBack}
                    className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start sm:self-center"
                >
                    &larr; Back to Details
                </button>
            </div>
      
            <div>
                <h3 className="text-xl font-bold text-coral-dark mb-4">Live Conditions: Cairns</h3>
                <div className="grid grid-cols-2 gap-4">
                    {isLoading ? (
                        <>
                            <LiveDataCardSkeleton />
                            <LiveDataCardSkeleton />
                        </>
                    ) : (
                        <>
                            {/* Tide Status Card */}
                            <div className="p-3 border rounded-lg space-y-3 bg-gray-50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-coral-blue/10 p-2 rounded-full">
                                        <GlobeAltIcon className="w-5 h-5 text-coral-blue"/>
                                    </div>
                                    <h3 className="font-semibold text-gray-700 text-base">Tide Status</h3>
                                </div>
                                {tideData && (
                                    <>
                                        <div className="text-center">
                                            <p className="text-3xl sm:text-4xl font-bold text-coral-dark">{tideData.currentHeight.toFixed(2)}m</p>
                                            <div className={`flex items-center justify-center gap-1 font-semibold ${tideData.trend === 'rising' ? 'text-green-600' : 'text-blue-600'}`}>
                                                {tideData.trend === 'rising' ? <ArrowUpIcon className="w-4 h-4"/> : <ArrowDownIcon className="w-4 h-4"/>}
                                                <span className="text-sm">{tideData.trend === 'rising' ? 'Rising' : 'Falling'}</span>
                                            </div>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 space-y-1 pt-2">
                                            <div className="flex justify-between flex-wrap"><span>Next Low:</span> <span className="font-medium">{tideData.nextLow.time} ({tideData.nextLow.height}m)</span></div>
                                            <div className="flex justify-between flex-wrap"><span>Next High:</span> <span className="font-medium">{tideData.nextHigh.time} ({tideData.nextHigh.height}m)</span></div>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-end pt-2">
                                    <a href="http://www.bom.gov.au/australia/tides/#!/qld-cairns" target="_blank" rel="noopener noreferrer" className="text-xs text-coral-blue hover:underline">View full chart</a>
                                </div>
                            </div>

                            {/* UV Index Card */}
                            <div className="p-3 border rounded-lg space-y-3 bg-gray-50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-coral-blue/10 p-2 rounded-full">
                                        <SunIcon className="w-5 h-5 text-coral-blue"/>
                                    </div>
                                    <h3 className="font-semibold text-gray-700 text-base">UV Index</h3>
                                </div>
                                {uvData && uvInfo && (
                                    <>
                                        <div className="text-center">
                                            <p className={`text-3xl sm:text-4xl font-bold ${uvInfo.textColor}`}>{uvData.currentIndex}</p>
                                            <p className={`font-bold text-sm sm:text-base px-3 py-0.5 rounded-full inline-block ${uvInfo.color} text-white`}>{uvInfo.level}</p>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 space-y-1 pt-2">
                                            <div className="flex justify-between"><span>Today's Max:</span> <span className="font-medium">UV {uvData.maxIndex}</span></div>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-end pt-2">
                                    <a href="http://www.bom.gov.au/qld/forecasts/cairns.shtml" target="_blank" rel="noopener noreferrer" className="text-xs text-coral-blue hover:underline">View full forecast</a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="border-t pt-8">
                <h3 className="text-xl font-bold text-coral-dark mb-4">Logger Data</h3>
                <div className="space-y-6">
                    {/* Temperature Loggers Management */}
                    <div className="p-4 border rounded-lg space-y-4 bg-gray-50">
                        <h3 className="font-semibold text-gray-700 text-lg">Temperature Loggers</h3>
                        <form onSubmit={handleAddLoggerSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label htmlFor="loggerSite" className="block text-sm font-medium text-gray-700">Site</label>
                                <select id="loggerSite" value={loggerSiteId} onChange={e => { setLoggerSiteId(e.target.value); setLoggerAnchorId(''); }} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900">
                                    <option value="">-- Choose --</option>
                                    {activeSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="loggerAnchor" className="block text-sm font-medium text-gray-700">Anchor</label>
                                <select id="loggerAnchor" value={loggerAnchorId} onChange={e => setLoggerAnchorId(e.target.value)} required disabled={!loggerSiteId} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900">
                                    <option value="">-- Choose --</option>
                                    {filteredAnchors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="loggerDepth" className="block text-sm font-medium text-gray-700">Depth (m)</label>
                                <input type="number" step="0.1" id="loggerDepth" value={loggerDepth} onChange={e => setLoggerDepth(e.target.value)} required placeholder="e.g., 8.5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900" />
                            </div>
                            <button type="submit" className="bg-coral-blue hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg">Register Logger</button>
                        </form>
                        <div className="pt-4 border-t">
                            <h4 className="font-medium text-gray-600 mb-2">Registered Loggers</h4>
                             {tempLoggers.length > 0 ? (
                                <ul className="divide-y divide-gray-200 border rounded-md">
                                    {tempLoggers.map(logger => {
                                        const site = activeSites.find(s => s.id === logger.siteId);
                                        const anchor = activeAnchors.find(a => a.id === logger.anchorId);
                                        return (
                                            <li key={logger.id} className="p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                <div>
                                                    <p className="font-semibold">{site?.name} - {anchor?.name}</p>
                                                    <p className="text-sm text-gray-500">Depth: {logger.depth}m</p>
                                                </div>
                                                <div className="flex items-center gap-2 self-end sm:self-center">
                                                     <input type="file" className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-coral-blue/10 file:text-coral-blue hover:file:bg-coral-blue/20 cursor-pointer"/>
                                                     <button onClick={() => onRemoveTempLogger(logger.id)} className="p-1.5 rounded-full hover:bg-red-100">
                                                         <TrashIcon className="w-4 h-4 text-red-500" />
                                                     </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No temperature loggers registered.</p>
                            )}
                        </div>
                    </div>

                    <DataUploadCard
                        title="Light Meters (PAR)"
                        description="Upload data files from your Photosynthetically Active Radiation (PAR) sensors."
                    />
                    <DataUploadCard
                        title="Flow Meters"
                        description="Upload data from your water flow meters to track current speeds."
                    />
                    <div className="p-4 border rounded-lg space-y-3 bg-gray-50 flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-700 text-lg">NOAA Sea Surface Temperature</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Access real-time sea surface temperature data for your region directly from NOAA's satellite monitoring.
                            </p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <a
                                href="https://www.ospo.noaa.gov/Products/ocean/sst/contour/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-coral-green hover:bg-opacity-90 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                View NOAA Data
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnvironmentalPage;