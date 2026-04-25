import React from 'react';
import { Settings, Mail, ShieldAlert } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center">
        {/* Subtle Brand Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-xl shadow-sm">
              <span className="font-black text-white text-xl">A</span>
            </div>
            <span className="font-bold tracking-tight text-2xl text-slate-900">APORA<span className="text-slate-500 font-light">JEO</span></span>
          </div>
        </div>

        {/* Status Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full border border-slate-100">
          <Settings className="text-slate-400" size={32} />
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          System Maintenance
        </h1>
        
        <p className="text-slate-500 text-lg leading-relaxed mb-10">
          Our platform is currently undergoing scheduled maintenance to improve our services. We'll be back online shortly.
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10 text-left">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={16} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</span>
            </div>
            <div className="text-sm font-semibold text-slate-700">Offline for Updates</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <Mail size={16} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact</span>
            </div>
            <div className="text-sm font-semibold text-slate-700">support@aporajeo.org</div>
          </div>
        </div>

        {/* Simple Progress Marker (Non-animated) */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-slate-900 rounded-full" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Update in progress (65%)</p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-10 left-0 right-0 text-center">
        <p className="text-[11px] font-medium text-slate-400 tracking-widest uppercase">
          © 2026 Aporajeo Platform Services
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
