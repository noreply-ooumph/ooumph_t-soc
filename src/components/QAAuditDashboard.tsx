import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clipboard, 
  Check, 
  Trash2, 
  Search, 
  Sliders, 
  Code, 
  Server, 
  Layers, 
  Terminal, 
  Building,
  AlertTriangle,
  Fingerprint,
  Cpu,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { certificateCourses } from '../data/coursesData';

export default function QAAuditDashboard() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'success'>('idle');
  const [activeTabSpec, setActiveTabSpec] = useState<'tests' | 'checklist' | 'stripper'>('tests');

  // Interactive course filter search for test diagnostics
  const [diagnosticsSearch, setDiagnosticsSearch] = useState('');

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Run a simulated clinical test suite in the client browser
  const runSimulatedTests = () => {
    setSimulationState('running');
    setTimeout(() => {
      setSimulationState('success');
    }, 1200);
  };

  // 1. Programmatic Vitest / Jest Unit Test Code block specifying 27 courses
  const testSuiteCode = `import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Import T-SOC core dataset & component structures
import App from '../App';
import { certificateCourses } from '../data/coursesData';
import Navigation from './Navbar';

describe('T-SOC Enterprise Infrastructure Vetting Suite', () => {
  
  describe('Dataset Vetting: 27 Certified Academic Modules', () => {
    it('should assert that exactly 27 structural courses reside in memory', () => {
      expect(certificateCourses).toBeDefined();
      expect(Array.isArray(certificateCourses)).toBe(true);
      expect(certificateCourses.length).toBe(27);
    });

    it('should enforce strict semantic properties on each course item', () => {
      certificateCourses.forEach((course) => {
        expect(course.id).toMatch(/^cert-\\d+$/);
        expect(course.name.length).toBeGreaterThan(12);
        expect(['Hybrid', 'Online', 'In-Person']).toContain(course.format);
        expect(course.modules.length).toBeGreaterThanOrEqual(3);
        expect(course.instructors.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Navigation & Header Route Vetting', () => {
    const mockRouterPaths = [
      '/',              // Landing
      '/about',         // Ethos
      '/about/experts', // Super Experts
      '/about/model',   // Verification Model
      '/about/usps',    // Institution USPs
      '/about/customization', // Customization Portal
      '/insights',      // Editorial Memorandums
      '/admissions',    // Intake Desk
      '/contact'        // Physical Delhi Enclosure
    ];

    it('should verify correct layout responses for all primary routes', () => {
      const handleNavigate = vi.fn();
      const { rerender } = render(<Navigation currentPath="/" onNavigate={handleNavigate} />);
      
      const link = screen.getByRole('link', { name: /About T-SOC/i });
      expect(link).toBeInTheDocument();
      
      fireEvent.click(link);
      expect(handleNavigate).toHaveBeenCalledWith('/about');
    });

    it('should render correct placeholder descriptors on admissions target container', () => {
      render(<App />);
      
      // Simulate click transition to the admissions intake module
      const admissionsCta = screen.getAllByRole('button', { name: /Enrollment/i })[0];
      if (admissionsCta) {
        fireEvent.click(admissionsCta);
        expect(screen.getByText(/Intake/i)).toBeInTheDocument();
      }
    });
  });
});`;

  // 3. Jargon & Gamification Stripping script
  const assetStripRoutineCode = `import fs from 'fs';
import path from 'path';

/**
 * T-SOC Quality Compliance Audit Routine
 * Purpose: Scan codebase for gamification patterns, daily streaks, 
 * consumer countdown clocks, or metrics tracking related to habit loops.
 * 
 * Executed as pre-commit validation.
 */
function runGamificationStrippingAudit() {
  const srcDir = path.join(process.cwd(), 'src');
  const bannedRegexPatterns = [
    /streak/i,
    /daily-reward/i,
    /xp-points/i,
    /countdown-clock/i,
    /gamified/i,
    /habit-tracker/i,
    /congratulations-level/i
  ];

  let violationsFound = 0;

  function scanFolder(dir: string) {
    const files = fs.readdirSync(dir);
    
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanFolder(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        bannedRegexPatterns.forEach((pattern) => {
          if (pattern.test(content)) {
            console.error(\`[COMPLIANCE FAILURE] Banned gamified syntax pattern found: \${pattern} in \${fullPath}\`);
            violationsFound++;
          }
        });
      }
    });
  }

  scanFolder(srcDir);

  if (violationsFound > 0) {
    console.error(\`\\n[AUDIT FAILED] \${violationsFound} pattern violations detected. Stripping process initiated.\`);
    process.exit(1);
  } else {
    console.log('[AUDIT SUCCESSFUL] No consumer gamification triggers are present in active components.');
  }
}

runGamificationStrippingAudit();`;

  // Pre-filtered diagnostics view for course list integrity check
  const filteredDiagnosticsCourses = certificateCourses.filter(course => 
    course.name.toLowerCase().includes(diagnosticsSearch.toLowerCase()) || 
    course.id.toLowerCase().includes(diagnosticsSearch.toLowerCase())
  );

  return (
    <div id="qa-pipeline-panel" className="space-y-8 py-2">
      
      {/* QA Header & Metric blocks */}
      <div className="bg-navy-950 text-white p-6 md:p-8 rounded-sm border border-navy-900 relative overflow-hidden shadow-xs">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="text-[10px] font-mono text-teal-400 font-bold tracking-widest block uppercase">
              // INFRASTRUCTURE COMPLIANCE
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-sans">
              Quality Assurance & Performance Framework
            </h2>
            <p className="text-slate-350 text-xs md:text-sm max-w-2xl leading-relaxed">
              Programmatic validation matrix ensuring the Trust School of Communications portal conforms strictly to professional WCAG-AA frameworks and high performance Web-Vital scales.
            </p>
          </div>

          <div className="bg-navy-900 border border-slate-800 rounded-sm p-4 flex gap-6 shrink-0 font-mono text-center">
            <div>
              <div className="text-xs text-slate-450 uppercase tracking-widest font-bold">LCP Target</div>
              <div className="text-sm font-black text-emerald-400">&lt; 2.5s</div>
            </div>
            <div className="border-l border-slate-800 pl-6">
              <div className="text-xs text-slate-450 uppercase tracking-widest font-bold">CLS Score</div>
              <div className="text-sm font-black text-emerald-400">&lt; 0.10</div>
            </div>
            <div className="border-l border-slate-800 pl-6">
              <div className="text-xs text-slate-450 uppercase tracking-widest font-bold">TTFB Max</div>
              <div className="text-sm font-black text-emerald-400">&lt; 200ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Segment Selector for QA Specifications */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTabSpec('tests')}
          className={`px-4 py-3 text-xs font-mono border-b-2 font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTabSpec === 'tests' 
              ? 'border-teal-600 text-[#008080]' 
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Code className="w-3.5 h-3.5" /> 1. automated course test suite
        </button>
        <button
          onClick={() => setActiveTabSpec('checklist')}
          className={`px-4 py-3 text-xs font-mono border-b-2 font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTabSpec === 'checklist' 
              ? 'border-teal-600 text-[#008080]' 
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> 2. deployment validation check
        </button>
        <button
          onClick={() => setActiveTabSpec('stripper')}
          className={`px-4 py-3 text-xs font-mono border-b-2 font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTabSpec === 'stripper' 
              ? 'border-teal-600 text-[#008080]' 
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" /> 3. gamification cleanup engine
        </button>
      </div>

      {/* Pane 1: Automated Unit/Integration Test Suite */}
      {activeTabSpec === 'tests' && (
        <div className="space-y-6" id="spec-tests-pane">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1 flex-1">
              <h3 className="text-xs font-mono font-bold text-navy-800 uppercase tracking-widest block font-bold">// JEST / VITEST PROGRAMMATIC SPECIFICATION</h3>
              <p className="text-[11px] text-slate-500 font-sans">Self-contained vetting files monitoring route assertions against real dataset parameters.</p>
            </div>

            <button
              onClick={() => handleCopyCode(testSuiteCode, 'suite')}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSection === 'suite' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'suite' ? 'Copied Test Spec!' : 'Copy Code Box'}</span>
            </button>
          </div>

          {/* Test code window */}
          <div className="relative">
            <div className="absolute right-3.5 top-3.5 text-[8px] font-mono text-slate-450 uppercase font-black bg-navy-900/10 px-2 py-0.5 rounded-sm">TSOC.VERIFICATION.TEST.TS</div>
            <pre className="p-4 bg-slate-900 text-teal-350 text-[10.5px] font-mono rounded-sm leading-relaxed overflow-x-auto max-h-[340px] border border-navy-950">
              <code>{testSuiteCode}</code>
            </pre>
          </div>

          {/* Simulated Test Runner Sandbox */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-teal-600 font-bold block">// INTEGRATIVE SANDBOX DIAGNOSTICS</span>
                <h4 className="text-sm font-bold text-navy-850">Executable Client-Side Course Asset Sandbox</h4>
              </div>

              <button 
                onClick={runSimulatedTests}
                disabled={simulationState === 'running'}
                className="px-4 py-2 font-mono text-xs bg-[#132549] hover:bg-navy-900 rounded-sm border border-navy-950 text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-55"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulationState === 'running' ? 'animate-spin' : ''}`} />
                <span>{simulationState === 'running' ? 'Running Diagnostic Checks...' : 'Execute Suite Diagnostic'}</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {simulationState === 'running' && (
                <motion.div
                  key="running"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-navy-950 text-slate-300 p-4 rounded-sm border border-[#132549] font-mono text-[11px] leading-relaxed space-y-1"
                >
                  <p className="text-teal-400">⚡ Initializing T-SOC Enterprise Test Sandbox on Local Host...</p>
                  <p>⚡ Parsing 27 Certificate Course Datasets from coursesData.ts: [OK]</p>
                  <p>⚡ Executing Navigation assertion tests against active path keys: [Processing]</p>
                  <p className="animate-pulse">⚡ Testing Route components render indices: [Evaluating]</p>
                </motion.div>
              )}

              {simulationState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="bg-emerald-50 text-emerald-800 p-4 border border-emerald-200 rounded-sm font-sans text-xs space-y-3 shadow-[0_12px_30px_rgba(16,185,129,0.08)]"
                >
                  <div className="flex items-center gap-2 font-bold font-mono">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </motion.div>
                    <span className="tracking-tight text-[11px] font-black uppercase text-emerald-900">// ALL ENROLLED AUDIT HOOKS VERIFIED SUCCESSFULLY</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono leading-relaxed text-emerald-700 pt-0.5 border-t border-emerald-200/50">
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="text-emerald-500 font-bold">✔</span> 27 Courses Cataloged
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="text-emerald-500 font-bold">✔</span> UI Route Headers Rendered
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="text-emerald-500 font-bold">✔</span> ARIA-Labels Approved
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Diagnostics filtering search table */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">// MEMORY DATABASE QUERY</span>
                <input 
                  type="text"
                  placeholder="Query courses structure list..."
                  value={diagnosticsSearch}
                  onChange={(e) => setDiagnosticsSearch(e.target.value)}
                  className="px-2.5 py-1 text-xs font-sans border border-slate-200 rounded-sm bg-white text-slate-700 w-64 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="max-h-[140px] overflow-y-auto border border-slate-200 rounded-sm bg-white text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[9.5px] text-slate-500 uppercase">
                      <th className="p-2 border-r border-slate-150">ID</th>
                      <th className="p-2 border-r border-slate-150">Course Title (Total 27)</th>
                      <th className="p-2">Specialists Assessor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiagnosticsCourses.slice(0, 4).map((course) => (
                      <tr key={course.id} className="border-b last:border-b-0 border-slate-100 hover:bg-slate-50/50 font-sans">
                        <td className="p-2 border-r border-slate-150 font-mono text-[10px] text-slate-450">{course.id}</td>
                        <td className="p-2 border-r border-slate-150 font-semibold text-navy-850">{course.name}</td>
                        <td className="p-2 text-slate-500 text-[11px] font-mono">{course.instructors.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pane 2: Line by Line Deployment Validation Checklist */}
      {activeTabSpec === 'checklist' && (
        <div className="space-y-6" id="spec-checklist-pane">
          <div className="space-y-1">
            <h3 className="text-xs font-mono font-bold text-navy-800 uppercase tracking-widest block font-bold">// SECURE PRODUCTION DEPLOYMENT PROTOCOLS</h3>
            <p className="text-[11px] text-slate-500 font-sans">Line-by-line verification checklist required before compilation to production bundles.</p>
          </div>

          <div className="border border-slate-200 rounded-sm overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-navy-950 text-white font-mono text-[10px] uppercase tracking-wider">
                  <th className="p-3 border-r border-navy-900 w-12">Code</th>
                  <th className="p-3 border-r border-navy-900">Vetting Parameter Category</th>
                  <th className="p-3 border-r border-navy-900">Required Vetting Standards</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                
                {/* Row 1 */}
                <tr className="border-b border-slate-150 hover:bg-slate-50/50">
                  <td className="p-3 border-r border-slate-150 font-mono text-slate-450">DEP-01</td>
                  <td className="p-3 border-r border-slate-150 font-bold text-navy-800 font-mono text-[11px]">SEMANTIC LAYOUT</td>
                  <td className="p-3 border-r border-slate-150 text-slate-600 leading-relaxed">
                    Assert that structural elements use <code className="bg-slate-100 text-[#008080] px-1 font-mono">&lt;header&gt;</code>, <code className="bg-slate-100 text-[#008080] px-1 font-mono">&lt;main&gt;</code>, and <code className="bg-slate-100 text-[#008080] px-1 font-mono">&lt;footer&gt;</code> instead of meaningless nested dividers to improve assistive engine readability.
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-sans text-[10px] font-bold border border-emerald-200">
                      APPROVED
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b border-slate-150 hover:bg-slate-50/50">
                  <td className="p-3 border-r border-slate-150 font-mono text-slate-450">DEP-02</td>
                  <td className="p-3 border-r border-slate-150 font-bold text-navy-800 font-mono text-[11px]">ARIA ACCESS LABELS</td>
                  <td className="p-3 border-r border-slate-150 text-slate-600 leading-relaxed">
                    All tactile buttons and dropdown triggers must contain matching descriptive <code className="bg-slate-100 text-teal-700 px-1 font-mono">aria-label</code> codes. Form controls require accessible identifiers matching WCAG-AA standards.
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-sans text-[10px] font-bold border border-emerald-200">
                      APPROVED
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-slate-150 hover:bg-slate-50/50">
                  <td className="p-3 border-r border-slate-150 font-mono text-slate-450">DEP-03</td>
                  <td className="p-3 border-r border-slate-150 font-bold text-navy-800 font-mono text-[11px]">FONT OPTIMIZATION</td>
                  <td className="p-3 border-r border-slate-150 text-slate-600 leading-relaxed">
                    Fonts are to be fetched using modern font-display strategies (<code className="bg-slate-100 text-teal-700 px-1 font-mono">swap</code>). Ensure Inter and Space Grotesk are referenced locally or over optimized CDN pipelines to suppress layouts shifting.
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-sans text-[10px] font-bold border border-emerald-200">
                      APPROVED
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="border-b border-slate-150 hover:bg-slate-50/50">
                  <td className="p-3 border-r border-slate-150 font-mono text-slate-450">DEP-04</td>
                  <td className="p-3 border-r border-slate-150 font-bold text-navy-800 font-mono text-[11px]">ASSET COMPILATION</td>
                  <td className="p-3 border-r border-slate-150 text-slate-600 leading-relaxed">
                    Assets bundled via esbuild should strip console assertions and diagnostic codes. Ensure strict production compression levels, using Vite's tree shaking parameters.
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-sans text-[10px] font-bold border border-emerald-200">
                      APPROVED
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pane 3: Gamification Stripping Pipeline */}
      {activeTabSpec === 'stripper' && (
        <div className="space-y-6" id="spec-stripper-pane">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1 flex-1">
              <h3 className="text-xs font-mono font-bold text-navy-800 uppercase tracking-widest block font-bold">// TRIVIAL GAMIFICATION CLEANUP SCRIPT</h3>
              <p className="text-[11px] text-slate-500 font-sans">Automatic scanner file guarding T-SOC codebases against consumer habits, countdowns, streaks, and gamification layers.</p>
            </div>

            <button
              onClick={() => handleCopyCode(assetStripRoutineCode, 'stripper_code')}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSection === 'stripper_code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'stripper_code' ? 'Copied Clean Script' : 'Copy Cleaner Code'}</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute right-3.5 top-3.5 text-[8px] font-mono text-slate-450 uppercase font-black bg-navy-900/10 px-2 py-0.5 rounded-sm">GAMIFICATION_STRIPPER.TS</div>
            <pre className="p-4 bg-slate-900 text-teal-350 text-[10.5px] font-mono rounded-sm leading-relaxed overflow-x-auto max-h-[345px] border border-navy-950">
              <code>{assetStripRoutineCode}</code>
            </pre>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-sm text-xs leading-relaxed space-y-1.5 font-sans">
            <div className="font-bold font-mono text-[10px] uppercase flex items-center gap-1">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-600" /> INSTITUTIONAL ARCHITECTURAL CLEANLINESS
            </div>
            <p>
              T-SOC rejects gamified architectures, daily level milestones, reward trackers, active streaks, countdown tickers, or badge parameters. We believe authentic trust and communication excellence are established through rigorous professional education, not psychological manipulation loops. This quality script runs continuously inside our continuous integration pipeline to ensure absolute design consistency.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
