import { useEffect, useRef, useState, useCallback } from 'react';

export function useAudioEngine() {
  const [isMuted, setIsMuted] = useState(true);
  const [isIgnited, setIsIgnited] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const idleOsc1Ref = useRef<OscillatorNode | null>(null);
  const idleOsc2Ref = useRef<OscillatorNode | null>(null);
  const idleFilterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  // Initialize Web Audio context on user gesture
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    }

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;

    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.connect(ctx.destination);

    audioCtxRef.current = ctx;
    masterGainRef.current = masterGain;
    return ctx;
  }, []);

  // Play mechanical click / dock effect
  const playMechanicalClick = useCallback((pitch = 320) => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.Q.setValueAtTime(4, ctx.currentTime);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  }, [isMuted, initAudio]);

  // Start engine idle sound
  const startEngineSound = useCallback(() => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;
    if (idleOsc1Ref.current) return; // already playing

    // Dual low oscillators to simulate big-block V8 cylinders firing
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const idleGain = ctx.createGain();

    // LFO for characteristic muscle car cam lope rumble
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(28, ctx.currentTime); // ~840 RPM idle fundamental

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(42, ctx.currentTime);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(7, ctx.currentTime); // 7Hz lope pulsation
    lfoGain.gain.setValueAtTime(6, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    idleGain.gain.setValueAtTime(0.001, ctx.currentTime);
    idleGain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(idleGain);
    idleGain.connect(masterGainRef.current);

    osc1.start();
    osc2.start();
    lfo.start();

    idleOsc1Ref.current = osc1;
    idleOsc2Ref.current = osc2;
    idleFilterRef.current = filter;
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;
    setIsIgnited(true);
  }, [initAudio]);

  // Stop engine sound
  const stopEngineSound = useCallback(() => {
    if (idleOsc1Ref.current) {
      try {
        idleOsc1Ref.current.stop();
        idleOsc2Ref.current?.stop();
        lfoRef.current?.stop();
      } catch {
        // ignore
      }
      idleOsc1Ref.current = null;
      idleOsc2Ref.current = null;
      lfoRef.current = null;
    }
    setIsIgnited(false);
  }, []);

  // Rev throttle for driving sequence
  const setThrottle = useCallback((intensity: number) => {
    if (!audioCtxRef.current || !idleOsc1Ref.current || !idleFilterRef.current) return;
    const ctx = audioCtxRef.current;
    const clamped = Math.max(0, Math.min(1, intensity));
    
    // Scale frequency from 28Hz idle to 110Hz acceleration roar
    const targetFreq = 28 + clamped * 85;
    const targetFilter = 140 + clamped * 650;
    
    idleOsc1Ref.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);
    if (idleOsc2Ref.current) {
      idleOsc2Ref.current.frequency.setTargetAtTime(targetFreq * 1.5, ctx.currentTime, 0.1);
    }
    idleFilterRef.current.frequency.setTargetAtTime(targetFilter, ctx.currentTime, 0.1);
  }, []);

  // Simulate complete starter ignition sequence
  const triggerIgnition = useCallback(() => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    // Starter motor crank sound
    const crankOsc = ctx.createOscillator();
    const crankGain = ctx.createGain();
    crankOsc.type = 'sawtooth';
    crankOsc.frequency.setValueAtTime(140, ctx.currentTime);
    crankGain.gain.setValueAtTime(0.2, ctx.currentTime);
    crankGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    crankOsc.connect(crankGain);
    crankGain.connect(masterGainRef.current);
    crankOsc.start();
    crankOsc.stop(ctx.currentTime + 0.85);

    // Engine fires after 0.75s
    setTimeout(() => {
      startEngineSound();
      setThrottle(0.6); // initial flare
      setTimeout(() => setThrottle(0), 700); // settle to idle
    }, 750);
  }, [isMuted, initAudio, startEngineSound, setThrottle]);

  // Master mute toggle
  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (nextMuted) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      }
    } else {
      const ctx = initAudio();
      if (masterGainRef.current && ctx) {
        masterGainRef.current.gain.setTargetAtTime(0.3, ctx.currentTime, 0.05);
        if (!isIgnited) {
          startEngineSound();
        }
      }
    }
  }, [isMuted, isIgnited, initAudio, startEngineSound]);

  useEffect(() => {
    return () => {
      stopEngineSound();
    };
  }, [stopEngineSound]);

  return {
    isMuted,
    isIgnited,
    toggleMute,
    triggerIgnition,
    playMechanicalClick,
    setThrottle,
    startEngineSound,
    stopEngineSound
  };
}
