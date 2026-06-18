import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Calendar,
  ArrowRight,
  MapPin,
  Users,
  Phone,
  Mail,
  BookOpen,
  Award,
  Terminal,
  ArrowUpRight,
  Lock,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

interface AdmissionsPageProps {
  onNavigate?: (path: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  }
};

export default function AdmissionsPage({ onNavigate }: AdmissionsPageProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [corporateTitle, setCorporateTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('boardroom-12m');
  const [statementOfIntent, setStatementOfIntent] = useState('');

  // Validation / Response states
  const [formState, setFormState] = useState<'idle' | 'validating' | 'submitted'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Wizard step state
  const [step, setStep] = useState(0);

  // Cohort programme options
  const cohortOptions = [
    { id: 'boardroom-12m', label: 'Boardroom Communication Dynamics (12-Month Elite Programme)', duration: '12 Months' },
    { id: 'crisis-2w', label: 'Strategic Crisis Communication Intensive (2-Week Immersion)', duration: '2 Weeks' },
    { id: 'certificate-2m', label: 'Professional Communications Certificate (2-Month Track)', duration: '2 Months' },
    { id: 'certificate-3m', label: 'Executive Leadership Dialogue Certificate (3–4 Month Track)', duration: '3–4 Months' },
    { id: 'custom-corporate', label: 'C-Suite Bespoke Advisory (Customised Duration)', duration: 'Flexible' },
  ];

  const handleValidateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }
    if (!email.trim()) {
      newErrors.email = 'A corporate email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid corporate email address.';
    }
    if (!corporateTitle.trim()) {
      newErrors.corporateTitle = 'Your professional title is required.';
    }
    if (!organization.trim()) {
      newErrors.organization = 'The name of your affiliated organisation is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const errorBox = document.getElementById('error-notices-anchor');
      if (errorBox) {
        errorBox.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Success submission chain
    setFormState('validating');

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          corporateTitle,
          organization,
          selectedCohort,
          statementOfIntent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Your application could not be submitted at this time. Please try again shortly.');
      }

      setFormState('submitted');
    } catch (err: any) {
      console.error('Admissions submission error:', err);
      setErrors({ submit: err.message || 'An unexpected error occurred. Please try again or contact our office directly.' });
      setFormState('idle');
      const errorBox = document.getElementById('error-notices-anchor');
      if (errorBox) {
        errorBox.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setCorporateTitle('');
    setOrganization('');
    setSelectedCohort('boardroom-12m');
    setStatementOfIntent('');
    setFormState('idle');
    setErrors({});
    setStep(0);
  };

  // Per-step validation
  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!fullName.trim()) newErrors.fullName = 'Please provide your full name.';
    } else if (s === 1) {
      if (!corporateTitle.trim()) newErrors.corporateTitle = 'Your professional title is required.';
    } else if (s === 2) {
      if (!organization.trim()) newErrors.organization = 'The name of your affiliated organisation is required.';
    } else if (s === 4) {
      if (!email.trim()) {
        newErrors.email = 'A corporate email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid corporate email address.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleSubmitWizard = async () => {
    // Validate final step (step 5 — statementOfIntent is optional, no validation needed)
    // but we call handleValidateAndSubmit which does full validation as a safety net
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleValidateAndSubmit(syntheticEvent);
  };

  const TOTAL_STEPS = 6; // steps 0–5

  // Question bubble component
  const QuestionBubble = ({ text }: { text: string }) => (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{background:'rgba(20,184,166,0.2)',border:'1px solid rgba(20,184,166,0.4)'}}>
        <Terminal className="w-3.5 h-3.5 text-teal-400" />
      </div>
      <div className="rounded-2xl rounded-tl-sm p-4 max-w-sm text-sm leading-relaxed font-sans" style={{background:'#1e293b',border:'1px solid rgba(255,255,255,0.12)',color:'#f1f5f9'}}>
        {text}
      </div>
    </div>
  );

  return (
    <motion.div
      id="admissions-root"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-12 py-4 max-w-7xl mx-auto px-4 md:px-6 text-slate-200"
    >
      {/* Page Heading & Context Panel */}
      <div className="border-b border-white/5 pb-5 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <span className="text-[10px] font-mono text-teal-400 block font-bold uppercase tracking-widest animate-pulse">
          // SECURE ADMISSIONS PORTAL // ROLLING ENROLMENT OPEN
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-teal-100 tracking-tight mt-1 font-sans text-center">
          Enrolment & <span className="text-teal-400">Admissions Registry</span>
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed max-w-3xl text-center mx-auto">
          Register with our New Delhi office to commence your academic journey at T-SOC. Each application is individually reviewed by our faculty council to ensure the programme selected is precisely aligned with your professional objectives and organisational context.
        </p>
      </div>

      {/* Grid: Form & Informative Advisory Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: THE FORM PANEL (7 cols) */}
        <motion.div
          whileHover={{ y: -3, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.12)" }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-7 backdrop-blur-md p-6 md:p-8 rounded-lg relative overflow-hidden"
          style={{background:'#091122',border:'1px solid rgba(255,255,255,0.10)',boxShadow:'0 20px 50px rgba(0,0,0,0.5)',color:'#e2e8f0'}}
        >
          <div className="absolute top-0 right-0 left-0 h-[2.5px] bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600" />

          <AnimatePresence mode="wait">
            {formState === 'submitted' ? (
              <motion.div
                key="success"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                id="admissions-success-view"
                className="text-center py-8 space-y-6"
              >
                <motion.div variants={itemVariants} className="w-16 h-16 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-full mx-auto border border-emerald-500/35 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <motion.div
                    initial={{ rotate: -15, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="w-9 h-9" />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block tracking-widest">// APPLICATION RECEIVED</span>
                  <h3 className="text-2xl font-black text-white">Your Application Has Been Received</h3>
                  <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                    Your application has been successfully submitted and entered into T-SOC's rolling admissions process. Our faculty council will review your credentials and contact you at the earliest opportunity.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="p-5 bg-[#030712]/90 border border-white/10 text-left rounded-lg font-sans space-y-3.5 shadow-inner">
                  <span className="text-[9px] font-mono text-teal-400 block font-bold uppercase tracking-wider">// APPLICATION CONFIRMATION</span>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[9px] font-mono animate-pulse">APPLICANT</span>
                      <span className="font-semibold text-white">{fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] font-mono">SELECTED PROGRAMME</span>
                      <span className="font-semibold text-white">
                        {cohortOptions.find(c => c.id === selectedCohort)?.label.split(' (')[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] font-mono">ORGANISATION</span>
                      <span className="font-semibold text-white">{organization}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] font-mono">APPLICATION STATUS</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Under Review
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate && onNavigate('/checkout/vetting-fee')}
                    className="px-5 py-3 text-xs font-mono bg-teal-600 text-white rounded-sm border border-teal-500/30 shadow-md hover:bg-teal-700 transition-all cursor-pointer font-bold uppercase tracking-wide"
                  >
                    Proceed to Application Fee Payment (₹5,000)
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="px-5 py-3 text-xs font-mono bg-teal-500/10 text-teal-300 rounded-sm border border-teal-500/30 shadow-md hover:bg-teal-600/30 transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="wizard"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                {/* Wizard header */}
                <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                      // REQUIRED APPLICATION FIELDS
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans">All fields marked with an asterisk are required for your application to be considered.</p>
                  </div>
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: i <= step ? 'rgb(20 184 166)' : 'rgba(255,255,255,0.1)',
                        scale: i === step ? 1.25 : 1,
                      }}
                      transition={{ duration: 0.25 }}
                      className="w-2 h-2 rounded-full"
                    />
                  ))}
                </div>

                {/* Anchor for validation warnings scroll */}
                <div id="error-notices-anchor" />

                {/* Submit-level error (e.g. network error) */}
                <AnimatePresence>
                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs rounded-lg space-y-1.5 overflow-hidden"
                    >
                      <div className="font-bold font-mono tracking-wide flex items-center gap-1.5 text-[11px] text-rose-400">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
                        SUBMISSION ERROR
                      </div>
                      <p className="text-[11.5px] font-sans text-rose-300">{errors.submit}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Conversational wizard steps */}
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <QuestionBubble text="Let's get you enrolled. First — what's your full name?" />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-1">
                        <motion.input
                          whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                          placeholder="e.g. Sarthak Dwivedi"
                          autoFocus
                          style={{background:'#0d1b2e',color:'#f1f5f9'}}
                          className={`w-full text-xs font-sans px-3.5 py-2.5 border rounded-sm focus:outline-none focus:border-teal-400 transition-all duration-150 ${
                            errors.fullName ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                          }`}
                        />
                        {errors.fullName && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.fullName}</p>}
                      </motion.div>
                      <motion.div variants={itemVariants} className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: '0 0 16px rgba(20,184,166,0.3)' }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleContinue}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold rounded-sm transition-all cursor-pointer"
                        >
                          Continue <ChevronRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <QuestionBubble text={`Great, ${fullName}. What's your current professional title?`} />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-1">
                        <motion.input
                          whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                          type="text"
                          value={corporateTitle}
                          onChange={(e) => setCorporateTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                          placeholder="e.g. Executive Director, Communications"
                          autoFocus
                          style={{background:'#0d1b2e',color:'#f1f5f9'}}
                          className={`w-full text-xs font-sans px-3.5 py-2.5 border rounded-sm focus:outline-none focus:border-teal-400 transition-all duration-150 ${
                            errors.corporateTitle ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                          }`}
                        />
                        {errors.corporateTitle && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.corporateTitle}</p>}
                      </motion.div>
                      <motion.div variants={itemVariants} className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: '0 0 16px rgba(20,184,166,0.3)' }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleContinue}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold rounded-sm transition-all cursor-pointer"
                        >
                          Continue <ChevronRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <QuestionBubble text="And which organisation are you affiliated with?" />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-1">
                        <motion.input
                          whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                          placeholder="e.g. Paramount Diagnostics Pvt. Ltd."
                          autoFocus
                          style={{background:'#0d1b2e',color:'#f1f5f9'}}
                          className={`w-full text-xs font-sans px-3.5 py-2.5 border rounded-sm focus:outline-none focus:border-teal-400 transition-all duration-150 ${
                            errors.organization ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                          }`}
                        />
                        {errors.organization && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.organization}</p>}
                      </motion.div>
                      <motion.div variants={itemVariants} className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: '0 0 16px rgba(20,184,166,0.3)' }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleContinue}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold rounded-sm transition-all cursor-pointer"
                        >
                          Continue <ChevronRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <QuestionBubble text="Which programme interests you?" />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        {cohortOptions.map((opt) => (
                          <motion.button
                            key={opt.id}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => {
                              setSelectedCohort(opt.id);
                              setStep(4);
                            }}
                            style={selectedCohort === opt.id
                              ? {background:'rgba(20,184,166,0.15)',border:'1px solid rgba(20,184,166,0.5)',color:'#99f6e4'}
                              : {background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.18)',color:'#e2e8f0'}
                            }
                            className="w-full text-left px-4 py-3 rounded-sm text-xs font-sans transition-all cursor-pointer flex items-center justify-between gap-3"
                          >
                            <span className="leading-snug font-semibold">{opt.label}</span>
                            <span className="shrink-0 px-2 py-0.5 rounded-sm font-bold font-mono text-[10px]" style={{background:'rgba(20,184,166,0.15)',color:'#5eead4',border:'1px solid rgba(20,184,166,0.35)'}}>
                              {opt.duration}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <QuestionBubble text="Perfect. What email should we send your confirmation to?" />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-1">
                        <motion.input
                          whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                          placeholder="e.g. sarthak@yourcompany.com"
                          autoFocus
                          style={{background:'#0d1b2e',color:'#f1f5f9'}}
                          className={`w-full text-xs font-sans px-3.5 py-2.5 border rounded-sm focus:outline-none focus:border-teal-400 transition-all duration-150 ${
                            errors.email ? 'border-rose-500 ring-1 ring-rose-220' : 'border-white/5 hover:border-white/20'
                          }`}
                        />
                        {errors.email && <p className="text-[10px] text-rose-400 mt-1 font-mono">{errors.email}</p>}
                      </motion.div>
                      <motion.div variants={itemVariants} className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: '0 0 16px rgba(20,184,166,0.3)' }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleContinue}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold rounded-sm transition-all cursor-pointer"
                        >
                          Continue <ChevronRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step-5"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <QuestionBubble text="Almost there. Anything you'd like us to know? (optional)" />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-1">
                        <motion.textarea
                          whileFocus={{ scale: 1.005, borderColor: '#0d9488' }}
                          rows={4}
                          value={statementOfIntent}
                          onChange={(e) => setStatementOfIntent(e.target.value)}
                          placeholder="Briefly describe the communication challenges you seek to address, or the professional objectives you wish to accomplish through your chosen programme..."
                          style={{background:'#0d1b2e',color:'#f1f5f9',borderColor:'rgba(255,255,255,0.12)'}}
                          className="w-full text-xs font-sans px-3.5 py-2.5 border rounded-sm focus:border-teal-400 focus:outline-none transition-all resize-none hover:border-white/20"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(20,184,166,0.35)', backgroundColor: 'rgba(20,184,166,0.2)' }}
                          whileTap={{ scale: 0.99 }}
                          onClick={handleSubmitWizard}
                          disabled={formState === 'validating'}
                          className="flex items-center gap-2 px-6 py-3 bg-teal-500/10 hover:bg-teal-650/30 border border-teal-500/20 text-white text-xs font-mono font-bold rounded-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                        >
                          {formState === 'validating' ? (
                            <>
                              <span className="w-4 h-4 border-2 border-teal-300 border-t-transparent rounded-full animate-spin" />
                              <span>Submitting Your Application...</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-4 h-4 text-teal-400" />
                              <span>Submit Application for Review</span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT COLUMN: INSTITUTIONAL POLICY INFOMRATION (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Certificate run loops block */}
          <motion.div
            whileHover={{ y: -3, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.08)" }}
            className="bg-[#091122]/90 backdrop-blur-md p-5 rounded-lg border border-white/10 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-2 text-teal-400 font-mono text-[10px] font-bold">
              <Calendar className="w-4 h-4 animate-bounce" />
              <span>// ADMISSIONS TIMELINE</span>
            </div>

            <h3 className="text-sm font-semibold text-white">
              Rolling Admissions: Enrol at Your Convenience
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Unlike conventional institutions bound by rigid annual intake windows, T-SOC observes a <span className="font-semibold text-teal-400">rolling admissions policy</span>. Candidates may apply at any point in the calendar year, and enrolment is confirmed on an individual basis upon successful review.
            </p>

            <div className="p-4 bg-[#030712]/90 border border-white/10 rounded-lg font-mono text-[11px] text-slate-400 space-y-2 pb-3.5 shadow-inner">
              <p className="font-bold text-teal-400 uppercase tracking-wide text-[10px]">// PROGRAMME DURATIONS</p>
              <p className="font-sans">While admissions remain open year-round, each programme adheres to a defined and structured duration:</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs font-sans">
                <span className="text-white font-semibold">Foundation Certificate</span>
                <span className="px-2 py-0.5 rounded-sm bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold font-mono text-[10px]">2 Months</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs font-sans">
                <span className="text-white font-semibold">Advanced Certificate</span>
                <span className="px-2 py-0.5 rounded-sm bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold font-mono text-[10px]">3 Months</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs font-sans">
                <span className="text-white font-semibold">Executive Leadership Programme</span>
                <span className="px-2 py-0.5 rounded-sm bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold font-mono text-[10px]">4 Months</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              * Programme schedules are fixed upon enrolment confirmation. The stated duration represents a firm academic commitment honoured by both the institution and the participant.
            </p>
          </motion.div>

          {/* Delhi Registry details */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-navy-950/80 backdrop-blur-md p-5 rounded-lg text-slate-300 border border-white/10 space-y-4 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-widest">// CAMPUS & CONTACT</div>
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">New Delhi Admissions Office</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Our Registrar conducts credential reviews and in-person academic counselling sessions exclusively at our Gautam Nagar campus in New Delhi. Prospective candidates are warmly encouraged to visit for a preliminary consultation.
              </p>

              <div className="pt-2 space-y-2.5 text-xs font-sans border-t border-white/5">
                <a
                  href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors block"
                >
                  <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    Regency Park 2, DLF Phase 4, Gurgaon 122009.
                  </span>
                </a>
                <a
                  href="tel:9278075130"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors block"
                >
                  <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>9278075130 (Ext. Registry desk)</span>
                </a>
                <a
                  href="mailto:inquiry@t-soc.com"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors block"
                >
                  <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>inquiry@t-soc.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
