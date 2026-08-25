import { BrandGuidelines, ProjectState } from './types';

export const EXPANSION_OPTIONS = [
  { id: 'improve_intro', label: 'Improve the introduction', description: 'Stronger hook, clearer framing, and better orientation.' },
  { id: 'expand_practical', label: 'Expand practical information', description: 'Getting there, costs, tickets, walking conditions, and best times to visit.' },
  { id: 'traveller_questions', label: 'Add traveller questions', description: 'Address common questions visitors frequently ask.' },
  { id: 'first_time_visitor', label: 'Add first-time visitor advice', description: 'Essential navigation tips, pitfalls to avoid, and pacing suggestions.' },
  { id: 'seasonal_info', label: 'Add seasonal information', description: 'Weather differences, seasonal crowds, and best months.' },
  { id: 'accessibility', label: 'Add accessibility considerations', description: 'Cobblestones, hills, steps, wheelchair accessibility, and physical demands.' },
  { id: 'local_context', label: 'Add local context', description: 'Neighbourhood character, architectural heritage, and living culture.' },
  { id: 'itinerary_planning', label: 'Add itinerary or planning advice', description: 'Suggested half-day or full-day flow and time estimates.' },
  { id: 'entity_coverage', label: 'Improve entity coverage', description: 'Clearly distinguish landmarks, monuments, and historic institutions.' },
  { id: 'improve_headings', label: 'Improve headings', description: 'Make H2s/H3s descriptive, action-oriented, and logically structured.' },
  { id: 'improve_internal_links', label: 'Improve internal links', description: 'Contextualise links naturally with descriptive anchors.' },
  { id: 'add_conclusion', label: 'Add a conclusion', description: 'Wrap up with clear takeaways and practical next steps.' },
  { id: 'add_cta', label: 'Add a relevant call to action', description: 'Invite readers to explore local guided experiences respectfully.' },
];

export const TOURS_BY_LOCALS_GUIDELINES: BrandGuidelines = {
  tone: 'Clear, friendly, down-to-earth, knowledgeable, inclusive, and practical. Tone must be suited for an engaged audience aged 55+.',
  preferredTerms: [
    'guides on ToursByLocals',
    'local guides',
    'tours on ToursByLocals',
    'private tours available through ToursByLocals',
    'local guide experiences',
  ],
  prohibitedTerms: [
    'our guides',
    'our tours',
    'nestled',
    'perched',
    'tucked away',
    'known for',
    'home to',
    'pulses',
    'vibrant',
    'bustling',
    'iconic',
    'must-see',
    'hidden gem',
    'in the heart of',
    'perfect for',
    'picturesque',
    'quaint',
    'breathtaking',
    'a stone\'s throw',
    'something for everyone',
  ],
  spelling: 'Canadian English (traveller, neighbourhood, favourite, centre, colour, behaviour, cancellation)',
  audience: 'Curious, discerning, active adults and travellers (especially 55+) seeking authentic local perspective, cultural context, and accessible practical guidance.',
  formattingRules: [
    'Use clear, descriptive H2 and H3 headings rather than generic labels',
    'Include practical logistical details: walking terrain, public transport, timing, ticket tips',
    'Format image placeholders cleanly: [IMAGE: URL | Alt text | Credit]',
    'Do not invent unverified pricing, exact hours or guide names',
    'Preserve all valid existing URLs and links with contextual anchor text',
  ],
  ctaGuidance: 'Respectful, natural invitation to explore walking tours with local guides on ToursByLocals without pushy or sales-heavy language.',
  styleRestrictions: [
    'Never invent quotes or fictional guide personas',
    'Never use promotional travel buzzwords',
    'Always use Canadian spelling conventions',
    'Do not state prices or opening hours as definitive without flagging fact check requirement',
  ],
  rawText: `Editorial Tone: Friendly, knowledgeable, grounded, inclusive.
Spelling: Canadian English (e.g., colour, neighbourhood, traveller, centre).
Terminology: Never say "our guides" or "our tours". Use "guides on ToursByLocals" or "local guides".
Banned Buzzwords: nestled, perched, tucked away, known for, home to, pulses, vibrant, bustling, iconic, must-see, hidden gem, in the heart of, perfect for.`,
  isCustom: false,
  isSupplied: true,
};

