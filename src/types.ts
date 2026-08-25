export type RewriteLevel = 'light' | 'rewrite' | 'full';

export type GuideLedOption = 'active' | 'inactive' | 'no' | 'unsure';
export type GuideLedStatus = GuideLedOption;

export type SectionActionType = 
  | 'rewrite'
  | 'expand'
  | 'shorten'
  | 'practical'
  | 'less_promotional'
  | 'add_missing_topic'
  | 'restore'
  | 'custom'
  | 'prompt';

export interface BrandGuidelines {
  tone: string;
  preferredTerms: string[];
  prohibitedTerms: string[];
  spelling: string; // e.g. "Canadian (traveller, neighbourhood, favourite, centre, colour, behaviour, cancellation)"
  audience: string;
  formattingRules: string[];
  ctaGuidance: string;
  styleRestrictions: string[];
  rawText: string;
  isCustom: boolean;
  isSupplied: boolean;
}

export interface PreservedLink {
  id: string;
  originalAnchor: string;
  originalUrl: string;
  newAnchor: string;
  newPlacement: string;
  isInternal: boolean;
  status: 'preserved' | 'moved' | 'removed' | 'warning';
  reason: string;
  relationship?: string;
}
export type ExtractedLink = PreservedLink;

export interface PreservedImage {
  id: string;
  url: string;
  originalSection?: string;
  newSection?: string;
  recommendedPlacement?: string;
  altText: string;
  caption?: string;
  credit?: string;
  status: 'preserved' | 'moved' | 'removed' | 'review_required';
  reviewRequired?: boolean;
  reviewReason?: string;
}
export type ExtractedImage = PreservedImage;

export interface FactCheckItem {
  id: string;
  statement?: string;
  claim?: string;
  reason: string;
  type?: 'price' | 'hours' | 'transport' | 'event' | 'seasonal' | 'visa' | 'entry' | 'closure' | 'safety' | 'guide_insight' | 'other' | 'general';
  category?: 'price' | 'hours' | 'transport' | 'event' | 'seasonal' | 'visa' | 'entry' | 'closure' | 'safety' | 'guide_insight' | 'other' | 'general';
  severity?: 'warning' | 'info' | 'low' | 'medium' | 'high';
  section?: string;
  sectionTitle?: string;
  verified?: boolean;
  resolutionNote?: string;
  recommendation?: string;
}

export interface BrandCheckItem {
  id: string;
  category?: 'tone' | 'terminology' | 'spelling' | 'prohibited_words' | 'unsupported_claims' | 'promotional_language' | 'readability' | 'link_preservation' | 'image_preservation' | 'guide_attribution' | 'cta_compliance';
  name?: string;
  status?: 'passed' | 'warning' | 'needs_review' | 'failed' | string;
  details?: string;
  issue?: string;
  fixApplied?: string;
  severity?: 'warning' | 'info' | 'low' | 'medium' | 'high' | string;
  rule?: string;
  examples?: string[];
  recommendation?: string;
}

export interface EntityItem {
  id: string;
  name: string;
  type: string;
  existingCoverage: string;
  addedContext: string;
  relevantSection: string;
  verificationRequired?: boolean;
}

export interface ChangeReport {
  sectionsRetained: string[];
  sectionsRewritten: string[];
  sectionsExpanded: string[];
  sectionsMoved: string[];
  sectionsRemoved: string[];
  newSections: string[];
  linksChangedCount: number;
  imagesMovedCount: number;
  factsToVerifyCount: number;
  brandCorrectionsCount: number;
  summary: string;
  keyHighlights?: string[];
}

export interface ArticleSection {
  id: string;
  heading: string;
  level: number;
  content: string;
  originalContent?: string;
  isModified?: boolean;
  changeType?: 'retained' | 'rewritten' | 'expanded' | 'new' | 'added';
  isAccepted?: boolean;
  status?: 'original' | 'rewritten' | 'expanded' | 'added';
  isLocked?: boolean;
}

export type ProjectStatus = 
  | 'draft' 
  | 'fact_check_required' 
  | 'brand_review_required' 
  | 'editorial_review' 
  | 'approved' 
  | 'ready_for_cms' 
  | 'archived';

export interface ProjectState {
  id: string;
  title: string;
  originalArticle: string;
  originalUrl?: string;
  rawBrandGuidelines: string;
  brandGuidelines: BrandGuidelines;
  rewriteLevel: RewriteLevel;
  selectedExpansions: string[];
  guideLed: GuideLedOption;
  targetAudience: string;
  primaryTopic: string;
  destination: string;
  preferredQuery: string;
  contentObjective: string;
  additionalInstructions: string;
  rewrittenArticle: string;
  sections: ArticleSection[];
  links: PreservedLink[];
  images: PreservedImage[];
  factChecks: FactCheckItem[];
  brandChecks: BrandCheckItem[];
  entities: EntityItem[];
  changes: ChangeReport;
  status: ProjectStatus;
  editorialNotes: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export type SavedProject = ProjectState;
