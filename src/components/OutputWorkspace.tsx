import React, { useState } from 'react';
import { 
  FileText, 
  SplitSquareVertical, 
  ListOrdered, 
  Link2, 
  Image as ImageIcon, 
  AlertTriangle, 
  ShieldCheck, 
  History, 
  Check, 
  RotateCw, 
  Edit3, 
  Sparkles,
  ExternalLink,
  Info,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { ProjectState, ArticleSection } from '../types';
import { renderSideBySideDiff, renderInlineDiff } from '../utils/diffHelper';
import { proxyRequest } from '../lib/api';

interface OutputWorkspaceProps {
  project: ProjectState;
  onUpdateProject: (fields: Partial<ProjectState>) => void;
  onRunBrandCheck: () => void;
  isBrandChecking: boolean;
}

export const OutputWorkspace: React.FC<OutputWorkspaceProps> = ({
  project,
  onUpdateProject,
  onRunBrandCheck,
  isBrandChecking,
}) => {
  const [activeTab, setActiveTab] = useState<
    'revised' | 'comparison' | 'sections' | 'media' | 'facts' | 'brand' | 'changelog'
  >('revised');

  const [diffMode, setDiffMode] = useState<'sideBySide' | 'inline'>('sideBySide');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [refiningPrompt, setRefiningPrompt] = useState<string>('');
  const [isRefiningSection, setIsRefiningSection] = useState<boolean>(false);
  const [copiedArticle, setCopiedArticle] = useState<boolean>(false);

  const handleCopyArticle = () => {
    navigator.clipboard.writeText(project.rewrittenArticle);
    setCopiedArticle(true);
    setTimeout(() => setCopiedArticle(false), 2000);
  };

  // Section refinement handler
  const handleRefineSection = async (section: ArticleSection) => {
    if (!refiningPrompt.trim()) return;
    setIsRefiningSection(true);

    try {
      const data = await proxyRequest('refine-section', {
          sectionId: section.id,
          sectionTitle: section.heading,
          content: section.content,
          action: 'prompt',
          customPrompt: refiningPrompt,
          brandGuidelines: project.brandGuidelines,
        
      });
      if (data.refinedContent) {
        const updatedSections = project.sections.map((s) =>
          s.id === section.id
            ? { ...s, content: data.refinedContent, changeType: 'rewritten' as const }
            : s
        );
        const newRewrittenArticle = updatedSections
          .map((s) => `${'#'.repeat(s.level)} ${s.heading}\n\n${s.content}`)
          .join('\n\n');

        onUpdateProject({
          sections: updatedSections,
          rewrittenArticle: newRewrittenArticle,
        });
        setEditingSectionId(null);
        setRefiningPrompt('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefiningSection(false);
    }
  };

  const handleSaveManualEdit = (sectionId: string) => {
    const updatedSections = project.sections.map((s) =>
      s.id === sectionId ? { ...s, content: editingText } : s
    );
    const newRewrittenArticle = updatedSections
      .map((s) => `${'#'.repeat(s.level)} ${s.heading}\n\n${s.content}`)
      .join('\n\n');

    onUpdateProject({
      sections: updatedSections,
      rewrittenArticle: newRewrittenArticle,
    });
    setEditingSectionId(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-[700px]">
      {/* Tab Navigation Header */}
      <div className="border-b border-slate-200 bg-slate-50/80 px-2 pt-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center overflow-x-auto no-scrollbar space-x-1">
          {/* Tab 1: Revised Article */}
          <button
            id="tab-view-revised"
            type="button"
            onClick={() => setActiveTab('revised')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'revised'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Revised Article</span>
          </button>

          {/* Tab 2: Comparison & Diff */}
          <button
            id="tab-view-comparison"
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Comparison & Diff</span>
          </button>

          {/* Tab 3: Section Review */}
          <button
            id="tab-view-sections"
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sections'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Section Review ({project.sections.length})</span>
          </button>

          {/* Tab 4: Preserved Links & Images */}
          <button
            id="tab-view-media"
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'media'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Links & Images ({project.links.length + project.images.length})</span>
          </button>

          {/* Tab 5: Fact Checks & Flags */}
          <button
            id="tab-view-facts"
            type="button"
            onClick={() => setActiveTab('facts')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'facts'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Fact Checks ({project.factChecks.length})</span>
          </button>

          {/* Tab 6: Brand Audit */}
          <button
            id="tab-view-brand"
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'brand'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Brand Check ({project.brandChecks.length})</span>
          </button>

          {/* Tab 7: Change Log */}
          <button
            id="tab-view-changelog"
            type="button"
            onClick={() => setActiveTab('changelog')}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'changelog'
                ? 'border-teal-600 text-teal-950 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>Change Log</span>
          </button>
        </div>

        {/* Quick Article Actions */}
        <div className="pb-1.5 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyArticle}
            className="px-2.5 py-1 text-xs font-semibold rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1 shadow-2xs"
          >
            {copiedArticle ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedArticle ? 'Copied' : 'Copy Article'}</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-5 flex-1 overflow-y-auto">
        {/* TAB 1: REVISED ARTICLE */}
        {activeTab === 'revised' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg flex items-center justify-between text-xs text-teal-900">
              <span>
                <strong>Article Status:</strong> Ready for review • Canadian spelling active • Fact check safety flags inserted where applicable.
              </span>
              <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-teal-200">
                {project.rewrittenArticle.split(/\s+/).length} words
              </span>
            </div>

            <article className="prose prose-slate max-w-none font-sans leading-relaxed text-slate-800 space-y-4">
              {project.rewrittenArticle.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={pIdx} className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mt-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1 mt-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-base font-bold text-slate-800 mt-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('* [FACT CHECK REQUIRED:') || paragraph.includes('[FACT CHECK REQUIRED:')) {
                  return (
                    <div key={pIdx} className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-xs text-amber-950 my-3">
                      <strong className="font-bold flex items-center gap-1 mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Editorial Fact Check Requirement</span>
                      </strong>
                      <p>{paragraph.replace('* ', '')}</p>
                    </div>
                  );
                }
                if (paragraph.startsWith('[IMAGE:')) {
                  return (
                    <div key={pIdx} className="p-3.5 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-xs font-mono text-slate-600 my-4 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-400" />
                      <span>{paragraph}</span>
                    </div>
                  );
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                  return (
                    <ul key={pIdx} className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                      {paragraph.split('\n').map((li, lIdx) => (
                        <li key={lIdx}>{li.replace(/^[-*]\s+/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={pIdx} className="text-sm text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </article>
          </div>
        )}

        {/* TAB 2: COMPARISON & DIFF */}
        {activeTab === 'comparison' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Original vs. Revised Article</h3>
                <p className="text-xs text-slate-500">Visual comparison highlighting rewrites, additions, and structure.</p>
              </div>
              <div className="inline-flex rounded-lg p-1 bg-slate-200/70 border border-slate-300/60">
                <button
                  type="button"
                  onClick={() => setDiffMode('sideBySide')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    diffMode === 'sideBySide' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  type="button"
                  onClick={() => setDiffMode('inline')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    diffMode === 'inline' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Inline Diff
                </button>
              </div>
            </div>

            {diffMode === 'sideBySide' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Original Article ({project.originalArticle.split(/\s+/).length} words)
                    </span>
                  </div>
                  <pre className="text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed">
                    {project.originalArticle}
                  </pre>
                </div>
                <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20">
                  <div className="flex items-center justify-between pb-2 border-b border-teal-200 mb-3">
                    <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                      Revised Version ({project.rewrittenArticle.split(/\s+/).length} words)
                    </span>
                  </div>
                  <pre className="text-xs text-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
                    {project.rewrittenArticle}
                  </pre>
                </div>
              </div>
            ) : (
              <div
                className="p-4 rounded-xl border border-slate-200 bg-white text-xs font-mono leading-relaxed overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: renderInlineDiff(project.originalArticle, project.rewrittenArticle),
                }}
              />
            )}
          </div>
        )}

        {/* TAB 3: SECTION-BY-SECTION REVIEW */}
        {activeTab === 'sections' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Section-Level Editorial Review</h3>
                <p className="text-xs text-slate-500">Edit, regenerate, or refine individual sections without modifying the rest of the text.</p>
              </div>
            </div>

            <div className="space-y-3">
              {project.sections.map((section, idx) => {
                const isEditing = editingSectionId === section.id;
                return (
                  <div
                    key={section.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{section.heading}</h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            section.changeType === 'expanded'
                              ? 'bg-blue-100 text-blue-800'
                              : section.changeType === 'rewritten'
                              ? 'bg-purple-100 text-purple-800'
                              : section.changeType === 'new'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {section.changeType}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isEditing ? (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSectionId(section.id);
                              setEditingText(section.content);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold rounded border border-slate-200 hover:bg-slate-50 text-slate-700 inline-flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Refine / Edit</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditingSectionId(null)}
                            className="text-xs text-slate-500 hover:text-slate-700"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {!isEditing ? (
                      <p className="text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </p>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <textarea
                          rows={6}
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full p-3 border border-slate-200 rounded-lg text-xs font-sans text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex-1 min-w-[240px] flex items-center gap-2">
                            <input
                              type="text"
                              value={refiningPrompt}
                              onChange={(e) => setRefiningPrompt(e.target.value)}
                              placeholder="e.g., Make more concise, add morning walking route..."
                              className="flex-1 p-2 border border-slate-200 rounded-lg text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => handleRefineSection(section)}
                              disabled={isRefiningSection || !refiningPrompt.trim()}
                              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                              <span>AI Refine</span>
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSaveManualEdit(section.id)}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
                          >
                            Save Edits
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: PRESERVED LINKS & IMAGES */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            {/* Links Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-teal-700" />
                  <span>Preserved Links ({project.links.length})</span>
                </h3>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Original Anchor Text</th>
                      <th className="py-2.5 px-3">Destination URL</th>
                      <th className="py-2.5 px-3">Revised Anchor & Placement</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {project.links.map((link) => (
                      <tr key={link.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{link.originalAnchor}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-teal-800 max-w-xs truncate">
                          <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            <span>{link.originalUrl}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">
                          <span className="font-medium text-slate-900">{link.newAnchor || link.originalAnchor}</span>
                          <span className="block text-[10px] text-slate-400">{link.newPlacement}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {link.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Images Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-teal-700" />
                  <span>Preserved Image Placeholders ({project.images.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.images.map((img) => (
                  <div key={img.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-800 truncate">{img.altText || 'Image Placeholder'}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800">
                        {img.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong className="text-slate-700">Placement:</strong> {img.recommendedPlacement}</p>
                      {img.caption && <p><strong className="text-slate-700">Caption:</strong> {img.caption}</p>}
                      {img.credit && <p><strong className="text-slate-700">Credit:</strong> {img.credit}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FACT CHECKS & ASSUMPTIONS */}
        {activeTab === 'facts' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Editorial Integrity & Hallucination Guard:</span>
                <p className="mt-0.5 text-amber-800">
                  Prices, opening hours, booking policies, and ticket requirements must be verified for current seasonal accuracy before publishing.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {project.factChecks.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.claim}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        item.severity === 'high'
                          ? 'bg-red-100 text-red-800'
                          : item.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.severity} severity
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong className="text-slate-800">Context / Location:</strong> {item.section}</p>
                    <p><strong className="text-slate-800">Recommended Action:</strong> {item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BRAND CHECK & TONE AUDIT */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Brand Guideline Compliance Audit</h3>
                <p className="text-xs text-slate-500">
                  Verifying Canadian spelling, prohibition of travel clichés, and accurate guide nomenclature.
                </p>
              </div>
              <button
                type="button"
                onClick={onRunBrandCheck}
                disabled={isBrandChecking}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white inline-flex items-center gap-1.5 shadow-2xs"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isBrandChecking ? 'animate-spin' : ''}`} />
                <span>{isBrandChecking ? 'Auditing...' : 'Run Audit Again'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {project.brandChecks.length === 0 ? (
                <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center text-xs text-emerald-900">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <span className="font-bold text-sm block">100% Brand Compliant</span>
                  <p className="text-emerald-800 mt-1">No prohibited clichés or spelling violations found.</p>
                </div>
              ) : (
                project.brandChecks.map((check) => (
                  <div key={check.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{check.rule}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          check.severity === 'fail' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {check.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-0.5">
                      <p><strong className="text-slate-800">Issue:</strong> {check.issue}</p>
                      <p><strong className="text-slate-800">Correction:</strong> {check.fixApplied}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 7: CHANGE LOG & EDITORIAL SUMMARY */}
        {activeTab === 'changelog' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Editorial Transformation Summary</h3>
              <p className="text-xs text-slate-700 leading-relaxed">{project.changes.summary}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xl font-bold text-slate-900 block">{project.changes.sectionsRewritten.length}</span>
                <span className="text-[11px] text-slate-500">Sections Rewritten</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xl font-bold text-slate-900 block">{project.changes.sectionsExpanded.length}</span>
                <span className="text-[11px] text-slate-500">Sections Expanded</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xl font-bold text-emerald-700 block">{project.links.length}</span>
                <span className="text-[11px] text-slate-500">Links Preserved</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xl font-bold text-amber-700 block">{project.factChecks.length}</span>
                <span className="text-[11px] text-slate-500">Facts To Verify</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
