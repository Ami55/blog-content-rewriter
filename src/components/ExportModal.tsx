import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Download, 
  Check, 
  FileCode, 
  FileText, 
  Code2,
  Printer 
} from 'lucide-react';
import { ProjectState } from '../types';
import { generateCleanHtml } from '../utils/diffHelper';

interface ExportModalProps {
  project: ProjectState;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'html' | 'json'>('markdown');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const cleanMarkdown = project.rewrittenArticle;
  const cleanHtml = generateCleanHtml(project.rewrittenArticle);
  const jsonContent = JSON.stringify(
    {
      title: project.title,
      version: project.version,
      destination: project.destination,
      status: project.status,
      rewrittenArticle: project.rewrittenArticle,
      sections: project.sections,
      links: project.links,
      images: project.images,
      factChecks: project.factChecks,
      brandChecks: project.brandChecks,
      entities: project.entities,
      changes: project.changes,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    },
    null,
    2
  );

  const handleCopy = (content: string, format: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sanitizeFilename = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'article';
  };

  const filenameBase = sanitizeFilename(project.title);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-900 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Export & Publish Ready Content</h2>
              <p className="text-xs text-slate-500">Copy or download final article in clean formats for your CMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[
              { id: 'markdown' as const, label: 'Clean Markdown (.md)', icon: FileText },
              { id: 'html' as const, label: 'Standard HTML (.html)', icon: FileCode },
              { id: 'json' as const, label: 'Audit Package (.json)', icon: Code2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-teal-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const currentContent = activeTab === 'markdown' ? cleanMarkdown : activeTab === 'html' ? cleanHtml : jsonContent;
                handleCopy(currentContent, activeTab);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copiedFormat === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (activeTab === 'markdown') {
                  handleDownload(cleanMarkdown, `${filenameBase}.md`, 'text/markdown');
                } else if (activeTab === 'html') {
                  handleDownload(cleanHtml, `${filenameBase}.html`, 'text/html');
                } else {
                  handleDownload(jsonContent, `${filenameBase}-audit.json`, 'application/json');
                }
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Viewer Area */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-900 max-h-[500px]">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
            {activeTab === 'markdown' && cleanMarkdown}
            {activeTab === 'html' && cleanHtml}
            {activeTab === 'json' && jsonContent}
          </pre>
        </div>

        {/* Footer info note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex items-center justify-between">
          <span>Preserves all extracted image tokens, anchors, and verified Canadian spelling rules.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
