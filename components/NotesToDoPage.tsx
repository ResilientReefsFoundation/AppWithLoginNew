import * as React from 'react';
import type { FormEvent } from 'react';
import type { ToDoItem, VoiceNote } from '../types';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, TrashIcon } from './Icons';

interface NotesToDoPageProps {
  toDoItems: ToDoItem[];
  voiceNotes: VoiceNote[];
  onAddToDo: (text: string) => void;
  onDeleteToDo: (id: string) => void;
  onAddVoiceNote: (audioUrl: string, duration: number) => void;
  onDeleteVoiceNote: (id: string) => void;
  onNavigateBack: () => void;
}

const formatDuration = (seconds: number) => {
    if (!isFinite(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

const SwipeToDeleteItem: React.FC<{
  children: React.ReactNode;
  onDelete: () => void;
}> = ({ children, onDelete }) => {
  const itemRef = React.useRef<HTMLLIElement>(null);
  const [dragX, setDragX] = React.useState(0);
  const isDragging = React.useRef(false);
  const startXRef = React.useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    // Do not initiate swipe if the user is interacting with a button or other interactive element.
    if (target.closest('button, [data-interactive="true"]')) {
      return;
    }

    isDragging.current = true;
    startXRef.current = e.clientX;
    itemRef.current?.style.setProperty('transition', 'none');
    itemRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    if (!isDragging.current || !itemRef.current) return;
    const currentX = e.clientX;
    const newDragX = Math.min(0, currentX - startXRef.current); // Only allow dragging left
    setDragX(newDragX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLLIElement>) => {
    if (!isDragging.current || !itemRef.current) return;
    isDragging.current = false;
    itemRef.current.style.removeProperty('transition');
    itemRef.current.releasePointerCapture(e.pointerId);
    
    const threshold = -itemRef.current.offsetWidth * 0.4; // Delete if dragged 40%
    if (dragX < threshold) { 
      itemRef.current.style.setProperty('transform', 'translateX(-100%)');
      itemRef.current.style.setProperty('opacity', '0');
      setTimeout(() => {
        onDelete();
        setDragX(0); 
      }, 300);
    } else {
      setDragX(0); // Snap back
    }
  };
  
  React.useEffect(() => {
    if (itemRef.current) {
        itemRef.current.style.transform = `translateX(${dragX}px)`;
    }
  }, [dragX]);
  
  return (
    <li
      ref={itemRef}
      className="relative bg-white touch-none"
      style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="absolute inset-y-0 right-0 flex items-center justify-center bg-red-500 text-white w-24 pointer-events-none">
          <TrashIcon className="w-6 h-6"/>
      </div>
      <div className="relative bg-white border-b">{children}</div>
    </li>
  );
};


const VoiceNoteItem: React.FC<{
    note: VoiceNote;
    onDelete: (id: string) => void;
}> = ({ note, onDelete }) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(note.duration);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(audioRef.current) {
            if(isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Playback error:", e));
            }
        }
    };
    
    React.useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl) return;
        
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(audioEl.currentTime);
        const handleMetadataLoaded = () => {
            if (audioEl.duration && isFinite(audioEl.duration)) {
                setDuration(audioEl.duration);
            }
        }
        
        audioEl.addEventListener('play', handlePlay);
        audioEl.addEventListener('pause', handlePause);
        audioEl.addEventListener('ended', handlePause);
        audioEl.addEventListener('timeupdate', handleTimeUpdate);
        audioEl.addEventListener('loadedmetadata', handleMetadataLoaded);

        return () => {
            audioEl.removeEventListener('play', handlePlay);
            audioEl.removeEventListener('pause', handlePause);
            audioEl.removeEventListener('ended', handlePause);
            audioEl.removeEventListener('timeupdate', handleTimeUpdate);
            audioEl.removeEventListener('loadedmetadata', handleMetadataLoaded);
        };
    }, []);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || !audioRef.current || !isFinite(duration) || duration === 0) return;
        
        const progressBar = progressRef.current;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const percentage = clickPosition / progressBar.offsetWidth;
        const newTime = duration * percentage;
        
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const progressPercentage = duration > 0 && isFinite(duration) ? (currentTime / duration) * 100 : 0;

    return (
        <SwipeToDeleteItem onDelete={() => onDelete(note.id)}>
             <div className="p-3 flex items-center gap-3">
                <audio ref={audioRef} src={note.audioUrl} preload="metadata"></audio>
                <button 
                  onClick={togglePlay} 
                  onPointerDown={(e) => e.stopPropagation()}
                  className="p-2 rounded-full bg-coral-blue text-white flex-shrink-0"
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
                </button>
                <div className="flex-grow flex items-center gap-2">
                    <div 
                        ref={progressRef}
                        onClick={handleProgressClick}
                        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                        data-interactive="true"
                    >
                        <div 
                            className="h-full bg-coral-green rounded-full"
                            style={{ width: `${progressPercentage}%`}}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono w-12 text-center">{formatDuration(currentTime)} / {formatDuration(duration)}</span>
                </div>
            </div>
        </SwipeToDeleteItem>
    );
};

