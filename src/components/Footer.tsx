import React, { useState } from 'react';
import { Award, Mail, Phone, MapPin, Send, Linkedin, Twitter, Facebook, Instagram, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import tsocLogo from '../assets/tsoc-logo-new.png';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setNewsletterStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Newsletter subscription request failed');
      }

      setNewsletterStatus('success');
      setEmail('');
      setTimeout(() => {
        setNewsletterStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setNewsletterStatus('error');
    }
  };

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const quickLinks = [
    { label: 'Portal Home', path: '/' },
    { label: 'Admissions Desk', path: '/admissions' },
    { label: 'Insights & Thesis', path: '/insights' },
    { label: 'Payment Registry Portal', path: '/checkout' },
  ];

  const academicPages = [
    { label: 'Explore 27 Courses', path: '/courses' },
    { label: 'Certificate Syllabus', path: '/courses/certificate' },
    { label: 'Short Term Syllabus', path: '/courses/short-term' },
    { label: 'Program Customizer', path: '/about/customization' },
  ];

  const supportLinks = [
    { label: 'Who We Are', path: '/about/who-we-are' },
    { label: 'Our Super Experts', path: '/about/experts' },
    { label: 'Verification Model', path: '/about/model' },
    { label: 'Legal & Contact', path: '/contact' },
  ];

  return (
    <footer className="w-full font-sans relative z-10 pt-16 pb-12" style={{background:'transparent',borderTop:'1px solid rgba(0,0,0,0.15)'}}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">

        {/* Top Segment: Logo + Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10" style={{borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
          {/* Logo */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center cursor-pointer" onClick={(e) => handleLinkClick('/', e)}>
              <img
                src={tsocLogo}
                alt="Trust School of Communications"
                className="w-full max-w-[260px] h-auto object-contain hover:scale-[1.02] transition-transform duration-300 rounded-md bg-white/95 px-3 py-2"
              />
            </div>
            <p className="leading-relaxed font-sans font-semibold" style={{color:'#0f172a',fontSize:'14px'}}>
              "Generating Trust through Honest Communications." Reversing systemic corporate jargon inside professional dialogue structures.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:max-w-md space-y-2">
            <span className="font-mono font-bold block uppercase tracking-widest" style={{fontSize:'11px',color:'#0d9488'}}>// SECURE REGISTRY DISPATCH</span>
            <form onSubmit={handleSubscribe} className="flex p-1.5 rounded-full w-full items-center" style={{background:'rgba(255,255,255,0.85)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(0,0,0,0.15)',boxShadow:'0 2px 12px rgba(0,0,0,0.1)'}}>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="px-4 py-2 w-full focus:outline-none font-sans font-semibold"
                style={{fontSize:'13px',color:'#0f172a',background:'transparent',border:'none',outline:'none',boxShadow:'none'}}
              />
              <button
                type="submit"
                className="font-mono font-bold uppercase px-5 py-2.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer flex items-center shrink-0"
                style={{background:'#e8601c',color:'#ffffff',fontSize:'11px'}}
                aria-label="Subscribe to updates"
              >
                Subscribe
              </button>
            </form>
            <AnimatePresence mode="wait">
              {newsletterStatus === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-1.5 pl-3 mt-1.5 overflow-hidden"
                >
                  <span className="font-mono font-bold flex items-center gap-1" style={{fontSize:'11px',color:'#10b981'}}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ✓ Successfully registered for executive briefs.
                  </span>
                </motion.div>
              )}
              {newsletterStatus === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-1.5 pl-3 mt-1.5 overflow-hidden"
                >
                  <span className="font-mono font-bold" style={{fontSize:'11px',color:'#ef4444'}}>
                    ✗ Provide a valid executive communication mail.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Middle Segment: 4-Column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-2">

          {/* Col 1: Quick links */}
          <div className="space-y-4">
            <h4 className="font-mono font-bold uppercase tracking-widest" style={{fontSize:'11px',color:'#0D9488'}}>// QUICK LINKS</h4>
            <ul className="space-y-3 font-sans">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-orange-500 transition-colors font-semibold"
                    style={{color:'#0f172a',fontSize:'14px'}}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Academic Pages */}
          <div className="space-y-4">
            <h4 className="font-mono font-bold uppercase tracking-widest" style={{fontSize:'11px',color:'#0D9488'}}>// ACADEMIC MATRICES</h4>
            <ul className="space-y-3 font-sans">
              {academicPages.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-orange-500 transition-colors font-semibold"
                    style={{color:'#0f172a',fontSize:'14px'}}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-4">
            <h4 className="font-mono font-bold uppercase tracking-widest" style={{fontSize:'11px',color:'#0D9488'}}>// STRATEGIC SUPPORT</h4>
            <ul className="space-y-3 font-sans">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-orange-500 transition-colors font-semibold"
                    style={{color:'#0f172a',fontSize:'14px'}}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Physical + Social */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-mono font-bold uppercase tracking-widest" style={{fontSize:'11px',color:'#f97316'}}>// PHYSICAL SANCTUARY</h4>
              <div className="space-y-2 font-sans pr-4 leading-relaxed">
                <a
                  href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 hover:text-orange-500 transition-colors duration-200 font-semibold"
                  style={{color:'#0f172a',fontSize:'13px'}}
                >
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>Regency Park 2, DLF Phase 4, Gurgaon 122009.</span>
                </a>
                <a
                  href="tel:9278075130"
                  className="flex items-center gap-1.5 hover:text-orange-500 transition-colors duration-200 font-semibold"
                  style={{color:'#0f172a',fontSize:'13px'}}
                >
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>Hotline: 9278075130</span>
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono font-bold uppercase tracking-widest" style={{fontSize:'11px',color:'#0d9488'}}>// EXECUTIVE CONNECTIVITY</h4>
              <div className="flex items-center space-x-2">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{background:'#0d9488',color:'#ffffff',border:'1px solid rgba(0,0,0,0.1)'}}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter / X"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{background:'#0d9488',color:'#ffffff',border:'1px solid rgba(0,0,0,0.1)'}}
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="mailto:inquiry@t-soc.com" title="Professional Contact Desk"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{background:'#0d9488',color:'#ffffff',border:'1px solid rgba(0,0,0,0.1)'}}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <div className="font-mono space-y-1 pt-1 font-semibold" style={{fontSize:'12px',color:'#0f172a'}}>
                <div>Registry: <a href="mailto:inquiry@t-soc.com" className="hover:text-orange-500 transition-colors">inquiry@t-soc.com</a></div>
                <div>Support: <a href="mailto:inquiry@t-soc.com" className="hover:text-orange-500 transition-colors">inquiry@t-soc.com</a></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono font-semibold" style={{borderTop:'1px solid rgba(0,0,0,0.1)',fontSize:'12px',color:'#0f172a'}}>
          <p>Designed by Webestica, Powered by T-SOC Delhi Hub. © 2026.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram className="w-4 h-4 hover:text-orange-500 cursor-pointer" style={{color:'#0f172a'}} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Linkedin className="w-4 h-4 hover:text-orange-500 cursor-pointer" style={{color:'#0f172a'}} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Twitter className="w-4 h-4 hover:text-orange-500 cursor-pointer" style={{color:'#0f172a'}} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
