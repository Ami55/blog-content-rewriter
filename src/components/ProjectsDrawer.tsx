import React, { useState } from 'react';
import { X, FolderGit2, Trash2, Copy } from 'lucide-react';
import { ProjectState, ProjectStatus } from '../types';

interface ProjectsDrawerProps {
  projects: ProjectState[];
  currentProjectId: string | null;
  onSelectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (id: string) => void;
  onClose: () => void;
  editorialNotes: string;
  onChangeEditorialNotes: (notes: string) => void;
}

const STATUS_BADGES: Record<ProjectStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700' },
  fact_check_required: { label: 'Fact Check Required', color: 'bg-amber-100 text-amber-900' },
  brand_review_required: { label: 'Brand Review Required', color: 'bg-purple-100 text-purple-900' },
  editorial_review: { label: 'Editorial Review', color: 'bg-blue-100 text-blue-900' },
  approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-900' },
  ready_for_cms: { label: 'Ready for CMS', color: 'bg-teal-100 text-teal-900' },
  archived: { label: 'Archived', color: 'bg-zinc-200 text-zinc-700' },
};

export const ProjectsDrawer: React.FC<ProjectsDrawerProps> = ({
  projects,
  currentProjectId,
  onSelectProject,
  onDeleteProject,
  onDuplicateProject,
  onClose,
  editorialNotes,
  onChangeEditorialNotes,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'notes'>('saved');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">Project Manager</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-teal-600 text-slate-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Saved Rewrites ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-teal-600 text-slate-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Editorial Notes
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">
                  No saved rewrites yet. Click "Generate" on any article to save it automatically.
                </div>
              ) : (
                projects.map((proj) => {
                  const isCurrent = proj.id === currentProjectId;
                  return (
                    <div
                      key={proj.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'border-teal-500 bg-teal-50/20 ring-1 ring-teal-500/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            onSelectProject(proj.id);
                            onClose();
                          }}
                        >
                          <h4 className="text-xs font-bold text-slate-900 hover:text-teal-700 line-clamp-1">
                            {proj.title || 'Untitled Article'}
                          </h4>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_BADGES[proj.status]?.color || 'bg-slate-100'}`}>
                              {STATUS_BADGES[proj.status]?.label || proj.status}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              v{proj.version || 1}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(proj.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onDuplicateProject(proj.id)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded"
                            title="Duplicate version"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteProject(proj.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                            title="Delete rewrite"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <label htmlFor="editorial-notes-input" className="text-xs font-semibold text-slate-700 block">
                Article Editorial Notes & Guidelines Checklist
              </label>
              <p className="text-[11px] text-slate-500">
                Notes are persisted with this project version for editorial collaboration.
              </p>
              <textarea
                id="editorial-notes-input"
                rows={12}
                value={editorialNotes}
                onChange={(e) => onChangeEditorialNotes(e.target.value)}
                placeholder="Add editorial notes, reviewer comments, factual confirmation reminders, CMS publishing checklist..."
                className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
