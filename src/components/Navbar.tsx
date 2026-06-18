import React, { useState, useEffect } from 'react';
import {
  Award,
  Menu,
  X,
  ArrowRight,
  Download,
  Smartphone,
  BookOpen,
  HelpCircle,
  FileText,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Smartphone as PhoneIcon,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import tsocLogoNew from '../assets/tsoc-logo-new.png';

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  previewMode?: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  authUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export default function Navbar({
  currentPath = '/',
  onNavigate,
  previewMode = false,
  theme = 'light',
  onToggleTheme,
  authUser,
  onLogout
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const navLinks = [
    { label: 'Home Sanctuary', path: '/' },
    { label: 'Courses We Offer', path: '/courses' },
    { label: 'Fluency Assessor', path: '/assessment' },
    { label: 'Admissions Desk', path: '/admissions' },
    { label: 'Contact Academy', path: '/contact' },
  ];

  return (
    <>
      {/* Upper informational micro-strip floating above */}
      <div id="tsoc-upper-microstrip" className="w-full bg-[#030712] py-2 px-4 border-b border-white/5 text-[10px] font-mono text-slate-450 uppercase tracking-widest hidden sm:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a 
              href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-orange-550" />
              Delhi Office: Regency Park 2, DLF Phase 4, Gurgaon 122009
            </a>
            <span>|</span>
            <a 
              href="tel:9278075130"
              className="hover:text-white transition-colors animate-pulse"
            >
              Helpline: 9278075130
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-550 animate-pulse" />
            <span>Sovereign Communications Core</span>
          </div>
        </div>
      </div>

      {/* FLOATING PILL NAVBAR */}
      <div className="w-full px-4 sm:px-6 sticky top-4 z-50 pointer-events-none">
        <nav 
          id="habitline-nav"
          className="max-w-5xl mx-auto bg-[#091122]/90 backdrop-blur-md text-white px-3 py-2.5 rounded-full shadow-2xl border border-white/10 flex items-center justify-between pointer-events-auto transition-all duration-300 transform"
        >
          {/* Logo on the left with T-SOC Custom Official Logo Icon */}
          <div 
            onClick={() => handleLinkClick('/')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer pl-1 sm:pl-2 group select-none shrink-0"
          >
            <img
              src={tsocLogoNew}
              alt="T-SOC"
              className="h-9 sm:h-11 w-auto object-contain group-hover:scale-105 transition-all duration-300 shrink-0"
            />
          </div>

          {/* Central subtle navigation hint (minimal approach) */}
          <div className="hidden md:flex items-center space-x-1 bg-[#050b18]/60 border border-white/5 p-1 rounded-full">
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-black tracking-wider transition-all cursor-pointer ${
                currentPath === '/'
                  ? 'bg-teal-950/80 text-teal-300 border border-teal-500/40 shadow-md shadow-teal-500/10'
                  : 'text-slate-100 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('/courses')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-black tracking-wider transition-all cursor-pointer ${
                currentPath.startsWith('/courses')
                  ? 'bg-teal-950/80 text-teal-300 border border-teal-500/40 shadow-md shadow-teal-500/10'
                  : 'text-slate-100 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => handleLinkClick('/about/experts')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-black tracking-wider transition-all cursor-pointer ${
                currentPath.startsWith('/about')
                  ? 'bg-teal-950/80 text-teal-300 border border-teal-500/40 shadow-md shadow-teal-500/10'
                  : 'text-slate-100 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              Our Experts
            </button>
            <button
              onClick={() => handleLinkClick('/assessment')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-black tracking-wider transition-all cursor-pointer ${
                currentPath.startsWith('/assessment')
                  ? 'bg-teal-950/80 text-teal-300 border border-teal-500/40 shadow-md shadow-teal-500/10'
                  : 'text-slate-100 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              Assessor
            </button>
          </div>

          {/* Right hand minimal actions panel */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Obsidian Dark'}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050b18]/80 hover:bg-[#0c1322] text-slate-400 hover:text-white rounded-full flex items-center justify-center focus:outline-none cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-200 shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 stroke-[2.2px] animate-pulse" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300 hover:text-teal-350 stroke-[2.2px]" />
              )}
            </button>

            {/* CTA Button 1: Apple "A" Icon in rounded container */}
            <button 
              onClick={() => handleLinkClick('/admissions')}
              title="Admissions Registry"
              className="hidden sm:flex w-9 h-9 bg-[#050b18]/80 hover:bg-orange-950/40 text-slate-400 hover:text-orange-400 rounded-full items-center justify-center transition-colors cursor-pointer border border-white/5 hover:border-orange-500/20"
            >
              <FileText className="w-4 h-4 stroke-[2px]" />
            </button>


            {/* Logged-in user pill */}
            {authUser && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(20,184,166,0.15)',
                  border: '1px solid rgba(20,184,166,0.3)',
                  borderRadius: '9999px',
                  padding: '4px 10px 4px 6px',
                  maxWidth: '160px',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(20,184,166,0.25)',
                    border: '1px solid rgba(20,184,166,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5eead4',
                    fontSize: '10px',
                    fontWeight: 800,
                    flexShrink: 0,
                    fontFamily: 'monospace',
                  }}
                >
                  {authUser.name.charAt(0).toUpperCase()}
                </div>
                <span
                  style={{
                    color: '#5eead4',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '80px',
                  }}
                >
                  {authUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#5eead4',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                    opacity: 0.7,
                  }}
                >
                  <LogOut size={12} />
                </button>
              </div>
            )}

            {/* Main Action Admission Button */}
            <button
              onClick={() => handleLinkClick('/admissions')}
              className="bg-teal-650 hover:bg-teal-600 border border-teal-500/20 text-white font-mono text-[9px] sm:text-[10px] font-bold uppercase px-2.5 py-1.5 sm:px-4.5 sm:py-2.5 rounded-full transition-all tracking-wider shadow-lg hover:shadow-teal-500/10 cursor-pointer text-center shrink-0 whitespace-nowrap"
            >
              Enroll<span className="hidden xs:inline"> Desk</span>
            </button>

            {/* Hamburger menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              role="button"
              aria-expanded={isOpen}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050b18]/80 hover:bg-[#0c1322] text-slate-300 hover:text-white rounded-full flex items-center justify-center focus:outline-none cursor-pointer border border-white/5 hover:border-white/15 shrink-0"
            >
              {isOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5px]" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5px]" />}
            </button>

          </div>
        </nav>
      </div>

      {/* FULL-SCREEN OVERLAY MENU */}
      {isOpen && (
        <div id="full-menu-overlay" className="fixed inset-0 bg-[#050b18]/95 backdrop-blur-lg z-40 overflow-y-auto flex flex-col justify-between p-6 sm:p-10 animate-fade-in">
          {/* Top placeholder alignment matches the navbar */}
          <div className="flex justify-between items-center max-w-5xl mx-auto w-full pt-16 flex-shrink-0 gap-4">
            <span className="font-mono text-[9px] text-orange-450 tracking-widest font-bold uppercase">// TSOC DELHI NAVIGATION CONDUIT</span>
            <button 
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-slate-200 cursor-pointer transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>LIGHT MODE</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>OBSIDIAN DARK</span>
                </>
              )}
            </button>
          </div>

          {/* Links list */}
          <div className="max-w-3xl mx-auto w-full space-y-3 pt-6 py-8 flex-grow flex flex-col justify-center flex-shrink-0">
            {navLinks.map((link, idx) => {
              const isActive = currentPath === link.path || 
                               (link.path === '/courses' && currentPath.startsWith('/courses')) ||
                               (link.path === '/about' && currentPath.startsWith('/about'));
              return (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link.path)}
                  className="group w-full text-left py-2 border-b border-white/5 flex items-center justify-between text-2xl sm:text-4xl font-extrabold tracking-tight transition-colors cursor-pointer text-white"
                >
                  <span className={`group-hover:text-orange-500 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-100'}`}>
                    {link.label}
                  </span>
                  <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-orange-500 transition-transform group-hover:translate-x-1.5" />
                </button>
              );
            })}
          </div>

          {/* Micro Footer Inside Overlay */}
          <div className="max-w-5xl mx-auto w-full border-t border-white/5 pt-6 pb-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-400 gap-4 flex-shrink-0">
            <p>Trust School of Communications. All Rights Secured.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Jargon-Free Compliance
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
