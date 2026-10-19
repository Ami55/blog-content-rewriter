/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { InputWorkflow } from './components/InputWorkflow';
import { OutputWorkspace } from './components/OutputWorkspace';
import { ExportModal } from './components/ExportModal';
import { ProjectsDrawer } from './components/ProjectsDrawer';
import { Footer } from './components/Footer';
import { HowItWorksModal } from './components/HowItWorksModal';
import { proxyRequest } from './lib/api';
import { 
  ProjectState, 
  RewriteLevel, 
  GuideLedOption, 
  BrandGuidelines, 
  ProjectStatus 
} from './types';
import { 
  TRAVEL_EDITORIAL_GUIDELINES, 
  DEMO_PROJECT, 
  EMPTY_BRAND_GUIDELINES 
} from './constants';

const LOCAL_STORAGE_KEY = 'blog_content_rewriter_projects';

export default function App() {
  // Input form state
  const [articleText, setArticleText] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [brandGuidelines, setBrandGuidelines] = useState<BrandGuidelines>(TRAVEL_EDITORIAL_GUIDELINES);
  const [rewriteLevel, setRewriteLevel] = useState<RewriteLevel>('rewrite');
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([
    'improve_intro',
    'expand_practical',
    'first_time_visitor',
    'seasonal_info',
    'accessibility',
    'local_context',
    'improve_headings',
    'improve_internal_links',
    'add_conclusion',
    'add_cta',
  ]);
  const [guideLed, setGuideLed] = useState<GuideLedOption>('active');
  const [targetAudience, setTargetAudience] = useState('');
  const [primaryTopic, setPrimaryTopic] = useState('');
  const [destination, setDestination] = useState('');
  const [preferredQuery, setPreferredQuery] = useState('');
  const [contentObjective, setContentObjective] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  // Project state
  const [currentProject, setCurrentProject] = useState<ProjectState | null>(null);
  const [savedProjects, setSavedProjects] = useState<ProjectState[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBrandChecking, setIsBrandChecking] = useState(false);

  // Modals & Drawers
  const [showExportModal, setShowExportModal] = useState(false);
  const [showProjectsDrawer, setShowProjectsDrawer] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Load saved projects on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedProjects(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load projects from storage:', e);
    }
  }, []);

  // Sync saved projects to localStorage
  const saveProjectsToStorage = (projects: ProjectState[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
      setSavedProjects(projects);
    } catch (e) {
      console.error('Failed to save projects to storage:', e);
    }
  };

  // Load Demo Project
  const handleLoadDemo = () => {
    setCurrentProject(DEMO_PROJECT);
    setArticleText(DEMO_PROJECT.originalArticle);
    setArticleUrl(DEMO_PROJECT.originalUrl || '');
    setBrandGuidelines(DEMO_PROJECT.brandGuidelines);
    setRewriteLevel(DEMO_PROJECT.rewriteLevel);
    setSelectedExpansions(DEMO_PROJECT.selectedExpansions);
    setGuideLed(DEMO_PROJECT.guideLed);
    setTargetAudience(DEMO_PROJECT.targetAudience);
    setPrimaryTopic(DEMO_PROJECT.primaryTopic);
    setDestination(DEMO_PROJECT.destination);
    setPreferredQuery(DEMO_PROJECT.preferredQuery);
    setContentObjective(DEMO_PROJECT.contentObjective);
    setAdditionalInstructions(DEMO_PROJECT.additionalInstructions);
  };

  // Reset to New Blank Article
  const handleNewArticle = () => {
    setCurrentProject(null);
    setArticleText('');
    setArticleUrl('');
    setBrandGuidelines(TRAVEL_EDITORIAL_GUIDELINES);
    setRewriteLevel('rewrite');
    setTargetAudience('');
    setPrimaryTopic('');
    setDestination('');
    setPreferredQuery('');
    setContentObjective('');
    setAdditionalInstructions('');
  };

  // Handle Full Article Generation
  const handleGenerateRewrite = async () => {
    if (!articleText.trim() && !articleUrl.trim()) return;

    setIsGenerating(true);
    try {
      const data = await proxyRequest('rewrite-article', {
          article: articleText,
          url: articleUrl,
          brandGuidelines,
          rewriteLevel,
          selectedExpansions,
          editorialInstructions: additionalInstructions,
          guideLed,
          targetAudience,
          primaryTopic,
          destination,
          preferredQuery,
          contentObjective,
        
      });

      const newProject: ProjectState = {
        id: currentProject ? currentProject.id : `proj-${Date.now()}`,
        title: data.title || primaryTopic || 'Revised Article',
        originalArticle: articleText,
        originalUrl: articleUrl || undefined,
        rawBrandGuidelines: brandGuidelines.rawText,
        brandGuidelines,
        rewriteLevel,
        selectedExpansions,
        guideLed,
        targetAudience,
        primaryTopic,
        destination,
        preferredQuery,
        contentObjective,
        additionalInstructions,
        rewrittenArticle: data.rewrittenArticle,
        sections: data.sections || [],
        links: data.links || [],
        images: data.images || [],
        factChecks: data.factChecks || [],
        brandChecks: data.brandChecks || [],
        entities: data.entities || [],
        changes: data.changes || {
          sectionsRetained: [],
          sectionsRewritten: [],
          sectionsExpanded: [],
          sectionsMoved: [],
          sectionsRemoved: [],
          newSections: [],
          linksChangedCount: 0,
          imagesMovedCount: 0,
          factsToVerifyCount: 0,
          brandCorrectionsCount: 0,
          summary: 'Article rewritten and structured.',
        },
        status: (data.factChecks?.length > 0 ? 'fact_check_required' : 'editorial_review') as ProjectStatus,
        editorialNotes: currentProject?.editorialNotes || '',
        createdAt: currentProject?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: currentProject ? (currentProject.version || 1) + 1 : 1,
      };

      setCurrentProject(newProject);

      // Save or update in list
      const existingIdx = savedProjects.findIndex((p) => p.id === newProject.id);
      let updatedList: ProjectState[];
      if (existingIdx >= 0) {
        updatedList = [...savedProjects];
        updatedList[existingIdx] = newProject;
      } else {
        updatedList = [newProject, ...savedProjects];
      }
      saveProjectsToStorage(updatedList);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Update current project
  const handleUpdateProject = (updatedFields: Partial<ProjectState>) => {
    if (!currentProject) return;

    const updated: ProjectState = {
      ...currentProject,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };

    setCurrentProject(updated);

    const updatedList = savedProjects.map((p) => (p.id === updated.id ? updated : p));
    saveProjectsToStorage(updatedList);
  };

  // Run Brand Check
  const handleRunBrandCheck = async () => {
    if (!currentProject) return;
    setIsBrandChecking(true);

    try {
      const data = await proxyRequest('rewrite-article', {
          article: currentProject.rewrittenArticle,
          brandGuidelines: currentProject.brandGuidelines,
          rewriteLevel: 'light',
        
      });
      if (data.brandChecks) {
        handleUpdateProject({ brandChecks: data.brandChecks });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBrandChecking(false);
    }
  };

  // Select project from drawer
  const handleSelectProject = (id: string) => {
    const found = savedProjects.find((p) => p.id === id);
    if (found) {
      setCurrentProject(found);
      setArticleText(found.originalArticle);
      setArticleUrl(found.originalUrl || '');
      setBrandGuidelines(found.brandGuidelines);
      setRewriteLevel(found.rewriteLevel);
      setSelectedExpansions(found.selectedExpansions);
      setGuideLed(found.guideLed);
      setTargetAudience(found.targetAudience);
      setPrimaryTopic(found.primaryTopic);
      setDestination(found.destination);
      setPreferredQuery(found.preferredQuery);
      setContentObjective(found.contentObjective);
      setAdditionalInstructions(found.additionalInstructions);
    }
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    saveProjectsToStorage(updated);
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  // Duplicate project
  const handleDuplicateProject = (id: string) => {
    const target = savedProjects.find((p) => p.id === id);
    if (!target) return;

    const duplicated: ProjectState = {
      ...target,
      id: `proj-${Date.now()}`,
      title: `${target.title} (Copy)`,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [duplicated, ...savedProjects];
    saveProjectsToStorage(updated);
    setCurrentProject(duplicated);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Header */}
      <Header
        onOpenHowItWorks={() => setShowHowItWorks(true)}
        currentProject={currentProject}
        onNewArticle={handleNewArticle}
        onLoadDemo={handleLoadDemo}
        onOpenProjects={() => setShowProjectsDrawer(true)}
        onOpenExport={() => setShowExportModal(true)}
        isRewritten={!!currentProject}
        status={currentProject?.status || 'draft'}
        onChangeStatus={(newStatus) => handleUpdateProject({ status: newStatus })}
      />

      {/* 2. Mandatory Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 3. Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Demo banner indicator if demo loaded */}
        {currentProject?.id === DEMO_PROJECT.id && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between gap-3 text-xs text-teal-950">
            <span className="font-bold uppercase tracking-wider bg-teal-200/80 px-2 py-0.5 rounded">
              Demo content — not a live article
            </span>
            <span className="text-teal-800">
              Demonstrates original article, brand guidelines, link preservation, image placeholders, expanded sections, and factual safety flags.
            </span>
            <button
              type="button"
              onClick={handleNewArticle}
              className="text-xs font-semibold text-teal-900 hover:underline"
            >
              Start Blank
            </button>
          </div>
        )}

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Workflow */}
          <div className={`${currentProject ? 'lg:col-span-4' : 'lg:col-span-12 max-w-4xl mx-auto w-full'} transition-all`}>
            <InputWorkflow
              articleText={articleText}
              setArticleText={setArticleText}
              articleUrl={articleUrl}
              setArticleUrl={setArticleUrl}
              brandGuidelines={brandGuidelines}
              setBrandGuidelines={setBrandGuidelines}
              rewriteLevel={rewriteLevel}
              setRewriteLevel={setRewriteLevel}
              selectedExpansions={selectedExpansions}
              setSelectedExpansions={setSelectedExpansions}
              guideLed={guideLed}
              setGuideLed={setGuideLed}
              targetAudience={targetAudience}
              setTargetAudience={setTargetAudience}
              primaryTopic={primaryTopic}
              setPrimaryTopic={setPrimaryTopic}
              destination={destination}
              setDestination={setDestination}
              preferredQuery={preferredQuery}
              setPreferredQuery={setPreferredQuery}
              contentObjective={contentObjective}
              setContentObjective={setContentObjective}
              additionalInstructions={additionalInstructions}
              setAdditionalInstructions={setAdditionalInstructions}
              onGenerate={handleGenerateRewrite}
              isGenerating={isGenerating}
              onLoadDemo={handleLoadDemo}
            />
          </div>

          {/* Right Column: Output Workspace */}
          {currentProject && (
            <div className="lg:col-span-8">
              <OutputWorkspace
                project={currentProject}
                onUpdateProject={handleUpdateProject}
                onRunBrandCheck={handleRunBrandCheck}
                isBrandChecking={isBrandChecking}
              />
            </div>
          )}
        </div>
      </main>

      {/* 4. Export Modal */}
      {showExportModal && currentProject && (
        <ExportModal
          project={currentProject}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* 5. Projects & Notes Drawer */}
      {showProjectsDrawer && (
        <ProjectsDrawer
          projects={savedProjects}
          currentProjectId={currentProject?.id || null}
          onSelectProject={handleSelectProject}
          onDeleteProject={handleDeleteProject}
          onDuplicateProject={handleDuplicateProject}
          onClose={() => setShowProjectsDrawer(false)}
          editorialNotes={currentProject?.editorialNotes || ''}
          onChangeEditorialNotes={(notes) => handleUpdateProject({ editorialNotes: notes })}
        />
      )}

      {/* 6. Footer */}
      <Footer />
      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}
    </div>
  );
}