const NotesToDoPage: React.FC<NotesToDoPageProps> = ({
  toDoItems,
  voiceNotes,
  onAddToDo,
  onDeleteToDo,
  onAddVoiceNote,
  onDeleteVoiceNote,
  onNavigateBack,
}) => {
  const [newToDoText, setNewToDoText] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const recordingStartTimeRef = React.useRef<number>(0);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const timerIntervalRef = React.useRef<number | null>(null);
  
  const [micError, setMicError] = React.useState<string | null>(null);
  const [isCheckingMic, setIsCheckingMic] = React.useState(true);

  React.useEffect(() => {
    const checkMic = async () => {
        setIsCheckingMic(true);
        setMicError(null);
        if (!navigator.mediaDevices?.getUserMedia) {
            setMicError("Your browser does not support microphone access.");
            setIsCheckingMic(false);
            return;
        }
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            if (!devices.some(d => d.kind === 'audioinput')) {
                setMicError("No microphone found. Please connect a microphone and refresh the page.");
            }
        } catch (err) {
            setMicError("Could not check for microphone. Please ensure microphone permissions are not blocked for this site.");
        } finally {
            setIsCheckingMic(false);
        }
    };
    checkMic();
  }, []);

  const handleToDoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newToDoText.trim()) {
      onAddToDo(newToDoText.trim());
      setNewToDoText('');
    }
  };
  
  const startRecording = async () => {
    setMicError(null);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const duration = (Date.now() - recordingStartTimeRef.current) / 1000;
            onAddVoiceNote(audioUrl, duration);
            audioChunksRef.current = [];
            stream.getTracks().forEach(track => track.stop());
        };

        audioChunksRef.current = [];
        mediaRecorder.start();
        setIsRecording(true);
        recordingStartTimeRef.current = Date.now();
        timerIntervalRef.current = window.setInterval(() => {
            setRecordingTime(Date.now() - recordingStartTimeRef.current);
        }, 100);

    } catch (err) {
        console.error("Error accessing microphone:", err);
        let message = "Could not access microphone. Please check permissions.";
        if (err instanceof DOMException) {
            if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                message = "No microphone found. Please connect a microphone.";
            } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                message = "Microphone access was denied. Please allow permission in your browser settings.";
            }
        }
        setMicError(message);
        setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if(timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setRecordingTime(0);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-coral-dark mb-2 sm:mb-0">Notes / ToDo</h2>
        <button
          onClick={onNavigateBack}
          className="bg-gray-200 hover:bg-gray-300 text-coral-dark font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start sm:self-center"
        >
          &larr; Back to Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ToDo List Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">ToDo List</h3>
          <form onSubmit={handleToDoSubmit} className="flex gap-2">
            <input
              type="text"
              value={newToDoText}
              onChange={(e) => setNewToDoText(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white text-gray-900"
            />
            <button type="submit" className="bg-coral-blue text-white font-bold py-2 px-4 rounded-lg">Add</button>
          </form>
          <div className="border rounded-lg max-h-96 overflow-y-auto bg-gray-50">
            {toDoItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {toDoItems.map(item => (
                   <SwipeToDeleteItem key={item.id} onDelete={() => onDeleteToDo(item.id)}>
                        <p className="p-3 text-sm text-gray-800">{item.text}</p>
                   </SwipeToDeleteItem>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 p-8">No tasks yet.</p>
            )}
          </div>
           <p className="text-xs text-center text-gray-500">Swipe left on an item to delete.</p>
        </div>

        {/* Voice Notes Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">Voice Notes</h3>
          <div className="flex justify-center flex-col items-center">
            {isRecording ? (
                 <button onClick={stopRecording} className="flex flex-col items-center gap-2 p-4 text-red-500 hover:text-red-700">
                    <StopIcon className="w-16 h-16"/>
                     <div className="flex items-center gap-2 mt-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold font-mono text-lg text-gray-800">{formatDuration(recordingTime / 1000)}</span>
                    </div>
                </button>
            ) : (
                 <button onClick={startRecording} disabled={!!micError || isCheckingMic} className="flex flex-col items-center gap-2 p-4 text-coral-blue hover:text-opacity-80 disabled:text-gray-400 disabled:cursor-not-allowed">
                    <MicrophoneIcon className="w-16 h-16"/>
                    <span className="font-semibold">Start Recording</span>
                </button>
            )}
            {isCheckingMic && <p className="text-sm text-gray-500 text-center">Checking for microphone...</p>}
            {micError && <p className="text-sm text-red-500 text-center p-2 bg-red-50 rounded-md">{micError}</p>}
          </div>
          <div className="border rounded-lg max-h-96 overflow-y-auto bg-gray-50">
            {voiceNotes.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {voiceNotes.map(note => (
                  <VoiceNoteItem key={note.id} note={note} onDelete={onDeleteVoiceNote} />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 p-8">No voice notes recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotesToDoPage;