import React, { useRef } from 'react';
import { X, Upload, CheckCircle, Info, RefreshCw } from 'lucide-react';

interface ModelSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelSource: 'procedural' | 'glb';
  modelName: string;
  onLoadCustomGlb: (url: string, name: string) => void;
  onResetToProcedural: () => void;
}

export const ModelSourceModal: React.FC<ModelSourceModalProps> = ({
  isOpen,
  onClose,
  modelSource,
  modelName,
  onLoadCustomGlb,
  onResetToProcedural
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onLoadCustomGlb(objectUrl, file.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none animate-in fade-in duration-200">
      <div className="max-w-xl w-full bg-[#0d0e12] border border-white/10 p-6 md:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white border border-white/10"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase mb-1">
          3D ARCHITECTURE & ASSET PIPELINE
        </div>
        <h3 className="text-xl md:text-2xl font-editorial font-bold text-white tracking-wider mb-4">
          MODEL LOADER STATUS
        </h3>

        {/* Status Indicator */}
        <div className="bg-white/[0.02] border border-white/10 p-4 mb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500 uppercase">ACTIVE SOURCE:</span>
            <span className={modelSource === 'glb' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {modelSource === 'glb' ? 'GLTF/GLB ASSET' : 'MODULAR PROCEDURAL PLACEHOLDER'}
            </span>
          </div>
          <div className="text-sm font-mono text-white mt-1">
            {modelName}
          </div>
        </div>

        {/* Architectural Placeholder Notice */}
        <div className="text-xs text-zinc-300 font-light space-y-3 leading-relaxed mb-6">
          <div className="flex items-start space-x-2">
            <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p>
              In accordance with engineering guidelines, this site features a fully modular, high-fidelity procedural 1969 Mustang Mach 1 with 6 separable assemblies (Body, Chassis, Magnum 500 Wheels, 428 Cobra Jet V8, Deluxe Cockpit, and Dual Exhausts).
            </p>
          </div>
          <p className="text-zinc-400 pl-6">
            All camera choreography, exploded-view kinematics, lighting transitions, and hotspot beacons are fully decoupled and immediately compatible with any standard GLB model.
          </p>
        </div>

        {/* Upload Custom GLB Zone */}
        <div className="border border-dashed border-white/20 p-6 text-center bg-white/[0.01] hover:border-red-500/60 transition-colors mb-6">
          <Upload size={24} className="mx-auto text-zinc-400 mb-2" />
          <div className="text-xs font-mono text-zinc-200 uppercase tracking-wider mb-1">
            DROP OR SELECT A CUSTOM .GLB / .GLTF FILE
          </div>
          <div className="text-[11px] text-zinc-500 font-light mb-4">
            Upload any 1969 Mustang Mach 1 GLB to test directly in the browser
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono tracking-widest uppercase transition-all"
          >
            BROWSE FILES
          </button>
        </div>

        {/* Permanent Asset Placement Instructions */}
        <div className="p-3 bg-black/40 border border-white/5 text-[11px] font-mono text-zinc-400 mb-6">
          <div className="text-zinc-300 mb-1">PERMANENT ASSET INJECTION:</div>
          <div>Place your GLB at: <code className="text-red-400">/public/models/mustang_mach1.glb</code></div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {modelSource === 'glb' ? (
            <button
              onClick={() => {
                onResetToProcedural();
                onClose();
              }}
              className="flex items-center space-x-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
            >
              <RefreshCw size={13} />
              <span>SWITCH TO PROCEDURAL</span>
            </button>
          ) : (
            <span className="text-[10px] font-mono text-zinc-500">READY FOR DROP-IN</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono tracking-widest uppercase transition-all"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