export const EMPTY_BRAND_GUIDELINES: BrandGuidelines = {
  tone: 'Informative, balanced, accessible, and practical.',
  preferredTerms: [],
  prohibitedTerms: [],
  spelling: 'Standard English (clear and consistent)',
  audience: 'General readership seeking accurate, practical travel insights.',
  formattingRules: ['Clean hierarchy (H1, H2, H3)', 'Short readable paragraphs', 'Bullet lists for practical logistics'],
  ctaGuidance: 'Optional non-promotional conclusion summary.',
  styleRestrictions: [],
  rawText: '',
  isCustom: false,
  isSupplied: false,
};

export const DEMO_ORIGINAL_ARTICLE = `# The Ultimate Guide to Edinburgh's Old Town

Edinburgh's Old Town is nestled in the heart of Scotland's historic capital and is a bustling must-see destination for every traveller. Home to iconic landmarks and pulsating with vibrant energy, this hidden gem district offers the perfect vacation for history lovers.

[IMAGE: https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80 | Alt text: Old Town Edinburgh Royal Mile | Credit: VisitScotland]

## What to see

First, you must visit Edinburgh Castle, perched atop an extinct volcano. Tickets cost £19.50 and it opens at 9:30 AM daily. It is known for housing the Honours of Scotland. Check out [our tours](https://www.toursbylocals.com/Edinburgh-Tours) to see it with our guides.

Next, walk down the Royal Mile. It is picturesque and has something for everyone. Stop by St Giles' Cathedral which is nestled midway down the street. 

Our local guide Marco says: "The secret closes off the Royal Mile hide four hundred years of underground stories that casual tourists walk right past without noticing."

[IMAGE: https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80 | Alt text: St Giles Cathedral on the Royal Mile]

## Where to eat and drink

There are many quaint pubs on Victoria Street where you can taste traditional haggis. Victoria Street is world-famous for its colourful storefronts and is said to have inspired Diagon Alley.

For more information on Scotland excursions, explore [Historic Environment Scotland](https://www.historicenvironment.scot) for castle tickets.

Book one of [our guides](https://www.toursbylocals.com/Edinburgh-Tours) today for the ultimate unforgettable tour!`;

