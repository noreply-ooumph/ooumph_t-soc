import { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Type, 
  Palette, 
  Sliders, 
  Code, 
  Copy, 
  Check, 
  ChevronRight, 
  Users, 
  SlidersHorizontal,
  RefreshCw,
  Play,
  AlertTriangle,
  Monitor,
  Tablet as TabletIcon,
  Smartphone,
  Eye,
  Settings
} from 'lucide-react';
import DirectoryTree from './DirectoryTree';
import QAAuditDashboard from './QAAuditDashboard';

interface Swatch {
  name: string;
  hex: string;
  className: string;
  contrastWhite: 'AAA' | 'AA' | 'Fail';
  contrastBlack: 'AAA' | 'AA' | 'Fail';
  role: string;
}

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<'brand' | 'colors' | 'typography' | 'motion' | 'architecture' | 'config' | 'qa'>('brand');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Custom states for interactive typography playground
  const [typedQuote, setTypedQuote] = useState<string>(
    "We communicate to make an impact, and it all starts with Trust."
  );
  
  const [selectedWeight, setSelectedWeight] = useState<'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold'>(
    'font-semibold'
  );

  // Motion visualization state
  const [animationTrigger, setAnimationTrigger] = useState<number>(0);
  const [motionAnimation, setMotionAnimation] = useState<'fade-up' | 'fade-right' | 'pulse'>('fade-up');

  // Simulated browser controls
  const [viewportWidth, setViewportWidth] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Brand card input state
  const [recipientName, setRecipientName] = useState<string>("Executive Delegation");
  const [recipientTitle, setRecipientTitle] = useState<string>("C-Suite Strategic Council");

  // Function to handle copy to clipboard with feedback
  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Color Swatch Dataset for T-SOC Design System
  const navySwatches: Swatch[] = [
    { name: 'navy-50', hex: '#F0F4FA', className: 'bg-[#F0F4FA] text-[#0A142A]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Subtle Slate Overlay' },
    { name: 'navy-100', hex: '#DBE5F4', className: 'bg-[#DBE5F4] text-[#0A142A]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Light Element Frame' },
    { name: 'navy-200', hex: '#BACCE7', className: 'bg-[#BACCE7] text-[#0A142A]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Dignified Active State' },
    { name: 'navy-300', hex: '#8FAAD5', className: 'bg-[#8FAAD5] text-[#0A142A]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Disabled Borders' },
    { name: 'navy-400', hex: '#5E83C0', className: 'bg-[#5E83C0] text-white', contrastWhite: 'AA', contrastBlack: 'AA', role: 'Secondary Accents' },
    { name: 'navy-500', hex: '#395FA3', className: 'bg-[#395FA3] text-white', contrastWhite: 'AAA', contrastBlack: 'AA', role: 'Interactive Highlights' },
    { name: 'navy-600', hex: '#2A4B86', className: 'bg-[#2A4B86] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Executive Focus States' },
    { name: 'navy-700', hex: '#1F3867', className: 'bg-[#1F3867] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Sub-headers and Panels' },
    { name: 'navy-800', hex: '#132549', className: 'bg-[#132549] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Trust Navy Core Brand' },
    { name: 'navy-900', hex: '#0A142A', className: 'bg-[#0A142A] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Elite Midnight Text Base' },
    { name: 'navy-950', hex: '#050B18', className: 'bg-[#050B18] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Deep Solid Background' },
  ];

  const slateSwatches: Swatch[] = [
    { name: 'slate-50', hex: '#F8FAFC', className: 'bg-[#F8FAFC] text-[#1E293B]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Primary System Background' },
    { name: 'slate-100', hex: '#F1F5F9', className: 'bg-[#F1F5F9] text-[#1E293B]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Muted Card Surface' },
    { name: 'slate-200', hex: '#E2E8F0', className: 'bg-[#E2E8F0] text-[#1E293B]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Fine Separation Borders' },
    { name: 'slate-300', hex: '#CBD5E1', className: 'bg-[#CBD5E1] text-[#1E293B]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Form Outer Borders' },
    { name: 'slate-400', hex: '#94A3B8', className: 'bg-[#94A3B8] text-white', contrastWhite: 'Fail', contrastBlack: 'AA', role: 'Muted Inline Placeholder' },
    { name: 'slate-500', hex: '#64748B', className: 'bg-[#64748B] text-white', contrastWhite: 'AA', contrastBlack: 'AA', role: 'Sub-caption Text' },
    { name: 'slate-600', hex: '#475569', className: 'bg-[#475569] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Executive Slate Core' },
    { name: 'slate-700', hex: '#334155', className: 'bg-[#334155] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Heavy Neutral Accent' },
    { name: 'slate-800', hex: '#1E293B', className: 'bg-[#1E293B] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Dark Block Elements' },
    { name: 'slate-900', hex: '#0F172A', className: 'bg-[#0F172A] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Absolute Dark Borders' },
  ];

  const tealSwatches: Swatch[] = [
    { name: 'teal-50', hex: '#F0FDFA', className: 'bg-[#F0FDFA] text-[#0F766E]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Accent Highlighting Panel' },
    { name: 'teal-100', hex: '#CCFBF1', className: 'bg-[#CCFBF1] text-[#0F766E]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Micro Tag Background' },
    { name: 'teal-200', hex: '#99F6E4', className: 'bg-[#99F6E4] text-[#0F766E]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Emphasis Border' },
    { name: 'teal-300', hex: '#5EEAD4', className: 'bg-[#5EEAD4] text-[#115E59]', contrastWhite: 'Fail', contrastBlack: 'AAA', role: 'Decorative Segment' },
    { name: 'teal-400', hex: '#2DD4BF', className: 'bg-[#2DD4BF] text-[#115E59]', contrastWhite: 'AA', contrastBlack: 'AA', role: 'Dignified Active Accent' },
    { name: 'teal-500', hex: '#0D9488', className: 'bg-[#0D9488] text-white', contrastWhite: 'AAA', contrastBlack: 'AA', role: 'Credibility Teal Core' },
    { name: 'teal-700', hex: '#0F766E', className: 'bg-[#0F766E] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Rich Executive Accent' },
    { name: 'teal-800', hex: '#115E59', className: 'bg-[#115E59] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Institutional Headers' },
    { name: 'teal-900', hex: '#134E4A', className: 'bg-[#134E4A] text-white', contrastWhite: 'AAA', contrastBlack: 'Fail', role: 'Deep Solid Highlight' },
  ];

  const statusSwatches = [
    { name: 'status-success', hex: '#15803D', lightHex: '#DCFCE7', role: 'Dignified Success/Acceptance State', contrast: 'AAA' },
    { name: 'status-warning', hex: '#B45309', lightHex: '#FEF3C7', role: 'Dignified Cautionary State', contrast: 'AAA' },
    { name: 'status-error', hex: '#B91C1C', lightHex: '#FEE2E2', role: 'Administrative Grievance/Error Block', contrast: 'AAA' },
  ];

  const quotePresets = [
    "We communicate to make an impact, and it all starts with Trust.",
    "Generating Trust through Honest Communications is our institutional compass.",
    "Leadership is credibility. Credibility is established through transparency and sincerity.",
    "Strategic institutional alignment demands uncompromising clarity, devoid of modern corporate jargon."
  ];

  const configCode = `/**
 * Trust School of Communications (T-SOC)
 * Production-Ready Design System Specification
 * Tailwind CSS Configuration Standards
 */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4FA',
          100: '#DBE5F4',
          200: '#BACCE7',
          300: '#8FAAD5',
          400: '#5E83C0',
          500: '#395FA3',
          600: '#2A4B86',
          700: '#1F3867',
          805: '#132549', // Trust Navy Core
          900: '#0A142A', 
          950: '#050B18',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569', // Executive Slate Core
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          450: '#2DD4BF',
          500: '#0D9488', // Credibility Teal Core
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        status: {
          success: { DEFAULT: '#15803D', light: '#DCFCE7' },
          warning: { DEFAULT: '#B45309', light: '#FEF3C7' },
          error: { DEFAULT: '#B91C1C', light: '#FEE2E2' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.025em' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.020em' }],
        'h2': ['1.75rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.015em' }],
        'h3': ['1.25rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.010em' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.020em' }]
      }
    },
  },
};`;

  return (
    <div id="tsoc-design-system-page" className="w-full space-y-10 py-6 max-w-7xl mx-auto px-4 md:px-6">
      
      {/* Title block */}
      <div className="border-b border-white/5 pb-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-teal-400 font-bold uppercase tracking-widest">// ARCHITECTURAL SPECIFICATIONS</span>
          <span className="px-2 py-0.5 rounded-full bg-navy-900 border border-navy-800 text-teal-300 font-mono text-[9px] font-semibold">STAGE v1.5.0</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1.5">
          T-SOC Design Token Engine & Compliance Hub
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl leading-relaxed">
          Access structural parameters, color swatch values, accessibilities, motion curves, and QA compliance reports built strictly for the Trust School of Communications New Delhi operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar inside page body */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-[#091122]/90 p-5 rounded-sm border border-navy-900 shadow-xl space-y-3">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0D9488] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" /> SPEC SECTIONS
            </h3>
            
            <nav className="flex flex-col gap-1 text-xs">
              {[
                { id: 'brand', label: '1. Brand Persona', icon: ShieldCheck },
                { id: 'colors', label: '2. Colors Spectra', icon: Palette },
                { id: 'typography', label: '3. Typography Hierarchy', icon: Type },
                { id: 'motion', label: '4. Motion Curves', icon: Sliders },
                { id: 'architecture', label: '5. App Router Tree', icon: Settings },
                { id: 'config', label: '6. tailwind.config.js Block', icon: Code },
                { id: 'qa', label: '7. QA Compliance', icon: Award }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full text-left px-3 py-2.5 rounded-sm font-mono flex items-center justify-between transition-all duration-150 cursor-pointer ${
                      isActive 
                        ? 'bg-teal-950 text-teal-300 font-bold border-l-2 border-teal-500 shadow-md' 
                        : 'text-slate-300 hover:bg-navy-900/60 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    <ChevronRight className="w-3 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="bg-[#050b18] text-slate-300 p-5 rounded-sm border border-navy-900 text-xs shadow-md">
            <h4 className="font-mono text-[10px] text-teal-400 font-bold mb-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Sovereign Trust Assurance
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400 font-sans">
              Tailored strictly to T-SOC's core mandate. Our parameters prioritize professional authority, eliminating modern gamified elements or loose visual hierarchies.
            </p>
          </div>
        </aside>

        {/* Details Stage */}
        <main className="lg:col-span-9 space-y-6">
          
          {activeTab === 'brand' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900 text-slate-200">
              <div>
                <span className="text-[9px] font-mono text-teal-450 tracking-widest block uppercase font-bold">// STANDARD COGNITIVE PROFILE</span>
                <h2 className="text-xl md:text-2xl mt-1 font-bold text-white tracking-tight">Brand Identity & Stakeholder Landscape</h2>
                <hr className="border-white/5 my-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-navy-950/40 p-6 border border-white/5 rounded-sm">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Core Academy Slogan</h4>
                    <p className="text-sm italic text-slate-300 font-serif mt-1">"Generating Trust through Honest Communications"</p>
                  </div>
                  <hr className="border-white/5" />
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Governance Maxim</h4>
                    <p className="text-base text-white font-semibold font-sans mt-1">"We communicate to make an impact, and it all starts with Trust."</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Tone Matrices</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                    <div className="bg-navy-950 p-2.5 rounded-xs border border-white/5">
                      <span className="text-slate-500 block text-[8px] uppercase">Rhetorical Style</span>
                      <span className="text-white font-medium font-sans text-xs">Authoritative</span>
                    </div>
                    <div className="bg-navy-950 p-2.5 rounded-xs border border-white/5">
                      <span className="text-slate-500 block text-[8px] uppercase">Clarification Depth</span>
                      <span className="text-white font-medium font-sans text-xs">Jargon-Free</span>
                    </div>
                    <div className="bg-navy-950 p-2.5 rounded-xs border border-white/5">
                      <span className="text-slate-500 block text-[8px] uppercase">Stakeholder level</span>
                      <span className="text-white font-medium font-sans text-xs">Corporate / C-Suite</span>
                    </div>
                    <div className="bg-navy-950 p-2.5 rounded-xs border border-white/5">
                      <span className="text-slate-500 block text-[8px] uppercase">Goal Metrics</span>
                      <span className="text-white font-medium font-sans text-xs">Truth & Faith</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stakeholders list */}
              <div className="space-y-3 pt-2">
                <h3 className="font-mono text-xs font-bold text-[#0D9488] uppercase tracking-wider">// DESIGNATED TARGET SECTORS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: '01 // C-suite Executive Directors', desc: 'Requiring bulletproof corporate crisis communications with absolute jargon exclusion.' },
                    { label: '02 // Human Capital Stakeholders', desc: 'Sustaining high-fidelity cultural transmission and direct structural alignments.' },
                    { label: '03 // Social Responsibility Officers', desc: 'Crafting legal and CSR audit statements backed by verifiable linguistic markers.' },
                    { label: '04 :: Phoneticians & Scholars', desc: 'Exploring traditional rhetoric paradigms (Ethos, Pathos, Logos) inside modern feedback setups.' }
                  ].map((target, idx) => (
                    <div key={idx} className="p-4 bg-navy-950/40 rounded-sm border border-white/5 select-none hover:border-teal-900 transition-colors">
                      <span className="font-mono text-[9px] text-teal-400 block font-bold">{target.label}</span>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">{target.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Credentials Card Generator */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-widest text-teal-400">// CREDENTIALS ARTIFACT SIMULATOR</h3>
                  <p className="text-xs text-slate-400 mt-1">Configure and inspect an elite branding asset for major corporate officers.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 font-semibold mb-1">DELEGATE OFFICER NAME</label>
                      <input 
                        type="text" 
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="bg-navy-950 text-white text-xs px-3 py-2 border border-white/10 focus:border-teal-500 focus:outline-none rounded-xs w-full text-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 font-semibold mb-1">OFFICER CORE ASSIGNMENT</label>
                      <input 
                        type="text" 
                        value={recipientTitle}
                        onChange={(e) => setRecipientTitle(e.target.value)}
                        className="bg-navy-950 text-white text-xs px-3 py-2 border border-white/10 focus:border-teal-500 focus:outline-none rounded-xs w-full text-sans"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-6 flex justify-center p-4 bg-navy-950/60 rounded border border-white/5">
                    <div className="w-full max-w-xs bg-[#030712] p-5 rounded-sm border border-[#132549] relative overflow-hidden shadow-xl text-left select-none">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl" />
                      <div className="flex justify-between items-start mb-5 pb-3 border-b border-white/5">
                        <div className="flex items-center space-x-1.5">
                          <Award className="w-4 h-4 text-teal-400" />
                          <span className="font-mono text-[7px] text-white tracking-widest uppercase">T-SOC DELHI</span>
                        </div>
                        <span className="text-[7px] font-mono px-1 border border-teal-505/20 bg-teal-950 text-teal-300 rounded uppercase">SECURE LEVEL</span>
                      </div>
                      <div className="space-y-1 mb-5">
                        <span className="text-[7px] font-mono block text-teal-500 tracking-wider">// CERTIFIED BY SHREESH SARVAGYA</span>
                        <h4 className="font-bold text-sm text-white tracking-tight leading-none truncate">{recipientName}</h4>
                        <p className="text-[9px] text-slate-400 font-sans leading-none truncate">{recipientTitle}</p>
                      </div>
                      <div className="text-[6.5px] font-mono text-slate-500 flex justify-between">
                        <span>CODE ID: T-SOC-NCR-2026</span>
                        <span>FAITH PARAMETER: 100% EXPLICIT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900 text-slate-200">
              <div>
                <span className="text-[9px] font-mono text-teal-450 tracking-widest block uppercase font-bold">// ACCESSIBILITY CALIBRATIONS</span>
                <h2 className="text-xl md:text-2xl mt-1 font-bold text-white tracking-tight">Executive Hexadecimal scale</h2>
                <hr className="border-white/5 my-4" />
              </div>

              <div className="bg-navy-950/50 p-4 border border-white/5 rounded-sm text-xs text-slate-400 flex items-center justify-between">
                <p>Click any color swatch box to instantly copy its exact <strong className="text-teal-400">Hex Code</strong> to your clipboard.</p>
                {copiedText && (
                  <span className="font-mono text-xs text-teal-300 bg-teal-950 border border-teal-500/20 px-2 py-0.5 rounded animate-pulse">
                    Copied {copiedText}
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {[
                  { title: 'Primary Scale (Trust Navy)', role: 'ETHOS: AUTHORITY', list: navySwatches },
                  { title: 'Secondary Scale (Executive Slate)', role: 'ETHOS: INTELLECTUAL', list: slateSwatches },
                  { title: 'Accent Scale (Credibility Teal)', role: 'ETHOS: CLARITY', list: tealSwatches }
                ].map((scale, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1 text-xs">
                      <span className="font-mono block font-bold text-white">{scale.title}</span>
                      <span className="font-mono text-[9px] text-slate-500">{scale.role}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-11 gap-2">
                      {scale.list.map((sw, i) => (
                        <button
                          key={i}
                          onClick={() => handleCopy(sw.hex, sw.name)}
                          className="group text-left border border-white/5 overflow-hidden rounded-xs transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          <div className={`h-11 ${sw.className} p-1.5 flex flex-col justify-between`}>
                            <span className="font-mono text-[8px] font-bold">{sw.name.split('-')[1]}</span>
                            <span className="text-[8px] font-mono opacity-80">{sw.hex}</span>
                          </div>
                          <div className="p-1 bg-navy-950 text-[7px] font-sans text-slate-400 truncate">
                            {sw.role}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status block */}
              <div className="space-y-2 pt-2">
                <div className="border-b border-white/5 pb-1 text-xs">
                  <span className="font-mono font-bold text-white uppercase block">// STATUS INDICATIVE CHANNELS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {statusSwatches.map((sw, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopy(sw.hex, sw.name)}
                      className="group flex items-center bg-navy-950/60 rounded border border-white/5 overflow-hidden text-left cursor-pointer hover:border-white/10 transition-colors"
                    >
                      <div className="w-12 h-12 shrink-0 flex items-center justify-center text-white text-[9px] font-mono font-bold" style={{ backgroundColor: sw.hex }}>
                        {sw.contrast}
                      </div>
                      <div className="p-2.5 leading-tight flex-1 truncate">
                        <span className="font-mono text-[9px] text-teal-400 block font-bold leading-none">{sw.name}</span>
                        <span className="text-xs font-mono font-semibold text-white block mt-1 leading-none">{sw.hex}</span>
                        <p className="text-[9.5px] text-slate-400 font-sans truncate mt-1.5 leading-none">{sw.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900 text-slate-200">
              <div>
                <span className="text-[9px] font-mono text-teal-450 tracking-widest block uppercase font-bold">// SYSTEM PHONETICS</span>
                <h2 className="text-xl md:text-2xl mt-1 font-bold text-white tracking-tight">Structured Sizing & Leading Scales</h2>
                <hr className="border-white/5 my-4" />
              </div>

              <div className="p-5 bg-navy-950/50 border border-white/5 rounded-sm space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-mono font-bold text-white">TYPOGRAPHY DRILL PLAYGROUND</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Type custom communication parameters below to inspect scale outputs.</p>
                  </div>
                  <button
                    onClick={() => {
                      const idx = quotePresets.indexOf(typedQuote);
                      const nextIdx = idx === -1 || idx === quotePresets.length - 1 ? 0 : idx + 1;
                      setTypedQuote(quotePresets[nextIdx]);
                    }}
                    className="bg-navy-950 hover:bg-navy-900 text-teal-300 text-[11px] font-mono px-2.5 py-1.5 border border-white/5 rounded-xs flex items-center gap-1 cursor-pointer font-bold uppercase transition"
                  >
                    <RefreshCw className="w-3 h-3 text-[#0D9488]" /> Rotate Maxims
                  </button>
                </div>
                <textarea
                  value={typedQuote}
                  onChange={(e) => setTypedQuote(e.target.value)}
                  rows={2}
                  className="w-full text-xs font-sans p-2.5 bg-navy-900 text-white border border-white/5 focus:border-[#0D9488] focus:outline-none rounded-xs block resize-none"
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">Preview Target Weight:</span>
                  <div className="flex gap-1.5">
                    {(['font-normal', 'font-medium', 'font-semibold', 'font-bold'] as const).map((w, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedWeight(w)}
                        className={`px-2 py-0.5 rounded font-mono text-[9px] border cursor-pointer uppercase transition-colors ${
                          selectedWeight === w 
                            ? 'bg-teal-950 text-teal-300 border-teal-500 font-bold' 
                            : 'bg-navy-900 text-slate-400 hover:text-white border-white/5'
                        }`}
                      >
                        {w.replace('font-', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stack items */}
              <div className="space-y-6 divide-y divide-white/5 pt-2">
                {[
                  { num: '01', level: 'HERO DISPLAY (56px)', sizeClass: 'text-4xl md:text-5xl lg:text-[56px] leading-[1.15]' },
                  { num: '02', level: 'H1 MAIN TITLE (40px)', sizeClass: 'text-2xl md:text-[40px] leading-[1.2]' },
                  { num: '03', level: 'H2 SECTION TITLE (28px)', sizeClass: 'text-xl md:text-[28px] leading-[1.25]' },
                  { num: '04', level: 'H3 SUB-HEADING (20px)', sizeClass: 'text-lg md:text-[20px] leading-[1.3]' },
                  { num: '05', level: 'BODY PARAGRAPH (16px)', sizeClass: 'text-sm md:text-base leading-[1.6] text-slate-350 font-sans' }
                ].map((item, key) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6">
                    <div className="md:col-span-3 font-mono text-[9px] tracking-widest text-[#0D9488] font-bold space-y-1">
                      <span>{item.num} // {item.level}</span>
                    </div>
                    <div className="md:col-span-9">
                      <p className={`${item.sizeClass} text-white tracking-tight ${selectedWeight} break-words`}>
                        {typedQuote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'motion' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900 text-slate-200">
              <div>
                <span className="text-[9px] font-mono text-teal-450 tracking-widest block uppercase font-bold">// BEZIER DEVIATIONS</span>
                <h2 className="text-xl md:text-2xl mt-1 font-bold text-white tracking-tight">Kinematics Easing Specifications</h2>
                <hr className="border-white/5 my-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans leading-relaxed">
                <div className="bg-navy-950/40 p-4 border border-white/5 rounded-xs space-y-2">
                  <span className="font-mono text-teal-400 font-bold uppercase block text-[9px]">// REGISTERED EASING CURVES [APPROVED]</span>
                  <p className="text-slate-400">All transitions (e.g., drawer sliding, viewport sizing, page reveals) are hardcoded to decelerating cubic easing curve <code className="bg-navy-950 px-1 py-0.5 rounded text-white border border-white/5 font-mono text-[10px]">cubic-bezier(0.16, 1, 0.3, 1)</code>.</p>
                  <p className="text-slate-400">Duration maps precisely between <code className="bg-navy-950 px-1 py-0.5 rounded text-white border border-white/5 font-mono text-[10px]">350ms - 400ms</code> to mirror formal administrative rhythms.</p>
                </div>
                <div className="bg-rose-950/20 text-rose-200 p-4 border border-rose-900/30 rounded-xs space-y-2">
                  <span className="font-mono text-rose-450 font-bold uppercase block text-[9px] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> BLOCKED KINEMATICS [DENIED]
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed text-rose-300">
                    <li>No spring-based elastic bounce.</li>
                    <li>No neon flicker or high-speed oscillating pulses.</li>
                    <li>No visual zooms exceeding 102% of display grid scales.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-mono text-xs font-bold text-[#0D9488] uppercase tracking-wider">// INTERACTIVE KINEMATICS SIMULATOR</h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 p-4 bg-navy-950/50 rounded-sm border border-white/5 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold mb-1">SELECT PRESET</span>
                      <div className="flex flex-col gap-1.5 text-xs font-mono">
                        {(['fade-up', 'fade-right', 'pulse'] as const).map((anim, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setMotionAnimation(anim);
                              setAnimationTrigger(prev => prev + 1);
                            }}
                            className={`w-full text-left px-3 py-2 border rounded-sm cursor-pointer transition-colors ${
                              motionAnimation === anim 
                                ? 'bg-teal-950 text-teal-300 border-teal-500 font-bold' 
                                : 'bg-navy-900 text-slate-400 border-white/5 hover:text-white'
                            }`}
                          >
                            {anim === 'fade-up' && '01 // fade-in-up'}
                            {anim === 'fade-right' && '02 // fade-in-right'}
                            {anim === 'pulse' && '03 // elite-pulse-slow'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setAnimationTrigger(prev => prev + 1)}
                      className="w-full bg-[#0D9488] hover:bg-[#14b8a6] text-[#050b18] font-mono font-bold text-xs py-2 rounded-xs select-none cursor-pointer tracking-wider"
                    >
                      TRIGGER TRANSITION
                    </button>
                  </div>
                  <div className="md:col-span-8 flex justify-center items-center p-6 bg-navy-950/40 rounded border border-white/5 min-h-[160px] relative overflow-hidden">
                    {motionAnimation === 'fade-up' && (
                      <div key={animationTrigger} className="bg-navy-950 border border-white/10 p-5 rounded max-w-xs text-center space-y-2 animate-fade-in-up">
                        <Award className="w-8 h-8 text-teal-400 mx-auto" />
                        <h4 className="text-white font-bold text-xs">Y-Axis Decelerating Sweep</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">Smooth coordinate change over 400ms. Tested verified non-jarring metrics.</p>
                      </div>
                    )}
                    {motionAnimation === 'fade-right' && (
                      <div key={animationTrigger} className="bg-navy-950 border border-teal-950 p-5 rounded max-w-xs text-center space-y-2 animate-fade-in-right">
                        <ShieldCheck className="w-8 h-8 text-[#0D9488] mx-auto" />
                        <h4 className="text-white font-bold text-xs">X-Axis Sweep</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">Decelerating side entrance perfect for tab modifications.</p>
                      </div>
                    )}
                    {motionAnimation === 'pulse' && (
                      <div className="w-24 h-24 rounded-full border border-teal-500/10 flex flex-col justify-center items-center text-center p-2 bg-teal-950/5 animate-pulse-slow">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span className="text-[8px] font-mono text-teal-300 block mt-1 uppercase font-bold">Pulse Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900 text-slate-200">
              <div>
                <span className="text-[9px] font-mono text-teal-450 tracking-widest block uppercase font-bold">// REPOSITORY ARCHITECTURE</span>
                <h2 className="text-xl md:text-2xl mt-1 font-bold text-white tracking-tight">Next.js App Router Structure</h2>
                <hr className="border-white/5 my-4" />
              </div>
              <DirectoryTree />
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900 text-slate-200">
              <div>
                <span className="text-[9px] font-mono text-teal-450 tracking-widest block uppercase font-bold">// EXPORT TO CONFIG</span>
                <h2 className="text-xl md:text-2xl mt-1 font-bold text-white tracking-tight">tailwind.config.js Block</h2>
                <hr className="border-white/5 my-4" />
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between items-center text-slate-400">
                  <span>PRODUCTION TOKEN SPECIFICATIONS</span>
                  <button
                    onClick={() => handleCopy(configCode, 'config')}
                    className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText === 'config' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Core Tokens</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#030712] text-teal-150 p-5 rounded border border-[#132549] max-h-[400px] overflow-x-auto leading-relaxed overflow-y-auto select-all">
                  {configCode}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-6 animate-fade-in-up duration-200 bg-[#091122]/90 p-6 md:p-8 rounded-sm border border-navy-900">
              <QAAuditDashboard />
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
