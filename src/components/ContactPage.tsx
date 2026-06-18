import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';

interface ContactPageProps {
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

export default function ContactPage({ onNavigate }: ContactPageProps) {
  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Status Handling
  const [status, setStatus] = useState<'idle' | 'validating' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    // Core Field Validation
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = 'Full Name is required.';
    }
    if (!email.trim()) {
      errors.email = 'Corporate Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please provide a valid corporate email format.';
    }
    if (!message.trim()) {
      errors.message = 'Please input a secure message/inquiry.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setStatus('validating');

    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nFrom: ${email}\n\n${message}`);
    window.open(
      `https://mail.google.com/mail/?view=cm&to=inquiry@t-soc.com&su=${subject}&body=${body}`,
      '_blank'
    );
    setStatus('success');
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setStatus('idle');
    setFormErrors({});
  };

  return (
    <motion.div 
      id="contact-page-root" 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-12 py-4 max-w-7xl mx-auto px-4 md:px-6 text-slate-200"
    >
      {/* Header segment with corporate tone */}
      <div className="border-b border-white/5 pb-5 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <span className="text-[10px] font-mono text-teal-400 block font-bold uppercase tracking-widest animate-pulse">
          // SECURE TRANSMISSION CHANNEL // CORE REGISTRY DESK
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-teal-100 tracking-tight mt-1 font-sans text-center">
          Contact the <span className="text-teal-400">T-SOC Secretariat</span>
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed max-w-3xl font-sans text-center mx-auto">
          Direct your inquiries, program audit requests, and partnership briefs into our centralized Delhi communication loop. We guarantee transparent, secure handlings.
        </p>
      </div>

      {/* Grid: Form (left) & Typography Landmarks block (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form panel container (7 columns) */}
        <motion.div 
          whileHover={{ y: -3, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.12)" }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-7 bg-[#091122]/90 backdrop-blur-md p-6 md:p-8 border border-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative text-slate-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 left-0 h-[2.5px] bg-gradient-to-r from-teal-500 via-emerald-450 to-teal-600" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                id="contact-submit-success" 
                className="text-center py-10 space-y-5"
              >
                <motion.div variants={itemVariants} className="w-16 h-16 bg-teal-500/10 text-teal-400 flex items-center justify-center rounded-full mx-auto border border-teal-500/35 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="w-9 h-9" />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Inquiry Transmitted</h3>
                  <p className="text-sm font-semibold text-teal-405 font-mono">// STATUS: IN QUEUE</p>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                    We have queued your communications audit. The office of the Admissions Registrar or designated Corporate Counsel will establish contact within 24 standard regulatory business hours.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4 flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResetForm}
                    className="px-5 py-3 font-mono text-xs bg-teal-500/10 text-teal-300 hover:text-white rounded-sm border border-teal-500/30 shadow-md hover:bg-teal-600/30 cursor-pointer transition-all"
                  >
                    Return to Contact Form
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">// SECURE CONTACT SHEET</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Please complete all fields to establish priority contact status.</p>
                </div>

                <AnimatePresence>
                  {Object.keys(formErrors).length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg space-y-1 overflow-hidden"
                    >
                      <div className="font-bold font-mono tracking-wide flex items-center gap-1.5 text-[11px]">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        SUBMISSION BLOCKED: ISSUES DETECTED ({Object.keys(formErrors).length})
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-300 font-sans pl-1">
                        {Object.values(formErrors).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Controlled Contact Fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Full Representative Name <span className="text-rose-500 font-black">*</span>
                    </label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarthak Dwivedi"
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950/85 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all duration-150 ${
                        formErrors.name ? 'border-rose-500 ring-1 ring-rose-220 font-bold' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {formErrors.name && <p className="text-[10px] text-rose-450 mt-1 font-mono">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Corporate Email Address <span className="text-rose-500 font-black">*</span>
                    </label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#0d9488' }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarthak@company.com"
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950/85 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all duration-150 ${
                        formErrors.email ? 'border-rose-500 ring-1 ring-rose-220 font-bold' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-450 mt-1 font-mono">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      Your Message / Inquiry Brief <span className="text-rose-500 font-black">*</span>
                    </label>
                    <motion.textarea 
                      whileFocus={{ scale: 1.005, borderColor: '#0d9488' }}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="State the focus of your communications request or audit objectives..."
                      className={`w-full text-xs font-sans px-3.5 py-2.5 bg-navy-950/85 border rounded-sm focus:outline-none focus:border-teal-400 text-white transition-all resize-none duration-150 ${
                        formErrors.message ? 'border-rose-500 ring-1 ring-rose-220 font-bold' : 'border-white/5 hover:border-white/20'
                      }`}
                    />
                    {formErrors.message && <p className="text-[10px] text-rose-450 mt-1 font-mono">{formErrors.message}</p>}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(20,184,166,0.3)', backgroundColor: 'rgba(20,184,166,0.2)' }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status === 'validating'}
                  className="w-full bg-teal-500/10 text-teal-300 hover:text-white border border-teal-500/20 hover:bg-teal-555/35 text-xs font-mono font-bold py-3.5 px-4 rounded-sm shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'validating' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Secure Link...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Secure Inquiry</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT COLUMN: REFINED LANDMARK TYPOGRAPHY BLOCK (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Institutional Landmark Address Block */}
          <motion.div 
            whileHover={{ y: -3, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.08)" }}
            className="bg-[#091122]/90 backdrop-blur-md p-6 md:p-8 rounded-lg border border-white/10 space-y-5 shadow-xl"
          >
            <span className="font-mono text-[9px] text-[#0D9488] font-bold block uppercase tracking-widest animate-pulse">
              // PHYSICAL JURISDICTION & MAP CO-ORDINATES
            </span>
            
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Headquarters Landmark Location
            </h3>

            {/* Elegant landmark address block for corporate stakeholder inspection */}
            <a 
              href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009"
              target="_blank"
              rel="noopener noreferrer"
              className="border-l-4 border-teal-500 pl-4 space-y-3 font-sans block hover:border-orange-500 transition-colors group"
            >
              <span className="text-[11px] font-mono text-teal-400 block font-bold">// OFFICIAL LOCATION SPECIFICATION</span>
              <p className="text-sm text-white font-bold leading-relaxed tracking-tight group-hover:text-teal-400 transition-colors">
                Regency Park 2,
                <span className="block font-medium text-slate-400 text-xs mt-1">DLF Phase 4,</span>
                <span className="block font-medium text-slate-400 text-xs">Gurgaon 122009.</span>
              </p>
            </a>

            <div className="p-4 bg-[#050b18]/90 border border-white/10 rounded-lg space-y-3 text-xs leading-relaxed text-slate-405">
              <p className="font-bold text-teal-400 flex items-center gap-1.5 font-mono text-[10px]">
                <Building2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                VETTING OFFICE ACCESS
              </p>
              <p>
                To guarantee maximum security compliance, unannounced site audits are restricted. Official stakeholder delegations must confirm a calendar allocation with the Registry Desk before traveling.
              </p>
            </div>

            {/* Simulated mini map container to represent locality */}
            <div className="bg-navy-950 border border-white/10 rounded-lg p-4 font-mono text-[10px] text-slate-400 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-[9px] text-[#0D9488] font-bold">
                <span>DELHI REGION RECTIFIER Grid</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  STATUS: SECURED
                </span>
              </div>
              
              <a 
                href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div 
                  whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  style={{ perspective: 1000 }}
                  className="h-32 bg-[#050b18] rounded-md border border-white/5 relative overflow-hidden flex flex-col justify-center items-center text-center p-2 cursor-pointer shadow-inner"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#132549_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                  <div className="relative z-10 space-y-1.5 text-center">
                    <MapPin className="w-5 h-5 text-teal-400 mx-auto animate-bounce" />
                    <p className="text-white font-sans text-xs font-semibold">T-SOC DELHI BLOCK</p>
                    <p className="text-[9px] text-slate-405 font-mono">DLF Phase 4, Gurgaon</p>
                  </div>
                </motion.div>
              </a>
            </div>
          </motion.div>
 
          {/* Quick contact terminals */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="backdrop-blur-md p-5 rounded-lg space-y-3.5 shadow-xl" style={{background:'rgba(255,255,255,0.95)',border:'1px solid rgba(0,0,0,0.1)'}}
          >
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider" style={{color:'#0d9488'}}>// COMMUNICATIONS LOG</h4>
            <div className="space-y-3 text-xs font-sans">
              <a
                href="tel:9278075130"
                className="flex items-center gap-3 hover:bg-black/5 p-1 rounded transition-colors block"
              >
                <div className="p-2 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold" style={{color:'#64748b'}}>HOTLINE DIRECTORY</p>
                  <p className="font-semibold" style={{color:'#0f172a'}}>9278075130</p>
                </div>
              </a>
              <hr className="border-black/10" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold" style={{color:'#64748b'}}>REGISTRY EMAIL</p>
                  <p className="font-semibold" style={{color:'#0f172a'}}>inquiry@t-soc.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
