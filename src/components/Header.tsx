import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  FolderGit2, 
  PlusCircle, 
  Copy, 
  ChevronDown, 
  FolderOpen, 
  Check, 
  HelpCircle,
  FileText,
  Clock
} from 'lucide-react';
import { ProjectState, ProjectStatus } from '../types';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  currentProject: ProjectState | null;
  onNewArticle: () => void;
  onLoadDemo: () => void;
  onOpenProjects: () => void;
  onOpenExport: () => void;
  isRewritten: boolean;
  status: ProjectStatus;
  onChangeStatus: (newStatus: ProjectStatus) => void;
}

const STATUS_LABELS: Record<ProjectStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  fact_check_required: { label: 'Fact Check Required', color: 'bg-amber-50 text-amber-900 border-amber-300' },
  brand_review_required: { label: 'Brand Review Required', color: 'bg-purple-50 text-purple-900 border-purple-300' },
  editorial_review: { label: 'Editorial Review', color: 'bg-blue-50 text-blue-900 border-blue-300' },
  approved: { label: 'Approved', color: 'bg-emerald-50 text-emerald-900 border-emerald-300' },
  ready_for_cms: { label: 'Ready for CMS', color: 'bg-teal-50 text-teal-900 border-teal-300' },
  archived: { label: 'Archived', color: 'bg-zinc-100 text-zinc-700 border-zinc-300' },
};

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  currentProject,
  onNewArticle,
  onLoadDemo,
  onOpenProjects,
  onOpenExport,
  isRewritten,
  status,
  onChangeStatus,
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Brand, Title & Subtitle */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-teal-900 flex items-center justify-center text-teal-300 shadow-xs shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight">
                Blog Content Rewriter
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                Editorial Workbench
              </span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1 max-w-xl">
              Rewrite and expand existing articles while preserving important links, images, facts and brand style.
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center flex-wrap gap-2">
          <button type="button" onClick={onOpenHowItWorks} className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> How It Works
          </button>
          
          {/* Projects Drawer Trigger */}
          <button
            id="btn-open-projects"
            type="button"
            onClick={onOpenProjects}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            <span className="max-w-[140px] truncate font-semibold">
              {currentProject ? currentProject.title : 'Saved Projects'}
            </span>
          </button>

          {/* New Article Button */}
          <button
            id="btn-new-article"
            type="button"
            onClick={onNewArticle}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-1"
            title="Start new article rewrite"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">New</span>
          </button>

          {/* Load Demo Kyoto Article */}
          <button
            type="button"
            onClick={onLoadDemo}
            className="px-2.5 py-1.5 text-xs font-medium text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
          >
            Load Demo
          </button>

          {/* Workflow Status Pill with Dropdown */}
          {currentProject && (
            <div className="relative">
              <button
                id="btn-status-dropdown"
                type="button"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1 transition-all ${
                  STATUS_LABELS[status]?.color || 'bg-slate-100 text-slate-800'
                }`}
              >
                <span>{STATUS_LABELS[status]?.label || status}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5 space-y-0.5">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Update Editorial Status
                  </div>
                  {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        onChangeStatus(st);
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1 text-xs rounded-md flex items-center justify-between transition-colors ${
                        status === st
                          ? 'bg-teal-50 text-teal-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{STATUS_LABELS[st].label}</span>
                      {status === st && <Check className="w-3 h-3 text-teal-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Export Article Button */}
          <button
            id="btn-open-export"
            type="button"
            onClick={onOpenExport}
            disabled={!isRewritten}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Final</span>
          </button>

        </div>

      </div>
    </header>
  );
};
