import { useState, useEffect, useCallback } from 'react';
import { SECTIONS } from '../data/sectionsData';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0.0 to 1.0 total
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0); // 0.0 to 1.0 within active section

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      setScrollProgress(progress);

      const totalSections = SECTIONS.length;
      const rawIndex = progress * (totalSections - 1);
      const activeIndex = Math.min(totalSections - 1, Math.floor(rawIndex));
      const sectionLocalProgress = rawIndex - activeIndex;

      setCurrentSectionIndex(activeIndex);
      setSectionProgress(sectionLocalProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const totalSections = SECTIONS.length;
    const clampedIndex = Math.max(0, Math.min(totalSections - 1, index));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (clampedIndex / (totalSections - 1)) * maxScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }, []);

  const nextSection = useCallback(() => {
    scrollToSection(currentSectionIndex + 1);
  }, [currentSectionIndex, scrollToSection]);

  const prevSection = useCallback(() => {
    scrollToSection(currentSectionIndex - 1);
  }, [currentSectionIndex, scrollToSection]);

  return {
    scrollProgress,
    currentSectionIndex,
    currentSection: SECTIONS[currentSectionIndex] || SECTIONS[0],
    sectionProgress,
    scrollToSection,
    nextSection,
    prevSection
  };
}
