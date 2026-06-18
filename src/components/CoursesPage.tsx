import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Clock,
  Users,
  Video,
  MapPin,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  User,
  GraduationCap,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  X,
  Sliders,
  CheckCircle,
  Monitor,
  BookMarked
} from 'lucide-react';
import { certificateCourses, shortTermCourses } from '../data/coursesData';
import { CertificateCourse, ShortTermCourse, CertificateCategory } from '../types';

interface CoursesPageProps {
  onNavigate?: (path: string) => void;
  initialTab?: 'certificate' | 'short-term';
}

export default function CoursesPage({ onNavigate, initialTab = 'certificate' }: CoursesPageProps) {
  const [activeTab, setActiveTab] = useState<'certificate' | 'short-term'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'Hybrid' | 'Online'>('All');
  const [highlightedCourseId, setHighlightedCourseId] = useState<string | null>(null);

  // Handle pending course from Enquire button on landing page
  useEffect(() => {
    const pendingId = sessionStorage.getItem('tsoc_pending_course');
    const pendingType = sessionStorage.getItem('tsoc_pending_course_type');
    if (!pendingId) return;
    sessionStorage.removeItem('tsoc_pending_course');
    sessionStorage.removeItem('tsoc_pending_course_type');

    const tab = pendingType === 'short' ? 'short-term' : 'certificate';
    setActiveTab(tab);
    setHighlightedCourseId(pendingId);

    // Wait for tab switch + render, then scroll
    setTimeout(() => {
      const elId = tab === 'certificate' ? `course-id-${pendingId}` : `short-course-${pendingId}`;
      const el = document.getElementById(elId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // Remove highlight after 3s
      setTimeout(() => setHighlightedCourseId(null), 3000);
    }, 600);
  }, []);
  const [finderStep, setFinderStep] = useState(0);
  const [finderDone, setFinderDone] = useState(false);
  const [finderAnswers, setFinderAnswers] = useState<Record<string,string>>({});
  const [selectedInstructor, setSelectedInstructor] = useState<'All' | 'Shreesh Sarvagya' | 'Rajiv Sharma'>('All');
  const [selectedShortTermSegment, setSelectedShortTermSegment] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<CertificateCourse | ShortTermCourse | null>(null);

  // Available Short-Term segments
  const segmentsList = useMemo(() => {
    return ['All', 'Senior Leaders', 'CEOs', 'HR Professionals', 'CSR Professionals', 'Working Executives', 'Communication Students'];
  }, []);

  // Certificate category descriptions
  const categoryDescriptions: Record<CertificateCategory, string> = {
    'Executive Communication & Presence': 'Develop the vocal authority, physical presence, and precise language that C-suite executives need to lead with clarity, command boardrooms, and inspire stakeholder confidence.',
    'Content Strategy & Brand': 'Build robust brand narratives, content governance frameworks, and heritage archives that maintain organisational integrity across every channel and stakeholder audience.',
    'Crisis & Reputation Management': 'Equip your organisation to detect, respond to, and recover from reputational threats with structured crisis architectures, forensic media audits, and identity defence protocols.',
    'Internal & Employee Communications': 'Replace corporate filler language with authentic dialogue systems that drive measurable employee engagement, morale, and cross-functional alignment.',
    'CSR & ESG Communications': 'Communicate environmental and social impact with verifiable, empirical rigour — eradicating greenwashing and building long-term trust with regulators, communities, and investors.',
    'Governance, Policy & Public Affairs': 'Master the rhetoric of boardrooms, legislative chambers, diplomatic tables, and AGM floors — drafting policy documents, proxy statements, and civic addresses that withstand scrutiny.',
    'Digital & Social Media': 'Govern your organisation\'s digital footprint with precision — structuring online communities, managing real-time social crises, and calibrating digital tone for institutional audiences.',
  };

  // Certificate category order
  const categoryOrder: CertificateCategory[] = [
    'Executive Communication & Presence',
    'Content Strategy & Brand',
    'Crisis & Reputation Management',
    'Internal & Employee Communications',
    'CSR & ESG Communications',
    'Governance, Policy & Public Affairs',
    'Digital & Social Media',
  ];

  // Segment descriptions matching real T-SOC website
  const segmentDescriptions: Record<string, string> = {
    'Senior Leaders': 'These 2-day courses are best suited to Board Level and C-Suite Executives who would like to sharpen and deepen their understanding of a few crucial aspects of communications — to be able to guide and drive their communications teams to deliver results aligned with organizational vision.',
    'CEOs': 'Intensive private coaching and cohort programs designed exclusively for Chief Executives — covering media posture, boardroom rhetoric, crisis leadership, and the personal credibility frameworks that define industry-leading CEOs.',
    'HR Professionals': 'Targeted intensives for HR leaders who want to replace corporate filler language with authentic communication frameworks that drive real employee engagement, DEI alignment, and organizational cohesion.',
    'CSR Professionals': 'Calibrated specifically for CSR and Sustainability leads. Learn to formulate verifiable impact narratives, ESG disclosure statements, and community engagement protocols that stand up to institutional scrutiny.',
    'Working Executives': 'Practical communication intensives for executives at every level — from mastering executive brief writing to stakeholder presentations and ethical negotiation communication.',
    'Communication Students': 'The definitive foundation for aspiring communications professionals — grounding you in classical rhetoric, corporate writing, and digital communication with real-world application frameworks.',
  };

  // Filtered Certificate Courses
  const filteredCertificateCourses = useMemo(() => {
    return certificateCourses.filter(course => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.modules.some(mod => mod.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFormat = selectedFormat === 'All' || course.format === selectedFormat;
      
      const matchesInstructor = 
        selectedInstructor === 'All' || 
        course.instructors.includes(selectedInstructor);
        
      return matchesSearch && matchesFormat && matchesInstructor;
    });
  }, [searchQuery, selectedFormat, selectedInstructor]);

  // Filtered Short-Term Courses
  const filteredShortTermCourses = useMemo(() => {
    return shortTermCourses.filter(course => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.keyTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFormat = selectedFormat === 'All' || course.format === selectedFormat;
      
      const matchesInstructor = 
        selectedInstructor === 'All' || 
        course.instructors.includes(selectedInstructor);

      const matchesSegment = 
        selectedShortTermSegment === 'All' || 
        course.segment === selectedShortTermSegment;
        
      return matchesSearch && matchesFormat && matchesInstructor && matchesSegment;
    });
  }, [searchQuery, selectedFormat, selectedInstructor, selectedShortTermSegment]);

  const handleApplyAdmissions = () => {
    if (onNavigate) {
      onNavigate('/admissions');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFormat('All');
    setSelectedInstructor('All');
    setSelectedShortTermSegment('All');
  };

  // Motion variants for grid staggering
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 py-2 text-slate-200 font-sans max-w-7xl mx-auto px-4 md:px-6"
    >
      
      {/* HEADER BILLBOARD */}
      <div className="bg-[#091122]/95 backdrop-blur-md text-white p-8 md:p-12 rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-teal-505/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest font-black uppercase">// ROLLING MATRICULATION OPEN</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none text-teal-100 font-sans text-center">
            Curriculum & <span className="text-teal-400">Academic Registers</span>
          </h1>
          
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans max-w-2xl">
            Our curriculum leaves no room for gamified scores, habit loops, or modern corporate filler words. Explore 27 exhaustive Certificate focus tracks and target-specific short term intensives led by C-suite academic authorities.
          </p>
        </div>

        {/* Rolling Admissions Advisory Banner */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <div className="flex gap-2.5 items-center bg-[#030712]/90 p-4 rounded-md border border-white/10 text-slate-400 max-w-2xl">
            <Info className="w-5 h-5 text-teal-400 shrink-0" />
            <p className="leading-relaxed text-[11px]">
              <strong className="text-white">Advisory on Scheduling:</strong> In keeping with strategic executive governance, tuition fee schedules and starting dates are administered strictly via rolling individual admissions.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(20,184,166,0.3)', backgroundColor: 'rgba(20,184,166,0.2)' }}
            whileTap={{ scale: 0.98 }}
            id="billboard-admissions-cta"
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=inquiry@t-soc.com', '_blank')}
            className="bg-teal-500/10 text-teal-300 hover:text-white font-mono text-[11px] font-bold px-5 py-3 rounded-sm border border-teal-500/30 transition-all cursor-pointer flex items-center justify-center md:self-auto shrink-0 self-stretch"
          >
            <span>Talk to Us</span>
            <ChevronRight className="w-3.5 h-3.5 animate-bounce" />
          </motion.button>
        </div>
      </div>

      {/* Mixed Mode Delivery Banner */}
      <div className="mixed-mode-banner relative overflow-hidden rounded-2xl border-2 border-teal-400/40 p-7 md:p-10 shadow-xl shadow-teal-900/30" style={{background:'#0b1f35'}}>
        {/* Glow only on the right so left text stays high-contrast */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{background:'rgba(20,184,166,0.22)'}} />
        <div className="absolute right-24 bottom-0 w-52 h-52 rounded-full blur-2xl pointer-events-none" style={{background:'rgba(45,212,191,0.12)'}} />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">

          {/* Left: Headline */}
          <div className="flex-1 space-y-4">
            <span className="mixed-mode-badge inline-flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{background:'rgba(20,184,166,0.2)',border:'1px solid rgba(94,234,212,0.4)'}}>
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              How We Deliver
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight" style={{color:'#ffffff'}}>
              Program{' '}
              <span className="mixed-mode-teal underline decoration-wavy" style={{color:'#5eead4',textDecorationColor:'rgba(94,234,212,0.6)'}}>Methodology.</span>
            </h2>
            <p className="text-sm md:text-base font-semibold leading-relaxed max-w-xl" style={{color:'#e2e8f0'}}>
              Most programs are offered in Mixed-Mode, involving online and offline classes.
            </p>
          </div>

          {/* Right: Two cards without percentages */}
          <div className="flex gap-3 shrink-0 w-full lg:w-auto">
            <div className="flex-1 lg:w-44 rounded-xl p-5 text-center space-y-2" style={{background:'rgba(255,255,255,0.07)',border:'2px solid rgba(255,255,255,0.22)'}}>
              <div className="w-8 h-1 rounded mx-auto" style={{background:'rgba(255,255,255,0.65)'}} />
              <p className="mixed-mode-online-label text-xs font-bold uppercase tracking-wide leading-snug">Live Online<br/>Classes</p>
              <p className="mixed-mode-online-sub text-[11px] font-sans leading-snug">Learn from Top Global Faculty from across the world</p>
            </div>
            <div className="font-black text-xl self-center shrink-0" style={{color:'#ffffff'}}>+</div>
            <div className="flex-1 lg:w-44 rounded-xl p-5 text-center space-y-2" style={{background:'rgba(20,184,166,0.28)',border:'2px solid rgba(94,234,212,0.55)',boxShadow:'0 8px 24px rgba(20,184,166,0.25)'}}>
              <div className="w-8 h-1 rounded mx-auto" style={{background:'#5eead4'}} />
              <p className="mixed-mode-physical-label text-xs font-bold uppercase tracking-wide leading-snug">Offline<br/>Sessions</p>
              <p className="mixed-mode-physical-sub text-[11px] font-sans leading-snug">Hands-on at our facilities; Corporate programs also delivered at your facilities</p>
            </div>
          </div>

        </div>
      </div>

      {/* Course Finder Quiz */}
      {!finderDone ? (
        <div className="bg-[#080d19] border-2 border-teal-500/30 rounded-2xl p-7 space-y-6 shadow-lg shadow-teal-900/20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-teal-400 font-black uppercase tracking-widest block">// PROGRAMME MATCHER</span>
              <h3 className="text-xl font-black text-white mt-1.5 leading-tight">Find your ideal programme in 3 quick questions</h3>
            </div>
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <div key={i} className={`w-8 h-2 rounded-full transition-all ${i <= finderStep ? 'bg-teal-500' : 'bg-white/15'}`} />
              ))}
            </div>
          </div>

          {finderStep === 0 && (
            <div className="space-y-4 animate-fade-in-up">
              <p className="text-white text-base font-bold font-sans">How much time can you commit?</p>
              <div className="flex flex-wrap gap-3">
                {[{label:'2 weeks — intensive immersion', val:'2w'},{label:'2 months — certificate track', val:'2m'},{label:'3+ months — deep transformation', val:'3m+'}].map(opt => (
                  <button key={opt.val} type="button" onClick={() => { setFinderAnswers(a => ({...a, time: opt.val})); setFinderStep(1); }}
                    className="bg-white/8 hover:bg-teal-600 border-2 border-white/20 hover:border-teal-500 text-white text-sm font-sans font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {finderStep === 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <p className="text-white text-base font-bold font-sans">What is your primary goal?</p>
              <div className="flex flex-wrap gap-3">
                {[{label:'Advance my corporate career', val:'career'},{label:'Build organisational capability', val:'org'},{label:'Personal executive confidence', val:'personal'}].map(opt => (
                  <button key={opt.val} type="button" onClick={() => { setFinderAnswers(a => ({...a, goal: opt.val})); setFinderStep(2); }}
                    className="bg-white/8 hover:bg-teal-600 border-2 border-white/20 hover:border-teal-500 text-white text-sm font-sans font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {finderStep === 2 && (
            <div className="space-y-4 animate-fade-in-up">
              <p className="text-white text-base font-bold font-sans">Your current level?</p>
              <div className="flex flex-wrap gap-3">
                {[{label:'Building foundations', val:'beginner'},{label:'Mid-level professional', val:'mid'},{label:'Senior executive', val:'senior'}].map(opt => (
                  <button key={opt.val} type="button" onClick={() => { setFinderAnswers(a => ({...a, level: opt.val})); setFinderDone(true); }}
                    className="bg-white/8 hover:bg-teal-600 border-2 border-white/20 hover:border-teal-500 text-white text-sm font-sans font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-teal-900/20 border border-teal-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-mono text-teal-400 font-black uppercase tracking-widest block">// YOUR BEST FIT</span>
            <p className="text-white text-sm font-black mt-1">
              {finderAnswers.time === '2w' ? 'Strategic Crisis Communication Intensive' :
               finderAnswers.time === '2m' ? 'Professional Communications Certificate' :
               finderAnswers.level === 'senior' ? 'Boardroom Communication Dynamics Elite' :
               'Executive Leadership Dialogue Certificate'}
            </p>
            <p className="text-slate-400 text-[11px] font-sans mt-1">Based on your answers — this track aligns with your timeline and goals.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={() => { setFinderDone(false); setFinderStep(0); setFinderAnswers({}); }}
              className="text-[10px] font-mono text-slate-400 hover:text-white border border-white/10 px-3 py-2 rounded-lg transition-all cursor-pointer">
              Retake
            </button>
            <button type="button" onClick={() => onNavigate && onNavigate('/checkout')}
              className="text-[10px] font-mono font-bold bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-all cursor-pointer">
              Enrol Now →
            </button>
          </div>
        </div>
      )}

      {/* CORE SEARCH & SEARCH CONFIGURATION CONTROLS */}
      <div className="bg-[#091122]/90 border border-white/10 p-5 rounded-lg space-y-4 shadow-2xl text-slate-200">

        {/* Tab Controls with sliding focus underlines */}
        <div id="catalog-toggles-bar" className="flex border-b border-white/5 relative">
          <button
            id="tab-certificate-courses"
            onClick={() => { setActiveTab('certificate'); clearFilters(); }}
            className={`relative px-5 py-3.5 font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 focus:outline-none`}
          >
            {activeTab === 'certificate' && (
              <motion.div 
                layoutId="activeCatalogTabLine" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 z-15"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <Layers className="w-4 h-4 text-teal-450 z-10" />
            <span className={`z-10 ${activeTab === 'certificate' ? 'text-teal-300 font-extrabold' : 'text-slate-400 hover:text-white'}`}>
              Certificate Programs (27 Courses)
            </span>
          </button>
          
          <button
            id="tab-shortterm-courses"
            onClick={() => { setActiveTab('short-term'); clearFilters(); }}
            className={`relative px-5 py-3.5 font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 focus:outline-none`}
          >
            {activeTab === 'short-term' && (
              <motion.div 
                layoutId="activeCatalogTabLine" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 z-15"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <Clock className="w-4 h-4 text-teal-455 z-10" />
            <span className={`z-10 ${activeTab === 'short-term' ? 'text-teal-300 font-extrabold' : 'text-slate-400 hover:text-white'}`}>
              Short-Term Intensives (6 Segments)
            </span>
          </button>
        </div>

        {/* search and filter tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <Search className="w-4 h-4 text-[#0D9488]" />
            </span>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              id="course-search-field"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'certificate' ? "Search 27 courses, modules (Executive Writing, Content, Social)..." : "Search short term segment key topics..."}
              className="w-full text-xs font-sans p-3 pl-10 bg-navy-950 border border-white/5 rounded-sm focus:bg-[#030712] focus:border-teal-400 outline-none transition-all placeholder:text-slate-550 text-white hover:border-white/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-350 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Format filter */}
          <div className="lg:col-span-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block grow-0 shrink-0">Format:</span>
              <select
                id="format-select-filter"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                className="w-full text-xs font-sans p-2.5 bg-navy-950 border border-white/5 rounded-md focus:border-teal-400 text-white outline-none cursor-pointer hover:border-white/20"
              >
                <option value="All" className="bg-[#050b18]">All Formats (Hybrid & Online)</option>
                <option value="Hybrid" className="bg-[#050b18]">Hybrid Models (Delhi Campus)</option>
                <option value="Online" className="bg-[#050b18]">Online Models (Fully Digital)</option>
              </select>
            </div>
          </div>

          {/* Instructor filter */}
          <div className="lg:col-span-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block grow-0 shrink-0">Faculty:</span>
              <select
                id="faculty-select-filter"
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value as any)}
                className="w-full text-xs font-sans p-2.5 bg-navy-950 border border-white/5 rounded-md focus:border-teal-400 text-white outline-none cursor-pointer hover:border-white/20"
              >
                <option value="All" className="bg-[#050b18]">All Super Experts</option>
                <option value="Shreesh Sarvagya" className="bg-[#050b18]">Shreesh Sarvagya</option>
                <option value="Rajiv Sharma" className="bg-[#050b18]">Rajiv Sharma</option>
              </select>
            </div>
          </div>

          {/* Dynamic selector depending on active tab */}
          {activeTab === 'short-term' ? (
            <div className="lg:col-span-2">
              <select
                id="segment-select-filter"
                value={selectedShortTermSegment}
                onChange={(e) => setSelectedShortTermSegment(e.target.value)}
                className="w-full text-xs font-sans p-2.5 bg-navy-950 border border-teal-550/40 text-teal-300 font-bold rounded-sm focus:border-teal-400 outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#050b18]">All target segments</option>
                {segmentsList.slice(1).map(seg => (
                  <option key={seg} value={seg} className="bg-[#050b18]">{seg}</option>
                ))}
              </select>
            </div>
          ) : (
            <button 
              onClick={clearFilters}
              className="lg:col-span-2 text-[11px] font-mono font-bold text-slate-400 hover:text-white bg-navy-950 hover:bg-navy-900 p-2.5 border border-white/5 rounded-md transition-all text-center flex items-center justify-center cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {(selectedFormat !== 'All' || selectedInstructor !== 'All' || searchQuery !== '' || (activeTab === 'short-term' && selectedShortTermSegment !== 'All')) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400 font-bold">
            <span>Active Filters:</span>
            {searchQuery && (
              <span className="bg-[#030712] border border-white/5 px-2.5 py-1 rounded-sm flex items-center gap-1">
                Query: "{searchQuery}"
                <X className="w-2.5 h-2.5 cursor-pointer text-slate-400 hover:text-white" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {selectedFormat !== 'All' && (
              <span className="bg-[#030712] border border-white/5 px-2.5 py-1 rounded-sm flex items-center gap-1">
                Format: {selectedFormat}
                <X className="w-2.5 h-2.5 cursor-pointer text-slate-400 hover:text-white" onClick={() => setSelectedFormat('All')} />
              </span>
            )}
            {selectedInstructor !== 'All' && (
              <span className="bg-[#030712] border border-teal-500/20 text-teal-400 px-2.5 py-1 rounded-sm flex items-center gap-1">
                Facilitator: {selectedInstructor}
                <X className="w-2.5 h-2.5 cursor-pointer text-slate-400 hover:text-white" onClick={() => setSelectedInstructor('All')} />
              </span>
            )}
            {activeTab === 'short-term' && selectedShortTermSegment !== 'All' && (
              <span className="bg-[#030712] border border-teal-500/20 text-teal-400 px-2.5 py-1 rounded-xs flex items-center gap-1">
                Audience: {selectedShortTermSegment}
                <X className="w-2.5 h-2.5 cursor-pointer text-slate-400 hover:text-white" onClick={() => setSelectedShortTermSegment('All')} />
              </span>
            )}
            <button 
              className="text-teal-400 hover:underline font-bold ml-auto uppercase text-[9px]"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* CORE CATALOG FEED */}
      <AnimatePresence mode="wait">
        {activeTab === 'certificate' ? (
          
          /* ============== CERTIFICATE LISTINGS — GROUPED BY CATEGORY ============== */
          <motion.div
            key="certificate-feed"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={listVariants}
            id="certificate-catalog-wrapper"
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 font-bold">
              <span>SHOWING <strong className="text-teal-400 font-sans font-black">{filteredCertificateCourses.length}</strong> CERTIFICATE PROGRAMS TO ADVISE</span>
              <span className="text-[#0D9488] font-bold animate-pulse">// ACADEMIC COMPLIANCE ASSURANCE: ACTIVE</span>
            </div>

            {filteredCertificateCourses.length > 0 ? (() => {
              const grouped = categoryOrder.reduce<Record<CertificateCategory, CertificateCourse[]>>((acc, cat) => {
                const courses = filteredCertificateCourses.filter(c => c.category === cat);
                if (courses.length > 0) acc[cat] = courses;
                return acc;
              }, {} as Record<CertificateCategory, CertificateCourse[]>);

              return (
                <div className="space-y-14">
                  {(Object.entries(grouped) as [CertificateCategory, CertificateCourse[]][]).map(([category, courses]) => (
                    <motion.div key={category} variants={cardVariants} className="space-y-6">

                      {/* Category Header */}
                      <div className="border-b border-white/10 pb-5 space-y-2">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-1.5 bg-teal-400 rounded-full shrink-0" style={{alignSelf:'stretch'}} />
                          <h3 className="font-sans font-black text-4xl md:text-5xl">
                            <span className="text-teal-300">{category}</span>
                          </h3>
                          <div className="w-1.5 bg-teal-400 rounded-full shrink-0" style={{alignSelf:'stretch'}} />
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-3xl text-center mx-auto">
                          {categoryDescriptions[category]}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 text-center">
                          {courses.length} Certificate Program{courses.length > 1 ? 's' : ''} in this track
                        </p>
                      </div>

                      {/* 3-column course cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, idx) => (
                          <motion.div
                            key={course.id}
                            variants={cardVariants}
                            whileHover={{ y: -6, borderColor: 'rgba(20,184,166,0.45)' }}
                            transition={{ duration: 0.3 }}
                            id={`course-id-${course.id}`}
                            className="bg-[#091122]/90 border border-white/10 rounded-lg flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_22px_45px_rgba(20,184,166,0.12)] transition-all relative group text-slate-200 cursor-pointer"
                            style={highlightedCourseId === course.id ? { boxShadow: '0 0 0 3px #f97316, 0 0 32px rgba(249,115,22,0.4)', borderColor: '#f97316' } : {}}
                          >
                            <div className="p-6 space-y-4">
                              <div className="space-y-1.5 pt-1">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold border uppercase ${
                                    course.format === 'Hybrid'
                                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/20'
                                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                  }`}>
                                    {course.format} Model
                                  </span>
                                  <span className="font-mono text-[10px] text-slate-500">
                                    ID: {course.id.replace('cert-', 'TS-')}
                                  </span>
                                </div>
                                <h4 className="font-sans font-bold text-sm text-white group-hover:text-teal-400 transition-colors line-clamp-2" title={course.name}>
                                  {course.name}
                                </h4>
                              </div>

                              <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                                {course.description}
                              </p>

                              <div className="grid grid-cols-2 gap-2 bg-[#030712]/90 p-3 rounded-md border border-white/5 text-[11px] font-mono shadow-inner">
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <Users className="w-3.5 h-3.5 text-teal-400" />
                                  <span>{course.classSizeMin}–{course.classSizeMax} Scholars</span>
                                </div>
                              </div>

                              <div className="space-y-1.5 pt-1">
                                <span className="font-mono text-[9px] text-slate-500 block font-bold uppercase tracking-wider">// DESIGNATED KEY MODULES</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {course.modules.map((mod, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 rounded-sm font-sans text-[10px] border bg-[#030712] border-white/5 text-slate-400 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
                                    >
                                      {mod}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 bg-[#030712]/60 p-4 shrink-0 flex flex-col gap-2">
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                                <User className="w-3.5 h-3.5 text-[#0D9488]" />
                                <span>Facilitator: <strong className="text-white font-sans">{course.instructors.join(' & ')}</strong></span>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                onClick={() => setSelectedCourse(course)}
                                className="w-full mt-1 bg-teal-500/10 hover:bg-teal-600/35 text-white font-mono text-[10px] font-bold py-2.5 rounded-sm border border-teal-500/20 hover:border-teal-400 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <span>Know More</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                    </motion.div>
                  ))}
                </div>
              );
            })() : (
              <div className="text-center p-12 bg-[#091122]/90 border border-white/10 rounded-lg space-y-4 shadow-2xl">
                <span className="bg-[#030712] p-3 rounded-full text-slate-500 inline-block">
                  <Search className="w-6 h-6 animate-bounce" />
                </span>
                <h4 className="font-sans font-bold text-white text-sm">No certificate courses match your criteria</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Try resetting the facilitators, formats, or adjust query terms to map the T-SOC matrix.</p>
                <button
                  onClick={clearFilters}
                  className="bg-teal-500/15 hover:bg-teal-600 text-white font-mono text-xs font-bold px-4 py-2 border border-teal-500/30 rounded-sm cursor-pointer"
                >
                  Reset Filter Pipeline
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          
          /* ============== SHORT-TERM LISTINGS — GROUPED BY SEGMENT ============== */
          <motion.div
            key="shortterm-feed"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={listVariants}
            id="short-term-catalog-wrapper"
            className="space-y-6"
          >

            {/* Informational intro card */}
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="bg-teal-500/5 p-5 border border-teal-500/20 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-teal-400 font-bold tracking-widest block uppercase">// TARGETED SEGMENT DESIGN CORES</span>
                <h4 className="font-sans font-black text-white text-[15px]">Adaptive Short-Term Simulation Intensive Retreats</h4>
                <p className="text-slate-300 text-xs font-sans leading-relaxed">
                  Calibrated to give quick cognitive posture changes in 10-24 targeted simulator-hours. Courses grouped by audience: Senior Leaders, CEOs, HR Professionals, CSR Professionals, Working Executives, and Communication Students.
                </p>
              </div>
              <div className="bg-[#030712] border border-white/10 py-1.5 px-3 rounded-sm font-mono text-[10px] text-slate-400 shrink-0">
                CAMPUS SETUP: DELHI EXCLUSIVE
              </div>
            </motion.div>

            <div className="flex justify-between items-center text-xs font-mono text-slate-400 font-bold">
              <span>SHOWING <strong className="text-teal-400 font-sans font-black">{filteredShortTermCourses.length}</strong> KEY INTENSIVES</span>
              <span>FACULTY SUPERVISION: ASSURED ACTIVE</span>
            </div>

            {filteredShortTermCourses.length > 0 ? (() => {
              // Group courses by segment, preserving display order
              const segmentOrder = ['Senior Leaders', 'CEOs', 'HR Professionals', 'CSR Professionals', 'Working Executives', 'Communication Students'];
              const grouped = segmentOrder.reduce<Record<string, ShortTermCourse[]>>((acc, seg) => {
                const courses = filteredShortTermCourses.filter(c => c.segment === seg);
                if (courses.length > 0) acc[seg] = courses;
                return acc;
              }, {});

              return (
                <div className="space-y-14">
                  {Object.entries(grouped).map(([segment, courses]) => (
                    <motion.div key={segment} variants={cardVariants} className="space-y-6">

                      {/* Segment Header */}
                      <div className="border-b border-white/10 pb-5 space-y-2">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-1.5 bg-teal-400 rounded-full shrink-0" style={{alignSelf:'stretch'}} />
                          <h3 className="font-sans font-black text-4xl md:text-5xl">
                            <span className="text-teal-300">Courses For {segment}</span>
                          </h3>
                          <div className="w-1.5 bg-teal-400 rounded-full shrink-0" style={{alignSelf:'stretch'}} />
                        </div>
                        {segmentDescriptions[segment] && (
                          <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-3xl text-center mx-auto">
                            {segmentDescriptions[segment]}
                          </p>
                        )}
                      </div>

                      {/* 3-column course cards for this segment */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {courses.map((course) => (
                          <motion.div
                            key={course.id}
                            variants={cardVariants}
                            whileHover={{ y: -5, borderColor: 'rgba(20,184,166,0.4)' }}
                            transition={{ duration: 0.25 }}
                            id={`short-course-${course.id}`}
                            className="bg-[#091122]/90 border border-white/10 rounded-lg flex flex-col overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)] transition-all group cursor-pointer"
                            style={highlightedCourseId === course.id ? { boxShadow: '0 0 0 3px #f97316, 0 0 32px rgba(249,115,22,0.4)', borderColor: '#f97316' } : {}}
                          >
                            {/* Card body */}
                            <div className="p-6 space-y-4 flex-1">
                              <div className="space-y-1.5">
                                <span className={`px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold border uppercase ${
                                  course.format === 'Hybrid'
                                    ? 'bg-teal-500/10 text-teal-300 border-teal-500/20'
                                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                }`}>
                                  {course.format} Model
                                </span>
                                <h4 className="font-sans font-bold text-sm text-white group-hover:text-teal-400 transition-colors leading-snug">
                                  {course.name}
                                </h4>
                              </div>

                              <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                                {course.description}
                              </p>

                              {/* Course meta */}
                              <div className="grid grid-cols-2 gap-2 bg-[#030712]/90 p-3 rounded-md border border-white/5 text-[11px] font-mono">
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <Users className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Class: {course.classSizeMin}–{course.classSizeMax}</span>
                                </div>
                              </div>

                              {/* Key topics */}
                              <div className="space-y-1.5">
                                <span className="font-mono text-[9px] text-slate-500 block font-bold uppercase tracking-wider">// FOCUS AREAS</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {course.keyTopics.map((topic, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-teal-500/10 text-teal-300 font-sans text-[10px] rounded-sm border border-teal-500/20 font-bold">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Card footer */}
                            <div className="border-t border-white/10 bg-[#030712]/60 p-4 space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                                <User className="w-3.5 h-3.5 text-teal-400" />
                                <span>Facilitator: <strong className="text-white font-sans">{course.instructors.join(' & ')}</strong></span>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                onClick={() => setSelectedCourse(course)}
                                className="w-full bg-[#0D9488] hover:bg-teal-600 text-white font-mono text-[10px] font-bold py-2.5 rounded-sm border border-teal-600 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                              >
                                <span>Know More</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                    </motion.div>
                  ))}
                </div>
              );
            })() : (
              <div className="text-center p-12 bg-[#091122]/90 border border-white/10 rounded-lg space-y-4 shadow-2xl">
                <span className="bg-[#030712] p-3 rounded-full text-slate-500 inline-block">
                  <Filter className="w-6 h-6 animate-bounce" />
                </span>
                <h4 className="font-sans font-bold text-white text-sm">No short-term intensives match these filters</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Readjust your facilitator selections, choose 'All' formats, or broaden targeted keywords.</p>
                <button
                  onClick={clearFilters}
                  className="bg-teal-500/20 hover:bg-teal-600 text-white font-mono text-xs font-bold px-4 py-2 border border-teal-500/30 rounded-sm cursor-pointer"
                >
                  Re-initialize Filter Pipeline
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMISSION PROCEDURES & CREDIBILITY CALLOUT */}
      <section className="bg-[#091122]/90 border border-white/10 rounded-lg p-6 md:p-8 space-y-6 text-slate-200 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-[#0D9488] font-black tracking-widest block uppercase">// GOVERNING INDUCTION PROTOCOL</span>
            <h3 className="font-sans font-bold text-lg text-white">Ready to secure stakeholder alignment?</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-2xl">
              Apply online or schedule an in-person diagnostic at our physical New Delhi headquarters (Gautam Nagar). Our council will perform a preliminary communication credentials review before matriculating potential scholars.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(20,184,166,0.3)', backgroundColor: 'rgba(20,184,166,0.2)' }}
            whileTap={{ scale: 0.98 }}
            id="procedures-admissions-cta"
            onClick={handleApplyAdmissions}
            className="w-full md:w-auto bg-teal-500/10 text-teal-300 hover:text-white border border-teal-500/20 hover:bg-teal-550/30 font-mono text-xs font-bold px-6 py-3.5 rounded-sm transition-all cursor-pointer shadow-md text-center"
          >
            Initiate Credentials Review
          </motion.button>
        </div>

        <div className="border-t border-white/5 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400 font-sans">
          <div className="space-y-1">
            <h5 className="font-bold text-teal-400 uppercase tracking-wider text-[10px] font-mono">// STEP 1: INITIAL COMPILING</h5>
            <p className="text-[11.5px] leading-relaxed">Submit your request specifying corporate title, organization structure, and target certificate cohorts.</p>
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-teal-400 uppercase tracking-wider text-[10px] font-mono">// STEP 2: FIDELITY AUDITING</h5>
            <p className="text-[11.5px] leading-relaxed">Our super experts schedule a direct diagnostic assessment loop to analyze existing dialogue jargon metrics.</p>
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-teal-400 uppercase tracking-wider text-[10px] font-mono">// STEP 3: INDEPENDENT ACTION</h5>
            <p className="text-[11.5px] leading-relaxed">Undermine corporate boilerplate errors completely. Implement transparent stakeholder communications framework.</p>
          </div>
        </div>
      </section>

    </motion.div>

      {/* COURSE DETAIL MODAL */}
      <AnimatePresence>
        {selectedCourse && (() => {
          const isCert = 'modules' in selectedCourse;
          const syllabus = isCert
            ? (selectedCourse as CertificateCourse).modules
            : (selectedCourse as ShortTermCourse).keyTopics;

          return (
            <motion.div
              key="course-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedCourse(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-[#030712]/92 backdrop-blur-md" />

              {/* Modal Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#091122] border border-white/15 rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.7)] text-white"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-500 rounded-t-xl" />

                {/* Close button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="p-6 md:p-10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                  {/* LEFT COLUMN: Title + Meta + CTA */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-widest block">
                        // {isCert ? (selectedCourse as CertificateCourse).category : (selectedCourse as ShortTermCourse).segment}
                      </span>
                      <h2 className="font-sans font-black text-xl md:text-2xl text-white leading-tight">
                        {selectedCourse.name}
                      </h2>
                    </div>

                    {/* Meta grid */}
                    <div className="space-y-3 border border-white/10 rounded-lg p-5 bg-[#030712]/60">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                        <div>
                          <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block">Duration</span>
                          <span className="text-white font-bold font-sans">{selectedCourse.duration}</span>
                        </div>
                      </div>
                      <div className="w-full h-px bg-white/5" />
                      <div className="flex items-center gap-3 text-sm">
                        <Monitor className="w-4 h-4 text-teal-400 shrink-0" />
                        <div>
                          <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block">Mode</span>
                          <span className="text-white font-bold font-sans">{selectedCourse.format}
                            {selectedCourse.format === 'Hybrid' ? ' — On Campus + Online' : ' — Fully Digital'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-px bg-white/5" />
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-4 h-4 text-teal-400 shrink-0" />
                        <div>
                          <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block">Class Size</span>
                          <span className="text-white font-bold font-sans">{selectedCourse.classSizeMin}–{selectedCourse.classSizeMax} Scholars</span>
                        </div>
                      </div>
                      <div className="w-full h-px bg-white/5" />
                      <div className="flex items-center gap-3 text-sm">
                        <User className="w-4 h-4 text-teal-400 shrink-0" />
                        <div>
                          <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block">Faculty</span>
                          <span className="text-white font-bold font-sans">{selectedCourse.instructors.join(' & ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Now CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(20,184,166,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const itemId = 'modules' in selectedCourse ? 'certificate-2m' : 'crisis-2w';
                        setSelectedCourse(null);
                        if (onNavigate) onNavigate(`/checkout/${itemId}`);
                      }}
                      className="w-full bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-sm py-4 rounded-lg shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 border border-teal-500/40"
                    >
                      <BookMarked className="w-4 h-4" />
                      Book Now / Enrol Desk
                    </motion.button>

                    <p className="text-[10px] font-mono text-slate-500 text-center leading-relaxed">
                      Admissions are by rolling intake. Our council will review your credentials before matriculation.
                    </p>
                  </div>

                  {/* RIGHT COLUMN: Description + Syllabus */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-widest block">// PROGRAMME OVERVIEW</span>
                      <p className="text-slate-300 text-sm leading-relaxed font-sans">
                        {selectedCourse.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-widest block">
                        // {isCert ? 'KEY MODULES & SYLLABUS' : 'FOCUS AREAS & TOPICS'}
                      </span>
                      <ul className="space-y-2.5">
                        {syllabus.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-sans">
                            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                            <span className="text-slate-200 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advisory note */}
                    <div className="border border-teal-500/20 bg-teal-500/5 rounded-lg p-4 text-xs text-slate-400 leading-relaxed font-sans">
                      <strong className="text-teal-300 font-mono text-[9px] uppercase tracking-wider block mb-1">// ADMISSIONS ADVISORY</strong>
                      Tuition fee schedules and batch starting dates are administered via rolling individual admissions. Contact the registrar for your personalized assessment and cohort allocation.
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>


    </>
  );
}