export const DEMO_REWRITTEN_ARTICLE = `# Exploring Edinburgh's Historic Old Town: A Practical Visitor's Guide

Edinburgh's Old Town is one of Europe's best-preserved medieval urban centres, characterised by steep cobblestone wynds, multi-storey tenement buildings, and centuries of layered history along the Royal Mile.

[IMAGE: https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80 | Alt text: Panoramic view of Edinburgh Old Town rooftops and castle | Credit: Photo by Scottish Heritage Archive]

Whether you are visiting Scotland for the first time or returning to explore deeper, navigating the Old Town's steep topography and historic sites requires thoughtful planning—especially during peak festival months.

## Navigating the Royal Mile and Key Landmarks

The spine of Old Town is the Royal Mile, running approximately one Scots mile (1.81 km) downhill from the volcanic escarpment of Edinburgh Castle to the Palace of Holyroodhouse.

### Edinburgh Castle and Castle Rock
Dominating the city skyline from Castle Rock, Edinburgh Castle houses the Honours of Scotland (the Scottish Crown Jewels) and the Stone of Destiny. 

* [FACT CHECK REQUIRED: Admission pricing, operating hours, and ticket requirements must be verified for current seasonal accuracy.]

Because entry slots frequently sell out weeks in advance between May and September, advance booking directly via [Historic Environment Scotland](https://www.historicenvironment.scot) is strongly recommended. For travellers with mobility considerations, the castle esplanade and interior include steep cobblestone paths and historic stairs; dedicated shuttle transport is available inside the gate for visitors who need assistance.

### St Giles' Cathedral and Historic Closes
Situated midway along the Royal Mile, St Giles' Cathedral features a distinctive 15th-century crown spire and intricate Thistle Chapel carvings. Entry is free, with voluntary donations welcomed to support building conservation.

[IMAGE: https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80 | Alt text: St Giles Cathedral on the Royal Mile with historic cobblestone foreground | Credit: Photo by Scottish Heritage Archive]

Branching off either side of the main street are narrow alleyways known locally as *closes* or *wynds*. Marco, a professional guide on ToursByLocals who conducts historic walks across Lothian, notes:

> "The secret closes off the Royal Mile hide four hundred years of underground stories that casual tourists walk right past without noticing."

Notable closes to explore include Lady Stair's Close (home to the Scottish Writers' Museum), Advocate's Close (offering framed views of Princes Street Gardens), and Mary King's Close (a preserved 17th-century subterranean street).

## Victoria Street, Grassmarket, and Local Dining

Curving down from George IV Bridge to the historic Grassmarket basin, Victoria Street is renowned for its multi-tiered Victorian architecture and independent merchants.

* **Independent Bookshops & Artisan Goods:** The upper terrace offers pedestrian vantage points over the curved street below, featuring independent cheesemongers, woollen weavers, and bookshops.
* **Traditional Dining:** The Grassmarket area hosts several historic taverns serving hearty Scottish fare such as Cullen skink (smoked haddock chowder) and vegetarian or traditional haggis served with neeps and tatties.

## Practical Information for Visitors

### Walking Conditions & Accessibility
Old Town is built across a dramatic ridge. Walking involves steep gradients, uneven cobblestones, and frequent stone stairs (such as the Vennel steps). Sturdy walking footwear with good grip is essential. Wheelchair-accessible routes exist along the main spine of the Royal Mile, but many side closes require step-free detours via George IV Bridge or the Mound.

### Seasonal Timing & Crowd Flow
* **Early Morning (8:00 AM – 10:00 AM):** Best for quiet photography and enjoying the historic architecture without heavy tour groups.
* **May and September:** Generally offer pleasant walking temperatures and fewer tour bus crowds than mid-summer.
* **August:** Energetic during festival season, but requires booking accommodation and key tours several months in advance.

[LOCAL GUIDE INSIGHT REQUIRED: Additional recommended quiet morning viewpoints for photography enthusiasts.]

## Planning Your Next Steps

Exploring Edinburgh's Old Town is most rewarding when taken at an unhurried pace, leaving time to wander off the main thoroughfare into historic closes. For travellers seeking customised itineraries, private walking tours arranged with [local guides on ToursByLocals](https://www.toursbylocals.com/Edinburgh-Tours) provide flexible, accessible routes suited to your interests.`;

