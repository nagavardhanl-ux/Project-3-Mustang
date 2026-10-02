import React, { useState } from 'react';
import { ArchiveRouterProvider, useArchiveRouter } from './hooks/useArchiveRouter';
import { ArchiveHeader } from './components/layout/ArchiveHeader';
import { ArchiveFooter } from './components/layout/ArchiveFooter';
import { QuickSearchModal } from './components/layout/QuickSearchModal';
import { HomePage } from './components/pages/HomePage';
import { HistoryPage } from './components/pages/HistoryPage';
import { TimelinePage } from './components/pages/TimelinePage';
import { CarDetailPage } from './components/pages/CarDetailPage';
import { RacingPage } from './components/pages/RacingPage';
import { RacingDetailPage } from './components/pages/RacingDetailPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { useAudioEngine } from './hooks/useAudioEngine';

function AppContent() {
  const { route } = useArchiveRouter();
  const { isMuted, toggleMute } = useAudioEngine();

  const renderPage = () => {
    switch (route.type) {
      case 'home':
        return <HomePage />;
      case 'history':
        return <HistoryPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'car':
        return <CarDetailPage carId={route.params.carId} />;
      case 'racing':
        return <RacingPage />;
      case 'racing-event':
        return <RacingDetailPage eventId={route.params.eventId} />;
      case 'gallery':
        return <GalleryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-[#c02424] selection:text-white">
      {/* Film grain subtle overlay */}
      <div className="film-grain pointer-events-none" />

      {/* Global Header */}
      <ArchiveHeader isMuted={isMuted} onToggleMute={toggleMute} />

      {/* Dynamic Route View */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <ArchiveFooter />

      {/* Global Quick Search Modal (⌘K) */}
      <QuickSearchModal />
    </div>
  );
}

export function App() {
  return (
    <ArchiveRouterProvider>
      <AppContent />
    </ArchiveRouterProvider>
  );
}

export default App;
