import React from 'react';

export const ServicesMapView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sticky top-24 h-[600px] border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary">Map View</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="h-[520px] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6">
        <div className="text-5xl mb-4">🗺️</div>
        <p className="text-gray-600 font-medium">Interactive Map coming soon</p>
        <p className="text-xs text-gray-400 mt-2">Displaying professional locations near Nairobi</p>
      </div>
    </div>
  );
};