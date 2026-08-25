import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p className="font-medium text-slate-700">
          &copy; 2026 Blog Content Rewriter. Developed by <strong>SEO Girl - Ami</strong>. All rights reserved.
        </p>
        <p className="text-slate-400">
          Focused Editorial & Content Preservation Workspace
        </p>
      </div>
    </footer>
  );
};
