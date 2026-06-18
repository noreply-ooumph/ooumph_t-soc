import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, FileCode, Check, Copy } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  purpose?: string;
  metadataCode?: string;
  path: string;
  children?: FileNode[];
}

export default function DirectoryTree() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src': true,
    'src/app': true,
    'src/app/courses': true,
    'src/app/about': true,
  });
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const fileTree: FileNode = {
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        name: 'app',
        type: 'folder',
        path: 'src/app',
        children: [
          {
            name: 'layout.tsx',
            type: 'file',
            path: 'src/app/layout.tsx',
            purpose: 'Global Next.js App Router root layout. Injects T-SOC Design System font classes (Inter Font Pairings) and renders the responsive <Navbar /> and heavy executive <Footer />.',
            metadataCode: `import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Trust School of Communications (T-SOC)',
    template: '%s | T-SOC - Honest Communications'
  },
  description: 'Generating Trust through Honest Communications. Executive-level leadership training, speech development, and brand alignment.',
  metadataBase: new URL('https://t-soc.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://t-soc.com',
    siteName: 'T-SOC',
    images: [{ url: '/images/og-trust-brand.jpg', width: 1200, height: 630 }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-navy-900 flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}`
          },
          {
            name: 'page.tsx',
            type: 'file',
            path: 'src/app/page.tsx',
            purpose: 'The Home page of T-SOC. Displays the core brand message: "We communicate to make an impact, and it all starts with Trust.", curriculum highlight cards, and an admissions call to action.',
            metadataCode: `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Trust School of Communications (T-SOC)',
  description: 'Generating Trust through Honest Communications. Professional, jargon-free modules built for executive excellence.'
};

export default function HomePage() {
  return (
    <div className="animate-fade-in-up">
      {/* Visual content segment with dynamic Trust Oath metrics */}
    </div>
  );
}`
          },
          {
            name: 'courses',
            type: 'folder',
            path: 'src/app/courses',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: 'src/app/courses/page.tsx',
                purpose: 'Primary Curriculum hub. Outlines our scientific methodology and channels students to Certificate and Short-Term courses.',
                metadataCode: `export const metadata = {
  title: 'Courses We Offer',
  description: 'Explore certificates and intensive communications programs designed strictly for C-Suite executives and CSR specialists.'
};`
              },
              {
                name: 'certificate',
                type: 'folder',
                path: 'src/app/courses/certificate',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/courses/certificate/page.tsx',
                    purpose: 'Certificate programs listing containing executive communication certificates with duration and registration links.',
                    metadataCode: `export const metadata = {
  title: 'Certificate Courses | Executive Communication',
  description: 'Professional credentials and board-level certifications verified by the T-SOC strategic council.'
};`
                  }
                ]
              },
              {
                name: 'short-term',
                type: 'folder',
                path: 'src/app/courses/short-term',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/courses/short-term/page.tsx',
                    purpose: 'Intensive weekend bootcamps or micro-credentials focusing on crisis response, media readiness, and stakeholder management.',
                    metadataCode: `export const metadata = {
  title: 'Short Term Intensive Courses',
  description: 'Micro-credentials and fast-track executive bootcamps focusing on immediate crisis response frameworks and honest corporate messaging.'
};`
                  }
                ]
              }
            ]
          },
          {
            name: 'about',
            type: 'folder',
            path: 'src/app/about',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: 'src/app/about/page.tsx',
                purpose: 'A comprehensive entry explaining the elite school background, key mission parameters, and leadership councils.',
                metadataCode: `export const metadata = {
  title: 'About the Academy',
  description: 'Learn why the world\\'s top management councils rely on the T-SOC pedagogical standard.'
};`
              },
              {
                name: 'who-we-are',
                type: 'folder',
                path: 'src/app/about/who-we-are',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/about/who-we-are/page.tsx',
                    purpose: 'Detailing our origins, alignment with state registration commissions, and our commitment to jargon-free institutional transparency.',
                    metadataCode: `export const metadata = {
  title: 'Who We Are',
  description: 'The roots, alignments, and administrative oaths that keep T-SOC at the apex of speech sciences.'
};`
                  }
                ]
              },
              {
                name: 'experts',
                type: 'folder',
                path: 'src/app/about/experts',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/about/experts/page.tsx',
                    purpose: 'Our Super Experts roster featuring international speech coaches, senior brand specialists, and crisis advisory board leaders.',
                    metadataCode: `export const metadata = {
  title: 'Our Super Experts | Global Advisors',
  description: 'Learn directly from international speech coaches, media advisers, and seasoned brand system engineers.'
};`
                  }
                ]
              },
              {
                name: 'model',
                type: 'folder',
                path: 'src/app/about/model',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/about/model/page.tsx',
                    purpose: 'Explains the 3-Prong communication scientific model: Ethos, Logos, Pathos coupled with verifiable real-time analytics dashboards.',
                    metadataCode: `export const metadata = {
  title: 'Our Model | Communications Excellence',
  description: 'Scientific clarity, zero corporate filler words, and transparent behavioral metrics.'
};`
                  }
                ]
              },
              {
                name: 'usps',
                type: 'folder',
                path: 'src/app/about/usps',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/about/usps/page.tsx',
                    purpose: 'Our unique propositions: 1-to-1 C-Suite coaches, rigorous offline simulators, and lifelong trust audit registry privileges.',
                    metadataCode: `export const metadata = {
  title: 'Our USPs | Unique Positioning',
  description: 'Discover the distinct features that make T-SOC programs premium, impactful, and globally unique.'
};`
                  }
                ]
              },
              {
                name: 'customization',
                type: 'folder',
                path: 'src/app/about/customization',
                children: [
                  {
                    name: 'page.tsx',
                    type: 'file',
                    path: 'src/app/about/customization/page.tsx',
                    purpose: 'Curriculum customizers for large enterprise squads. Generate personal schedules that match organizational parameters.',
                    metadataCode: `export const metadata = {
  title: 'Program Customization for C-Suites',
  description: 'Tailor-made communication exercises mapped exactly to enterprise operational challenges.'
};`
                  }
                ]
              }
            ]
          },
          {
            name: 'admissions',
            type: 'folder',
            path: 'src/app/admissions',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: 'src/app/admissions/page.tsx',
                purpose: 'The central admissions registry. High-security forms where applicants submit transcripts, corporate bios, or educational background details.',
                metadataCode: `export const metadata = {
  title: 'Admissions Desk',
  description: 'Secure application portal. Enrollment schedules, terms of matriculation, and academic interview structures.'
};`
              }
            ]
          },
          {
            name: 'insights',
            type: 'folder',
            path: 'src/app/insights',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: 'src/app/insights/page.tsx',
                purpose: 'Our strategic publications board featuring analytical studies on public communications, executive transparency levels, and case assessments.',
                metadataCode: `export const metadata = {
  title: 'Insights & Communications Research',
  description: 'Independent research briefs, trust indexes, and academic reviews published by our resident fellows.'
};`
              }
            ]
          },
          {
            name: 'contact',
            type: 'folder',
            path: 'src/app/contact',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: 'src/app/contact/page.tsx',
                purpose: 'Official helpdesk directory. Hosts physical maps, telephone direct routing lines (9278075130), secure emails (inquiry@t-soc.com), and the Gautam Nagar core campus credentials.',
                metadataCode: `export const metadata = {
  title: 'Contact the Central Registry',
  description: 'Reach our New Delhi campus or file direct inquiries with the Office of Admissions.'
};`
              }
            ]
          }
        ]
      }
    ]
  };

  // Helper function to recursively render the directory tree nodes
  const renderNode = (node: FileNode, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.path];
    const isSelected = selectedFile?.path === node.path;

    return (
      <div key={node.path} className="select-none">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node);
            }
          }}
          className={`flex items-center py-2 px-3 hover:bg-navy-900/10 cursor-pointer rounded-sm border transition-all duration-150 ${
            isSelected 
              ? 'bg-navy-900/50 text-white border-navy-800' 
              : 'text-slate-700 border-transparent'
          }`}
          style={{ paddingLeft: `${depth * 14 + 12}px` }}
        >
          <div className="flex items-center space-x-2 w-full truncate">
            {isFolder ? (
              <span className="text-teal-600">
                {isExpanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
              </span>
            ) : (
              <span className={isSelected ? 'text-teal-400' : 'text-slate-400'}>
                <FileCode className="w-4 h-4" />
              </span>
            )}
            <span className={`text-xs ${isFolder ? 'font-mono uppercase font-bold' : 'font-mono'}`}>{node.name}</span>
          </div>
          {isFolder && (
            <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          )}
        </div>

        {isFolder && isExpanded && node.children && (
          <div className="mt-0.5 border-l border-slate-200/50 ml-6">
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Set default selected file on load
  if (!selectedFile && fileTree.children && fileTree.children[0].children) {
    const layoutNode = fileTree.children[0].children.find(n => n.name === 'layout.tsx');
    if (layoutNode) setSelectedFile(layoutNode);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-sm overflow-hidden p-6 md:p-8">
      {/* Visual Directory Tree Selector */}
      <div className="lg:col-span-5 space-y-4">
        <div>
          <span className="text-[10px] font-mono text-teal-600 font-bold tracking-widest block uppercase">// TREE ARCHITECTURE VIEWPORT</span>
          <h3 className="text-base font-bold text-navy-850 mt-1">Next.js App Router Structure</h3>
          <p className="text-slate-500 text-xs font-sans mt-0.5 leading-relaxed">
            Click files inside the nested spectrum to inspect their respective SEO parameters, routing roles, and layout contexts.
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-sm max-h-[460px] overflow-y-auto space-y-1">
          {renderNode(fileTree)}
        </div>
      </div>

      {/* Selected Node Inspector Code panel */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
        {selectedFile ? (
          <div className="flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#091122] text-white p-3.5 rounded-sm border border-navy-800">
                <div className="truncate">
                  <span className="text-[9px] font-mono text-teal-400 block tracking-widest">// ROUTE FILE SCOPE</span>
                  <p className="text-sm font-mono font-bold truncate">{selectedFile.path}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2_5 h-2.5 rounded-full bg-teal-500 inline-block shrink-0 animate-pulse-slow" />
                  <span className="font-mono text-[9px] text-slate-300 font-semibold bg-navy-850 px-2 py-0.5 rounded-sm">APP ROUTER ACTIVE</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-teal-50/50 border border-teal-200 text-slate-700 text-xs rounded-sm space-y-1">
                <h4 className="font-mono text-teal-800 font-bold tracking-wider">// ROUTING STATEMENT & FOCUS</h4>
                <p className="leading-relaxed font-sans">{selectedFile.purpose}</p>
              </div>

              {/* Code blocks */}
              {selectedFile.metadataCode && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500 px-1 py-0.5">
                    <span>PAGE SPECIFICATION / METADATA</span>
                    <button
                      onClick={() => handleCopy(selectedFile.metadataCode!)}
                      className="text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied Code</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#050b18] text-teal-100 p-4 font-mono text-[10.5px] leading-relaxed rounded-sm border border-[#132549] overflow-x-auto max-h-[250px]">
                    {selectedFile.metadataCode}
                  </pre>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-mono text-slate-500 leading-relaxed">
              <span className="font-bold text-navy-800 uppercase block tracking-wider mb-0.5">// ARCHITECTURAL VERIFICATION NOTE</span>
              App Router routing enforces clean compilation bounds. Notice how page parameters are kept statically evaluable to allow Next.js server-side static page generation (SSG) on top-tier assets. We completely avoid client-side bloat.
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-sm">
            <p className="text-xs text-slate-500 font-mono">Select any layout or page module to view full architecture metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
