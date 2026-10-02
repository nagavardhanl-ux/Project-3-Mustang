import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type RouteType = 
  | 'home' 
  | 'history' 
  | 'timeline' 
  | 'car' 
  | 'racing' 
  | 'racing-event' 
  | 'gallery';

export interface RouteState {
  type: RouteType;
  params: Record<string, string>;
  rawPath: string;
}

interface RouterContextType {
  route: RouteState;
  navigate: (path: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function parsePath(pathStr: string): RouteState {
  let clean = pathStr.trim();
  
  // Strip query string if any
  if (clean.includes('?')) {
    clean = clean.split('?')[0];
  }

  // Strip leading hash
  while (clean.startsWith('#')) {
    clean = clean.slice(1);
  }

  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  
  // Remove trailing slashes (except root)
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }

  const segments = clean.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { type: 'home', params: {}, rawPath: '/' };
  }

  const first = segments[0].toLowerCase();

  if (first === 'history') {
    return { type: 'history', params: {}, rawPath: clean };
  }

  if (first === 'timeline') {
    return { type: 'timeline', params: {}, rawPath: clean };
  }

  if (first === 'cars' || first === 'car') {
    const carId = segments[1] || '1969-mach-1';
    return { type: 'car', params: { carId }, rawPath: clean };
  }

  if (first === 'racing') {
    if (segments.length > 1) {
      return { type: 'racing-event', params: { eventId: segments[1] }, rawPath: clean };
    }
    return { type: 'racing', params: {}, rawPath: clean };
  }

  if (first === 'gallery') {
    return { type: 'gallery', params: {}, rawPath: clean };
  }

  return { type: 'home', params: {}, rawPath: clean };
}

function getInitialPath(): string {
  // Check hash first (e.g. #/history or #/timeline)
  if (typeof window !== 'undefined') {
    if (window.location.hash) {
      let hash = window.location.hash;
      if (hash.startsWith('#')) hash = hash.slice(1);
      if (hash.startsWith('/')) return hash;
    }
    // Check pathname if not root
    if (window.location.pathname && window.location.pathname !== '/') {
      return window.location.pathname;
    }
  }
  return '/';
}

export function ArchiveRouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<RouteState>(() => {
    return parsePath(getInitialPath());
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useCallback((targetPath: string) => {
    let cleanTarget = targetPath.trim();
    while (cleanTarget.startsWith('#')) {
      cleanTarget = cleanTarget.slice(1);
    }
    if (!cleanTarget.startsWith('/')) {
      cleanTarget = '/' + cleanTarget;
    }
    
    // Set hash cleanly (e.g. #/history, #/timeline)
    window.location.hash = '#' + cleanTarget;
    setRoute(parsePath(cleanTarget));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash;
      // If it's an in-page anchor like #01-the-idea, ignore router change
      if (rawHash && !rawHash.startsWith('#/')) {
        return;
      }
      const clean = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;
      setRoute(parsePath(clean || '/'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update document title dynamically based on route
  useEffect(() => {
    switch (route.type) {
      case 'home':
        document.title = 'THE MUSTANG ARCHIVE | 60+ Years of Automotive Heritage';
        break;
      case 'history':
        document.title = 'THE STORY OF MUSTANG | 16 Chronological Chapters';
        break;
      case 'timeline':
        document.title = 'ROAD TIMELINE | 60 Years of Milestones (1964–2026)';
        break;
      case 'car':
        document.title = `${route.params.carId || 'Mach 1'} Exhibit | The Mustang Archive`;
        break;
      case 'racing':
        document.title = 'BUILT TO RACE | Mustang Motorsport Chronicle';
        break;
      case 'racing-event':
        document.title = `${route.params.eventId || 'Racing Event'} | Motorsport Archive`;
        break;
      case 'gallery':
        document.title = 'VISUAL ARCHIVE | Curated Mustang Photography';
        break;
    }
  }, [route]);

  // Keyboard shortcut: Ctrl+K or Cmd+K opens quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);

  return (
    <RouterContext.Provider
      value={{
        route,
        navigate,
        isSearchOpen,
        openSearch,
        closeSearch,
        toggleSearch,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useArchiveRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useArchiveRouter must be used within an ArchiveRouterProvider');
  }
  return ctx;
}
