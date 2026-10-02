import React, { useState, useEffect } from 'react';
import { useArchiveRouter, RouteType } from '../../hooks/useArchiveRouter';
import { Search, Volume2, VolumeX, Menu, X, Compass, ArrowRight } from 'lucide-react';

interface ArchiveHeaderProps {
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function ArchiveHeader({ isMuted = true, onToggleMute }: ArchiveHeaderProps) {
  const { route, navigate, openSearch } = useArchiveRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; routeType: RouteType; path: string }[] = [
    { label: 'HOME', routeType: 'home', path: '/' },
    { label: 'HISTORY', routeType: 'history', path: '/history' },
    { label: 'TIMELINE', routeType: 'timeline', path: '/timeline' },
    { label: 'RACING', routeType: 'racing', path: '/racing' },
    { label: 'GALLERY', routeType: 'gallery', path: '/gallery' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {/* Running Pony Emblem */}
          <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-neutral-900 to-black border border-white/15 flex items-center justify-center text-xl shadow-inner group-hover:border-[#c02424] transition-colors">
            🐎
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-editorial text-lg tracking-[0.22em] text-white font-bold group-hover:text-amber-400 transition-colors uppercase">
                Mustang
              </span>
              <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10 uppercase">
                Archive
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-wider text-neutral-400 hidden sm:block">
              AN ENTHUSIAST DIGITAL RECORD • 1964–PRESENT
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-neutral-950/60 border border-white/10 rounded-full px-3 py-1.5 shadow-lg">
          {navItems.map((item) => {
            const isActive =
              route.type === item.routeType ||
              (item.routeType === 'racing' && route.type === 'racing-event');

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`px-3.5 py-1 text-xs font-mono tracking-[0.18em] rounded-full transition-all duration-300 relative ${
                  isActive
                    ? 'text-white bg-white/15 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#c02424] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Controls & Explore Entry Point */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Search Button */}
          <button
            onClick={openSearch}
            className="flex items-center space-x-2 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800/80 border border-white/10 hover:border-white/20 rounded-full px-3 py-1.5 transition-all shadow-sm group"
            title="Explore Archive (Ctrl+K)"
          >
            <Search size={13} className="text-neutral-400 group-hover:text-amber-400 transition-colors" />
            <span className="hidden lg:inline text-[11px] tracking-wider text-neutral-400">
              EXPLORE ARCHIVE
            </span>
            <span className="hidden sm:inline text-[9px] font-mono text-neutral-500 bg-white/5 px-1 rounded border border-white/10">
              ⌘K
            </span>
          </button>

          {/* Audio Atmosphere Toggle */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-full border transition-all text-xs ${
                isMuted
                  ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                  : 'border-amber-500/40 text-amber-400 bg-amber-500/10'
              }`}
              title={isMuted ? 'Unmute Mechanical Ambience' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-b border-white/10 px-6 py-6 transition-all">
          <div className="flex flex-col space-y-3">
            <div className="pb-3 border-b border-white/10 text-xs font-mono tracking-widest text-neutral-400 flex items-center justify-between">
              <span>ARCHIVE NAVIGATION</span>
              <button 
                onClick={() => { setMobileMenuOpen(false); openSearch(); }}
                className="text-amber-400 flex items-center space-x-1"
              >
                <Compass size={12} />
                <span>Search Catalog</span>
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="flex items-center justify-between py-2 text-sm font-mono tracking-widest text-neutral-300 hover:text-white border-b border-white/5 text-left"
              >
                <span>{item.label}</span>
                <ArrowRight size={14} className="text-neutral-500" />
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('/cars/1969-mach-1')}
                className="w-full py-2.5 px-4 rounded bg-[#c02424] text-white text-xs font-mono tracking-widest text-center uppercase font-semibold"
              >
                Featured: 1969 Mach 1 Exhibit →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
