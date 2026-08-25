import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50/80 border-b border-amber-200/70 py-2 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-900 leading-normal">
        <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span>
          AI-generated rewrites require editorial and factual review. The application preserves supplied links, images and source material where possible but does not verify ownership, licensing or the accuracy of all existing claims.
        </span>
      </div>
    </div>
  );
};