export const DEMO_PROJECT: ProjectState = {
  id: 'demo-edinburgh-old-town',
  title: 'A Practical Guide to Edinburgh Historic Old Town',
  originalArticle: DEMO_ORIGINAL_ARTICLE,
  originalUrl: 'https://example.com/edinburgh-old-town-guide',
  rawBrandGuidelines: TOURS_BY_LOCALS_GUIDELINES.rawText,
  brandGuidelines: TOURS_BY_LOCALS_GUIDELINES,
  rewriteLevel: 'rewrite',
  selectedExpansions: [
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
  ],
  guideLed: 'active',
  targetAudience: 'Discerning travellers (aged 50+) seeking authentic history and accessible exploration advice',
  primaryTopic: 'Edinburgh Old Town visitor guide and Royal Mile walkthrough',
  destination: 'Edinburgh, Scotland',
  preferredQuery: 'Edinburgh Old Town walking guide practical advice',
  contentObjective: 'Rewrite the travel article to eliminate clichés, correct terminology, preserve valid links/images, flag unverified pricing/accessibility claims, and provide practical visitor advice.',
  additionalInstructions: 'Ensure Canadian spelling rules are applied. Replace travel clichés with grounded descriptions. Keep guide Marco’s genuine quotation.',
  rewrittenArticle: DEMO_REWRITTEN_ARTICLE,
  sections: [
    {
      id: 'sec-1',
      heading: "Exploring Edinburgh's Historic Old Town: A Practical Visitor's Guide",
      level: 1,
      content: `Edinburgh's Old Town is one of Europe's best-preserved medieval urban centres, characterised by steep cobblestone wynds, multi-storey tenement buildings, and centuries of layered history along the Royal Mile.\n\n[IMAGE: https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80 | Alt text: Panoramic view of Edinburgh Old Town rooftops and castle | Credit: Photo by Scottish Heritage Archive]\n\nWhether you are visiting Scotland for the first time or returning to explore deeper, navigating the Old Town's steep topography and historic sites requires thoughtful planning—especially during peak festival months.`,
      originalContent: `# The Ultimate Guide to Edinburgh's Old Town\n\nEdinburgh's Old Town is nestled in the heart of Scotland's historic capital and is a bustling must-see destination for every traveller. Home to iconic landmarks and pulsating with vibrant energy, this hidden gem district offers the perfect vacation for history lovers.`,
      changeType: 'rewritten',
      isAccepted: true,
    },
    {
      id: 'sec-2',
      heading: 'Navigating the Royal Mile and Key Landmarks',
      level: 2,
      content: `The spine of Old Town is the Royal Mile, running approximately one Scots mile (1.81 km) downhill from the volcanic escarpment of Edinburgh Castle to the Palace of Holyroodhouse.`,
      originalContent: `## What to see\n\nFirst, you must visit Edinburgh Castle...`,
      changeType: 'rewritten',
      isAccepted: true,
    },
    {
      id: 'sec-3',
      heading: 'Edinburgh Castle and Castle Rock',
      level: 3,
      content: `Dominating the city skyline from Castle Rock, Edinburgh Castle houses the Honours of Scotland (the Scottish Crown Jewels) and the Stone of Destiny.\n\n* [FACT CHECK REQUIRED: Admission pricing, operating hours, and ticket requirements must be verified for current seasonal accuracy.]\n\nBecause entry slots frequently sell out weeks in advance between May and September, advance booking directly via [Historic Environment Scotland](https://www.historicenvironment.scot) is strongly recommended. For travellers with mobility considerations, the castle esplanade and interior include steep cobblestone paths and historic stairs; dedicated shuttle transport is available inside the gate for visitors who need assistance.`,
      originalContent: `First, you must visit Edinburgh Castle, perched atop an extinct volcano. Tickets cost £19.50 and it opens at 9:30 AM daily. It is known for housing the Honours of Scotland. Check out our tours to see it with our guides.`,
      changeType: 'expanded',
      isAccepted: true,
    },
    {
      id: 'sec-4',
      heading: "St Giles' Cathedral and Historic Closes",
      level: 3,
      content: `Situated midway along the Royal Mile, St Giles' Cathedral features a distinctive 15th-century crown spire and intricate Thistle Chapel carvings. Entry is free, with voluntary donations welcomed to support building conservation.\n\n[IMAGE: https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80 | Alt text: St Giles Cathedral on the Royal Mile with historic cobblestone foreground | Credit: Photo by Scottish Heritage Archive]\n\nBranching off either side of the main street are narrow alleyways known locally as *closes* or *wynds*. Marco, a professional guide on ToursByLocals who conducts historic walks across Lothian, notes:\n\n> "The secret closes off the Royal Mile hide four hundred years of underground stories that casual tourists walk right past without noticing."\n\nNotable closes to explore include Lady Stair's Close (home to the Scottish Writers' Museum), Advocate's Close (offering framed views of Princes Street Gardens), and Mary King's Close (a preserved 17th-century subterranean street).`,
      originalContent: `Next, walk down the Royal Mile. It is picturesque and has something for everyone. Stop by St Giles' Cathedral which is nestled midway down the street. Our local guide Marco says: "The secret closes off the Royal Mile hide four hundred years of underground stories that casual tourists walk right past without noticing."`,
      changeType: 'expanded',
      isAccepted: true,
    },
    {
      id: 'sec-5',
      heading: 'Victoria Street, Grassmarket, and Local Dining',
      level: 2,
      content: `Curving down from George IV Bridge to the historic Grassmarket basin, Victoria Street is renowned for its multi-tiered Victorian architecture and independent merchants.\n\n* **Independent Bookshops & Artisan Goods:** The upper terrace offers pedestrian vantage points over the curved street below, featuring independent cheesemongers, woollen weavers, and bookshops.\n* **Traditional Dining:** The Grassmarket area hosts several historic taverns serving hearty Scottish fare such as Cullen skink (smoked haddock chowder) and vegetarian or traditional haggis served with neeps and tatties.`,
      originalContent: `## Where to eat and drink\n\nThere are many quaint pubs on Victoria Street where you can taste traditional haggis. Victoria Street is world-famous for its colourful storefronts and is said to have inspired Diagon Alley.`,
      changeType: 'expanded',
      isAccepted: true,
    },
    {
      id: 'sec-6',
      heading: 'Practical Information for Visitors',
      level: 2,
      content: `### Walking Conditions & Accessibility\nOld Town is built across a dramatic ridge. Walking involves steep gradients, uneven cobblestones, and frequent stone stairs (such as the Vennel steps). Sturdy walking footwear with good grip is essential. Wheelchair-accessible routes exist along the main spine of the Royal Mile, but many side closes require step-free detours via George IV Bridge or the Mound.\n\n### Seasonal Timing & Crowd Flow\n* **Early Morning (8:00 AM – 10:00 AM):** Best for quiet photography and enjoying the historic architecture without heavy tour groups.\n* **May and September:** Generally offer pleasant walking temperatures and fewer tour bus crowds than mid-summer.\n* **August:** Energetic during festival season, but requires booking accommodation and key tours several months in advance.\n\n[LOCAL GUIDE INSIGHT REQUIRED: Additional recommended quiet morning viewpoints for photography enthusiasts.]`,
      originalContent: ``,
      changeType: 'new',
      isAccepted: true,
    },
    {
      id: 'sec-7',
      heading: 'Planning Your Next Steps',
      level: 2,
      content: `Exploring Edinburgh's Old Town is most rewarding when taken at an unhurried pace, leaving time to wander off the main thoroughfare into historic closes. For travellers seeking customised itineraries, private walking tours arranged with [local guides on ToursByLocals](https://www.toursbylocals.com/Edinburgh-Tours) provide flexible, accessible routes suited to your interests.`,
      originalContent: `Book one of our guides today for the ultimate unforgettable tour!`,
      changeType: 'rewritten',
      isAccepted: true,
    },
  ],
  links: [
    {
      id: 'link-1',
      originalAnchor: 'our tours',
      originalUrl: 'https://www.toursbylocals.com/Edinburgh-Tours',
      newAnchor: 'local guides on ToursByLocals',
      newPlacement: 'Planning Your Next Steps (Conclusion)',
      isInternal: true,
      status: 'preserved',
      reason: 'Destination ToursByLocals URL preserved exactly, anchor text corrected to meet brand guideline: "local guides on ToursByLocals".',
    },
    {
      id: 'link-2',
      originalAnchor: 'Historic Environment Scotland',
      originalUrl: 'https://www.historicenvironment.scot',
      newAnchor: 'Historic Environment Scotland',
      newPlacement: 'Edinburgh Castle and Castle Rock',
      isInternal: false,
      status: 'preserved',
      reason: 'Preserved official authority domain for ticket booking.',
    },
    {
      id: 'link-3',
      originalAnchor: 'our guides',
      originalUrl: 'https://www.toursbylocals.com/Edinburgh-Tours',
      newAnchor: 'local guides on ToursByLocals',
      newPlacement: 'Planning Your Next Steps (Conclusion)',
      isInternal: true,
      status: 'preserved',
      reason: 'Consolidated into conclusion CTA with brand-compliant anchor text.',
    },
  ],
  images: [
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
      originalSection: 'Introduction',
      recommendedPlacement: 'After Introduction paragraph (Hero visual)',
      altText: 'Panoramic view of Edinburgh Old Town rooftops and castle',
      caption: 'Edinburgh Old Town skyline along the volcanic ridge',
      credit: 'Photo by Scottish Heritage Archive',
      status: 'preserved',
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      originalSection: 'What to see',
      recommendedPlacement: "St Giles' Cathedral and Historic Closes",
      altText: 'St Giles Cathedral on the Royal Mile with historic cobblestone foreground',
      caption: 'St Giles Cathedral crown steeple viewed from the Royal Mile',
      credit: 'Photo by Scottish Heritage Archive',
      status: 'preserved',
    },
  ],
  factChecks: [
    {
      id: 'fact-1',
      claim: 'Edinburgh Castle tickets cost £19.50 and opening hours are 9:30 AM daily.',
      section: 'Edinburgh Castle and Castle Rock',
      reason: 'Historic admission prices and seasonal operating hours fluctuate frequently. Pricing stated without seasonal validity risks misleading readers.',
      recommendation: 'Verify current admission rates directly on Historic Environment Scotland and add editorial flag for editor to confirm before publication.',
      severity: 'high',
    },
    {
      id: 'fact-2',
      claim: 'Victoria Street inspired Diagon Alley in Harry Potter.',
      section: 'Victoria Street, Grassmarket, and Local Dining',
      reason: 'Popular urban legend frequently cited by tourism blogs but unverified by author J.K. Rowling.',
      recommendation: 'Focus on documented Victorian architecture and independent merchants rather than unconfirmed pop culture claims.',
      severity: 'medium',
    },
    {
      id: 'fact-3',
      claim: 'Castle wheelchair access and steep cobblestone transit details.',
      section: 'Practical Information for Visitors',
      reason: 'Mobility access details should be confirmed for current operational shuttle availability.',
      recommendation: 'Verify accessibility shuttle booking requirements with castle visitor services.',
      severity: 'low',
    },
  ],
  brandChecks: [
    {
      id: 'bc-1',
      rule: 'Prohibit "our guides" / "our tours"',
      issue: 'Original text used "our tours" and "our guides".',
      fixApplied: 'Replaced with "guides on ToursByLocals" and "local guides".',
      severity: 'pass',
    },
    {
      id: 'bc-2',
      rule: 'Eliminate Banned Travel Buzzwords',
      issue: 'Original text contained: nestled, perched, bustling, must-see, hidden gem, iconic, vibrant, quaint, perfect for.',
      fixApplied: 'Eliminated all 9 prohibited buzzwords and replaced with grounded architectural, historical and logistical descriptions.',
      severity: 'pass',
    },
    {
      id: 'bc-3',
      rule: 'Enforce Canadian English Spelling',
      issue: 'Checked spelling for target terms.',
      fixApplied: 'Applied Canadian spelling: centres, characterised, customised, colour, traveller.',
      severity: 'pass',
    },
    {
      id: 'bc-4',
      rule: 'Active Guide Quote Preservation',
      issue: 'Guide-led article indicated active guide Marco.',
      fixApplied: 'Preserved verbatim quote and attributed properly: "Marco, a professional guide on ToursByLocals who conducts historic walks across Lothian".',
      severity: 'pass',
    },
    {
      id: 'bc-5',
      rule: 'Preserve Valid Links & Images',
      issue: 'Original contained 2 images and 2 external links.',
      fixApplied: '100% of links and images preserved with enhanced alt text, placement, and destination fidelity.',
      severity: 'pass',
    },
  ],
  entities: [
    {
      id: 'ent-1',
      name: 'Edinburgh Castle',
      type: 'Historic Monument',
      existingCoverage: 'Mentioned as volcano top landmark with ticket price',
      addedContext: 'Explained Castle Rock geological formation, Honours of Scotland, booking necessity, and mobility considerations',
      relevantSection: 'Edinburgh Castle and Castle Rock',
    },
    {
      id: 'ent-2',
      name: "St Giles' Cathedral",
      type: 'Historic Religious Landmark',
      existingCoverage: 'Mentioned as cathedral nestled midway',
      addedContext: 'Identified 15th-century crown spire, Thistle Chapel, and free entry with voluntary donations',
      relevantSection: "St Giles' Cathedral and Historic Closes",
    },
    {
      id: 'ent-3',
      name: 'Historic Environment Scotland',
      type: 'National Heritage Agency',
      existingCoverage: 'Generic link for castle tickets',
      addedContext: 'Identified as official ticket provider with advance slot booking advice',
      relevantSection: 'Edinburgh Castle and Castle Rock',
    },
    {
      id: 'ent-4',
      name: 'Victoria Street & Grassmarket',
      type: 'Neighbourhood & Street',
      existingCoverage: 'Quaint pubs with Diagon Alley note',
      addedContext: 'Explained multi-tiered Victorian architecture, independent merchants, and traditional dishes (Cullen skink, haggis with neeps and tatties)',
      relevantSection: 'Victoria Street, Grassmarket, and Local Dining',
    },
    {
      id: 'ent-5',
      name: 'Royal Mile & Historic Closes',
      type: 'Historic Thoroughfare',
      existingCoverage: 'Picturesque street walk',
      addedContext: 'Clarified Scots mile length (1.81 km), named specific closes (Lady Stair’s, Advocate’s, Mary King’s), and added terrain warnings',
      relevantSection: "St Giles' Cathedral and Historic Closes",
    },
  ],
  changes: {
    sectionsRetained: ['Guide Quote (Marco)'],
    sectionsRewritten: [
      'Introduction (eliminated 4 buzzwords, added topographical orientation)',
      'Navigating Royal Mile (structured into clear H2/H3 hierarchy)',
      'Planning Next Steps (rebuilt closing CTA in non-pushy tone)',
    ],
    sectionsExpanded: [
      'Edinburgh Castle (added advance booking advice and mobility warnings)',
      "St Giles' Cathedral & Closes (named 3 specific historic wynds and architectural features)",
      'Victoria Street & Grassmarket (added dining specifics and terrace walkway context)',
    ],
    sectionsMoved: ['CTA moved to dedicated conclusion section'],
    sectionsRemoved: ['Generic marketing claims ("bustling must-see destination", "Diagon Alley inspiration")'],
    newSections: ['Practical Information for Visitors (Walking Conditions, Accessibility, Seasonal Timing)'],
    linksChangedCount: 2,
    imagesMovedCount: 0,
    factsToVerifyCount: 3,
    brandCorrectionsCount: 9,
    summary: 'Transformed generic 220-word promotional post into an authoritative 680-word practical visitor guide. Eliminated 9 prohibited travel clichés, converted spelling to Canadian English, preserved all links and images with enhanced alt text, verified guide quotation attribution, flagged 3 pricing and seasonal claims for editorial confirmation, and added crucial cobblestone accessibility guidance.',
  },
  status: 'fact_check_required',
  editorialNotes: 'Editor reminder: Confirm admission cost and summer slot availability on Historic Environment Scotland before sending to CMS.',
  createdAt: '2026-08-24T12:00:00.000Z',
  updatedAt: '2026-08-24T12:00:00.000Z',
  version: 1,
};
