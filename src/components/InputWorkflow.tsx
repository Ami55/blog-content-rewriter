import React, { useState, useRef } from 'react';
import { 
  Link as LinkIcon, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { BrandGuidelines, GuideLedOption, RewriteLevel } from '../types';
import { EXPANSION_OPTIONS, TOURS_BY_LOCALS_GUIDELINES, EMPTY_BRAND_GUIDELINES } from '../constants';
import { proxyRequest } from '../lib/api';

interface InputWorkflowProps {
  articleText: string;
  setArticleText: (text: string) => void;
  articleUrl: string;
  setArticleUrl: (url: string) => void;
  brandGuidelines: BrandGuidelines;
  setBrandGuidelines: (bg: BrandGuidelines) => void;
  rewriteLevel: RewriteLevel;
  setRewriteLevel: (lvl: RewriteLevel) => void;
  selectedExpansions: string[];
  setSelectedExpansions: React.Dispatch<React.SetStateAction<string[]>>;
  guideLed: GuideLedOption;
  setGuideLed: (opt: GuideLedOption) => void;
  targetAudience: string;
  setTargetAudience: (aud: string) => void;
  primaryTopic: string;
  setPrimaryTopic: (topic: string) => void;
  destination: string;
  setDestination: (dest: string) => void;
  preferredQuery: string;
  setPreferredQuery: (query: string) => void;
  contentObjective: string;
  setContentObjective: (obj: string) => void;
  additionalInstructions: string;
  setAdditionalInstructions: (inst: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onLoadDemo: () => void;
}

export const InputWorkflow: React.FC<InputWorkflowProps> = ({
  articleText,
  setArticleText,
  articleUrl,
  setArticleUrl,
  brandGuidelines,
  setBrandGuidelines,
  rewriteLevel,
  setRewriteLevel,
  selectedExpansions,
  setSelectedExpansions,
  guideLed,
  setGuideLed,
  targetAudience,
  setTargetAudience,
  primaryTopic,
  setPrimaryTopic,
  destination,
  setDestination,
  preferredQuery,
  setPreferredQuery,
  contentObjective,
  setContentObjective,
  additionalInstructions,
  setAdditionalInstructions,
  onGenerate,
  isGenerating,
  onLoadDemo,
}) => {
  const [inputTab, setInputTab] = useState<'paste' | 'url' | 'upload'>('paste');
  const [isExtractingUrl, setIsExtractingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [guidelineMode, setGuidelineMode] = useState<'tbl' | 'custom' | 'none'>('tbl');
  const [customGuidelineText, setCustomGuidelineText] = useState('');
  const [isAnalyzingGuidelines, setIsAnalyzingGuidelines] = useState(false);
  const [showGuidelineDetails, setShowGuidelineDetails] = useState(false);
  const [showMetadataFields, setShowMetadataFields] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const guidelinesFileRef = useRef<HTMLInputElement>(null);

  // Toggle expansions
  const toggleExpansion = (id: string) => {
    setSelectedExpansions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllExpansions = () => {
    setSelectedExpansions(EXPANSION_OPTIONS.map((o) => o.id));
  };

  const clearAllExpansions = () => {
    setSelectedExpansions([]);
  };

  // URL extraction handler
  const handleExtractUrl = async () => {
    if (!articleUrl || !articleUrl.trim()) {
      setUrlError('Please enter a valid URL.');
      return;
    }
    setUrlError(null);
    setIsExtractingUrl(true);

    try {
      const data = await proxyRequest('extract-url', { url: articleUrl.trim() });

      setArticleText(data.content || '');
      if (data.title && !primaryTopic) {
        setPrimaryTopic(data.title);
      }
      setInputTab('paste');
    } catch (err: any) {
      setUrlError(err.message || 'URL extraction failed. Please paste the article text directly.');
    } finally {
      setIsExtractingUrl(false);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setArticleText(text);
        setInputTab('paste');
      }
    };
    reader.readAsText(file);
  };

  // Brand guidelines file upload
  const handleGuidelinesFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCustomGuidelineText(text);
        handleAnalyzeCustomGuidelines(text);
      }
    };
    reader.readAsText(file);
  };

  // Analyze Custom guidelines
  const handleAnalyzeCustomGuidelines = async (textToAnalyze?: string) => {
    const raw = textToAnalyze || customGuidelineText;
    if (!raw.trim()) return;
    setIsAnalyzingGuidelines(true);

    try {
      const data = await proxyRequest('analyze-brand', { rawGuidelines: raw });
      setBrandGuidelines(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzingGuidelines(false);
    }
  };

  // Mode change
  const handleGuidelineModeChange = (mode: 'tbl' | 'custom' | 'none') => {
    setGuidelineMode(mode);
    if (mode === 'tbl') {
      setBrandGuidelines(TOURS_BY_LOCALS_GUIDELINES);
    } else if (mode === 'none') {
      setBrandGuidelines(EMPTY_BRAND_GUIDELINES);
    } else if (mode === 'custom') {
      if (customGuidelineText.trim()) {
        handleAnalyzeCustomGuidelines();
      } else {
        setBrandGuidelines({
          ...EMPTY_BRAND_GUIDELINES,
          isCustom: true,
          isSupplied: true,
          rawText: '',
        });
      }
    }
  };

  const hasArticle = articleText.trim().length > 0 || articleUrl.trim().length > 0;
  const wordCount = articleText.trim() ? articleText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      {/* 1. Article Input Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 1</span>
            <h2 className="text-base font-bold text-slate-900">Source Article</h2>
            <p className="text-xs text-slate-500">Provide the original article via text, URL or document.</p>
          </div>

          {/* Input Method Switcher */}
          <div className="inline-flex rounded-lg p-1 bg-slate-200/70 border border-slate-300/60 self-start sm:self-auto">
            <button
              id="tab-input-paste"
              type="button"
              onClick={() => setInputTab('paste')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                inputTab === 'paste'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paste Article
            </button>
            <button
              id="tab-input-url"
              type="button"
              onClick={() => setInputTab('url')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                inputTab === 'url'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Article URL
            </button>
            <button
              id="tab-input-upload"
              type="button"
              onClick={() => setInputTab('upload')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                inputTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upload File
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {inputTab === 'paste' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="input-article-text" className="text-xs font-semibold text-slate-700">
                  Article Content (Markdown, HTML or Raw Text)
                </label>
                <div className="text-xs text-slate-500 font-mono">
                  {wordCount > 0 ? `${wordCount} words` : 'Empty'}
                </div>
              </div>
              <textarea
                id="input-article-text"
                rows={10}
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                placeholder="Paste the full original article text here, including headings, links in [anchor](url) format, and image references..."
                className="w-full text-sm text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-sans leading-relaxed transition-all"
              />
            </div>
          )}

          {inputTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="input-article-url" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Public Article URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <LinkIcon className="h-4 w-4" />
                    </div>
                    <input
                      id="input-article-url"
                      type="url"
                      value={articleUrl}
                      onChange={(e) => {
                        setArticleUrl(e.target.value);
                        setUrlError(null);
                      }}
                      placeholder="https://www.example.com/blog/article-slug"
                      className="block w-full pl-9 pr-3 py-2 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    id="btn-extract-url"
                    type="button"
                    onClick={handleExtractUrl}
                    disabled={isExtractingUrl || !articleUrl.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white shadow-xs transition-colors"
                  >
                    {isExtractingUrl ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Extract article from URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {urlError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{urlError}</p>
                    <p className="text-red-700 mt-0.5">Please copy and paste the article text directly in the Paste tab.</p>
                  </div>
                </div>
              )}

              {articleText && (
                <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center text-xs text-slate-600 font-medium mb-1">
                    <span>Extracted Preview ({wordCount} words)</span>
                    <button
                      type="button"
                      onClick={() => setInputTab('paste')}
                      className="text-teal-700 hover:underline text-xs"
                    >
                      Edit in Paste Tab &rarr;
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-3 font-mono">{articleText}</p>
                </div>
              )}
            </div>
          )}

          {inputTab === 'upload' && (
            <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <UploadCloud className="mx-auto h-10 w-10 text-slate-400 mb-2" />
              <p className="text-sm font-semibold text-slate-700">Upload an article file</p>
              <p className="text-xs text-slate-500 mt-1">Supports Markdown (.md), Plain Text (.txt), or HTML (.html)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.markdown,.html"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-article"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-slate-300 shadow-xs hover:bg-slate-50"
              >
                Select File
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Brand Guidelines Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 2</span>
            <h2 className="text-base font-bold text-slate-900">Brand Guidelines</h2>
            <p className="text-xs text-slate-500">Enforce terminology, Canadian spelling, tone and formatting.</p>
          </div>

          <div className="inline-flex rounded-lg p-1 bg-slate-200/70 border border-slate-300/60 self-start sm:self-auto">
            <button
              id="btn-guidelines-tbl"
              type="button"
              onClick={() => handleGuidelineModeChange('tbl')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                guidelineMode === 'tbl'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ToursByLocals (Default)
            </button>
            <button
              id="btn-guidelines-custom"
              type="button"
              onClick={() => handleGuidelineModeChange('custom')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                guidelineMode === 'custom'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Custom Guidelines
            </button>
            <button
              id="btn-guidelines-none"
              type="button"
              onClick={() => handleGuidelineModeChange('none')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                guidelineMode === 'none'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              None
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {guidelineMode === 'tbl' && (
            <div className="rounded-lg bg-teal-50/60 border border-teal-200/80 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                    ToursByLocals Preset Active
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGuidelineDetails(!showGuidelineDetails)}
                  className="text-xs text-teal-800 hover:text-teal-950 font-medium inline-flex items-center gap-1"
                >
                  {showGuidelineDetails ? 'Hide details' : 'Inspect extracted rules'}
                  {showGuidelineDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-teal-900 mt-2">
                <div className="bg-white/80 p-2.5 rounded-md border border-teal-100">
                  <span className="font-semibold text-teal-950 block mb-1">Spelling Rule:</span>
                  <p className="text-slate-700">Canadian: traveller, neighbourhood, favourite, centre, colour, behaviour, cancellation</p>
                </div>
                <div className="bg-white/80 p-2.5 rounded-md border border-teal-100">
                  <span className="font-semibold text-teal-950 block mb-1">Nomenclature:</span>
                  <p className="text-slate-700">Use "guides on ToursByLocals" / "local guides". Avoid "our guides" / "our tours".</p>
                </div>
              </div>

              {showGuidelineDetails && (
                <div className="mt-3 pt-3 border-t border-teal-200/70 space-y-2 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Prohibited Travel Clichés:</span>
                    <p className="text-slate-600 mt-0.5">
                      nestled, perched, tucked away, known for, home to, pulses, vibrant, bustling, iconic, must-see, hidden gem, heart of, perfect for.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Audience:</span>
                    <p className="text-slate-600 mt-0.5">{brandGuidelines.audience}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Tone:</span>
                    <p className="text-slate-600 mt-0.5">{brandGuidelines.tone}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {guidelineMode === 'custom' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="input-custom-guidelines" className="text-xs font-semibold text-slate-700">
                  Paste or Upload Custom Brand Guidelines
                </label>
                <button
                  type="button"
                  onClick={() => guidelinesFileRef.current?.click()}
                  className="text-xs text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload doc</span>
                </button>
                <input
                  ref={guidelinesFileRef}
                  type="file"
                  accept=".txt,.md,.pdf,.docx"
                  onChange={handleGuidelinesFileUpload}
                  className="hidden"
                />
              </div>

              <textarea
                id="input-custom-guidelines"
                rows={4}
                value={customGuidelineText}
                onChange={(e) => setCustomGuidelineText(e.target.value)}
                placeholder="Paste brand guidelines, tone rules, prohibited words, spelling preference, audience instructions..."
                className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAnalyzeCustomGuidelines()}
                  disabled={isAnalyzingGuidelines || !customGuidelineText.trim()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white"
                >
                  {isAnalyzingGuidelines ? 'Extracting Rules...' : 'Extract & Parse Guidelines'}
                </button>
              </div>

              {brandGuidelines.isSupplied && (
                <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <p className="font-semibold text-slate-900">Extracted Rules Summary:</p>
                  <p><strong className="text-slate-700">Tone:</strong> {brandGuidelines.tone}</p>
                  <p><strong className="text-slate-700">Spelling:</strong> {brandGuidelines.spelling}</p>
                  {brandGuidelines.prohibitedTerms.length > 0 && (
                    <p><strong className="text-slate-700">Prohibited Terms:</strong> {brandGuidelines.prohibitedTerms.join(', ')}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {guidelineMode === 'none' && (
            <div className="rounded-lg bg-amber-50/70 border border-amber-200 p-3 text-xs text-amber-900">
              <span className="font-bold block">Brand guidelines not supplied</span>
              <p className="text-amber-800 mt-0.5">
                Using a clean, useful and non-promotional general editorial style. The final output will be labelled accordingly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Rewrite Level & Guide-Led Content */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-5">
        <div>
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 3</span>
          <h2 className="text-base font-bold text-slate-900">Rewrite Level</h2>
          <p className="text-xs text-slate-500">Choose the intensity and scope of editorial transformation.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            {/* Light Edit */}
            <div
              id="opt-rewrite-light"
              onClick={() => setRewriteLevel('light')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                rewriteLevel === 'light'
                  ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-slate-900">Light Edit</span>
                {rewriteLevel === 'light' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Improve grammar and readability, remove repetition, improve headings and flow while strictly preserving original structure and voice.
              </p>
            </div>

            {/* Rewrite (Default) */}
            <div
              id="opt-rewrite-standard"
              onClick={() => setRewriteLevel('rewrite')}
              className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                rewriteLevel === 'rewrite'
                  ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  Default
                </span>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-slate-900">Rewrite</span>
                {rewriteLevel === 'rewrite' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rewrite weak sections, improve the introduction, reorganise headings where necessary, and add missing practical explanations.
              </p>
            </div>

            {/* Full Rewrite and Expansion */}
            <div
              id="opt-rewrite-full"
              onClick={() => setRewriteLevel('full')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                rewriteLevel === 'full'
                  ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-slate-900">Full Rewrite & Expansion</span>
                {rewriteLevel === 'full' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rebuild article using useful facts, expand sections with user-focused practical details, eliminate generic filler, and preserve valid links/images.
              </p>
            </div>
          </div>
        </div>

        {/* Guide-Led Content Selection */}
        <div className="pt-4 border-t border-slate-100">
          <label htmlFor="select-guide-led" className="block text-xs font-semibold text-slate-900 mb-1">
            Is this article guide-led?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { id: 'active', label: 'Yes, and the guide is active', desc: 'Preserves guide name, genuine quotes & attribution' },
              { id: 'inactive', label: 'Yes, but the guide is inactive', desc: 'Removes direct booking prompts, preserves general advice' },
              { id: 'no', label: 'No', desc: 'Does not invent guide attribution; flags insight needs' },
              { id: 'unsure', label: 'Unsure', desc: 'Treats neutral editorial style with safety flags' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setGuideLed(opt.id as GuideLedOption)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                  guideLed === opt.id
                    ? 'border-teal-600 bg-teal-50/50 font-semibold text-teal-950'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="font-semibold text-xs text-slate-900">{opt.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Optional Expansion Controls */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 4</span>
            <h2 className="text-base font-bold text-slate-900">Expansion Controls</h2>
            <p className="text-xs text-slate-500">
              Select specific elements needed. Items are added only when contextually relevant.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAllExpansions}
              className="text-[11px] font-semibold text-teal-700 hover:text-teal-900"
            >
              Select all
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={clearAllExpansions}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-700"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {EXPANSION_OPTIONS.map((item) => {
            const isSelected = selectedExpansions.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleExpansion(item.id)}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/40 text-teal-950'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <span className="text-xs font-semibold block text-slate-900">{item.label}</span>
                  <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Editorial Context & Metadata (Collapsible) */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setShowMetadataFields(!showMetadataFields)}
          className="w-full p-4 text-left flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
        >
          <div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 5</span>
            <h2 className="text-sm font-bold text-slate-900">Audience, Destination & Editorial Context</h2>
            <p className="text-xs text-slate-500">Optional framing fields for richer destination guidance.</p>
          </div>
          {showMetadataFields ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showMetadataFields && (
          <div className="p-4 sm:p-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label htmlFor="input-destination" className="font-semibold text-slate-700 block mb-1">
                Destination (City / Region)
              </label>
              <input
                id="input-destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Edinburgh, Scotland"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
            <div>
              <label htmlFor="input-primary-topic" className="font-semibold text-slate-700 block mb-1">
                Primary Topic
              </label>
              <input
                id="input-primary-topic"
                type="text"
                value={primaryTopic}
                onChange={(e) => setPrimaryTopic(e.target.value)}
                placeholder="e.g. Historic Old Town walking guide"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
            <div>
              <label htmlFor="input-target-audience" className="font-semibold text-slate-700 block mb-1">
                Target Audience
              </label>
              <input
                id="input-target-audience"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Discerning travellers aged 50+ seeking authentic history"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
            <div>
              <label htmlFor="input-preferred-query" className="font-semibold text-slate-700 block mb-1">
                Preferred Query (Optional)
              </label>
              <input
                id="input-preferred-query"
                type="text"
                value={preferredQuery}
                onChange={(e) => setPreferredQuery(e.target.value)}
                placeholder="e.g. Edinburgh Old Town walking tips"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="input-content-objective" className="font-semibold text-slate-700 block mb-1">
                Content Objective
              </label>
              <input
                id="input-content-objective"
                type="text"
                value={contentObjective}
                onChange={(e) => setContentObjective(e.target.value)}
                placeholder="e.g. Transform promotional fluff into a grounded, practical navigation guide"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="input-additional-instructions" className="font-semibold text-slate-700 block mb-1">
                Additional Editorial Instructions (Optional)
              </label>
              <textarea
                id="input-additional-instructions"
                rows={2}
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="e.g. Emphasise morning walking routes and cobblestone accessibility cautions..."
                className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
          </div>
        )}
      </section>

      {/* Generate CTA Button & Demo bar */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Ready to generate revised article</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {hasArticle
              ? `${wordCount} words loaded • ${rewriteLevel.toUpperCase()} level • ${selectedExpansions.length} expansion options active`
              : 'Supply article text or URL above to begin.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!hasArticle && (
            <button
              type="button"
              onClick={onLoadDemo}
              className="text-xs text-teal-300 hover:text-teal-200 underline font-medium"
            >
              Try sample Edinburgh guide
            </button>
          )}

          <button
            id="btn-generate-article"
            type="button"
            onClick={onGenerate}
            disabled={!hasArticle || isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Rewriting Article...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Revised Article</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
