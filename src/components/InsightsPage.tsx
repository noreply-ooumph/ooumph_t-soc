import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  HelpCircle, 
  Compass, 
  Lock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Bell
} from 'lucide-react';

interface InsightsPageProps {
  onNavigate?: (path: string) => void;
}

export default function InsightsPage({ onNavigate }: InsightsPageProps) {
  // Newsletter subscription states
  const [newsEmail, setNewsEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'validating' | 'success'>('idle');
  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubError('');

    const trimmed = newsEmail.trim();
    if (!trimmed) {
      setSubError('Email address is required to subscribe.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setSubError('Please specify a valid corporate email coordinate.');
      return;
    }

    setSubStatus('validating');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Subscription failed.');
      }
      setSubStatus('success');
    } catch (err: any) {
      setSubError(err.message || 'An error occurred. Please try again.');
      setSubStatus('idle');
    }
  };

  const handleResetSubscription = () => {
    setNewsEmail('');
    setSubStatus('idle');
    setSubError('');
  };

  return (
    <motion.div 
      id="insights-page-root" 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-10 py-4 max-w-7xl mx-auto px-4 md:px-6 text-slate-200"
    >
      {/* Header section matching explicit input data context */}
      <div className="border-b border-white/5 pb-5 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <span className="text-[10px] font-mono text-teal-400 block font-bold uppercase tracking-widest">
          // ACADEMIC MEMORANDUMS & DISCLOSURES
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-teal-100 tracking-tight mt-1 font-sans text-center">
          Insights Hub
        </h2>
        <p className="text-teal-400 text-xs md:text-sm font-mono font-semibold mt-1 animate-pulse text-center">
          // STATUS: EDITORIAL PORTAL QUEUE
        </p>
        <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed max-w-3xl">
          Dive into a wealth of expertise and real-world insights. From our monthly newsletter to thought-provoking articles, find inspiration here.
        </p>
      </div>

      {/* Elegant Empty State Block */}
      <motion.div 
        whileHover={{ y: -4, shadow: "0 25px 50px -12px rgba(13,148,136,0.1)" }}
        transition={{ duration: 0.3 }}
        id="insights-empty-state" 
        className="bg-[#091122]/90 backdrop-blur-md border border-white/10 rounded-lg p-8 md:p-14 text-center space-y-6 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl"
      >
        {/* Subtle decorative grid background for tech feeling */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
        
        {/* Absolute top border */}
        <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-teal-500 to-teal-700" />

        {/* Dynamic visual indicator */}
        <div className="relative mb-2">
          <div className="w-16 h-16 bg-[#050b18]/80 border border-white/10 rounded-full flex items-center justify-center shadow-lg relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            >
              <Compass className="w-8 h-8 text-teal-400" />
            </motion.div>
          </div>
          <span className="absolute -bottom-1 -right-2 w-5.5 h-5.5 bg-navy-950 text-teal-300 font-mono text-[9px] font-black rounded-full border border-teal-500/30 flex items-center justify-center shadow-md">
            01
          </span>
        </div>

        {/* Elegant typography block centered on the specified placeholder message */}
        <div className="max-w-md space-y-2 relative z-10">
          <span className="text-[9px] font-mono text-teal-405 font-bold block tracking-widest uppercase animate-pulse">
            // STATUS: WAITING FOR EDITORIAL SEAL
          </span>
          <p className="text-white text-xs md:text-sm font-medium leading-relaxed bg-[#030712]/90 border border-white/10 py-4 px-6 rounded-lg shadow-inner">
            Check back soon. Once posts are published, you'll see them here.
          </p>
        </div>

        {/* Minimalist advisory box advising user of the C-suite workflow */}
        <div className="max-w-md p-4 bg-[#030712]/60 border border-white/10 rounded-lg text-left text-xs font-sans space-y-2 relative z-10 shadow-lg">
          <div className="flex items-center gap-1.5 text-white font-mono text-[10px] font-bold">
            <Lock className="w-4 h-4 text-teal-400" />
            GOVERNANCE PROTOCOL
          </div>
          <p className="text-slate-400 text-[10.5px] leading-relaxed">
            T-SOC follows a strict peer-review vetting cycle for publication. Each analysis is audited for jargon removal, behavioral accuracy metrics, and structural integrity before release to C-suite subscribers.
          </p>
        </div>
      </motion.div>

      {/* Prominent, minimalist newsletter subscription card block */}
      <motion.div 
        whileHover={{ y: -3, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.12)" }}
        transition={{ duration: 0.3 }}
        id="newsletter-section-block"
        className="bg-[#091122]/90 backdrop-blur-md text-white rounded-lg p-6 md:p-8 border border-white/10 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-teal-500/20" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* CTA Message panel (7 cols) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-teal-400 font-black block tracking-widest uppercase">// THE NEWSLETTER LINK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            </div>
            <h4 className="text-xl font-bold tracking-tight font-sans text-white">Stay Formats-Aligned</h4>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-xl font-sans">
              Join our mailing list and be first to receive your monthly dose of news, views, and success stories.
            </p>
          </div>

          {/* Form input controls (5 cols) */}
          <div className="lg:col-span-5 bg-navy-950/85 p-5 border border-white/10 rounded-lg shadow-xl">
            <AnimatePresence mode="wait">
              {subStatus === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4 text-center py-2" 
                  id="newsletter-success-notif"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-full mx-auto border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <CheckCircle2 className="w-6 h-6 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-bold text-emerald-400 uppercase">// REGISTRATION CONFIRMED</p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      You have been cataloged for upcoming monthly communication logs. Welcome aboard.
                    </p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={handleResetSubscription}
                    className="text-[10.5px] font-mono text-teal-400 hover:underline capitalize focus:outline-none"
                  >
                    Manage Email Options
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe} 
                  className="space-y-3.5"
                >
                  <span className="text-[9px] font-mono text-slate-400 tracking-wider block font-bold uppercase">// CHANNEL LOGIN</span>
                  
                  <div className="relative">
                    <Mail className="w-4.5 h-4.5 text-slate-550 absolute left-3 top-1/2 -translate-y-1/2" />
                    <motion.input
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="email"
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      placeholder="Enter professional email..."
                      className="w-full text-xs font-sans pl-10 pr-4 py-2.5 bg-[#030712] text-slate-100 border border-white/5 focus:outline-none focus:border-teal-450 rounded-md placeholder-slate-500"
                    />
                  </div>

                  <AnimatePresence>
                    {subError && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[10px] text-rose-455 font-mono flex items-center gap-1 text-rose-400"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {subError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.01, boxShadow: '0 0 15px rgba(20,184,166,0.3)', backgroundColor: 'rgba(20,184,166,0.2)' }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={subStatus === 'validating'}
                    className="w-full bg-teal-500/10 text-teal-300 hover:text-white border border-teal-500/20 hover:bg-teal-555/30 font-mono text-xs font-bold py-3 rounded-md transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-55"
                  >
                    {subStatus === 'validating' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Syncing Registry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 animate-pulse" />
                        <span>Request Subscription</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
