import { CertificateCourse, ShortTermCourse } from '../types';

export const certificateCourses: CertificateCourse[] = [
  {
    id: 'cert-01',
    category: 'Executive Communication & Presence',
    name: 'Certificate in Executive Writing and Corporate Prose',
    duration: '45 hrs',
    format: 'Hybrid',
    classSizeMin: 8,
    classSizeMax: 12,
    description: 'Eradicate bureaucratic jargon. Calibrate executive briefs, memos, and shareholder statements to absolute transparency and boardroom clarity.',
    modules: ['Executive Writing', 'C-Suite Briefings', 'Stakeholder Framing', 'Tone Diagnostics'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-02',
    category: 'Content Strategy & Brand',
    name: 'Certificate in Content Strategy and Narrative Governance',
    duration: '30 hrs',
    format: 'Online',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Formulate highly aligned brand narratives across internal channels and public databases. Learn Content Management structure under tight scrutiny.',
    modules: ['Content Management', 'Narrative Integrity', 'Channel Orchestration', 'Style Guides'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-03',
    category: 'Digital & Social Media',
    name: 'Certificate in Social Media Governance and Brand Trust',
    duration: '40 hrs',
    format: 'Online',
    classSizeMin: 12,
    classSizeMax: 18,
    description: 'Structure dynamic digital footprints on public channels. Prevent brand dilution, manage crises, and configure Social Media Communications workflows.',
    modules: ['Social Media Communications', 'Reputation Defense', 'Real-time Engagement', 'Risk Auditing'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-04',
    category: 'Executive Communication & Presence',
    name: 'Certificate in C-Suite Public Posture and Media Relations',
    duration: '60 hrs',
    format: 'Hybrid',
    classSizeMin: 6,
    classSizeMax: 10,
    description: 'Calibrate vocal projection, somatic presence, and physical stance for live press conferences, televised panels, and parliamentary grids.',
    modules: ['Somatic Alignment', 'Press Room Dynamics', 'Interview Posture', 'Speech Inflection'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-05',
    category: 'Crisis & Reputation Management',
    name: 'Certificate in Crisis Communications and Stakeholder Assurance',
    duration: '50 hrs',
    format: 'Hybrid',
    classSizeMin: 8,
    classSizeMax: 12,
    description: 'Construct rapid, transparent corporate responses when incidents arise. Build immediate stakeholder alignment and restore cognitive trust.',
    modules: ['Crisis Architecture', 'Disclosure Protocols', 'Hostile Media Defense', 'Trust Restoration'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },
  {
    id: 'cert-06',
    category: 'Governance, Policy & Public Affairs',
    name: 'Certificate in Shareholder Meeting Rhetoric and Advocacy',
    duration: '35 hrs',
    format: 'Hybrid',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Command AGM debates. Articulate complex corporate decisions, handle proxy pushbacks, and outline organizational progress honestly.',
    modules: ['AGM Presentation', 'Proxy Advocacy', 'Financial Dialectics', 'Q&A Prep'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-07',
    category: 'Internal & Employee Communications',
    name: 'Certificate in Employee Engagement and Internal Dialogue Dynamics',
    duration: '45 hrs',
    format: 'Hybrid',
    classSizeMin: 12,
    classSizeMax: 15,
    description: 'Bridge executive offices with core staff. Design Town Halls and operational broadcasts that foster high retention and shared loyalty.',
    modules: ['Town Hall Formatting', 'Internal Alignment', 'Feedback Frameworks', 'Core Cascades'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-08',
    category: 'CSR & ESG Communications',
    name: 'Certificate in CSR Transparency and Sustainability Disclosures',
    duration: '30 hrs',
    format: 'Online',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Communicate ESG milestones with high integrity. Eradicate greenwashing and write verifiable, empirical impact briefs for public registries.',
    modules: ['ESG Reporting', 'Registry Validation', 'Impact Narratives', 'Community Advocacy'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },
  {
    id: 'cert-10',
    category: 'Content Strategy & Brand',
    name: 'Certificate in Brand Ethos Alignment and Strategic Positioning',
    duration: '40 hrs',
    format: 'Online',
    classSizeMin: 12,
    classSizeMax: 15,
    description: 'Define an organization’s qualitative trust baseline. Translate heritage values into clear, modern profiles that resonate natively.',
    modules: ['Heritage Mapping', 'Ethos Calibration', 'Market Differentiation', 'Trust Anchor points'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-11',
    category: 'Executive Communication & Presence',
    name: 'Certificate in Executive Presence and Vocal Projection',
    duration: '30 hrs',
    format: 'Hybrid',
    classSizeMin: 8,
    classSizeMax: 12,
    description: 'Harness breath control, vocal resonance, and cadence to project calm authority during board deliberation or crisis occurrences.',
    modules: ['Diaphragmatic Loops', 'Pitch Optimization', 'Cadence Variations', 'Vocal Durability'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-12',
    category: 'Crisis & Reputation Management',
    name: 'Certificate in Corporate Identity Orchestration and Reputation Defense',
    duration: '45 hrs',
    format: 'Hybrid',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Steer public trust parameters through mergers, acquisitions, or restructuring. Build cohesive institutional narrative alignment.',
    modules: ['M&A Communication', 'Reputation Auditing', 'Unified Branding', 'Integrity Benchmarks'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-13',
    category: 'Governance, Policy & Public Affairs',
    name: 'Certificate in Cross-National Communications and Institutional Diplomacy',
    duration: '50 hrs',
    format: 'Hybrid',
    classSizeMin: 8,
    classSizeMax: 12,
    description: 'Navigate global communications compliance. Understand linguistic nuances, trade desk statements, and inter-organizational diplomacy.',
    modules: ['Diplomatic Drafting', 'Regulatory Protocols', 'Cultural Nuances', 'Joint Assurances'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-14',
    category: 'Crisis & Reputation Management',
    name: 'Certificate in Media Grid Auditing and Forensic Communications',
    duration: '35 hrs',
    format: 'Online',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Audit visual coverage metrics, flag disinformation, and analyze audience perception dynamics to build corrective trust portfolios.',
    modules: ['Media Mapping', 'Perception Metrics', 'Disinformation Defense', 'Fidelity Auditing'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-15',
    category: 'Governance, Policy & Public Affairs',
    name: 'Certificate in Boardroom Deliberation and Alignment Tactics',
    duration: '40 hrs',
    format: 'Hybrid',
    classSizeMin: 6,
    classSizeMax: 10,
    description: 'Direct vital conversations during closed boardroom sessions. Keep board members aligned without unnecessary rhetorical fluff.',
    modules: ['Conflict Resolution', 'Resolution Drafting', 'Consensus Engineering', 'Boardroom Etiquette'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-16',
    category: 'Governance, Policy & Public Affairs',
    name: 'Certificate in Legislative Advocacy and Regulatory Communication',
    duration: '45 hrs',
    format: 'Hybrid',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Author rigorous briefings, public policy comments, and parliamentary dossiers that stand up to meticulous legal and civil reviews.',
    modules: ['Policy Writing', 'Lobbying Frameworks', 'Legislative Dossiers', 'Civic Communications'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-17',
    category: 'Internal & Employee Communications',
    name: 'Certificate in Strategic Persuasion and Hostile Dialogue Management',
    duration: '30 hrs',
    format: 'Hybrid',
    classSizeMin: 8,
    classSizeMax: 12,
    description: 'De-escalate aggressive inquiries from third parties, bad-faith public groups, or activist shareholders with humble and factual prose.',
    modules: ['De-escalation Paths', 'Active Reframing', 'Factual Anchor Points', 'Stress Resilience'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-18',
    category: 'Digital & Social Media',
    name: 'Certificate in Digital Ethos and Online Community Calibration',
    duration: '40 hrs',
    format: 'Online',
    classSizeMin: 15,
    classSizeMax: 20,
    description: 'Formulate community principles for interactive business nodes. Keep global stakeholder discussions constructive and high-fidelity.',
    modules: ['Digital Governance', 'Community Moderation', 'Dialogue Calibration', 'Friction Reducers'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-19',
    category: 'Internal & Employee Communications',
    name: 'Certificate in Strategic Customer Advocacy and Trust Architecture',
    duration: '35 hrs',
    format: 'Online',
    classSizeMin: 12,
    classSizeMax: 15,
    description: 'Rethink how an organization directly speaks to its client base. Audit scripts and auto-responses for direct transparency and truth.',
    modules: ['Response Engineering', 'Trust Indexes', 'Support Calibration', 'Direct Communication'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-20',
    category: 'CSR & ESG Communications',
    name: 'Certificate in Non-Governmental Stakeholder Collaboration',
    duration: '40 hrs',
    format: 'Hybrid',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Co-build collaborative community protocols with municipal authorities, non-profits, and grassroots committees to secure local goodwill.',
    modules: ['Civic Alliances', 'Consensus Forums', 'Grassroots Dialogue', 'CSR Integration'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-21',
    category: 'Executive Communication & Presence',
    name: 'Certificate in Cognitive Fidelity Modeling for Executive Dialogues',
    duration: '50 hrs',
    format: 'Hybrid',
    classSizeMin: 8,
    classSizeMax: 12,
    description: 'Use advanced rhetoric metrics to identify, dissect, and remove filler buzzwords. Achieve the maximum clarity parameters.',
    modules: ['Linguistic Compression', 'Jargon Auditing', 'Executive Metrics', 'Truth Indices'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-22',
    category: 'Content Strategy & Brand',
    name: 'Certificate in Corporate Heritage Narrative and Archive Preservation',
    duration: '30 hrs',
    format: 'Online',
    classSizeMin: 12,
    classSizeMax: 15,
    description: 'Distill historic founder ethos, company genesis logs, and trade registry milestones into reliable narratives that anchor internal culture.',
    modules: ['Archive Curating', 'Genesis Formulation', 'Historical Veracity', 'Cultural Anchoring'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'cert-23',
    category: 'Crisis & Reputation Management',
    name: 'Certificate in Crisis Readiness and Communication War-Room Simulation',
    duration: '48 hrs',
    format: 'Hybrid',
    classSizeMin: 6,
    classSizeMax: 10,
    description: 'Step into live-action physical and online simulations. Navigate rapidly unraveling disaster drills, hostile press leaks, and grid defense issues.',
    modules: ['Crisis Scenarios', 'War-Room Structuring', 'Preemption Tactics', 'Real-Time Disclosure'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },
  {
    id: 'cert-24',
    category: 'CSR & ESG Communications',
    name: 'Certificate in Integrated Corporate Reporting and ESG Communication',
    duration: '32 hrs',
    format: 'Online',
    classSizeMin: 10,
    classSizeMax: 15,
    description: 'Marry financial declarations seamlessly with qualitative stakeholder reports. Bring high clarity and verifiable metric formatting.',
    modules: ['Integrated Frameworks', 'Clarity Parameters', 'Report Structuring', 'Quantitative Trust'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'cert-27',
    category: 'Internal & Employee Communications',
    name: 'Certificate in Gamification for Employee Engagement',
    duration: '30 hrs',
    format: 'Online',
    classSizeMin: 15,
    classSizeMax: 20,
    description: 'Integrate custom-engineered incentive pathways inside corporate channels. Drive sustainable alignment without superficial badges or routines.',
    modules: ['Incentive Engineering', 'Gamification Mechanics', 'Operational Alignment', 'Sustainable Engagement'],
    instructors: ['Rajiv Sharma']
  }
];

export const shortTermCourses: ShortTermCourse[] = [

  // ── SENIOR LEADERS ────────────────────────────────────────
  {
    id: 'short-sl-01',
    segment: 'Senior Leaders',
    name: 'Communication for Organizational Change',
    duration: '15 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 5,
    description: 'These 2-day courses are best suited to Board Level and C-Suite Executives who want to sharpen their understanding of crucial communications aspects — guiding and driving their teams to deliver results aligned with organizational vision.',
    keyTopics: ['Change Communication Strategy', 'Executive Alignment', 'Stakeholder Messaging', 'Organizational Vision Framing'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'short-sl-02',
    segment: 'Senior Leaders',
    name: 'Corporate Social Responsibility (CSR) Communication',
    duration: '15 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 5,
    description: 'Equip senior executives with the language and frameworks to communicate CSR initiatives with integrity, precision, and stakeholder alignment across public and institutional channels.',
    keyTopics: ['CSR Narrative Governance', 'Stakeholder Assurance', 'ESG Disclosure', 'Institutional Trust Building'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },
  {
    id: 'short-sl-03',
    segment: 'Senior Leaders',
    name: 'Executive Communication Coaching',
    duration: '12 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 3,
    description: 'A highly personalized coaching intensive for board-level executives to strengthen personal communication posture, boardroom presence, and strategic public positioning.',
    keyTopics: ['Executive Presence', 'Personal Branding', 'Boardroom Rhetoric', 'Vocal Authority'],
    instructors: ['Shreesh Sarvagya']
  },

  // ── CEOs ──────────────────────────────────────────────────
  {
    id: 'short-ceo-01',
    segment: 'CEOs',
    name: 'CEO Credibility and Public Narrative',
    duration: '10 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 3,
    description: 'A private 1-to-1 coaching sprint for chief officers. Focuses on high-stakes media posture, investor earnings disclosure structure, and establishing unshakeable thought leadership.',
    keyTopics: ['Executive Posture', 'Earnings Call Strategy', 'Media Interrogations', 'Thought Leadership'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'short-ceo-02',
    segment: 'CEOs',
    name: 'Crisis Communication for Chief Executives',
    duration: '12 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 3,
    description: 'Prepare CEOs to lead communication during organizational crises. Covers rapid response structuring, press conference command, and stakeholder trust restoration.',
    keyTopics: ['Crisis Response Architecture', 'Press Conference Command', 'Trust Restoration', 'Stakeholder Alignment'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'short-ceo-03',
    segment: 'CEOs',
    name: 'Boardroom Alignment & Rhetorical Defense',
    duration: '14 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 5,
    description: 'An elite module for chief executives to master honest dialectic persuasion, boardroom conflict de-escalation, and alignment without rhetorical compromise.',
    keyTopics: ['Boardroom Dialectics', 'Conflict De-escalation', 'Honest Persuasion', 'Strategic Alignment'],
    instructors: ['Shreesh Sarvagya']
  },

  // ── HR PROFESSIONALS ──────────────────────────────────────
  {
    id: 'short-hr-01',
    segment: 'HR Professionals',
    name: 'Employee Communication and Engagement',
    duration: '12 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 10,
    description: 'Equips HR leaders with communication architectures that replace corporate buzzwords with authentic employee engagement pathways and measurable morale outcomes.',
    keyTopics: ['Internal Dialogue Design', 'Engagement Architecture', 'Town Hall Orchestration', 'Feedback Frameworks'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },
  {
    id: 'short-hr-02',
    segment: 'HR Professionals',
    name: 'Diversity, Equity, and Inclusion (DEI) Communication',
    duration: '10 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 6,
    description: 'Build DEI communication frameworks that go beyond policy compliance — creating honest, inclusive internal language that reflects organizational values and builds team trust.',
    keyTopics: ['Inclusive Language Frameworks', 'DEI Policy Communication', 'Bias Awareness Messaging', 'Cultural Sensitivity'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'short-hr-03',
    segment: 'HR Professionals',
    name: 'Talent Development and Training',
    duration: '10 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 8,
    description: 'Design structured communication programs for talent pipelines. Covers performance review language, coaching dialogue design, and L&D communication best practices.',
    keyTopics: ['Performance Review Language', 'Coaching Dialogue', 'L&D Communication', 'Talent Pipeline Messaging'],
    instructors: ['Rajiv Sharma']
  },

  // ── CSR PROFESSIONALS ────────────────────────────────────
  {
    id: 'short-csr-01',
    segment: 'CSR Professionals',
    name: 'CSR Strategy and Communication Planning',
    duration: '15 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 8,
    description: 'Formulate CSR communication strategies aligned with organizational values and public accountability standards. Learn to build verifiable, empirical impact narratives for registries.',
    keyTopics: ['CSR Strategy Design', 'Impact Narrative', 'Registry Advocacy', 'Public Accountability'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'short-csr-02',
    segment: 'CSR Professionals',
    name: 'Community Engagement and Stakeholder Dialogue',
    duration: '12 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 8,
    description: 'Build authentic community engagement communication frameworks. Co-design dialogue protocols with municipal authorities, NGOs, and grassroots groups to secure local trust.',
    keyTopics: ['Community Trust Building', 'NGO Dialogue', 'Grassroots Engagement', 'Municipal Communication'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },
  {
    id: 'short-csr-03',
    segment: 'CSR Professionals',
    name: 'CSR Communication and ESG Reporting',
    duration: '15 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 6,
    description: 'Master empirical ESG disclosure and impact storytelling. Eradicate greenwashing and write verifiable, metric-backed reports for public registries and institutional audiences.',
    keyTopics: ['ESG Metrics Governance', 'Empirical Reporting', 'Anti-Greenwashing Protocols', 'Impact Storytelling'],
    instructors: ['Rajiv Sharma']
  },

  // ── WORKING EXECUTIVES ───────────────────────────────────
  {
    id: 'short-we-01',
    segment: 'Working Executives',
    name: 'High-Impact Executive Writing and Brief Mastery',
    duration: '20 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 8,
    description: 'Accelerate your vertical climb within corporate hierarchies. Compose precise briefs, dossiers, and decision memos that immediately speak to C-Suite decision-making needs.',
    keyTopics: ['Executive Brief Drafting', 'C-Suite Delivery', 'Logical Formatting', 'Decision Memo Writing'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'short-we-02',
    segment: 'Working Executives',
    name: 'Stakeholder Communication and Presentation Skills',
    duration: '16 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 8,
    description: 'Build confident, structured communication for internal presentations, client-facing dialogues, and cross-functional stakeholder alignment sessions.',
    keyTopics: ['Presentation Structure', 'Stakeholder Framing', 'Boardroom Confidence', 'Cross-functional Dialogue'],
    instructors: ['Shreesh Sarvagya']
  },
  {
    id: 'short-we-03',
    segment: 'Working Executives',
    name: 'Negotiation and Persuasion Communication',
    duration: '14 hrs',
    format: 'Hybrid',
    classSizeMin: 1,
    classSizeMax: 10,
    description: 'Master the art of ethical persuasion and negotiation communication for business settings. Learn to de-escalate conflict and drive consensus with honest, structured dialogue.',
    keyTopics: ['Ethical Persuasion', 'Negotiation Frameworks', 'Conflict De-escalation', 'Consensus Communication'],
    instructors: ['Shreesh Sarvagya', 'Rajiv Sharma']
  },

  // ── COMMUNICATION STUDENTS ───────────────────────────────
  {
    id: 'short-cs-01',
    segment: 'Communication Students',
    name: 'Principles of Dialogue Integrity and Classical Rhetoric',
    duration: '24 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 15,
    description: 'The definitive foundation for aspiring communications professionals. Marries classical rhetorical devices (ethos, pathos, logos) with contemporary disclosure and compliance regulations.',
    keyTopics: ['Classical Rhetorical Proofs', 'Ethos, Pathos, Logos', 'Disclosure Compliance', 'Career Readiness'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'short-cs-02',
    segment: 'Communication Students',
    name: 'Corporate Writing and Professional Communication',
    duration: '20 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 15,
    description: 'Build professional writing foundations for corporate environments. Covers email etiquette, report writing, press release structure, and internal communication best practices.',
    keyTopics: ['Corporate Writing Fundamentals', 'Email Etiquette', 'Press Release Writing', 'Report Structure'],
    instructors: ['Rajiv Sharma']
  },
  {
    id: 'short-cs-03',
    segment: 'Communication Students',
    name: 'Digital Media and Social Communication',
    duration: '18 hrs',
    format: 'Online',
    classSizeMin: 1,
    classSizeMax: 15,
    description: 'Navigate the intersection of digital platforms and professional communication. Learn brand voice governance, social content integrity, and crisis-readiness for digital channels.',
    keyTopics: ['Digital Brand Voice', 'Social Media Governance', 'Crisis Communication Online', 'Content Integrity'],
    instructors: ['Rajiv Sharma']
  }
];
