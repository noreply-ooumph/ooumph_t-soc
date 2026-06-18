import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Filter, 
  ChevronRight, 
  LineChart, 
  Search,
  MessageSquare,
  Globe,
  Radio,
  FileCheck,
  Building,
  X
} from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  specialization: string;
  category: 'Crisis Communication' | 'Corporate Strategy' | 'Public Relations' | 'Leadership Messaging' | 'Digital Marketing';
  bioPlaceholder: string;
  backgroundYears: number;
  credentials: string[];
  imageUrl: string;
}

interface ExpertsGridProps {
  onNavigate?: (path: string) => void;
}

export default function ExpertsGrid({ onNavigate }: ExpertsGridProps) {
  const expertsList: Expert[] = [
    {
      id: 'shreesh-sarvagya',
      name: 'Shreesh Sarvagya',
      specialization: 'Corporate Strategy & Public Affairs',
      category: 'Corporate Strategy',
      bioPlaceholder: 'Distinguished advisory counselor specializing in executive narrative architectures, high-level advocacy systems, and regulatory policy interface alignments.',
      backgroundYears: 38,
      credentials: ['Strategic Policy Alliance', 'Advisory Board Partner', 'Narrative Risk Auditor'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_de6601ff5b004b81b26d38f17d1d5598~mv2.jpg'
    },
    {
      id: 'niranjan-mishra',
      name: 'Niranjan Mishra',
      specialization: 'Corporate Remorst & Remedial PR',
      category: 'Crisis Communication',
      bioPlaceholder: 'Specialized corporate restructurer advising on public apologies, liability language audits, and long-term organizational value retention during crises.',
      backgroundYears: 36,
      credentials: ['Crisis Room Lead Counselor', 'Senior Discourse Architect', 'Corporate Remediation Cert'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_1d63bf1f100d4f13919761f8343d48e1~mv2.jpg'
    },
    {
      id: 'rajeev-sharma',
      name: 'Rajeev Sharma',
      specialization: 'Public Relations & Strategic Media',
      category: 'Public Relations',
      bioPlaceholder: 'Veteran media relations director with extensive active portfolios. Specializes in managing corporate perception cycles and national narrative structures.',
      backgroundYears: 35,
      credentials: ['Liaison Lead, Apex Press Council', 'Syllabus Board Member', 'Senior Press Counsel'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_942bb3a05fb2482cac29072d118d5f42~mv2.jpg'
    },
    {
      id: 'sanjay-mathur',
      name: 'Sanjay Mathur',
      specialization: 'Media Relations & Stakeholder Alignment',
      category: 'Public Relations',
      bioPlaceholder: 'Senior communications practitioner focused on structuring public-private interface channels and managing large-scale brand-to-media narratives.',
      backgroundYears: 34,
      credentials: ['Media Strategy Director', 'Narrative Blueprint Scholar', 'Advisory Board Officer'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_4de15e5c03594118b360492ddf7e06cd~mv2.jpg'
    },
    {
      id: 'arun-asthana',
      name: 'Arun Asthana',
      specialization: 'Corporate Communications & Governance',
      category: 'Corporate Strategy',
      bioPlaceholder: 'Dedicated corporate operations analyst focusing on standardizing transparent organizational disclosure metrics across complex corporate hierarchies.',
      backgroundYears: 33,
      credentials: ['Corporate Integrity Assessor', 'Master Speech Scholar', 'Audit Board Advisor'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_c64203641a19485d80ae0a84facf21f7~mv2.jpg'
    },
    {
      id: 'gopal-rangaraj',
      name: 'Gopal Rangaraj',
      specialization: 'High-Impact Crisis Mitigation',
      category: 'Crisis Communication',
      bioPlaceholder: 'Strategic crisis counselor focused on post-merger integration mitigation, restorative dialogue systems, and high-frequency corporate defense structures.',
      backgroundYears: 32,
      credentials: ['Panelist, Global Integrity Guild', 'Disaster Containment Specialist', 'Senior Restructuring Advisor'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_bee4db34064b4747b3f67c156a9cce5c~mv2.jpg'
    },
    {
      id: 'kandarp-jani',
      name: 'Kandarp Jani',
      specialization: 'Executive Leadership Dialogue',
      category: 'Leadership Messaging',
      bioPlaceholder: 'Prominent leadership speech advisor helping elite management teams master high-stake boardroom communications and executive discourse metrics.',
      backgroundYears: 31,
      credentials: ['Strategic Communicator Cert', 'Elite Speaking Mentor', 'Executive Discourse Evaluator'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_a8c0896cb3794cb893802a3a565c50f6~mv2.jpg'
    },
    {
      id: 'sandeep-nath',
      name: 'Sandeep Nath',
      specialization: 'Digital Brand Voice & Narrative Flow',
      category: 'Digital Marketing',
      bioPlaceholder: 'Strategic planner mapping uniform brand declarations across digital communication ecosystems, public web environments, and automated customer models.',
      backgroundYears: 31,
      credentials: ['Ecosystem Brand Manager', 'Digital Retention Strategist', 'Technical Systems Advisor'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_1ac8a505ef58479caadae0d2631e8e5d~mv2.jpg'
    },
    {
      id: 'praveen-pankajakshan',
      name: 'Praveen Pankajakshan',
      specialization: 'Behavioral Analytics & Discourse Evaluation',
      category: 'Leadership Messaging',
      bioPlaceholder: 'Analytical dialogue evaluator specializing in real-time vocal feedback systems, behavioral indicators, and non-verbal truth metric integration.',
      backgroundYears: 30,
      credentials: ['Behavioral Signals Researcher', 'Systematic Delivery Analyst', 'Linguistic Integrity Assessor'],
      imageUrl: 'https://static.wixstatic.com/media/ddddbc_9f92e5780dd04982aff28b0f1b3152a4~mv2.jpg'
    }
  ];

  const sanitizedExperts: Expert[] = expertsList;

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  
  // Hovered card details for additional immersive 3D highlights
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Categories list
  const categoriesList = [
    { code: 'ALL', label: 'All Fields' },
    { code: 'Crisis Communication', label: 'Crisis Communication' },
    { code: 'Corporate Strategy', label: 'Corporate Strategy' },
    { code: 'Public Relations', label: 'Public Relations' },
    { code: 'Leadership Messaging', label: 'Leadership Messaging' },
    { code: 'Digital Marketing', label: 'Digital Marketing' }
  ];

  // Filter logic
  const filteredExperts = useMemo(() => {
    return sanitizedExperts.filter((expert) => {
      const matchesCategory = selectedCategory === 'ALL' || expert.category === selectedCategory;
      const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             expert.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             expert.bioPlaceholder.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, sanitizedExperts]);

  // Aggregate stats
  const totalExperience = useMemo(() => {
    return sanitizedExperts.reduce((sum, e) => sum + e.backgroundYears, 0);
  }, [sanitizedExperts]);

  return (
    <div id="experts-showcase-root" className="space-y-10 py-2 text-slate-200">
      
      {/* 300+ Combined Person-Years Prominent Hero Metric Block */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        id="experts-experience-hero" 
        className="bg-navy-950/90 backdrop-blur-md text-white rounded-lg border border-white/5 p-6 md:p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-mono text-teal-400 font-bold tracking-widest block uppercase animate-pulse">
              // INSTITUTIONAL COHORT STRENGTH
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans text-teal-100 text-center">
              Eminent Scholars & <span className="text-teal-400">Narrative Directors</span>
            </h2>
            <p className="text-slate-350 text-xs md:text-sm leading-relaxed max-w-2xl">
              T-SOC features an elite panel of retired speech coaches, former corporate spokespeople, and regulatory communication specialists. Collectively, we enforce clarity where ambiguity introduces financial and brand risk.
            </p>
          </div>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="md:col-span-4 bg-[#030712]/90 border border-teal-500/25 rounded-lg p-5 text-center space-y-1 shadow-[0_0_20px_rgba(20,184,166,0.1)] relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-teal-555" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-black font-mono text-teal-350 tracking-tight"
            >
              {totalExperience}+
            </motion.div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold">
              Combined Person-Years
            </div>
            <p className="text-[10px] text-slate-300 italic font-sans">
              of elite public & corporate communications defense systems
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter and Search Panel */}
      <div className="bg-[#091122]/90 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="space-y-1 flex-1">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#0D9488]" /> Specialty Classification Filter
            </h3>
            <p className="text-[11px] text-slate-500 font-sans">Segment the super expert registry by their priority syllabus category.</p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experts or key methodologies..."
              className="w-full text-xs font-sans pl-10 pr-3.5 py-3 bg-navy-950 border border-white/5 rounded-md focus:outline-none focus:border-teal-400 focus:bg-[#030712] text-white transition-all placeholder:text-slate-550 hover:border-white/20"
            />
          </div>
        </div>

        {/* Filter Pill List with sliding active accent line (layoutId) */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.code;
            return (
              <button
                key={cat.code}
                onClick={() => setSelectedCategory(cat.code)}
                className="relative px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer focus:outline-none overflow-hidden"
              >
                {/* Active Backdrop Slider */}
                {isSelected && (
                  <motion.div 
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-teal-500/10 border border-teal-500/35 rounded-lg z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className={`relative z-10 font-bold ${
                  isSelected ? 'text-teal-300' : 'text-slate-400 hover:text-white'
                }`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Expert Profiles */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        id="experts-grid-container"
      >
        <AnimatePresence mode="popLayout">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert, idx) => {
              const isHovered = hoveredCardId === expert.id;
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ 
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1] // Custom smooth ease-out (cubic-bezier)
                  }}
                  key={expert.id}
                  onMouseEnter={() => setHoveredCardId(expert.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => setSelectedExpert(expert)}
                  whileHover={{ y: -6, z: 10 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  className="bg-[#091122]/90 border border-white/10 rounded-lg shadow-xl hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer"
                >
                  {/* Glowing 3D card ambient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                  
                  {/* Card top accent line */}
                  <div className="h-1 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-teal-400 transition-all duration-200" />
                  
                  {/* Expert Headshot Banner */}
                  <div className="relative h-56 overflow-hidden bg-slate-950 border-b border-white/5">
                    <img 
                      src={expert.imageUrl} 
                      alt={expert.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091122] via-transparent to-transparent opacity-90" />
                  </div>
                  
                  <div className="p-5 flex-1 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded-full bg-[#030712] text-teal-400 border border-teal-500/20">
                          {expert.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-medium">
                          {expert.backgroundYears} Yrs Exp
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white tracking-tight group-hover:text-teal-350 transition-colors font-sans pt-0.5">
                        {expert.name}
                      </h4>
                      <p className="text-[11px] text-teal-400 font-mono leading-tight font-bold">
                        {expert.specialization}
                      </p>
                    </div>

                    <hr className="border-white/5 animate-pulse" />

                    {/* Profile Placeholder text */}
                    <p className="text-slate-400 text-xs leading-relaxed font-sans min-h-[60px]">
                      {expert.bioPlaceholder}
                    </p>

                    {/* Technical Credentials List */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[9px] font-mono text-slate-500 block font-bold tracking-widest">// SECURED CREDENTIAL CODES</span>
                      <div className="flex flex-wrap gap-1.5">
                        {expert.credentials.map((cred, idx) => (
                          <span 
                            key={idx}
                            className="text-[9px] font-mono font-bold bg-[#030712] text-slate-400 border border-white/5 hover:border-teal-500/30 hover:text-teal-305 transition-colors px-2 py-1 rounded-sm block"
                          >
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Secure Booking CTA Link */}
                  <div className="bg-navy-950/80 backdrop-blur-xs border-t border-white/10 p-3.5 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:bg-[#030712] group-hover:text-teal-400 transition-colors">
                    <span className="font-bold flex items-center gap-1.5 text-[10px]">
                      <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" /> VETTING CLEARED
                    </span>
                    <span className="text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition-all text-[10px] flex items-center gap-1">
                      Explore Profile <ChevronRight className="w-3 h-3 animate-pulse" />
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center bg-[#091122]/90 backdrop-blur-md border border-white/10 rounded-lg space-y-4 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-navy-950 border border-white/5 flex items-center justify-center mx-auto text-slate-550">
                <Search className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-mono text-teal-400 uppercase tracking-wider">No Experts Identified</h4>
                <p className="text-xs text-slate-450 max-w-sm mx-auto font-sans leading-relaxed">
                  Adjust your search parameters or select a different specialty filter above to find core scholars.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* BIOMETRIC TELEMETRY MODAL POPUP */}
      {createPortal(
      <AnimatePresence>
        {selectedExpert && (
          <div
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px',
              background: 'rgba(5,11,24,0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {/* Backdrop click close */}
            <div
              style={{ position: 'absolute', inset: 0, cursor: 'zoom-out' }}
              onClick={() => setSelectedExpert(null)}
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '672px', maxHeight: '90vh', overflowY: 'auto' }}
              className="bg-[#091122] border border-white/15 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden text-left"
            >
              {/* Colored top accent safety clip */}
              <div className="h-1.5 bg-gradient-to-r from-[#e8601c] via-teal-400 to-indigo-600" />

              {/* Close Button on Top Right */}
              <button 
                onClick={() => setSelectedExpert(null)}
                className="absolute top-5 right-5 p-2 bg-[#050b18] hover:bg-orange-950/40 text-slate-400 hover:text-orange-400 border border-white/5 hover:border-orange-500/20 rounded-full transition-colors cursor-pointer z-20"
                aria-label="Close Profile Portal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header Profile info with Avatar */}
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-slate-900 shadow-md">
                    <img 
                      src={selectedExpert.imageUrl} 
                      alt={selectedExpert.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-2 flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-teal-500/10 border border-teal-500/25 text-teal-355 font-mono text-[9px] font-black tracking-widest px-2.5 py-1 rounded-sm uppercase leading-none">
                        {selectedExpert.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ID Code: REG-TS-{selectedExpert.id.toUpperCase().slice(0, 5)}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                      {selectedExpert.name}
                    </h3>
                    <p className="text-teal-450 font-mono text-xs sm:text-sm font-bold">
                      {selectedExpert.specialization} — <span className="text-white">{selectedExpert.backgroundYears} Years Elite Governance</span>
                    </p>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Grid layout for detailed diagnostic telemetry stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Left segment: bio and credentials */}
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-slate-500 block font-bold tracking-widest uppercase">// ACADEMIC PORTFOLIO BRIEF</span>
                      <p className="text-[#a0aec0] text-xs leading-relaxed font-sans">
                        {selectedExpert.bioPlaceholder}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 block font-bold tracking-widest uppercase">// VERIFIED INSTITUTIONAL CREDENTIALS</span>
                      <div className="space-y-1.5">
                        {selectedExpert.credentials.map((cred, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2 text-xs font-sans text-[#cbd5e0]">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full shrink-0" />
                            <span>{cred}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right segment: fictional responsive biometric communication logs */}
                  <div className="bg-[#050b18]/90 border border-white/5 p-4 rounded-xl space-y-4 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center text-[9px] font-mono text-teal-400">
                      <span>// BIOMETRIC TELEMETRY INDEX</span>
                      <span className="flex items-center gap-1 font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> LIVE LAB SYNC
                      </span>
                    </div>

                    <div className="space-y-3 pt-1">
                      
                      {/* Jargon purity calibration indicator */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">
                          <span>Jargon purification coefficient</span>
                          <span className="text-white">98.2% (Pristine)</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-[#e8601c] w-[98.2%] rounded-full shadow-[0_0_8px_rgba(232,96,28,0.7)]" />
                        </div>
                      </div>

                      {/* Stress jitter deflection */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">
                          <span>Acoustic Stress Deviation Index</span>
                          <span className="text-white">&lt; 8.5% variance</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-400 w-[12%] rounded-full" />
                        </div>
                      </div>

                      {/* Vocal resonance stability coefficient */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">
                          <span>Vocal resonance steady coefficient</span>
                          <span className="text-white">96 / 100</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 w-[96%] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                        </div>
                      </div>

                    </div>

                    {/* Fictional micro soundwave visual animation strip */}
                    <div className="flex gap-1 justify-center items-end h-7 pt-1 overflow-hidden" title="Acoustic vocal patterns calibration feed">
                      {[6, 12, 18, 10, 22, 14, 8, 16, 24, 11, 7, 15, 20, 9, 3].map((val, bIdx) => (
                        <div 
                          key={bIdx} 
                          style={{ height: `${val + Math.sin(bIdx)*3}px` }}
                          className="w-1.5 bg-[#e8601c]/40 rounded-t-sm animate-pulse" 
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action button pairing for immediate admissions enrollment */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] font-mono text-slate-500 leading-tight pr-4">
                    * ALL ADMISSIONS PROTOCOLS ARE SUBJECT TO CONFIDENTIAL INSTITUTIONAL SCREENING PROCEDURES.
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedExpert(null);
                      if (onNavigate) onNavigate('/admissions');
                    }}
                    className="w-full sm:w-auto bg-teal-500/10 hover:bg-teal-650/30 border border-teal-500/25 text-white hover:text-white font-mono text-[10.5px] font-black tracking-wider uppercase px-6 py-3.5 rounded-lg shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request Faculty Alignment Session</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* Advisory foot block */}
      <motion.div 
        whileHover={{ scale: 1.002 }}
        className="p-5 bg-[#091122]/90 border border-white/10 rounded-lg text-xs text-slate-400 space-y-2 leading-relaxed shadow-xl"
      >
        <p className="font-bold uppercase tracking-wider font-mono text-teal-400 text-[9.5px] animate-pulse">// SYLLABUS DIRECTORY PROTOCOL</p>
        <p>
          Each representative listed above commands active modules inside our certified curriculum. To align with security goals, scholars deliver face-to-face modules exclusively at our campus located in Gautam Nagar, New Delhi.
        </p>
      </motion.div>

    </div>
  );
}
