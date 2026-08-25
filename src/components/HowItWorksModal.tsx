import React from 'react';
import { CheckCircle2, FileInput, ShieldCheck, Sparkles, X } from 'lucide-react';

export const HowItWorksModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm p-4 flex items-center justify-center" onMouseDown={onClose}>
    <section className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="how-title">
      <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Workflow & framework</p><h2 id="how-title" className="mt-1 text-2xl font-bold text-slate-950">How Blog Content Rewriter works</h2></div>
        <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Close instructions"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-6 space-y-6 text-sm text-slate-700">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            [FileInput, '1. Add the source', 'Paste an article, upload a text file, or enter a public URL and extract its readable content.'],
            [ShieldCheck, '2. Set editorial rules', 'Use the supplied guidelines, upload custom brand rules, or work without a brand preset.'],
            [Sparkles, '3. Choose the rewrite', 'Select rewrite depth, expansions, audience, topic, destination, query, and editorial objective.'],
            [CheckCircle2, '4. Review and export', 'Inspect sections, preserved links and images, fact-check flags, entities, brand checks, and the change log.'],
          ].map(([Icon, title, copy]) => <div key={String(title)} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><Icon className="w-5 h-5 text-teal-700" /><h3 className="mt-3 font-bold text-slate-900">{title as string}</h3><p className="mt-1 leading-6">{copy as string}</p></div>)}
        </div>
        <div className="rounded-xl bg-teal-950 text-teal-50 p-5">
          <h3 className="font-bold text-base">Editorial preservation framework</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            <li>• Preserve destination URLs and meaningful anchors.</li><li>• Keep image references, alt text, captions, and credits.</li>
            <li>• Apply tone, spelling, terminology, and CTA rules.</li><li>• Flag prices, hours, access, transport, and seasonal claims.</li>
            <li>• Avoid invented facts, quotes, reviews, or statistics.</li><li>• Record retained, rewritten, expanded, moved, and new sections.</li>
          </ul>
        </div>
        <div><h3 className="font-bold text-slate-900">Recommended use</h3><p className="mt-1 leading-6">Start with complete source copy and the most specific brand guidance available. AI output is a draft: resolve every fact-check warning and verify the final article before publishing.</p></div>
      </div>
    </section>
  </div>
);
