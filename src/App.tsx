import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import CoursesPage from './components/CoursesPage';
import AdmissionsPage from './components/AdmissionsPage';
import ContactPage from './components/ContactPage';
import InsightsPage from './components/InsightsPage';
import ExpertsGrid from './components/ExpertsGrid';
import PaymentDesk from './components/PaymentDesk';
import AssessmentPage from './components/AssessmentPage';
import Helmet from './components/Helmet';
import ConversationalAdvisor from './components/ConversationalAdvisor';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });
  const [authUser, setAuthUser] = useState<{name:string;email:string;token:string}|null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tsoc-theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Handle OAuth redirect: /?auth_token=...&auth_name=...&auth_email=...
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get('auth_token');
    const oauthName = params.get('auth_name');
    const oauthEmail = params.get('auth_email');
    if (oauthToken && oauthName && oauthEmail) {
      localStorage.setItem('tsoc_token', oauthToken);
      setAuthUser({ token: oauthToken, name: decodeURIComponent(oauthName), email: decodeURIComponent(oauthEmail) });
      // Clean the URL
      window.history.replaceState({}, '', '/');
      setCurrentPath('/');
      setAuthChecked(true);
      return;
    }

    const token = localStorage.getItem('tsoc_token');
    if (token) {
      fetch('/api/auth/me', {headers:{Authorization:`Bearer ${token}`}})
        .then(r => r.ok ? r.json() : null)
        .then(data => { if(data?.user) setAuthUser({...data.user,token}); else localStorage.removeItem('tsoc_token'); })
        .catch(() => localStorage.removeItem('tsoc_token'))
        .finally(() => setAuthChecked(true));
    } else { setAuthChecked(true); }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('tsoc_token');
    if(token) fetch('/api/auth/logout',{method:'POST',headers:{Authorization:`Bearer ${token}`}}).catch(()=>{});
    localStorage.removeItem('tsoc_token');
    setAuthUser(null);
    setCurrentPath('/');
  };

  const handleLoginSuccess = (user:{name:string;email:string;token:string}) => {
    localStorage.setItem('tsoc_token', user.token);
    setAuthUser(user);
  };

  // Apply layout class on theme change with smooth cross-fade transitions
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-toggle-transition');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('tsoc-theme', theme);

    const timer = setTimeout(() => {
      root.classList.remove('theme-toggle-transition');
    }, 600);

    return () => clearTimeout(timer);
  }, [theme]);

  // Sync browser URL and scroll on route change
  useEffect(() => {
    if (window.location.pathname !== currentPath) {
      window.history.pushState({}, '', currentPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Handle browser back/forward button
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle simulated subpath or layout routing
  const renderPageContent = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage onNavigate={setCurrentPath} />;

      case '/courses':
        return <CoursesPage onNavigate={setCurrentPath} />;
      case '/courses/certificate':
        return <CoursesPage onNavigate={setCurrentPath} initialTab="certificate" />;
      case '/courses/short-term':
        return <CoursesPage onNavigate={setCurrentPath} initialTab="short-term" />;

      case '/about':
      case '/about/experts':
      case '/about/model':
      case '/about/usps':
      case '/about/customization':
        return (
          <div className="space-y-6 py-6 max-w-7xl mx-auto px-4 md:px-6 animate-fade-in-up duration-200">
            <div className="pb-4 text-slate-200">
              <h2 className="font-black font-sans text-center" style={{fontSize:'clamp(2.5rem,6vw,4rem)',color:'#0f172a',fontWeight:900,letterSpacing:'-0.02em'}}>Our Super Experts</h2>
            </div>
            <ExpertsGrid onNavigate={setCurrentPath} />
          </div>
        );

      case '/admissions':
        return <AdmissionsPage onNavigate={setCurrentPath} />;

      case '/insights':
        return <InsightsPage onNavigate={setCurrentPath} />;

      case '/contact':
        return <ContactPage onNavigate={setCurrentPath} />;


      case '/assessment':
        return <AssessmentPage />;

      default:
        if (currentPath.startsWith('/checkout')) {
          const parts = currentPath.split('?')[0].split('/');
          const itemId = parts[2];
          // Cast needed: React 19 removed key from JSX prop types but it remains valid at runtime
          const PaymentDeskKeyed = PaymentDesk as React.ComponentType<typeof PaymentDesk extends React.ComponentType<infer P> ? P & { key?: React.Key } : never>;
          return <PaymentDeskKeyed key={currentPath} onNavigate={setCurrentPath} initialItem={itemId} />;
        }
        return <LandingPage onNavigate={setCurrentPath} />;
    }
  };

  const renderHelmet = () => {
    switch (currentPath) {
      case '/':
        return (
          <Helmet 
            title="Build Communications Credibility" 
            description="Build communications credibility that actually sticks. T-SOC Delhi equips corporate executives with rigid, jargon-free strategic frameworks and biometric voice feedback systems."
            canonicalUrl="https://tsoc.com/"
            ogTitle="T-SOC Delhi - Build Communications Credibility That Actually Sticks"
          />
        );
      case '/courses':
        return (
          <Helmet 
            title="Executive Speech Programs & Certifications" 
            description="Explore T-SOC Delhi's professional jargon-free speech certifications and residential short-term tactical courses."
            canonicalUrl="https://tsoc.com/courses"
          />
        );
      case '/courses/certificate':
        return (
          <Helmet 
            title="Speechcraft Professional Certifications" 
            description="In-depth 2 to 4 month biometric speechcraft and rhetorical structural certifications for corporate officers."
            canonicalUrl="https://tsoc.com/courses/certificate"
          />
        );
      case '/courses/short-term':
        return (
          <Helmet 
            title="Syllable Calibration & Defensive Speech" 
            description="Intensive practical workshops in defensive dialogue systems, syllable stabilization, and boardroom crisis management."
            canonicalUrl="https://tsoc.com/courses/short-term"
          />
        );
      case '/about':
      case '/about/who-we-are':
        return (
          <Helmet 
            title="Consortium of Speech Scholars" 
            description="Learn about the retired diplomatic speechwriters, PR veterans, and academic phoneticians directing T-SOC Delhi's Gautam Nagar campus."
            canonicalUrl="https://tsoc.com/about/who-we-are"
          />
        );
      case '/about/experts':
        return (
          <Helmet 
            title="Super Speech Experts & Strategic Phoneticians" 
            description="Meet our senior advisors and linguistic speech experts who train executive leaders at T-SOC."
            canonicalUrl="https://tsoc.com/about/experts"
          />
        );
      case '/about/model':
        return (
          <Helmet 
            title="Three-Tier Communications Verification Model" 
            description="T-SOC's technical verification model combining acoustic stress calibration, semantic jargon purification, and linguistic biometrics."
            canonicalUrl="https://tsoc.com/about/model"
          />
        );
      case '/about/usps':
        return (
          <Helmet 
            title="Why Leaders and Officers Align with T-SOC" 
            description="Explore our elite communication assurance, jargon-free purification index, and rapid outcomes."
            canonicalUrl="https://tsoc.com/about/usps"
          />
        );
      case '/about/customization':
        return (
          <Helmet 
            title="Custom Speech Program Architect" 
            description="Design a customized executive communication and crisis speech program suited to your strategic goals."
            canonicalUrl="https://tsoc.com/about/customization"
          />
        );
      case '/admissions':
        return (
          <Helmet 
            title="Gautam Nagar Enrolment & Admission Desk" 
            description="Enrol in upcoming speaking cohort slots at the Trust School of Communications New Delhi campus."
            canonicalUrl="https://tsoc.com/admissions"
          />
        );
      case '/insights':
        return (
          <Helmet 
            title="Crisis Dialogue & Speech Auditing Insights" 
            description="Read academic papers, industry communications audits, and linguistic research published by T-SOC Delhi scholars."
            canonicalUrl="https://tsoc.com/insights"
          />
        );
      case '/contact':
        return (
          <Helmet 
            title="Contact T-SOC - Get in Touch" 
            description="Reach our Delhi academy behind Axis Bank Parking next to Green Park Metro gate 2. Call or visit us today."
            canonicalUrl="https://tsoc.com/contact"
          />
        );
      case '/assessment':
        return (
          <Helmet 
            title="Linguistic Credibility & Jargon Audit" 
            description="Measure your speaker authority. Interactive self-audit, biometric assessment parameters, and customized scores."
            canonicalUrl="https://tsoc.com/assessment"
          />
        );
      default:
        if (currentPath.startsWith('/checkout')) {
          return (
            <Helmet 
              title="Secure Admission Invoice Desk" 
              description="Complete your enrollment verification securely at our official, encrypted payment and billing desk."
              canonicalUrl="https://tsoc.com/checkout"
            />
          );
        }
        return (
          <Helmet 
            title="Build Communications Credibility" 
            canonicalUrl="https://tsoc.com/"
          />
        );
    }
  };


  return (
    <div id="tsoc-portal" className="min-h-screen max-w-full overflow-x-hidden bg-transparent text-slate-900 flex flex-col antialiased">
      {renderHelmet()}
      {/* Upper info accent strip */}
      <div id="top-accent-line" className="h-[2px] bg-gradient-to-r from-teal-800 via-teal-400 to-teal-900 w-full" />

      {/* Sticky header context matching Habitline style */}
      <Navbar
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        authUser={authUser}
        onLogout={handleLogout}
      />

      {/* Main Core Body Content taking full application screen */}
      <main id="main-content" className="flex-grow flex flex-col">
        {renderPageContent()}
      </main>

      {/* Standard Footer container */}
      <Footer onNavigate={setCurrentPath} />
      <ConversationalAdvisor />
    </div>
  );
}
