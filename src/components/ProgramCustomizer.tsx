import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Settings, 
  Sparkles, 
  GraduationCap, 
  AlertCircle,
  FileText,
  BadgeAlert,
  Sliders,
  Send
} from 'lucide-react';

interface ProgramCustomizerProps {
  onNavigate?: (path: string) => void;
}

export default function ProgramCustomizer({ onNavigate }: ProgramCustomizerProps) {
  // Wizard steps: 'specialties' | 'contact' | 'submitted'
  const [step, setStep] = useState<'specialties' | 'contact' | 'submitted'>('specialties');

  // Selected priority areas status
  const [focusAreas, setFocusAreas] = useState({
    crisis: false,
    leadership: false,
    digital: false,
    change: false,
  });

  // Client Data Fields
  const [orgName, setOrgName] = useState('');
  const [designation, setDesignation] = useState('');
  const [challenge, setChallenge] = useState('');
  const [groupSize, setGroupSize] = useState('10-25');
  const [preferredMode, setPreferredMode] = useState('Hybrid');
  const [repName, setRepName] = useState('');
  const [repEmail, setRepEmail] = useState('');

  // Field Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Toggle helpers
  const handleToggleFocus = (key: keyof typeof focusAreas) => {
    setFocusAreas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Step 1 Validation & Proceed
  const handleProceedToContact = () => {
    const selectedCount = Object.values(focusAreas).filter(Boolean).length;
    if (selectedCount === 0) {
      setErrors({ focusAreas: 'Please choose at least one priority curriculum focus area below to proceed.' });
      return;
    }
    setErrors({});
    setStep('contact');
  };

  // Step 2 Core Final Submission
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const newErrors: Record<string, string> = {};
    if (!orgName.trim()) {
      newErrors.orgName = 'Affiliated Organization Name is required.';
    }
    if (!designation.trim()) {
      newErrors.designation = 'Rep Designation / Title is required.';
    }
    if (!challenge.trim() || challenge.length < 15) {
      newErrors.challenge = 'Please summarize the core communications challenge (minimum 15 characters).';
    }
    if (!repName.trim()) {
      newErrors.repName = 'Representative Full Name is required.';
    }
    if (!repEmail.trim()) {
      newErrors.repEmail = 'Professional Representative Email coordinate is required.';
    } else if (!/\S+@\S+\.\S+/.test(repEmail)) {
      newErrors.repEmail = 'Please supply a robust corporate email format.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setStep('submitted');
    }, 1300);
  };

  const handleResetWizard = () => {
    setFocusAreas({
      crisis: false,
      leadership: false,
      digital: false,
      change: false,
    });
    setOrgName('');
    setDesignation('');
    setChallenge('');
    setGroupSize('10-25');
    setPreferredMode('Hybrid');
    setRepName('');
    setRepEmail('');
    setErrors({});
    setStep('specialties');
  };

  return (
    <div id="program-customizer-root" className="space-y-6 text-slate-200">
      
      {/* Intro Philosophy Header Block */}
      <motion.div 
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="bg-[#091122]/95 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-lg space-y-3.5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 text-teal-405 font-mono text-[10px] font-bold">
          <Settings className="w-4 h-4 animate-spin text-teal-400" />
          <span className="text-teal-400 animate-pulse">// BESPOKE ADVISORY CONDUIT</span>
        </div>
        
        <div className="space-y-3 pt-0.5">
          <h3 className="text-2xl md:text-3xl font-black text-teal-100 text-center">
            Course Customization
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            At the Trust School of Communications, we understand that organizations often have unique communication challenges and specific learning objectives. To address these distinct needs, we offer bespoke, tailor-made courses that draw upon components from our diverse range of programs. This customized approach allows us to create highly relevant and targeted learning experiences that align perfectly with an organization's goals, culture, and industry-specific requirements.
          </p>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
            Our tailor-made courses are delivered by a carefully curated team of super experts, each bringing specialized knowledge from various sub-disciplines of communication. This multi-faceted approach ensures that organizations receive comprehensive, cutting-edge instruction across all relevant areas. Whether it's crisis communication, leadership messaging, digital marketing, or any combination of communication skills, our expert-led, customized programs provide organizations with the exact tools and strategies they need to excel in their unique communication landscapes.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="pt-2 flex items-center gap-2 font-mono text-[10px] font-bold">
          <span className="text-slate-500">PROGRESS STATE:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-sm border text-[9px] transition-colors duration-200 ${step === 'specialties' ? 'bg-teal-950/80 text-teal-300 border-teal-550/40 font-black' : 'bg-[#030712] text-slate-500 border-white/5'}`}>
              01. Scope Specialties
            </span>
            <ArrowRight className="w-3 h-3 text-slate-650" />
            <span className={`px-2 py-0.5 rounded-sm border text-[9px] transition-colors duration-200 ${step === 'contact' ? 'bg-teal-950/80 text-teal-300 border-teal-555/40 font-black' : 'bg-[#030712] text-slate-500 border-white/5'}`}>
              02. Enterprise Context
            </span>
            <ArrowRight className="w-3 h-3 text-slate-655" />
            <span className={`px-2 py-0.5 rounded-sm border text-[9px] transition-colors duration-200 ${step === 'submitted' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35 font-black animate-pulse' : 'bg-[#030712] text-slate-500 border-white/5'}`}>
              03. Completed Profile
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Selection/Wizard Container */}
      <motion.div 
        layout
        whileHover={{ y: -3, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.12)" }}
        className="bg-[#091122]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl relative text-slate-200 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-teal-500 via-emerald-450 to-teal-600 animate-pulse" />

        <AnimatePresence mode="wait">
          {step === 'specialties' && (
            <motion.div 
              key="specialties"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              id="wizard-step-specialties" 
              className="p-6 md:p-8 space-y-6"
            >
              <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">// STEP 1: CONVERTIBILITY SPECTRUM</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Toggle the target communication pillars required for your custom syllabus.</p>
                </div>
                <Sliders className="w-4.5 h-4.5 text-slate-500" />
              </div>

              <AnimatePresence>
                {errors.focusAreas && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs rounded-lg font-sans flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 animate-bounce" />
                    <span>{errors.focusAreas}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Checkbox Pillar Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Box 1: Crisis Communication */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleToggleFocus('crisis')}
                  className={`p-4 border rounded-lg cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                    focusAreas.crisis 
                      ? 'border-teal-500/60 bg-teal-950/20 ring-1 ring-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                      : 'border-white/5 bg-[#030712]/40 hover:bg-[#030712]/80 hover:border-white/20'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={focusAreas.crisis}
                    onChange={() => {}} // Synced via container click
                    className="mt-1 h-4 w-4 rounded border-white/10 text-teal-500 focus:ring-teal-500 cursor-pointer bg-navy-950"
                  />
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs text-white font-sans group-hover:text-teal-400">Crisis Communications Mitigation</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Restorative brand speech protocols, anti-jitter verbal techniques, public disclosure sanitization, and regulatory response defense.
                    </p>
                  </div>
                </motion.div>

                {/* Box 2: Leadership Messaging */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleToggleFocus('leadership')}
                  className={`p-4 border rounded-lg cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                    focusAreas.leadership 
                      ? 'border-teal-500/60 bg-teal-950/20 ring-1 ring-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                      : 'border-white/5 bg-[#030712]/40 hover:bg-[#030712]/80 hover:border-white/20'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={focusAreas.leadership}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-white/10 text-teal-500 focus:ring-teal-500 cursor-pointer bg-navy-950"
                  />
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs text-white font-sans">Executive Leadership Messaging</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Mastering Boardroom level diplomacy, body alignment markers, pitch stabilization, and structural corporate announcements.
                    </p>
                  </div>
                </motion.div>

                {/* Box 3: Digital Marketing */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleToggleFocus('digital')}
                  className={`p-4 border rounded-lg cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                    focusAreas.digital 
                      ? 'border-teal-500/60 bg-teal-950/20 ring-1 ring-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                      : 'border-white/5 bg-[#030712]/40 hover:bg-[#030712]/80 hover:border-white/20'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={focusAreas.digital}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-white/10 text-teal-500 focus:ring-teal-500 cursor-pointer bg-navy-950"
                  />
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs text-white font-sans">Complex Digital Marketing Alignment</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Structuring clear, uniform brand declarations across decentralized channels without PR dilutive clichés.
                    </p>
                  </div>
                </motion.div>

                {/* Box 4: Change Management */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleToggleFocus('change')}
                  className={`p-4 border rounded-lg cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                    focusAreas.change 
                      ? 'border-teal-500/60 bg-teal-950/20 ring-1 ring-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                      : 'border-white/5 bg-[#030712]/40 hover:bg-[#030712]/80 hover:border-white/20'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={focusAreas.change}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-white/10 text-teal-500 focus:ring-teal-500 cursor-pointer bg-navy-950"
                  />
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs text-white font-sans">Corporate Change Management</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Internal post-restructuring, post-acquisition alignment briefings, and positive transition loops for personnel arrays.
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Customizer Note on Staffing */}
              <div className="p-4 bg-navy-950/95 border-l-4 border-teal-500 text-slate-400 text-xs font-sans space-y-1 leading-relaxed rounded-md">
                <p className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">// SPECIALIST DEPLOYMENT CRITERION</p>
                <p>
                  Once areas are chosen, our academic committee handpicks a team of T-SOC super experts (from our registered team including Sarvagya, Sharma, Nath, and Rangaraj) customized to deliver these precise target modules.
                </p>
              </div>

              {/* Next trigger */}
              <div className="flex justify-end pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(20,184,166,0.3)', backgroundColor: 'rgba(20,184,166,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToContact}
                  className="px-5 py-3 font-mono text-xs bg-teal-500/10 text-teal-300 hover:text-white rounded-sm border border-teal-500/20 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Proceed to Context Details</span>
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              id="wizard-step-contact" 
              className="p-6 md:p-8"
            >
              <form onSubmit={handleFormSubmission} className="space-y-6">
                
                <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">// STEP 2: ENTERPRISE AUDIT DETAILS</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Provide administrative parameter bounds for accurate syllabus scope formulation.</p>
                  </div>
                  <Building2 className="w-4.5 h-4.5 text-slate-500" />
                </div>

                <AnimatePresence>
                  {Object.keys(errors).length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg space-y-1.5 font-sans overflow-hidden"
                    >
                      <div className="font-bold font-mono text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                        <BadgeAlert className="w-4 h-4 text-rose-500 animate-bounce" />
                        Customizer blocked: Please resolve highlighted values
                      </div>
                      <ul className="list-disc list-inside text-[11px] space-y-0.5 pl-1.5 text-rose-300">
                        {Object.values(errors).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Organization & Designation Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Organization Name <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="text" 
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Paramount Pharma Group"
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all ${
                        errors.orgName ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {errors.orgName && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.orgName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Representative Professional Title / Designation <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="text" 
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Chief Talent Officer"
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all ${
                        errors.designation ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {errors.designation && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.designation}</p>}
                  </div>
                </div>

                {/* Rep Name & Rep Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Representative Name <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="text" 
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                      placeholder="e.g. Advait Sharma"
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all ${
                        errors.repName ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {errors.repName && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.repName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Professional Email Address <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="email" 
                      value={repEmail}
                      onChange={(e) => setRepEmail(e.target.value)}
                      placeholder="e.g. asharma@paramount.org"
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all ${
                        errors.repEmail ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {errors.repEmail && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.repEmail}</p>}
                  </div>
                </div>

                {/* Core Challenge */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                    Core Corporate Communication Challenge <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.005, borderColor: '#0d9488' }}
                    rows={4}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="Outline the specific dialogue gaps, jargon pollution, or crisis preparation goals your crew aims to remedy..."
                    className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all resize-none ${
                      errors.challenge ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                    }`}
                  />
                  <p className="text-[10px] text-slate-500 mt-1.5 font-sans">Minimum 15 characters. Describe the target scenario clearly.</p>
                  {errors.challenge && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.challenge}</p>}
                </div>

                {/* Group Size & Delivery Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Estimated Cohort Group Size
                    </label>
                    <motion.select 
                      whileFocus={{ scale: 1.005, borderColor: '#0d9488' }}
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                      className="w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border border-white/5 rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all cursor-pointer hover:border-white/20"
                    >
                      <option value="1-9" className="bg-[#050b18] text-white">Small Executive Core (1 - 9 members)</option>
                      <option value="10-25" className="bg-[#050b18] text-white">Standard Leadership Team (10 - 25 members)</option>
                      <option value="26-50" className="bg-[#050b18] text-white">Large Organization Cadre (26 - 50 members)</option>
                      <option value="50+" className="bg-[#050b18] text-white">Enterprise Wide Scale (50+ members)</option>
                    </motion.select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Preferred Mode of Delivery
                    </label>
                    <motion.select 
                      whileFocus={{ scale: 1.005, borderColor: '#0d9488' }}
                      value={preferredMode}
                      onChange={(e) => setPreferredMode(e.target.value)}
                      className="w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950 border border-white/5 rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all cursor-pointer hover:border-white/20"
                    >
                      <option value="In-Person" className="bg-[#050b18] text-white">In-Person Residential (Delhi Gautam Nagar HQ)</option>
                      <option value="Online" className="bg-[#050b18] text-white">Fully Synchronous Online</option>
                      <option value="Hybrid" className="bg-[#050b18] text-white">Hybrid Alignment Series</option>
                    </motion.select>
                  </div>
                </div>

                {/* Navigation Actions */}
                <div className="flex items-center justify-between border-t border-white/5 pt-5">
                  <button 
                    type="button"
                    onClick={() => setStep('specialties')}
                    className="px-4 py-2 font-mono text-xs text-slate-500 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Adjust Scope Pillars</span>
                  </button>

                  <motion.button 
                    whileHover={{ scale: 1.01, boxShadow: '0 0 15px rgba(20,184,166,0.3)', backgroundColor: 'rgba(20,184,166,0.2)' }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isTransmitting}
                    className="px-5 py-3.5 font-mono text-xs bg-teal-500/10 text-teal-300 hover:text-white border border-teal-500/20 shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-55 transition-all"
                  >
                    {isTransmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Formatting Configuration...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Bespoke Request</span>
                      </>
                    )}
                  </motion.button>
                </div>

              </form>
            </motion.div>
          )}

          {step === 'submitted' && (
            <motion.div 
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              id="wizard-step-submitted" 
              className="p-8 md:p-12 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-full mx-auto border border-emerald-500/35 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 block font-bold tracking-widest">// CHANNELS INITIALIZED</span>
                <h3 className="text-2xl font-black text-white">Bespoke Proposal Logged</h3>
                <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                  "Thanks for submitting!" We have successfully captured your custom program request. The Academy Curriculum Committee will review the core challenges against T-SOC's competency matrices.
                </p>
              </div>

              {/* Customizer Lead configuration recap */}
              <div className="max-w-md mx-auto p-5 bg-[#030712]/95 border border-white/10 rounded-lg text-left text-xs font-sans space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-2 border-b border-white/5">
                  <span>ESTABLISHED LEDGER: CONFIG-{(Math.floor(Math.random() * 9000) + 1000)}</span>
                  <span className="text-emerald-400 font-bold animate-pulse">// ROUTING ACTIVE</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-teal-400 font-semibold font-bold">Organization:</strong> {orgName}</p>
                  <p><strong className="text-teal-400 font-semibold font-bold">Signatory Rep:</strong> {repName} ({designation})</p>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    <strong className="text-teal-400 font-semibold font-bold">Syllabus Scope:</strong>{' '}
                    <span className="font-mono text-[9px] bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded-sm inline-block font-bold">
                      {Object.entries(focusAreas)
                        .filter(([_, val]) => val)
                        .map(([key]) => key.toUpperCase())
                        .join(' + ')}
                    </span>
                  </p>
                  <p><strong className="text-teal-400 font-semibold font-bold">Cohort Bounds:</strong> {groupSize} delegates | {preferredMode} Delivery</p>
                </div>
                <div className="pt-2 text-[10px] font-mono italic text-slate-520 border-t border-white/5 text-slate-500 leading-normal">
                  * An academic representative from our Gautam Nagar desk will transmit a customized syllabus proposal containing recommended super expert matches directly to: <strong className="text-slate-300">{repEmail}</strong>.
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleResetWizard}
                  className="px-5 py-3 text-xs font-mono bg-teal-500/10 hover:bg-teal-600/35 border border-teal-500/25 text-teal-300 rounded-sm shadow-md cursor-pointer transition-all"
                >
                  Configure Another Course Run
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
