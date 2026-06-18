import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  Users, 
  BookOpen, 
  Zap, 
  ArrowRight, 
  FileCheck, 
  CheckCircle2, 
  Sliders, 
  Activity, 
  Sparkles, 
  Cpu, 
  Quote, 
  Plus, 
  Minus,
  MessageSquare,
  Flame,
  Play,
  X,
  Target,
  Clock,
  Volume2,
  Calendar,
  AlertTriangle,
  GraduationCap,
  Bell,
  VolumeX,
  Sparkle,
  User,
  Mail,
  Phone,
  Send,
  Loader2
} from 'lucide-react';
import { certificateCourses, shortTermCourses } from '../data/coursesData';
import heroBgVideo from '../assets/hero-bg.mp4';

interface LandingPageProps {
  onNavigate?: (path: string) => void;
}

// Custom 3D Tilt Hook for interactive elements
function useTiltEffect() {
  const [tiltStyle, setTiltStyle] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to range -0.5 to 0.5
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;

    // Rotate multiplier
    const rotY = xc * 20; // max 20 deg
    const rotX = -yc * 15; // max 15 deg

    setTiltStyle(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`);
    
    // Holographic glare coordinate calculation
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.15,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, transition: 'all 0.4s ease' });
  };

  return { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave };
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  // Synthesizer Web Audio API for tactical futuristic bleeps (100% Client-side and elegant)
  const [audioMuted, setAudioMuted] = useState(true);
  
  const playBeep = (freq = 800, type: OscillatorType = 'sine', duration = 0.08) => {
    if (audioMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignored if sound capability is limited
    }
  };

  const triggerCalibrateMelody = () => {
    if (audioMuted) return;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord
    notes.forEach((freq, idx) => {
      setTimeout(() => playBeep(freq, 'sine', 0.15), idx * 100);
    });
  };

  // Rolling Counters (62K+, 3.8K+, 14+)
  const [auditsCount, setAuditsCount] = useState(400);
  const [sessionsCount, setSessionsCount] = useState(3000);
  const [countriesCount, setCountriesCount] = useState(14);
  const [userStreak, setUserStreak] = useState(18);

  useEffect(() => {
    const counterTimer = setInterval(() => {
      // Increment speech checks slowly to simulate active servers
      setAuditsCount(prev => {
        const increment = Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.3) {
          playBeep(1200, 'sine', 0.02); // Tiny feedback tick
        }
        return prev + increment;
      });
      if (Math.random() > 0.85) {
        setSessionsCount(prev => prev + 1);
        playBeep(600, 'triangle', 0.1);
      }
    }, 3000);
    return () => clearInterval(counterTimer);
  }, [audioMuted]);

  // Push Notifications State with interactive feedback
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Communication posture & readiness check",
      subtitle: "Baseline multi-channel communication alignment — written, verbal, and non-verbal — required in 15 minutes.",
      active: true,
      time: "Now",
      avatar: "🔸"
    },
    {
      id: 2,
      title: "Take a 5-minute pause",
      subtitle: "High-impact interpersonal listening and active comprehension interval is recommended.",
      active: true,
      time: "5m ago",
      avatar: "🌤"
    },
    {
      id: 3,
      title: "Review routine insights",
      subtitle: "3.2M communication gaps analysed this week. Tap to secure your credentials report.",
      active: true,
      time: "2h ago",
      avatar: "🎯"
    }
  ]);

  const dismissReminder = (id: number) => {
    playBeep(450, 'sawtooth', 0.06);
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const completeReminder = (id: number) => {
    triggerCalibrateMelody();
    // Increment streak live
    setUserStreak(prev => prev + 1);
    setReminders(prev => prev.filter(r => r.id !== id));
    
    // Add floating success notification indicator inside applet state
    setNotificationMessage("Task calibrated! +1 to daily streak.");
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Speech analysis engine state
  const [inputText, setInputText] = useState(
    "We need to synergetically deep-dive into critical core competencies and touch base."
  );
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    flagged: string[];
    grade: string;
    suggestion: string;
    positives: string[];
    negatives: string[];
    replacements: { original: string; replaceWith: string }[];
  }>({
    score: 85,
    flagged: ['synergetically', 'deep-dive', 'core competencies', 'touch base'],
    grade: 'F (Systemic Slop)',
    suggestion: "Try replacing using: 'We will coordinate specifically on our core capabilities directly.'",
    positives: [
      "Pronoun orientation is clear and direct.",
      "Acoustic pitch amplitude is stable (150-180Hz region)."
    ],
    negatives: [
      "Stuffed with 4 classic corporate fluff words that dilute credibility.",
      "Using passive, evasive grammar which reduces active trust metrics."
    ],
    replacements: [
      { original: "synergetically", replaceWith: "cooperatively / together" },
      { original: "deep-dive", replaceWith: "analyze thoroughly / inspect" },
      { original: "core competencies", replaceWith: "main strengths / core skills" },
      { original: "touch base", replaceWith: "connect / meet" }
    ]
  });

  const analyzeSpeech = (text: string) => {
    setInputText(text);
    const lowercase = text.toLowerCase();
    const buzzwordMapping: { [key: string]: string } = {
      'synergetically': 'cooperatively',
      'deep-dive': 'analyze thoroughly',
      'deep dive': 'analyze thoroughly',
      'core competencies': 'key core strengths',
      'competencies': 'practical skills',
      'touch base': 'connect / meet',
      'drill down': 'investigate details',
      'alignment': 'agreement',
      'bandwidth': 'capacity',
      'deliverables': 'expected results',
      'vibe': 'atmosphere / mood',
      'game-changer': 'major improvement',
      'paradigms': 'models',
      'low-hanging fruit': 'simple tasks',
      'organic growth': 'natural progress'
    };

    const found = Object.keys(buzzwordMapping).filter(word => lowercase.includes(word));
    let score = 0;
    let grade = 'A+ (Pristine)';
    let suggestion = "Excellent! Perfect rhetorical structure.";

    if (found.length === 0) {
      score = 0;
      grade = 'A+ (Pristine)';
      playBeep(980, 'sine', 0.12);
    } else if (found.length === 1) {
      score = 25;
      grade = 'A (Excellent)';
      suggestion = "Slight corporate accent. Consider simplifying slightly.";
      playBeep(700, 'sine', 0.08);
    } else if (found.length === 2) {
      score = 45;
      grade = 'B (Acceptable)';
      suggestion = "Muted delivery. Drop the jargon to anchor listener confidence.";
      playBeep(520, 'triangle', 0.09);
    } else if (found.length === 3) {
      score = 65;
      grade = 'D (Jargon Muddled)';
      suggestion = "Warning: Speech relies on defensive verbal padding. Rephrase immediately.";
      playBeep(380, 'sawtooth', 0.15);
    } else {
      score = 90;
      grade = 'F (Systemic Slop)';
      suggestion = "Alert: High density passive deception detected. Use positive literal nouns.";
      playBeep(260, 'sawtooth', 0.25);
    }

    // Generate structured positives, negatives & replacements dynamically
    const positivesList: string[] = [];
    const negativesList: string[] = [];
    const replacementsList: { original: string; replaceWith: string }[] = [];

    if (found.length === 0) {
      positivesList.push("Outstanding transparent vocabulary selection - zero hedge words.");
      positivesList.push("Clear active voice usage increases listener reassurance.");
      positivesList.push("Articulate, clear acoustic footprint with no jargon filler.");
    } else {
      positivesList.push("Strong vocal consistency. Words are spoken with regular frequency spacing.");
      if (found.length < 3) {
        positivesList.push("Moderate rhetorical composition is close to direct clarity.");
      }
    }

    if (found.length > 0) {
      negativesList.push(`Contains ${found.length} fluff term(s) that complicate basic understanding.`);
      found.forEach(word => {
        negativesList.push(`"${word}" is flagged as vague; it masks concrete accountability.`);
        replacementsList.push({
          original: word,
          replaceWith: buzzwordMapping[word] || 'simplify'
        });
      });
    } else {
      negativesList.push("No jargon found! Excellent compliance standing.");
    }

    setAnalysisResult({
      score,
      flagged: found,
      grade,
      suggestion,
      positives: positivesList,
      negatives: negativesList,
      replacements: replacementsList
    });

    const wordsArray = text.trim().split(/\s+/).filter(Boolean);
    const lastWord = wordsArray[wordsArray.length - 1] || '';
    const calcMultiplier = Math.max(parseFloat((4.8 - (score / 20)).toFixed(1)), 0.6);

    setVocalMetrics(prev => ({
      ...prev,
      wordCount: wordsArray.length,
      lastDetectedWord: lastWord,
      engagementIndex: calcMultiplier
    }));
  };

  const handleSendAuditReport = async () => {
    setAuditGateError(null);
    if (!auditName.trim()) { setAuditGateError('Please enter your name.'); return; }
    if (!auditEmail.trim() && !auditPhone.trim()) { setAuditGateError('Please enter at least an email or phone number.'); return; }
    setAuditSubmitting(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: auditName.trim(),
          email: auditEmail.trim() || undefined,
          phone: auditPhone.trim() || undefined,
          reportType: 'communication-clarity-audit',
          auditData: {
            score: analysisResult.score,
            grade: analysisResult.grade,
            positives: analysisResult.positives,
            negatives: analysisResult.negatives,
            replacements: analysisResult.replacements,
            suggestion: analysisResult.suggestion,
            inputText,
          }
        })
      });
    } catch (_) {}
    setAuditSubmitting(false);
    setAuditSubmitted(true);
  };

  // State for interactive scheduler
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(1);
  const schedulerTasks = [
    { time: '07:30 AM', title: 'Communication Readiness Calibration', duration: '15 mins', key: 'ALIGNMENT', desc: 'Aligning written clarity, non-verbal posture, and interpersonal signals for full-spectrum communication delivery.' },
    { time: '09:00 AM', title: 'C-Suite Jargon Audit Drills', duration: '30 mins', key: 'PURITY', desc: 'Replacing "deep dive" and "alignment" with actionable, grounded declarations across written and spoken channels.' },
    { time: '11:15 AM', title: 'Stakeholder Communication Scan', duration: '20 mins', key: 'STABILITY', desc: 'Reviewing written briefs, interpersonal posture, and digital messaging consistency under high-stakes conditions.' },
    { time: '03:30 PM', title: 'Traditional Rhetorical Alignment', duration: '45 mins', key: 'ETHOS', desc: 'Structuring written, verbal, and diplomatic statements around classical communication paradigms and institutional ethos.' },
  ];

  // Interactivity for AI suggestions photo card state
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  const aiFeatures = [
    {
      title: "Morning walk",
      desc: "Full-spectrum communication calibration — aligning written precision, vocal clarity, and non-verbal presence from the start of the day.",
      indicator: "Communication alignment lock",
      accent: "from-[#ea580c]/30 to-[#f97316]/10",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Habit Priorities",
      desc: "Highlighting high-impact strategic credentials over passive filler terminology across written, digital, and interpersonal channels.",
      indicator: "Literal priority threshold",
      accent: "from-teal-600/30 to-emerald-800/10",
      img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Routine Insights",
      desc: "Mapping multi-channel communication patterns — written, verbal, and digital — to safeguard institutional trust and stakeholder confidence.",
      indicator: "Message flow analyzer",
      accent: "from-indigo-600/30 to-violet-800/10",
      img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Recovery Suggestion",
      desc: "Replacing defensive jargon with authoritative, direct language across every communication medium — spoken, written, or digital.",
      indicator: "Delivery clarity coefficient",
      accent: "from-rose-600/30 to-orange-850/10",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  // Stakeholder / Persona encloser tabs
  const [activeTab, setActiveTab] = useState<'pros' | 'students' | 'remote' | 'parents' | 'csr'>('pros');
  const [tabClicked, setTabClicked] = useState(false);
  const personaTabs = {
    pros: {
      title: "C-Suite Professionals",
      desc: "For executives steering high-stakes investor queries, acquisitions briefs, or regulatory hearings who demand immediate crisis messaging control.",
      metric: "98% Investor Trust Rating",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=420",
      stats: '14.2h saved per briefing'
    },
    students: {
      title: "Senior Executives",
      desc: "For senior leaders who need to command boardrooms, lead high-stakes negotiations, and communicate strategic vision with authority and clarity.",
      metric: "94% Leadership Presence Index",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=420",
      stats: '8 executive cohorts trained'
    },
    remote: {
      title: "Practicing Communications Professionals",
      desc: "For PR specialists, corporate communicators, and media professionals looking to sharpen their craft with structured frameworks and expert mentorship.",
      metric: "89% Professional Impact Score",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=420",
      stats: '12 agencies upskilled'
    },
    parents: {
      title: "Students",
      desc: "For undergraduate and postgraduate students building communication skills that give them a career edge in competitive professional environments.",
      metric: "96% Campus Placement Rate",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=420",
      stats: '400+ students certified'
    },
    csr: {
      title: "CSR Professionals",
      desc: "For corporate social responsibility leaders who need to communicate impact, build stakeholder trust, and articulate social value with credibility.",
      metric: "100% Stakeholder Trust Index",
      avatar: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=420",
      stats: '30+ CSR programmes delivered'
    }
  };

  const tabCourses: Record<'pros'|'students'|'remote'|'parents'|'csr', Array<{id:string;name:string;duration:string;format:string;description:string;type:'certificate'|'short';category:string}>> = {
    pros: [
      ...shortTermCourses.filter(c => ['short-ceo-01','short-ceo-02','short-ceo-03'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: 'C-Suite Leaders'})),
      ...certificateCourses.filter(c => ['cert-01','cert-04','cert-11'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
    ],
    students: [
      ...shortTermCourses.filter(c => ['short-sl-01','short-sl-02','short-sl-03'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: 'Senior Leaders'})),
      ...certificateCourses.filter(c => ['cert-06','cert-15','cert-16'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
    ],
    remote: [
      ...shortTermCourses.filter(c => ['short-we-01','short-we-02','short-we-03'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: 'Working Executives'})),
      ...certificateCourses.filter(c => ['cert-05','cert-12','cert-14'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
    ],
    parents: [
      ...shortTermCourses.filter(c => ['short-cs-01','short-cs-02','short-cs-03'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: 'Communication Students'})),
      ...certificateCourses.filter(c => ['cert-02','cert-03','cert-10'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
    ],
    csr: [
      ...shortTermCourses.filter(c => ['short-csr-01','short-csr-02','short-csr-03'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: 'CSR Professionals'})),
      ...certificateCourses.filter(c => ['cert-08','cert-20','cert-24'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
    ],
  };

  // Sliding Speech Reveal
  const [currentWordIndex, setCurrentWordIndex] = useState(3);
  const speechWords = [
    { text: "We", active: true },
    { text: "communicate", active: true },
    { text: "to", active: true },
    { text: "make", active: true },
    { text: "an", active: false },
    { text: "impact,", active: false },
    { text: "and", active: false },
    { text: "it", active: false },
    { text: "all", active: false },
    { text: "starts", active: false },
    { text: "with", active: false },
    { text: "Trust.", active: false, highlight: true }
  ];

  const speechPresets = [
    { label: "C-Suite Cliché", text: "We synergetically deep-dive into critical core competencies and touch base." },
    { label: "Sincere Oath", text: "Our focus remains delivering clear institutional outcomes and absolute transparency." },
    { label: "Jargon Slop", text: "Let's align deliverables on low-hanging fruit to optimize the dynamic vibe." }
  ];

  // Testimonials and interactive graduates hover mapping
  const [selectedReviewer, setSelectedReviewer] = useState<number | null>(null);
  const testimonials = [
    {
      id: 0,
      quote: "By forcing our executives to drop structural passive clichés like 'synergy', T-SOC helped us defend our sovereign credit restructuring program before foreign investment bank councils with total authority.",
      author: "Hon'ble Alok Sharma",
      role: "Ex-Minister, Communications Envoy",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 1,
      quote: "Traditional textbooks focus on grammar. T-SOC focuses on physical stress biometrics. The boardroom simulator in Green Park literally saved our stock listing valuation from defensive panic responses.",
      author: "Priti Goel",
      role: "VP Corporate Relations, Agritech Ltd",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      quote: "2 months at Gautam Nagar is equivalent to three years of legal counseling. Their strict acoustic telemetry is the only honest way to build real trust assets.",
      author: "Major Vikram Rathore",
      role: "Trust Council Advisor, NCR Boards",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const faqs = [
    {
      q: "How does T-SOC differ from traditional consumer communications apps?",
      a: "T-SOC completely rejects consumer-grade gamified streaks, silly dopamine point systems, or loose filler-word lists. We operate an authoritative corporate speech framework combining acoustic biometrics with deep clinical linguistic purification. All programs run in hybrid structures with live boards in our physical Gautam Nagar facility beside Axis Bank."
    },
    {
      q: "Where is the physical New Delhi academy situated?",
      a: "Our prime residential facility is at Regency Park 2, DLF Phase 4, Gurgaon 122009. It houses our dedicated Secure Acoustic Labs and vocal feedback chambers where corporate executives undergo active presentation trials."
    },
    {
      q: "What is your Proprietary Verification Model?",
      a: "It is a rigid, three-tier framework analyzing (1) Acoustic Stress Calibration to detect emotional baseline spikes, (2) Semantic Jargon Purification to algorithmically sieve corporate clichés, and (3) Biometric Body Alignment tracing pupil tracking and physical poise during delivery."
    },
    {
      q: "Can I customize a syllabus specifically for our corporate board?",
      a: "Yes. Our high-fidelity Program Customizer is designed to tailor modules dynamically across 4 stakeholder domains (C-suite, CSR reporting, Public Relations, and Oral Phoneticians) delivering immediate outcomes within 2 to 4 months."
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [heroIntent, setHeroIntent] = useState<string | null>(null);
  const [activeFaqChat, setActiveFaqChat] = useState<number | null>(null);
  const heroPhrases = [
    { plain: 'Generating Trust through', highlight: 'Honest Communications.' },
    { plain: 'Mastering Communication:', highlight: 'Where Expertise Meets Real-World Experience.' },
    { plain: 'Elevate Your Career with', highlight: 'World-Class Communication Skills.' },
    { plain: 'Learn from SuperExperts,', highlight: 'Lead with Confidence.' },
  ];
  const [heroPhraseIdx, setHeroPhraseIdx] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setHeroVisible(false);
      setTimeout(() => {
        setHeroPhraseIdx(i => (i + 1) % heroPhrases.length);
        setHeroVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(iv);
  }, []);
  const [appBtnClicked, setAppBtnClicked] = useState<string | null>(null);
  const [showAuditGate, setShowAuditGate] = useState(false);
  const [auditName, setAuditName] = useState('');
  const [auditEmail, setAuditEmail] = useState('');
  const [auditPhone, setAuditPhone] = useState('');
  const [auditSubmitting, setAuditSubmitting] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [auditGateError, setAuditGateError] = useState<string | null>(null);

  // Live Sound wave Canvas Simulation / Real Microphone Visualizer combined
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [micActive, setMicActive] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any | null>(null);

  // High-Fidelity Text-to-Speech (TTS) Voice Simulation Track
  const [ttsActive, setTtsActive] = useState(false);
  const [ttsCurrentWord, setTtsCurrentWord] = useState('');
  const [ttsWordsList, setTtsWordsList] = useState<string[]>([]);
  const [ttsCurrentWordIndex, setTtsCurrentWordIndex] = useState(-1);
  const ttsTimeoutRefs = useRef<number[]>([]);
  
  const [vocalMetrics, setVocalMetrics] = useState({
    pitch: 0,
    resonance: 82,
    clicheCoef: 12,
    stressLevel: 'Normal',
    volumeDb: 22,
    wordCount: 0,
    engagementIndex: 1.0,
    lastDetectedWord: ''
  });

  const stopTtsSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    ttsTimeoutRefs.current.forEach(timer => clearTimeout(timer));
    ttsTimeoutRefs.current = [];
    setTtsActive(false);
    setTtsCurrentWordIndex(-1);
    setTtsCurrentWord('');
    // If microphone is not physically active, return to simulated scan
    if (!micActive) {
      startSimulatedSoundwave();
    }
  };

  const startTtsSpeech = (textToSpeak: string) => {
    // Stop any active speech synthesis first
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // Also stop any microphone to avoid conflicts
    if (micActive) {
      stopMicrophone();
    }
    ttsTimeoutRefs.current.forEach(timer => clearTimeout(timer));
    ttsTimeoutRefs.current = [];

    // Analyze first
    analyzeSpeech(textToSpeak);

    const words = textToSpeak.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return;
    
    setTtsWordsList(words);
    setTtsActive(true);
    setTtsCurrentWordIndex(0);
    setTtsCurrentWord(words[0]);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95; // slightly deliberate pace for clean clarity
      utterance.pitch = 1.0;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          let tempLength = 0;
          let currentWordIdx = 0;
          for (let i = 0; i < words.length; i++) {
            if (charIndex >= tempLength) {
              currentWordIdx = i;
            }
            tempLength += words[i].length + 1;
          }
          const currentWord = words[currentWordIdx] || '';
          setTtsCurrentWordIndex(currentWordIdx);
          setTtsCurrentWord(currentWord);

          // Interactive beep sound
          playBeep(450 + Math.random() * 250, 'sine', 0.05);

          // Update vocal metrics for this word
          const randomPitch = Math.round(155 + Math.random() * 35);
          const randomVolume = Math.round(48 + Math.random() * 20);
          
          setVocalMetrics(prev => ({
            ...prev,
            pitch: randomPitch,
            volumeDb: randomVolume,
            wordCount: currentWordIdx + 1,
            lastDetectedWord: currentWord,
            resonance: Math.min(Math.max(78 + Math.round(Math.random() * 12), 65), 97),
            engagementIndex: parseFloat((4.6 - (currentWordIdx * 0.08) % 1.5).toFixed(1))
          }));
        }
      };

      utterance.onend = () => {
        stopTtsSpeech();
      };

      utterance.onerror = () => {
        stopTtsSpeech();
      };

      window.speechSynthesis.speak(utterance);

      // Render a dynamic larynx soundwave on canvas
      let tOffset = 0;
      const drawTtsWave = () => {
        if (!canvasRef.current || micActive) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 30) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }

        tOffset += 0.22;
        const speakingNow = window.speechSynthesis.speaking;
        const volumeMultiplier = speakingNow ? (35 + Math.sin(tOffset * 0.4) * 15) : 5;

        // Draw nice teal waveform representing AI Speech Review processing
        ctx.strokeStyle = '#2dd4bf';
        ctx.lineWidth = 3.5;
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(45, 212, 191, 0.45)';
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const envelope = Math.sin(x * Math.PI / canvas.width);
          const y = canvas.height / 2 + Math.sin(x * 0.12 + tOffset) * volumeMultiplier * envelope * (0.6 + Math.random() * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.strokeStyle = '#e8601c';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const envelope = Math.sin(x * Math.PI / canvas.width);
          const y = canvas.height / 2 + Math.cos(x * 0.09 - tOffset * 0.4) * (volumeMultiplier * 0.5) * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (speakingNow) {
          animationFrameRef.current = requestAnimationFrame(drawTtsWave);
        } else {
          stopTtsSpeech();
        }
      };

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      drawTtsWave();
    } else {
      // Fallback
      let currentWordIdx = 0;
      const runWordSimulationLoop = () => {
        if (currentWordIdx >= words.length) {
          stopTtsSpeech();
          return;
        }

        const currentWord = words[currentWordIdx];
        setTtsCurrentWordIndex(currentWordIdx);
        setTtsCurrentWord(currentWord);

        playBeep(450 + Math.random() * 180, 'sine', 0.04);
        
        setVocalMetrics(prev => ({
          ...prev,
          pitch: Math.round(160 + Math.random() * 25),
          volumeDb: Math.round(38 + Math.random() * 15),
          wordCount: currentWordIdx + 1,
          lastDetectedWord: currentWord,
          resonance: Math.min(Math.max(72 + Math.round(Math.random() * 8), 60), 94),
          engagementIndex: parseFloat((4.3 - (currentWordIdx * 0.05) % 1.2).toFixed(1))
        }));

        currentWordIdx++;
        const timer = window.setTimeout(runWordSimulationLoop, 220 + currentWord.length * 15);
        ttsTimeoutRefs.current.push(timer);
      };

      runWordSimulationLoop();
    }
  };

  const stopMicrophone = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping Speech Recognition:", err);
      }
      recognitionRef.current = null;
    }
    setMicActive(false);
    startSimulatedSoundwave(); // Revert back to simulation loop
  };

  const startMicrophone = async () => {
    // Stop any active TTS speech first
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    ttsTimeoutRefs.current.forEach(timer => clearTimeout(timer));
    ttsTimeoutRefs.current = [];
    setTtsActive(false);
    setMicPermissionDenied(false);
    setMicActive(true);

    // 1. Try to initialize Web Audio API stream for raw soundwave visualizer
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      playBeep(1000, 'sine', 0.1);

      const drawRealWave = () => {
        if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw nice grid lines under wave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }

        ctx.strokeStyle = '#e8601c';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(232, 96, 28, 0.6)';
        ctx.beginPath();

        const sliceWidth = canvas.width * 1.0 / dataArrayRef.current.length;
        let x = 0;
        let sumSqr = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const v = dataArrayRef.current[i] / 128.0;
          const y = v * canvas.height / 2;
          sumSqr += (v - 1) * (v - 1);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Compute instant volume node
        const rms = Math.sqrt(sumSqr / dataArrayRef.current.length);
        const volumeDb = Math.min(Math.max(Math.round(rms * 100 * 2), 10), 100);
        const randomPitch = Math.round(150 + volumeDb * 1.5 + Math.random() * 20);

        // Throttle React state updates to ~12 FPS to protect layout threading from choking
        const now = Date.now();
        if (now - lastStateUpdate > 80) {
          setVocalMetrics(prev => ({
            ...prev,
            pitch: randomPitch,
            resonance: Math.min(Math.max(60 + Math.round(rms * 130), 40), 99),
            clicheCoef: Math.max(10 - Math.round(rms * 10), 2),
            stressLevel: volumeDb > 45 ? 'Elevated signal' : 'Stable compliance',
            volumeDb: volumeDb
          }));
          lastStateUpdate = now;
        }

        animationFrameRef.current = requestAnimationFrame(drawRealWave);
      };

      let lastStateUpdate = Date.now();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      drawRealWave();

    } catch (webAudioErr) {
      console.warn("Low level user media audio stream failed or restricted. Activating simulation fallback wave...", webAudioErr);
      setMicPermissionDenied(true);
      startSimulatedSoundwave();
    }

    // 2. Initialize and trigger Speech Recognition independently
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      try {
        const rec = new SpeechRecognitionClass();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';
        
        rec.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcriptChunk = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcriptChunk;
            } else {
              interimTranscript += transcriptChunk;
            }
          }
          const text = finalTranscript || interimTranscript;
          if (text) {
            analyzeSpeech(text);
          }
        };

        rec.onerror = (err: any) => {
          console.error("Speech Recognition Error:", err);
        };

        rec.onend = () => {
          // Restart if still active to keep listening
          if (recognitionRef.current === rec) {
            try {
              rec.start();
            } catch (e) {
              console.error("Failed to auto-restart Speech Recognition:", e);
            }
          }
        };

        recognitionRef.current = rec;
        try {
          rec.start();
        } catch (e) {
          console.error("Failed to start Speech Recognition:", e);
        }
      } catch (speechErr) {
        console.error("Failed to initialize or start Speech Recognition engine:", speechErr);
      }
    } else {
      console.warn("Speech recognition is not supported in this browser.");
    }
  };

  const startSimulatedSoundwave = () => {
    let t = 0;
    const drawSimulated = () => {
      if (!canvasRef.current || (micActive && !micPermissionDenied) || ttsActive) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw futuristic grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Draw beautifully phased dual sinewaves for a high-fidelity look
      t += 0.05;

      // Draw wave 2 background first
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.015 + t * 0.7) * 20 * Math.sin(t * 0.1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw primary wave
      ctx.strokeStyle = '#e8601c';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(232, 96, 28, 0.5)';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.012 + t) * 32 * Math.cos(x * 0.002 + t * 0.2);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Update simulated vocal stats slowly to keep UI active without performance impact
      if (Math.round(t * 10) % 6 === 0) {
        const simVol = Math.round(24 + Math.sin(t * 1.6) * 14 + Math.random() * 4);
        const simPitch = Math.round(175 + Math.sin(t * 1.2) * 15 + Math.random() * 5);
        setVocalMetrics(prev => ({
          ...prev,
          pitch: simPitch,
          resonance: Math.min(Math.max(68 + Math.round(Math.sin(t * 0.8) * 16), 55), 94),
          clicheCoef: Math.max(8 - Math.round(Math.sin(t * 0.4) * 2), 1),
          stressLevel: simVol > 32 ? 'Simulation Sweep Active' : 'Normal compliance',
          volumeDb: simVol
        }));
      }

      animationFrameRef.current = requestAnimationFrame(drawSimulated);
    };

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    drawSimulated();
  };

  useEffect(() => {
    startSimulatedSoundwave();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.stop();
        } catch (e) {}
        recognitionRef.current = null;
      }
    };
  }, [micActive]);

  // Hook-like structure for phone tilt and card tilt effects
  const heroPhoneTilt = useTiltEffect();
  const floatingCardLeft = useTiltEffect();
  const floatingCardRight = useTiltEffect();
  const simulatedDiagnosticBox = useTiltEffect();
  const activeFeaturesMainPhoto = useTiltEffect();

  return (
    <div className="space-y-4 py-4 text-slate-200 font-sans max-w-7xl mx-auto px-4 md:px-8 relative bg-[#050b18] select-none" style={{zIndex:1}}>
      {/* Full-viewport hero background video */}
      <video
        src={heroBgVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position:'fixed',
          top:0,
          left:0,
          width:'100vw',
          height:'100vh',
          objectFit:'cover',
          zIndex:0,
          opacity:0.45,
          pointerEvents:'none',
        }}
      />
      
      {/* Dynamic Floating Toast Alerts */}
      {notificationMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12141c] border border-orange-500 text-orange-400 font-sans text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-right">
          <Sparkle className="w-4.5 h-4.5 text-orange-500 animate-spin" />
          <span className="font-bold">{notificationMessage}</span>
        </div>
      )}


      {/* Atmospheric backgrounds pairing warm oranges and high-contrast teal shadows */}
      <div className="absolute top-[2%] right-[-10%] w-[600px] h-[600px] bg-[#ea580c]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[22%] left-[-15%] w-[550px] h-[550px] bg-[#0d9488]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[55%] right-[-12%] w-[650px] h-[650px] bg-indigo-950/30 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-10%] w-[550px] h-[550px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ==================== 1. HERO SECTION (Extreme 3D Depth) ==================== */}
      <section id="hero-habitline" className="pt-10 lg:pt-14 text-center space-y-8 relative z-10 max-w-5xl mx-auto animate-fade-in-up">
        
        {/* Dynamic Display Title with rotating phrases */}
        <h1
          className="text-3xl xs:text-4xl sm:text-7xl lg:text-[84px] font-black tracking-tight text-white leading-[1.02] font-sans break-words hyphens-auto px-2"
          style={{ transition: 'opacity 0.6s ease, transform 0.6s ease', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(12px)' }}
        >
          {heroPhrases[heroPhraseIdx].plain} <span className="text-[#e8601c] pl-1">{heroPhrases[heroPhraseIdx].highlight}</span>
        </h1>

        <p className="text-slate-350 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-sans font-medium px-4">
          At Trust School of Communications New Delhi, we reject temporary consumer-grade quick fixes. Our Super Experts equip executive boardrooms with rigid, jargon-free strategic frameworks to guarantee investor and stakeholder faith.
        </p>

        {/* STAR RATING + FACEPILE (With interactive review link hover effects) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-3">
          
          {/* Interactive facepile stack. Hovering over images triggers reviews highlights */}
          <div className="flex -space-x-3.5 select-none">
            {testimonials.map((test, index) => (
              <img 
                key={index}
                onMouseEnter={() => {
                  setSelectedReviewer(test.id);
                  playBeep(850 + index*80, 'sine', 0.05);
                }}
                onMouseLeave={() => setSelectedReviewer(null)}
                className={`w-11 h-11 rounded-full border-2 border-[#050b18] object-cover transition-all duration-300 transform hover:-translate-y-2 hover:z-30 cursor-pointer ${
                  selectedReviewer === test.id ? 'ring-2 ring-orange-500 scale-110' : ''
                }`} 
                src={test.avatar} 
                alt={test.author} 
              />
            ))}
            <div className="w-11 h-11 rounded-full border-2 border-[#050b18] bg-[#0c101d] flex items-center justify-center text-[11px] font-black text-orange-400 font-sans transition-transform hover:scale-110">
              +53m
            </div>
          </div>

          <div className="text-center sm:text-left space-y-0.5">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              <span className="text-amber-400 text-sm">⭐ ⭐ ⭐ ⭐ ⭐</span>
              <span className="text-white text-[11px] font-black font-sans bg-orange-500/10 px-2 py-0.5 rounded-sm ml-1">4.8/5</span>
            </div>
            <p className="text-[11.5px] font-sans text-slate-400 font-bold">
              Trusted by 1,582+ users, professionals, & students worldwide
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-center items-center pt-4">
          <button
            id="btn-free-tracking"
            onClick={() => {
              triggerCalibrateMelody();
              handleNav('/assessment');
            }}
            className="bg-[#e8601c] md:hover:bg-white text-white md:hover:text-slate-900 font-sans text-xs font-black px-10 py-4.5 rounded-full shadow-[0_15px_45px_rgba(232,96,28,0.3)] md:hover:shadow-white/10 transition-all tracking-wider hover:scale-102 active:scale-[0.98] cursor-pointer"
          >
            Start tracking for free
          </button>
        </div>


        {/* Conversational intent — tabs always visible, courses appear below */}
        {(() => {
          const intentOpts = [
            { label: 'I want to become a better communicator', key: 'self' },
            { label: 'My organisation needs training', key: 'org' },
            { label: 'Just exploring for now', key: 'explore' },
          ];

          const intentCoursesMap: Record<string, Array<{id:string;name:string;duration:string;format:string;description:string;type:'certificate'|'short';category:string}>> = {
            self: [
              ...shortTermCourses.filter(c => ['short-cs-01','short-cs-02','short-cs-03'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: 'Communication Students'})),
              ...certificateCourses.filter(c => ['cert-02','cert-03','cert-11'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
            ],
            org: [
              ...shortTermCourses.filter(c => ['short-ceo-01','short-ceo-02','short-sl-01'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: c.segment})),
              ...certificateCourses.filter(c => ['cert-01','cert-05','cert-08'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
            ],
            explore: [
              ...shortTermCourses.filter(c => ['short-we-01','short-cs-01','short-csr-01'].includes(c.id)).map(c => ({...c, type: 'short' as const, category: c.segment})),
              ...certificateCourses.filter(c => ['cert-04','cert-12','cert-20'].includes(c.id)).map(c => ({...c, type: 'certificate' as const})),
            ],
          };

          const intentLabel: Record<string,string> = {
            self: 'Programmes for Individual Growth',
            org: 'Corporate & Organisational Tracks',
            explore: 'Popular Programmes to Start With',
          };

          return (
            <div className="pt-8 w-full max-w-4xl mx-auto" style={{display:'flex',flexDirection:'column',gap:'24px'}}>
              {/* Heading */}
              <p className="font-black font-sans text-center" style={{color:'#000000',fontSize:'clamp(2.5rem,6vw,4rem)',margin:0,lineHeight:1.1,fontWeight:900,textShadow:'0 1px 2px rgba(0,0,0,0.12), 0 4px 16px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.3)'}}>What brings you here today?</p>

              {/* Always-visible tab buttons */}
              <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px'}}>
                {intentOpts.map(opt => {
                  const isActive = heroIntent === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setHeroIntent(opt.key)}
                      className="font-black font-sans transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                      style={{
                        fontSize:'13px', padding:'12px 24px', borderRadius:'999px',
                        ...(isActive
                          ? {background:'#e8601c', color:'#ffffff', border:'2px solid #e8601c', boxShadow:'0 4px 16px rgba(232,96,28,0.35)'}
                          : {background:'#ffffff', color:'#1e293b', border:'2px solid #cbd5e1', boxShadow:'0 1px 4px rgba(0,0,0,0.07)'})
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Courses — shown when a tab is active */}
              {heroIntent && (
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  {/* Section label */}
                  <p className="font-black font-sans" style={{color:'#e8601c',fontSize:'12px',margin:0,letterSpacing:'0.03em'}}>
                    → {intentLabel[heroIntent]}
                  </p>

                  {/* Cards grid */}
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'14px'}}>
                    {intentCoursesMap[heroIntent].map(course => (
                      <div
                        key={course.id}
                        className="hover:-translate-y-1 transition-all duration-300"
                        style={{background:'#ffffff',border:'1px solid #e2e8f0',borderRadius:'16px',padding:'18px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)',display:'flex',flexDirection:'column',gap:'10px'}}
                      >
                        {/* Badge row */}
                        <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
                          <span className="font-black uppercase tracking-widest" style={{
                            fontSize:'9px',padding:'3px 10px',borderRadius:'999px',
                            ...(course.type === 'certificate'
                              ? {background:'rgba(232,96,28,0.1)',color:'#c2410c',border:'1px solid rgba(232,96,28,0.25)'}
                              : {background:'rgba(5,150,105,0.1)',color:'#065f46',border:'1px solid rgba(5,150,105,0.25)'})
                          }}>
                            {course.type === 'certificate' ? 'Certificate' : 'Short Course'}
                          </span>
                          <span className="font-bold uppercase tracking-wide" style={{fontSize:'9px',color:'#94a3b8'}}>{course.category}</span>
                        </div>

                        {/* Title */}
                        <h5 className="font-black font-sans leading-snug" style={{fontSize:'13px',color:'#0f172a',margin:0}}>{course.name}</h5>

                        {/* Description */}
                        <p className="font-sans line-clamp-2" style={{fontSize:'11px',color:'#64748b',lineHeight:1.6,margin:0}}>{course.description}</p>

                        {/* Footer */}
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'10px',borderTop:'1px solid #f1f5f9',marginTop:'auto'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <span className="flex items-center gap-1 font-bold" style={{fontSize:'10px',color:'#94a3b8'}}>
                              <Clock className="w-3 h-3" />{course.duration}
                            </span>
                            <span className="font-bold uppercase" style={{fontSize:'10px',color:'#cbd5e1'}}>{course.format}</span>
                          </div>
                          <button
                            onClick={() => { sessionStorage.setItem('tsoc_pending_course', course.id); sessionStorage.setItem('tsoc_pending_course_type', course.type); handleNav('/courses'); }}
                            className="flex items-center gap-1 font-black uppercase tracking-wide transition-opacity hover:opacity-70"
                            style={{fontSize:'10px',color:'#e8601c',background:'none',border:'none',cursor:'pointer',padding:0}}
                          >
                            Enquire <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View all CTA */}
                  <div style={{textAlign:'center',paddingTop:'8px'}}>
                    <button
                      onClick={() => handleNav('/courses')}
                      className="inline-flex items-center gap-2 font-black uppercase tracking-widest transition-all hover:-translate-y-0.5"
                      style={{background:'#0f172a',color:'#ffffff',padding:'12px 32px',fontSize:'11px',border:'none',cursor:'pointer',borderRadius:'999px',boxShadow:'0 4px 14px rgba(15,23,42,0.2)'}}
                    >
                      View All Programmes <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </section>

      {/* ==================== 2. HERO APP MOCKUP CARDS BLOCK (removed) ==================== */}
      <section id="hero-mockup-stack" className="relative z-10 py-0 hidden">
        <div className="max-w-4xl mx-auto relative min-h-[460px] md:min-h-[540px] flex flex-col items-center justify-center pt-8">
          
          {/* Behind glowing orange shadow atmosphere */}
          <div className="absolute inset-0 max-w-sm mx-auto bg-orange-600/15 rounded-full blur-[120px] z-0 pointer-events-none" />

          {/* Central Mock Phone Frame - Interactive 3D rotation */}
          <div 
            id="phone-mockup-frame"
            onMouseMove={heroPhoneTilt.handleMouseMove}
            onMouseLeave={heroPhoneTilt.handleMouseLeave}
            style={{ 
              transform: heroPhoneTilt.tiltStyle || 'perspective(1000px) rotateY(-12deg) rotateX(8deg) scale3d(1, 1, 1)', 
              boxShadow: '0 45px 85px -15px rgba(0,0,0,0.8), 0 30px 40px -10px rgba(232,96,28,0.15)',
              transition: heroPhoneTilt.tiltStyle ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
            className="w-full max-w-[290px] h-[530px] bg-[#030712] border-[10px] border-slate-800 rounded-[44px] relative overflow-hidden z-20 cursor-grab active:cursor-grabbing transform-gpu border-b-[14px]"
          >
            {/* Holographic Glare overlay layer */}
            <div className="absolute inset-0 pointer-events-none z-35" style={heroPhoneTilt.glareStyle} />

            {/* Dynamic Island phone asset */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-slate-800 rounded-full flex items-center justify-center z-30" />
            
            {/* Screen Content */}
            <div className="h-full w-full p-5 overflow-y-auto space-y-6 text-left text-white pt-11 select-none scrollbar-none">
              
              <div className="border-b border-white/10 pb-3 flex justify-between items-end">
                <div>
                  <span className="text-[7.5px] font-mono text-orange-550 block font-black leading-none uppercase tracking-wider">// ACCREDITATION INDEX</span>
                  <h4 className="text-xs font-black tracking-tight mt-1 animate-pulse">Delhi Central Track</h4>
                </div>
                <div className="text-[7px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase leading-none">
                  Vocal Pure
                </div>
              </div>

              {/* Habit Mini Bars with active streak numbers */}
              <div className="space-y-3.5">
                {[
                  { label: "Stress Jitter calibration", stat: "100%", style: "bg-emerald-500", progress: "w-full" },
                  { label: "Jargon purity filtering", stat: "85%", style: "bg-[#e8601c]", progress: "w-[85%]" },
                  { label: "Traditional Ethos alignment", stat: "67%", style: "bg-indigo-500", progress: "w-[67%]" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[8px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                      <span>{item.label}</span>
                      <span className="text-white font-black">{item.stat}</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${item.style} ${item.progress} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Live interactive board diagnostics simulator card inside phone */}
              <div className="p-4 bg-slate-950/90 border border-white/5 rounded-2xl relative overflow-hidden space-y-2.5 telemetry-dark-card">
                <span className="text-[7px] font-mono text-orange-550 block font-black leading-none">// TELEMETRY STATE</span>
                
                <div className="flex justify-between items-center text-[10px] font-black">
                  <span>Green Park Chamber</span>
                  <span className="text-emerald-450 uppercase font-black tracking-widest text-[7px] bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                    ● ACTIVE
                  </span>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-2 text-[8px] font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Stress Level:</span>
                    <span className="text-white font-bold">{vocalMetrics.stressLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resonance Lock:</span>
                    <span className="text-[#e8601c] font-black">{vocalMetrics.resonance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pitch Calibration:</span>
                    <span className="text-teal-400 font-bold">{vocalMetrics.pitch || "Static Code"} Hz</span>
                  </div>
                </div>
              </div>

              {/* Completed Streaks */}
              <div className="p-3.5 bg-[#0a101f]/90 border border-slate-800/80 rounded-xl text-[9px] font-mono flex items-center justify-between text-slate-300 streak-bottom-pill">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500 shrink-0 fill-orange-500" />
                  <span className="font-bold">{userStreak} Day Credibility streak</span>
                </div>
                <span className="text-emerald-400 font-black">STABLE</span>
              </div>
            </div>
          </div>

          {/* Left Floating Card: Medal "Streak unlocked" - Smooth 3D tilt (Hidden on mobile) */}
          <div 
            id="progress-completed-card"
            onMouseMove={floatingCardLeft.handleMouseMove}
            onMouseLeave={floatingCardLeft.handleMouseLeave}
            style={{ 
              transform: floatingCardLeft.tiltStyle || 'perspective(1000px) rotateX(6deg) rotateY(-18deg) translateZ(30px)', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 30px rgba(232,96,28,0.1)',
              transition: floatingCardLeft.tiltStyle ? 'none' : 'all 0.5s ease-out'
            }}
            className="hidden md:block absolute left-[3%] md:left-[8%] top-[12%] bg-[#080d19]/95 border border-orange-500/20 p-5 rounded-[22px] z-30 max-w-[210px] text-left pointer-events-auto transform-gpu cursor-pointer float-left-card"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center rounded-full mb-3 shadow-[0_10px_25px_rgba(232,96,28,0.3)] animate-pulse">
              <Award className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="font-mono text-[8px] text-orange-500 block font-extrabold uppercase tracking-wide leading-none">// PROGRESS COMPLETED</span>
            <h4 className="font-sans font-black text-white text-xs mt-1.5 leading-snug">7-Day Credibility Milestone</h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-sans font-medium">
              Stress jitter biometrics stable for three consecutive sessions.
            </p>
          </div>

          {/* Right Floating Card: Goals & circular progress indicators (Hidden on mobile) */}
          <div 
            id="today-speech-goal-card"
            onMouseMove={floatingCardRight.handleMouseMove}
            onMouseLeave={floatingCardRight.handleMouseLeave}
            style={{ 
              transform: floatingCardRight.tiltStyle || 'perspective(1000px) rotateX(-6deg) rotateY(18deg) translateZ(40px)', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 30px rgba(13,148,136,0.1)',
              transition: floatingCardRight.tiltStyle ? 'none' : 'all 0.5s ease-out'
            }}
            className="hidden md:block absolute right-[3%] md:right-[8%] bottom-[12%] bg-white text-slate-900 p-5 rounded-[22px] z-25 max-w-[230px] text-left pointer-events-auto border border-slate-200 transform-gpu cursor-pointer"
          >
            <span className="font-mono text-[8.5px] text-slate-500 block font-black uppercase tracking-wider">// AUDIT CODES</span>
            <h4 className="font-sans font-black text-slate-900 text-xs mt-1.5 leading-none">Today's Speech Goal</h4>
            <p className="text-[10px] text-slate-500 mt-1 mb-4 leading-normal font-sans font-medium">Reach average jargon density below 15%</p>
            
            {/* 3 Circular indicator rings */}
            <div className="flex gap-3 justify-between">
              {[
                { name: "Purity", val: "94%", style: "border-[#e8601c] text-[#e8601c]", bg: "bg-orange-50" },
                { name: "Tone", val: "87%", style: "border-teal-500 text-teal-600", bg: "bg-teal-50" },
                { name: "Poise", val: "65%", style: "border-indigo-500 text-indigo-600", bg: "bg-indigo-50" }
              ].map((ring, rIdx) => (
                <div key={rIdx} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-2 ${ring.style} ${ring.bg} flex items-center justify-center text-[8.5px] font-mono font-black shadow-inner`}>
                    {ring.val}
                  </div>
                  <span className="text-[8px] font-mono text-slate-400 uppercase font-black tracking-wider mt-1.5">{ring.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Flat Responsive Representation for Mobile/Tablet sizes below 'md' */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-sm mx-auto mt-8 md:hidden px-4 z-30">
            {/* Left Card content */}
            <div id="progress-completed-card-mob" className="bg-[#080d19]/95 border border-orange-500/20 p-5 rounded-[22px] text-left shadow-xl">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center rounded-full mb-3 shadow-[0_10px_25px_rgba(232,96,28,0.3)] animate-pulse">
                <Award className="w-5.5 h-5.5 text-white" />
              </div>
              <span className="font-mono text-[8px] text-orange-500 block font-extrabold uppercase tracking-wide leading-none">// PROGRESS COMPLETED</span>
              <h4 className="font-sans font-black text-white text-xs mt-1.5 leading-snug">7-Day Credibility Milestone</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-sans font-medium">
                Stress jitter biometrics stable for three consecutive sessions.
              </p>
            </div>

            {/* Right Card content */}
            <div id="today-speech-goal-card-mob" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-5 rounded-[22px] text-left shadow-xl">
              <span className="font-mono text-[8.5px] text-slate-500 dark:text-slate-400 block font-black uppercase tracking-wider">// AUDIT CODES</span>
              <h4 className="font-sans font-black text-slate-900 dark:text-white text-xs mt-1.5 leading-none">Today's Speech Goal</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-normal font-sans font-medium">Reach average jargon density below 15%</p>
              
              {/* 3 Circular indicator rings */}
              <div className="flex gap-3 justify-between">
                {[
                  { name: "Purity", val: "94%", style: "border-[#e8601c] text-[#e8601c]", bg: "bg-orange-50 dark:bg-orange-950/20" },
                  { name: "Tone", val: "87%", style: "border-teal-500 text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/20" },
                  { name: "Poise", val: "65%", style: "border-indigo-500 text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/20" }
                ].map((ring, rIdx) => (
                  <div key={rIdx} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 ${ring.style} ${ring.bg} flex items-center justify-center text-[8.5px] font-mono font-black shadow-inner`}>
                      {ring.val}
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 dark:text-slate-400 uppercase font-black tracking-wider mt-1.5">{ring.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 3. WHO ARE WE SECTION ==================== */}
      <section id="who-are-we" className="relative z-10 overflow-hidden pt-10 pb-6 px-4" style={{background:'transparent'}}>
        {/* Subtle decorative blobs */}
        <div style={{position:'absolute',top:'-60px',left:'-60px',width:'380px',height:'380px',borderRadius:'50%',background:'radial-gradient(circle,rgba(20,184,166,0.08) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div style={{position:'absolute',bottom:'-40px',right:'-40px',width:'320px',height:'320px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,96,28,0.07) 0%,transparent 70%)',pointerEvents:'none'}} />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">

          {/* Eyebrow */}
          <span style={{display:'inline-block',padding:'6px 18px',borderRadius:'9999px',background:'rgba(255,255,255,0.55)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid rgba(0,0,0,0.15)',color:'#000000',fontSize:'11px',fontFamily:'monospace',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase'}}>
            About T-SOC
          </span>

          {/* Heading */}
          <h2 style={{fontSize:'clamp(2.4rem,6vw,3.8rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-0.03em',color:'#000000'}}>
            Who Are We?
          </h2>

          {/* 3-column card grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px',textAlign:'left'}}>

            {/* Card 1 */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(20,184,166,0.3)',borderRadius:'16px',padding:'28px',boxShadow:'0 4px 24px rgba(0,0,0,0.15)',transition:'box-shadow 0.3s'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'linear-gradient(135deg,#14b8a6,#0d9488)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',boxShadow:'0 4px 14px rgba(20,184,166,0.35)'}}>
                <span style={{fontSize:'20px'}}>🎓</span>
              </div>
              <h3 style={{color:'#000000',fontSize:'16px',fontWeight:800,marginBottom:'10px',letterSpacing:'-0.01em'}}>Elite Professionals</h3>
              <p style={{color:'#0f172a',fontSize:'13.5px',fontWeight:600,lineHeight:'1.75'}}>
                An elite group of communication professionals, each with more than three decades of experience, have come together to found the Trust School of Communications — bringing unparalleled insights, practical knowledge, and proven strategies.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(232,96,28,0.3)',borderRadius:'16px',padding:'28px',boxShadow:'0 4px 24px rgba(0,0,0,0.15)',transition:'box-shadow 0.3s'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'linear-gradient(135deg,#f97316,#e8601c)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',boxShadow:'0 4px 14px rgba(232,96,28,0.35)'}}>
                <span style={{fontSize:'20px'}}>⚡</span>
              </div>
              <h3 style={{color:'#000000',fontSize:'16px',fontWeight:800,marginBottom:'10px',letterSpacing:'-0.01em'}}>300+ Person-Years</h3>
              <p style={{color:'#0f172a',fontSize:'13.5px',fontWeight:600,lineHeight:'1.75'}}>
                With a combined experience exceeding 300 person-years, our faculty represents the pinnacle of communication expertise — offering a learning experience that goes far beyond theoretical concepts.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:'16px',padding:'28px',boxShadow:'0 4px 24px rgba(0,0,0,0.15)',transition:'box-shadow 0.3s'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'linear-gradient(135deg,#818cf8,#4f46e5)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',boxShadow:'0 4px 14px rgba(99,102,241,0.35)'}}>
                <span style={{fontSize:'20px'}}>🌐</span>
              </div>
              <h3 style={{color:'#000000',fontSize:'16px',fontWeight:800,marginBottom:'10px',letterSpacing:'-0.01em'}}>Real-World Wisdom</h3>
              <p style={{color:'#0f172a',fontSize:'13.5px',fontWeight:600,lineHeight:'1.75'}}>
                Our students access a vast repository of case studies and lessons from business, government, and non-profit sectors. At T-SOC, we don't just teach communication — we embody excellence in the field.
              </p>
            </div>

          </div>

          {/* Bottom tagline */}
          <p style={{color:'#000000',fontSize:'17px',fontFamily:'monospace',fontWeight:800,letterSpacing:'0.03em'}}>
            "Generating Trust through Honest Communications." — Our Institutional Compass
          </p>

        </div>
      </section>

      {/* ==================== 4. OUR MODEL SECTION ==================== */}
      <section id="our-model" className="relative z-10 overflow-hidden pt-6 pb-6 px-4" style={{background:'transparent'}}>
        <div className="relative max-w-5xl mx-auto space-y-6">

          {/* Header */}
          <div className="text-center space-y-4">
            <span style={{display:'inline-block',padding:'6px 18px',borderRadius:'9999px',background:'rgba(255,255,255,0.2)',border:'1px solid rgba(232,96,28,0.4)',color:'#000000',fontSize:'10px',fontFamily:'monospace',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase'}}>
              Our Model
            </span>
            <h2 style={{fontSize:'clamp(2.2rem,5vw,3.5rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-0.03em',color:'#000000'}}>
              How We Teach
            </h2>
            <p style={{color:'#000000',fontSize:'16px',fontWeight:700,maxWidth:'620px',margin:'0 auto',lineHeight:'1.7'}}>
              A Hybrid Model built for modern professionals — flexible, expert-led, and outcome-driven.
            </p>
          </div>

          {/* Two text cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px'}}>

            {/* Card A */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(20,184,166,0.3)',borderRadius:'20px',padding:'32px',boxShadow:'0 6px 30px rgba(0,0,0,0.12)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'14px',background:'linear-gradient(135deg,#14b8a6,#0d9488)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 14px rgba(20,184,166,0.35)',flexShrink:0}}>
                  <span style={{fontSize:'22px'}}>🔀</span>
                </div>
                <h3 style={{color:'#000000',fontSize:'17px',fontWeight:800,letterSpacing:'-0.01em',margin:0}}>Flexible by Design</h3>
              </div>
              <p style={{color:'#0f172a',fontSize:'14px',fontWeight:600,lineHeight:'1.8',margin:0}}>
                The Trust School of Communications recognizes the diverse needs of modern professionals and students in today's fast-paced world. Our innovative Hybrid Model offers flexible learning solutions that cater to both busy executives seeking short-term intensive programs and those looking for more comprehensive, long-term certificate courses. This adaptable approach ensures that all our students can access high-quality communication education, regardless of their time constraints or preferred learning style.
              </p>
            </div>

            {/* Card B */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(232,96,28,0.3)',borderRadius:'20px',padding:'32px',boxShadow:'0 6px 30px rgba(0,0,0,0.12)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'14px',background:'linear-gradient(135deg,#f97316,#e8601c)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 14px rgba(232,96,28,0.35)',flexShrink:0}}>
                  <span style={{fontSize:'22px'}}>🏆</span>
                </div>
                <h3 style={{color:'#000000',fontSize:'17px',fontWeight:800,letterSpacing:'-0.01em',margin:0}}>Excellence at the Core</h3>
              </div>
              <p style={{color:'#0f172a',fontSize:'14px',fontWeight:600,lineHeight:'1.8',margin:0}}>
                At the core of our Hybrid Model is a commitment to excellence and expertise. For short-term executive courses, we blend in-person instruction with online components for immersive learning that fits demanding schedules. Our long-term certificate programs offer in-person and online modules spread over 3–4 months. Across all programs, we exclusively engage super experts in communication — ensuring students receive instruction from the very best in the field.
              </p>
            </div>

          </div>

          {/* 3 stat pills */}
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'16px'}}>
            {[
              {icon:'📅', label:'Short-Term Courses', sub:'2–3 day intensives'},
              {icon:'📜', label:'Certificate Programs', sub:'3–4 month in-depth tracks'},
              {icon:'👥', label:'Super Expert Faculty', sub:'Exclusively industry leaders'},
            ].map((item, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'14px',padding:'14px 20px',boxShadow:'0 2px 12px rgba(0,0,0,0.1)'}}>
                <span style={{fontSize:'22px'}}>{item.icon}</span>
                <div>
                  <div style={{color:'#000000',fontSize:'13px',fontWeight:800}}>{item.label}</div>
                  <div style={{color:'#0f172a',fontSize:'11px',fontWeight:600,fontFamily:'monospace'}}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 5. OUR USPs SECTION ==================== */}
      <section id="our-usps" className="relative z-10 overflow-hidden pt-6 pb-6 px-4" style={{background:'transparent'}}>
        <div className="relative max-w-5xl mx-auto space-y-6">

          {/* Header */}
          <div className="text-center space-y-4">
            <span style={{display:'inline-block',padding:'6px 18px',borderRadius:'9999px',background:'rgba(255,255,255,0.2)',border:'1px solid rgba(99,102,241,0.4)',color:'#000000',fontSize:'10px',fontFamily:'monospace',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase'}}>
              Our USPs
            </span>
            <h2 style={{fontSize:'clamp(2.2rem,5vw,3.5rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-0.03em',color:'#000000'}}>
              Why Choose T-SOC?
            </h2>
            <p style={{color:'#000000',fontSize:'16px',fontWeight:700,maxWidth:'560px',margin:'0 auto',lineHeight:'1.7'}}>
              Three pillars that set us apart from every other communications school.
            </p>
          </div>

          {/* 3 USP cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:'20px'}}>

            {/* USP 1 */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:'20px',padding:'32px',boxShadow:'0 6px 30px rgba(0,0,0,0.12)'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'linear-gradient(135deg,#818cf8,#4f46e5)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'18px',boxShadow:'0 4px 14px rgba(99,102,241,0.35)'}}>
                <span style={{color:'#ffffff',fontFamily:'monospace',fontSize:'15px',fontWeight:800}}>01</span>
              </div>
              <h3 style={{color:'#000000',fontSize:'17px',fontWeight:800,marginBottom:'12px',lineHeight:'1.3'}}>Trust-Centric Communication Paradigm</h3>
              <p style={{color:'#0f172a',fontSize:'14px',fontWeight:600,lineHeight:'1.8',margin:0}}>
                We pioneer a trust-first approach, redefining communication as a tool for building credibility and fostering genuine connections in every interaction.
              </p>
            </div>

            {/* USP 2 */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(20,184,166,0.3)',borderRadius:'20px',padding:'32px',boxShadow:'0 6px 30px rgba(0,0,0,0.12)'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'linear-gradient(135deg,#14b8a6,#0d9488)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'18px',boxShadow:'0 4px 14px rgba(20,184,166,0.35)'}}>
                <span style={{color:'#ffffff',fontFamily:'monospace',fontSize:'15px',fontWeight:800}}>02</span>
              </div>
              <h3 style={{color:'#000000',fontSize:'17px',fontWeight:800,marginBottom:'12px',lineHeight:'1.3'}}>Hybrid Learning with Real-World Immersion</h3>
              <p style={{color:'#0f172a',fontSize:'14px',fontWeight:600,lineHeight:'1.8',margin:0}}>
                Our innovative hybrid program seamlessly blends online flexibility with in-person experiences, offering unparalleled access to industry insights and hands-on practice.
              </p>
            </div>

            {/* USP 3 */}
            <div style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(232,96,28,0.3)',borderRadius:'20px',padding:'32px',boxShadow:'0 6px 30px rgba(0,0,0,0.12)'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'linear-gradient(135deg,#f97316,#e8601c)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'18px',boxShadow:'0 4px 14px rgba(232,96,28,0.35)'}}>
                <span style={{color:'#ffffff',fontFamily:'monospace',fontSize:'15px',fontWeight:800}}>03</span>
              </div>
              <h3 style={{color:'#000000',fontSize:'17px',fontWeight:800,marginBottom:'12px',lineHeight:'1.3'}}>Executive-focused, Jargon-free Curriculum</h3>
              <p style={{color:'#0f172a',fontSize:'14px',fontWeight:600,lineHeight:'1.8',margin:0}}>
                We deliver the essence of advanced communication strategies in concise, accessible formats — tailored for busy executives seeking immediate real-world application, and students keen on making a difference from Day 1.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 4. AI FEATURES SPLIT SECTION (removed) ==================== */}
      <section id="ai-suggestions-split" className="hidden">
        
        {/* Left side: AI Suggestions Chips Grid */}
        <div className="lg:col-span-7 text-left flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            {/* Section Eyebrow Label Pill */}
            <span className="inline-block px-3.5 py-1.5 bg-[#e8601c]/10 border border-[#e8601c]/20 rounded-full text-[9px] font-sans text-orange-400 font-bold uppercase tracking-widest leading-none">
              AI FEATURES
            </span>
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight font-sans">
              Smart Diagnostics & Communication Intelligence
            </h2>
            <p className="text-slate-400 text-sm font-sans font-medium max-w-xl leading-relaxed">
              Our analytics layer dynamically sieves filler words, maps communication blind spots across written and interpersonal channels, and updates candidate communication profiles automatically.
            </p>
          </div>

          {/* Grid of feature chips - clicking highlights specific photo overlay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiFeatures.map((chip, idx) => {
              const isSelected = activeFeatureIndex === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => {
                    setActiveFeatureIndex(idx);
                    playBeep(600 + idx*100, 'triangle', 0.1);
                  }}
                  className={`p-5 rounded-[22px] transition-all duration-300 text-left space-y-2 cursor-pointer border ${
                    isSelected 
                      ? 'bg-white text-slate-900 border-white shadow-xl scale-102 font-black' 
                      : 'bg-[#080d1a] text-slate-300 border-white/5 hover:border-orange-500/30'
                  }`}
                >
                  <h4 className="text-sm font-black font-sans flex items-center gap-1.5 leading-none">
                    <span className={isSelected ? 'text-[#e8601c]' : 'text-slate-500'}>★</span> {chip.title}
                  </h4>
                  <p className={`text-xs leading-normal font-sans font-medium ${isSelected ? 'text-slate-600' : 'text-slate-400'}`}>
                    {chip.desc}
                  </p>
                  
                  {isSelected && (
                    <span className="text-[8px] font-mono block text-[#e8601c] font-black uppercase tracking-wider">// DETECTOR: {chip.indicator}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button 
              onClick={() => {
                triggerCalibrateMelody();
                handleNav('/courses');
              }}
              className="text-orange-550 hover:text-orange-400 font-sans text-xs font-black inline-flex items-center gap-2 cursor-pointer uppercase transition-all hover:translate-x-1.5"
            >
              <span>See how suggestions work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right side: Lifestyle Vibe Photo (Soft pastel pink clouds image with 3D Parallax Tilt) */}
        <div 
          onMouseMove={activeFeaturesMainPhoto.handleMouseMove}
          onMouseLeave={activeFeaturesMainPhoto.handleMouseLeave}
          style={{ 
            transform: activeFeaturesMainPhoto.tiltStyle || 'perspective(1000px) rotateY(6deg)',
            transition: activeFeaturesMainPhoto.tiltStyle ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="lg:col-span-5 relative min-h-[410px] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col justify-end transform-gpu cursor-pointer"
        >
          {/* Layered photo background showing selected suggestions */}
          <img 
            src={aiFeatures[activeFeatureIndex].img} 
            alt="Soft pastel corporate lifestyle" 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-102"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-[#050b18]/15 to-transparent" />
          
          <div id="vibe-calibrated-index-box" className="vibe-calibrated-box relative z-10 m-5 text-left text-white bg-slate-950/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <span className="font-mono text-[8px] text-teal-400 block font-black leading-none uppercase tracking-widest">// VIBE CALIBRATED INDEX</span>
            <h4 className="text-xs font-black text-orange-400 font-mono">SELECTED: {aiFeatures[activeFeatureIndex].title}</h4>
            <p className="text-[11px] font-sans font-bold text-slate-300 leading-relaxed">
              "Linguistic purity isn't restricting vocabulary. It is removing defensive evasion to let genuine truth shine."
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 5. INTERACTIVE SCHEDULER & REAL-TIME SPEECH ANALYZER (removed) ==================== */}
      <section id="interactive-check-box" className="hidden">
        
        {/* Consistent Section Eyebrow Label Pill */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3.5 py-1.5 bg-[#132549]/40 border border-orange-500/20 rounded-full text-[9px] font-sans text-orange-400 font-bold uppercase tracking-widest">
            A closer look
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none font-sans mt-2">
            The Interactive Credibility Diagnostics
          </h2>
          <p className="text-slate-400 text-xs font-sans max-w-md mx-auto leading-relaxed">
            Experience T-SOC's core analytical modules spanning written, verbal, non-verbal, digital, and interpersonal communication dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Widget 1: Routine Calibration Timeline List (Habitline structural scheduler) */}
          <div className="lg:col-span-6 bg-[#080d19]/90 border border-white/5 rounded-[28px] p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#0D9488]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Activity className="w-5.5 h-5.5 text-orange-500" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-black leading-none">// TIMEPATH MATRIX</span>
                    <h3 className="font-extrabold text-white mt-1">Linguistic Task Scheduler</h3>
                  </div>
                </div>
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-full border border-orange-550/25 text-orange-400 font-black uppercase leading-none">
                  STAGE CALIBRATOR
                </span>
              </div>

              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                Study T-SOC's central daily communication routine. Tap any row to activate its details panel.
              </p>

              {/* Interactive Timeline Schedule View with Highlighted Active Row */}
              <div className="space-y-2.5 pt-2 font-sans">
                {schedulerTasks.map((task, idx) => {
                  const isActive = activeTaskIndex === idx;
                  return (
                    <button
                      key={idx}
                      id={`scheduler-task-${idx}`}
                      onClick={() => {
                        setActiveTaskIndex(idx);
                        playBeep(400 + idx*80, 'sine', 0.08);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-orange-600/10 border-orange-500/50 text-white ring-1 ring-orange-500/30 shadow-[0_10px_25px_rgba(232,96,28,0.1)]' 
                          : 'bg-[#030712] border-white/5 text-slate-400 hover:border-white/15'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[10px] font-black ${isActive ? 'text-orange-500' : 'text-slate-500'}`}>
                            {task.time}
                          </span>
                          <span className="text-slate-700 font-semibold">|</span>
                          <span className={`font-bold ${isActive ? 'text-white font-sans' : 'text-slate-300'}`}>{task.title}</span>
                        </div>
                        <span className={`font-mono text-[9px] font-bold ${isActive ? 'text-orange-500' : 'text-slate-500'}`}>{task.duration}</span>
                      </div>
                      
                      {isActive && (
                        <div className="mt-3.5 text-[11.5px] leading-relaxed text-slate-300 border-t border-slate-800/80 pt-3 flex flex-col gap-1">
                          <span className="font-mono block text-orange-500 text-[8px] uppercase tracking-wider font-extrabold">// DETECTOR METHOD: {task.key}</span>
                          <p>{task.desc}</p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Metric Footer */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
              <span>STATUS: TELEMETRY ENCLOSURE ON</span>
              <span className="text-[#e8601c] font-black">100% PROGRAM ACCREDITED</span>
            </div>
          </div>

          {/* Widget 2: C-Suite Live Audio Calibration Visualizer (Double interactive depth) */}
          <div 
            onMouseMove={simulatedDiagnosticBox.handleMouseMove}
            onMouseLeave={simulatedDiagnosticBox.handleMouseLeave}
            style={{ 
              transform: simulatedDiagnosticBox.tiltStyle || 'perspective(1000px)',
              transition: simulatedDiagnosticBox.tiltStyle ? 'none' : 'transform 0.5s ease'
            }}
            className="lg:col-span-6 bg-[#080d19]/90 border border-white/5 rounded-[28px] p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden transform-gpu"
          >
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-orange-600/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5.5 h-5.5 text-orange-500" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-black leading-none">// ANALYZER MATRIX</span>
                    <h3 className="font-extrabold text-white mt-1">Communication Calibration Deck</h3>
                  </div>
                </div>

                <span className={`font-mono text-[9px] px-3 py-1 rounded-full border uppercase font-extrabold leading-none ${
                  analysisResult.score > 40 
                    ? 'bg-rose-950/40 text-rose-350 border-rose-900/30' 
                    : 'bg-emerald-950/40 text-emerald-350 border-emerald-900/40'
                }`}>
                  {analysisResult.grade}
                </span>
              </div>

              {/* Dynamic canvas display simulating live soundwaves */}
              <div className="space-y-2">
                <span className="text-[8.5px] font-mono text-slate-500 uppercase font-black block tracking-wider leading-none">
                  // LIVE COMMUNICATION SIGNAL SPECTRUM (TAP INPUT TO CALIBRATE)
                </span>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#030712] h-28 shadow-inner flex flex-col justify-between p-3">
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block" width={400} height={112} />
                  
                  {/* Absolute positioning of instant pitch stats overlays */}
                  <div className="relative z-10 flex justify-between items-start">
                    <span className={`text-[7.5px] font-mono border px-1.5 py-0.5 rounded leading-none transition-all ${
                      micActive 
                        ? 'text-emerald-400 bg-emerald-950/70 border-emerald-500/20' 
                        : ttsActive 
                          ? 'text-teal-400 bg-teal-950/70 border-teal-500/25 animate-pulse'
                          : 'text-orange-450 bg-orange-950/30 border-orange-500/10'
                    }`}>
                      {micActive ? "MICROPHONE LIVE" : ttsActive ? "VOICE SYNTH RUNNING" : "SIMULATION SCANNING"}
                    </span>
                    <div className="text-right text-[8px] font-mono text-slate-400 space-y-0.5">
                      <div>Delivery lock: {vocalMetrics.resonance}%</div>
                      <div>Jargon scale: {vocalMetrics.clicheCoef}/10</div>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between items-end">
                    <span className="text-[9px] font-mono text-white font-extrabold shadow-sm bg-black/40 px-2 py-0.5 rounded-sm">
                      {vocalMetrics.pitch ? `${vocalMetrics.pitch} Hz` : "Signal scan standby"}
                    </span>
                    
                    <div className="flex gap-1.5">
                      <button 
                        onClick={ttsActive ? stopTtsSpeech : () => startTtsSpeech(inputText)}
                        className={`text-[8.5px] font-mono font-black uppercase px-2.5 py-1 rounded shadow-md border cursor-pointer select-none transition-all ${
                          ttsActive 
                            ? 'bg-teal-600 text-white border-teal-500 animate-pulse hover:bg-teal-700' 
                            : 'bg-teal-950/40 text-teal-350 border-teal-900/40 hover:bg-teal-900 hover:text-teal-200'
                        }`}
                      >
                        {ttsActive ? "⏹ Stop Playback" : "🔊 Speak & Verify"}
                      </button>

                      <button
                        onClick={() => {
                          if (micActive) {
                            stopMicrophone();
                          } else {
                            setShowAuditGate(true);
                            setAuditSubmitted(false);
                            setAuditGateError(null);
                          }
                        }}
                        disabled={ttsActive}
                        className={`text-[8.5px] font-mono font-black uppercase px-2.5 py-1 rounded shadow-md border cursor-pointer select-none transition-colors ${
                          ttsActive ? 'opacity-50 cursor-not-allowed' : ''
                        } ${
                          micActive
                            ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500'
                            : 'bg-white hover:bg-orange-600 text-slate-900 hover:text-white border-slate-200'
                        }`}
                      >
                        {micActive ? "Stop Vetting" : "Speak to calibrate"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Real-time word ticker feedback banner */}
                {(micActive || ttsActive) && (
                  <div className="bg-black/60 border border-white/5 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-1.5 overflow-hidden w-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                      <span className="text-[8px] font-mono text-slate-500 uppercase shrink-0 font-extrabold">// TRACKER:</span>
                      <p className="text-[10px] font-sans font-bold text-slate-200 truncate flex-1">
                        {ttsActive ? (
                          ttsWordsList.map((w, idx) => {
                            const isCurrent = idx === ttsCurrentWordIndex;
                            return (
                              <span 
                                key={idx} 
                                className={`mr-1.5 transition-all ${
                                  isCurrent ? 'text-teal-400 font-extrabold underline decoration-teal-400 decoration-2 scale-110 px-1 bg-teal-950/50 rounded' : 'text-slate-450'
                                }`}
                              >
                                {w}
                              </span>
                            );
                          })
                        ) : (
                          vocalMetrics.lastDetectedWord ? (
                            <span className="text-orange-400 font-black underline decoration-orange-500">
                              Detected phrase: "{vocalMetrics.lastDetectedWord}"
                            </span>
                          ) : "Listening for vocal signal now..."
                        )}
                      </p>
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 bg-slate-900 px-1 py-0.5 rounded shrink-0 uppercase">
                      {ttsActive ? "TTS ENGAGED" : "MIC ACTIVE"}
                    </span>
                  </div>
                )}

                {micPermissionDenied && (
                  <div className="bg-orange-950/20 border border-orange-500/25 rounded-xl px-3 py-2 flex items-start gap-2 text-[9px] font-mono text-orange-350">
                    <span className="shrink-0 text-orange-500 font-extrabold font-mono">[!] NOTE:</span>
                    <p className="font-sans font-medium text-slate-450 leading-tight">
                      Microphone access was blocked or is unsupported. We automatically activated our high-fidelity <strong>🔊 Speak & Verify</strong> vocal simulation so you can review real-world auditory responses seamlessly!
                    </p>
                  </div>
                )}

                {/* GORGEOUS LIVE FEEDBACK ATTENTION PANEL FOR HOVER AND FOOTFALL DRAW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1.5">
                  <div className="bg-[#030712]/70 border border-white/5 rounded-xl p-2.5 flex flex-col justify-between space-y-1 relative overflow-hidden group hover:border-[#e8601c]/30 transition-all duration-200">
                    <div className="absolute right-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping opacity-60" />
                    <span className="text-[7.5px] font-mono text-slate-500 font-extrabold block uppercase tracking-wider">// REALTIME ENERGY</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-sans font-black text-white">{vocalMetrics.volumeDb} dB</span>
                      <div className="flex items-end gap-0.5 h-3">
                        <div className="w-[1.5px] bg-orange-500 rounded-full transition-all duration-150" style={{ height: `${Math.min(vocalMetrics.volumeDb * 1.0, 100)}%` }} />
                        <div className="w-[1.5px] bg-teal-500 rounded-full transition-all duration-150" style={{ height: `${Math.min(vocalMetrics.volumeDb * 1.5, 100)}%` }} />
                        <div className="w-[1.5px] bg-emerald-500 rounded-full transition-all duration-150" style={{ height: `${Math.min(vocalMetrics.volumeDb * 1.2, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#030712]/70 border border-white/5 rounded-xl p-2.5 flex flex-col justify-between space-y-1 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-200">
                    <span className="text-[7.5px] font-mono text-slate-500 font-extrabold block uppercase tracking-wider">// AUDIENCE PULL</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-sans font-black text-teal-400">
                        {vocalMetrics.engagementIndex ? `${vocalMetrics.engagementIndex}x` : "1.0x"}
                      </span>
                      <span className="text-[7px] font-mono text-teal-400 bg-teal-950/60 px-1 py-0.2 rounded font-black">// STABLE</span>
                    </div>
                  </div>

                  <div className="bg-[#030712]/70 border border-white/5 rounded-xl p-2.5 flex flex-col justify-between space-y-1 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-200">
                    <span className="text-[7.5px] font-mono text-slate-500 font-extrabold block uppercase tracking-wider">// TRANSCRIBED WORDS</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-sans font-black text-emerald-400">{vocalMetrics.wordCount || 0}</span>
                      <span className="text-[7.5px] font-mono text-slate-400 uppercase font-bold">words</span>
                    </div>
                  </div>

                  <div className="bg-[#030712]/70 border border-white/5 rounded-xl p-2.5 flex flex-col justify-between space-y-1 relative overflow-hidden group hover:border-sky-500/30 transition-all duration-200">
                    <span className="text-[7.5px] font-mono text-slate-500 font-extrabold block uppercase tracking-wider">// TARGET WORDS</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[9px] font-mono text-slate-200 truncate max-w-[80px]" title={vocalMetrics.lastDetectedWord || 'Standby'}>
                        {vocalMetrics.lastDetectedWord ? `"${vocalMetrics.lastDetectedWord}"` : 'Standby'}
                      </span>
                      <span className="text-[7px] font-mono text-orange-400 bg-orange-950/50 px-1 py-0.2 rounded font-black">LIVE</span>
                    </div>
                  </div>
                </div>

                {/* FOOTFOOT ENGAGEMENT PRODUCER & AUDIENCE FEEDBACK HUD */}
                <div className="bg-slate-950 border-2 border-teal-500/40 rounded-2xl p-4 md:p-5 space-y-3 relative overflow-hidden shadow-2xl">
                  <div className="absolute right-0 top-0 h-40 w-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse animate-ping" />
                      <span className="text-[9px] font-mono text-teal-300 font-extrabold uppercase tracking-widest leading-none">
                        // REAL-TIME AUDIENCE VIBE RESPONSE
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-orange-400 font-black uppercase tracking-wider leading-none">
                      STATUS: {vocalMetrics.engagementIndex > 2.0 ? '🔥 ATTENTION BOOSTER ACTIVE' : 'ℹ️ STANDBY'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1 relative z-10">
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[12px] font-sans font-extrabold text-white block leading-snug">
                        {micActive 
                          ? (analysisResult.score > 40 
                            ? "🚨 'Corporate Speak' detected! Communication clarity is compromised."
                            : "✨ Crystal clear communication lock! Stakeholder confidence in Noida/Delhi hub is escalating.")
                          : ttsActive
                            ? "🔊 Communication simulator executing realtime semantic and clarity feedback sweep..."
                            : "📢 Simulator sweep active. Enter or select a communication sample to lock engagement!"
                        }
                      </span>
                      <p className="text-[10px] font-sans text-slate-200 leading-relaxed font-medium">
                        {analysisResult.score > 40 
                          ? "PRO-TIP: Swap corporate slop with positive, active, grounded nouns instantly — works across written briefs, verbal delivery, and digital messaging."
                          : "Live communication loop secures legal, financial, and executive authority confidence."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 shrink-0 bg-black/85 border border-white/10 rounded-xl px-4 py-2.5">
                      <div className="space-y-1 text-right">
                        <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold leading-none tracking-wider">RETENTION RATE</span>
                        <span className="text-sm font-sans font-black text-emerald-400">{(vocalMetrics.resonance * 1.1 + (100 - analysisResult.score) * 0.9).toFixed(1)}%</span>
                      </div>
                      <div className="w-[1px] h-8 bg-white/15" />
                      <div className="space-y-1 text-right">
                        <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold leading-none tracking-wider">FOOTFALL TRAIN</span>
                        <span className="text-sm font-sans font-black text-orange-400">+{Math.max(Math.round((100 - analysisResult.score) * (vocalMetrics.engagementIndex || 1)), 15)} users</span>
                      </div>
                    </div>
                  </div>
                </div>

                {micPermissionDenied && (
                  <div className="p-3.5 bg-amber-950/40 border-2 border-orange-500/40 rounded-xl space-y-1">
                    <div className="text-[8.5px] font-mono text-orange-450 font-extrabold uppercase tracking-widest leading-none">
                      ⚠️ MICROPHONE PERMISSION STATUS
                    </div>
                    <p className="text-[9px] font-sans text-slate-200 leading-relaxed font-medium">
                      Microphone integration is restricted within the review panel iframe. We have initiated the high-fidelity acoustic simulation model. To grant hardware microphone permission, tap &quot;Open in new window&quot; at the top right of your screen!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3.5">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase font-black block tracking-wider leading-none">
                  // COMMUNICATION CLARITY AUDITOR
                </span>
                
                <textarea
                  id="cliche-scanned-text"
                  value={inputText}
                  onChange={(e) => analyzeSpeech(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 text-xs text-white p-4 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 resize-none font-sans font-medium"
                  rows={2}
                  placeholder="Insert any written or verbal statement to scan for communication clarity..."
                />

                {/* Preset click buttons */}
                <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-sans">
                  <span className="text-slate-500 font-extrabold uppercase tracking-widest font-mono">// DELEGATE SAMPLES:</span>
                  {speechPresets.map((pr, idx) => (
                    <button
                      key={idx}
                      onClick={() => analyzeSpeech(pr.text)}
                      className="bg-slate-950 hover:bg-slate-900 text-slate-300 border border-white/10 hover:border-orange-500 px-3 py-1.5 rounded-full transition-all cursor-pointer hover:-translate-y-0.5"
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CRYSTAL-CLEAR FIDELITY FEEDBACK DECK */}
              <div className="space-y-3 pt-1">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase font-black block tracking-wider leading-none">
                  // AUDIT FEEDBACK DECK (WHAT IS GOOD, WHAT IS NOT, AND WHAT TO CHANGE)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* CARD 1: WHAT IS GOOD */}
                  <div className="bg-emerald-950/75 border-2 border-emerald-500/55 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span className="text-[10px] font-mono font-black text-emerald-350 tracking-wider">🟢 WHAT IS GOOD</span>
                      </div>
                      <ul className="space-y-2 text-[10px] font-sans text-emerald-100 font-medium">
                        {analysisResult.positives && analysisResult.positives.length > 0 ? (
                          analysisResult.positives.map((p, idx) => (
                            <li key={idx} className="flex gap-1.5 items-start">
                              <span className="text-emerald-400 shrink-0 font-bold select-none">✓</span>
                              <span className="leading-tight">{p}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-emerald-300 italic">No audio feed input available. Choose a sample from above!</li>
                        )}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-emerald-900/30 text-[8.5px] font-mono text-emerald-400 font-black uppercase">
                      Linguistic Standing: {analysisResult.grade}
                    </div>
                  </div>

                  {/* CARD 2: WHAT IS NOT GOOD */}
                  <div className="bg-rose-950/75 border-2 border-rose-500/55 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4.5 h-4.5 text-rose-400 shrink-0" />
                        <span className="text-[10px] font-mono font-black text-rose-350 tracking-wider">🔴 WHAT IS NOT GOOD</span>
                      </div>
                      <ul className="space-y-2 text-[10px] font-sans text-rose-100 font-medium">
                        {analysisResult.negatives && analysisResult.negatives.length > 0 ? (
                          analysisResult.negatives.map((n, idx) => (
                            <li key={idx} className="flex gap-1.5 items-start">
                              <span className="text-rose-400 shrink-0 font-bold select-none">[!]</span>
                              <span className="leading-tight">{n}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-rose-300 italic">No slop / defensive patterns flagged. Performance is solid.</li>
                        )}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-rose-900/30 text-[8.5px] font-mono text-rose-400 font-black uppercase">
                      Dissonant words: {analysisResult.flagged.length} terms
                    </div>
                  </div>

                  {/* CARD 3: WHAT TO CHANGE */}
                  <div className="bg-indigo-950/75 border-2 border-indigo-500/55 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4.5 h-4.5 text-indigo-300 shrink-0" />
                        <span className="text-[10px] font-mono font-black text-indigo-300 tracking-wider">⚡ WHAT TO CHANGE</span>
                      </div>
                      <div className="space-y-2.5">
                        {analysisResult.replacements && analysisResult.replacements.length > 0 ? (
                          <div className="space-y-2">
                            <p className="text-[9.5px] font-sans text-indigo-200 font-semibold leading-tight">
                              Swap evasive corporate fluff directly with these simple, active phrases:
                            </p>
                            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                              {analysisResult.replacements.map((rep, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-black/45 border border-indigo-900/40 rounded px-2 py-1 gap-1 text-[9px] font-mono">
                                  <span className="text-rose-400 line-through font-extrabold truncate max-w-[85px]">{rep.original}</span>
                                  <span className="text-slate-500 font-black">➜</span>
                                  <span className="text-emerald-400 font-extrabold truncate max-w-[85px]">{rep.replaceWith}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-[10px] font-sans text-indigo-200 font-semibold leading-tight">
                            Perfect direct speech locked in! Keep speaking cleanly, avoiding any defensive terminology.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-indigo-900/30 text-[9px] font-sans italic text-indigo-300 leading-tight">
                      {analysisResult.suggestion}
                    </div>
                  </div>
                </div>
              </div>

              {/* PRIVATE REPORT GATE — appears after "Speak to calibrate" is clicked */}
              {showAuditGate && (
                <div className="pt-1">
                  {auditSubmitted ? (
                    <div className="rounded-2xl p-6 text-center space-y-3" style={{background:'rgba(6,95,70,0.18)',border:'2px solid rgba(52,211,153,0.35)'}}>
                      <CheckCircle2 className="w-8 h-8 mx-auto" style={{color:'#6ee7b7'}} />
                      <p className="text-sm font-black font-mono uppercase tracking-wide" style={{color:'#6ee7b7'}}>Report Dispatched!</p>
                      <p className="text-xs font-sans leading-relaxed" style={{color:'#a7f3d0'}}>
                        Your personalised Communication Clarity Audit has been sent to <strong>{auditEmail || auditPhone}</strong>. Check your inbox or messages.
                      </p>
                      <button
                        onClick={() => { setAuditSubmitted(false); setShowAuditGate(false); setAuditName(''); setAuditEmail(''); setAuditPhone(''); }}
                        className="text-[10px] font-mono font-black uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer transition-all"
                        style={{background:'rgba(52,211,153,0.15)',border:'1px solid rgba(52,211,153,0.35)',color:'#6ee7b7'}}
                      >
                        Run Another Audit
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-2xl p-5 space-y-4" style={{background:'rgba(15,23,42,0.95)',border:'2px solid rgba(251,146,60,0.35)'}}>
                      <div>
                        <span className="text-[8.5px] font-mono font-black uppercase tracking-widest block" style={{color:'#fb923c'}}>// GET YOUR FULL DIAGNOSTIC REPORT</span>
                        <p className="text-xs font-sans font-semibold mt-1" style={{color:'#e2e8f0'}}>Enter your details and we'll send your personalised Communication Clarity Brief directly to you — no results shown here.</p>
                      </div>

                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{color:'#94a3b8'}} />
                          <input
                            type="text"
                            value={auditName}
                            onChange={e => setAuditName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full text-xs font-sans pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                            style={{background:'#0d1b2e',border:'1px solid rgba(255,255,255,0.15)',color:'#f1f5f9'}}
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{color:'#94a3b8'}} />
                          <input
                            type="email"
                            value={auditEmail}
                            onChange={e => setAuditEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full text-xs font-sans pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                            style={{background:'#0d1b2e',border:'1px solid rgba(255,255,255,0.15)',color:'#f1f5f9'}}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{color:'#94a3b8'}} />
                          <input
                            type="tel"
                            value={auditPhone}
                            onChange={e => setAuditPhone(e.target.value)}
                            placeholder="Phone / WhatsApp number"
                            className="w-full text-xs font-sans pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                            style={{background:'#0d1b2e',border:'1px solid rgba(255,255,255,0.15)',color:'#f1f5f9'}}
                          />
                        </div>
                      </div>

                      {auditGateError && (
                        <p className="text-[10px] font-mono font-bold" style={{color:'#f87171'}}>{auditGateError}</p>
                      )}

                      <button
                        onClick={handleSendAuditReport}
                        disabled={auditSubmitting}
                        className="w-full flex items-center justify-center gap-2 text-xs font-mono font-black uppercase tracking-wider py-3 rounded-xl cursor-pointer transition-all"
                        style={{background:'rgba(251,146,60,0.9)',color:'#0f172a'}}
                      >
                        {auditSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        {auditSubmitting ? 'Sending Report...' : 'Send My Report'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Metric Footer */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-wider">
              <span>Estimated Jargon Density: {analysisResult.score}%</span>
              <span className={analysisResult.score > 40 ? 'text-rose-400 font-black' : 'text-emerald-400 font-black'}>
                {analysisResult.score > 40 ? 'VETTING REQUIRED' : 'COMPLIANCE CLEAR'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 6. TABBED PERSONA SECTION ==================== */}
      <section id="persona-lifestyle" className="relative z-10 pt-6 pb-2 px-4" style={{background:'transparent'}}>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-4" style={{display:'flex',flexDirection:'column',gap:'6px'}}>
          <span className="inline-block self-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{background:'rgba(255,255,255,0.2)',border:'1px solid rgba(232,96,28,0.4)',color:'#000000'}}>
            Fits every lifestyle
          </span>
          <h2 className="font-black tracking-tight font-sans" style={{color:'#000000',fontSize:'clamp(2.5rem,6vw,4rem)',lineHeight:1.05,margin:0,textShadow:'0 1px 2px rgba(0,0,0,0.12), 0 4px 16px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.3)'}}>
            Select a course to match your need
          </h2>
          <p className="font-sans" style={{color:'#000000',fontWeight:800,fontSize:'16px',margin:0,textShadow:'0 1px 4px rgba(255,255,255,0.5)'}}>
            Choose your profile to explore programmes tailored for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6" style={{fontFamily:'sans-serif',fontSize:'11px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.07em'}}>
          {(Object.keys(personaTabs) as Array<keyof typeof personaTabs>).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                id={`persona-tab-${key}`}
                onClick={() => {
                  setActiveTab(key);
                  setTabClicked(true);
                  playBeep(key === 'pros' ? 500 : key === 'students' ? 620 : key === 'remote' ? 740 : key === 'parents' ? 860 : 980, 'sine', 0.08);
                }}
                className="px-5 py-3 rounded-full transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                style={isActive
                  ? { background: '#e8601c', color: '#ffffff', border: '2px solid #e8601c', boxShadow: '0 4px 14px rgba(232,96,28,0.35)' }
                  : { background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#000000', border: '2px solid rgba(0,0,0,0.15)', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
                }
              >
                {key === 'pros' && "C-Suite Professionals"}
                {key === 'students' && "Senior Executives"}
                {key === 'remote' && "Practicing Communications Professionals"}
                {key === 'parents' && "Students"}
                {key === 'csr' && "CSR Professionals"}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="max-w-5xl mx-auto relative">

          {/* Image card — before any tab clicked */}
          <div
            className="transition-all duration-500"
            style={{ opacity: tabClicked ? 0 : 1, transform: tabClicked ? 'translateY(-8px) scale(0.98)' : 'translateY(0) scale(1)', pointerEvents: tabClicked ? 'none' : 'auto', position: tabClicked ? 'absolute' : 'relative', inset: 0, zIndex: tabClicked ? 0 : 1 }}
          >
            <div className="rounded-3xl overflow-hidden relative min-h-[260px] flex flex-col md:flex-row items-stretch" style={{background:'#1e293b',boxShadow:'0 20px 60px rgba(0,0,0,0.18)'}}>
              <div className="w-full md:w-1/2 relative min-h-[180px] md:min-h-[260px]">
                <img src={personaTabs[activeTab].avatar} alt={personaTabs[activeTab].title} className="absolute inset-0 w-full h-full object-cover" style={{objectPosition:'center top'}} />
                <div className="absolute inset-0" style={{background:'linear-gradient(to right, transparent 40%, #1e293b 100%)'}} />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  <span className="font-mono font-black uppercase tracking-widest" style={{fontSize:'9px',color:'#e8601c'}}>// CREDENTIALS SYLLABUS</span>
                  <h4 className="font-black font-sans tracking-tight" style={{fontSize:'clamp(1.25rem,3vw,1.75rem)',color:'#ffffff',lineHeight:1.2,margin:0,textShadow:'0 2px 8px rgba(0,0,0,0.8)',WebkitTextFillColor:'#ffffff'}}>{personaTabs[activeTab].title}</h4>
                  <p className="font-sans" style={{fontSize:'13px',color:'#94a3b8',lineHeight:1.6,margin:0}}>{personaTabs[activeTab].desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl p-4" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div>
                    <span className="block font-bold uppercase tracking-widest" style={{fontSize:'8px',color:'#64748b'}}>OUTCOME ACCURACY</span>
                    <span className="block font-extrabold mt-1" style={{fontSize:'14px',color:'#f8fafc'}}>{personaTabs[activeTab].metric}</span>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <span className="block font-bold uppercase tracking-widest" style={{fontSize:'8px',color:'#64748b'}}>EFFICIENCY RATIO</span>
                    <span className="block font-black mt-1" style={{fontSize:'12px',color:'#34d399'}}>{personaTabs[activeTab].stats}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses grid */}
          <div
            className="transition-all duration-500"
            style={{ opacity: tabClicked ? 1 : 0, transform: tabClicked ? 'translateY(0)' : 'translateY(16px)', pointerEvents: tabClicked ? 'auto' : 'none', height: tabClicked ? 'auto' : 0, overflow: tabClicked ? 'visible' : 'hidden' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tabCourses[activeTab].map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                  style={{background:'#ffffff',border:'1px solid #e2e8f0',boxShadow:'0 2px 12px rgba(0,0,0,0.07)'}}
                >
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    {/* Badge row */}
                    <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
                      <span
                        className="font-black uppercase tracking-widest"
                        style={{
                          fontSize:'9px', padding:'3px 10px', borderRadius:'999px',
                          ...(course.type === 'certificate'
                            ? { background:'rgba(232,96,28,0.1)', color:'#c2410c', border:'1px solid rgba(232,96,28,0.25)' }
                            : { background:'rgba(5,150,105,0.1)', color:'#065f46', border:'1px solid rgba(5,150,105,0.25)' })
                        }}
                      >
                        {course.type === 'certificate' ? 'Certificate' : 'Short Course'}
                      </span>
                      <span className="font-bold uppercase tracking-wide" style={{fontSize:'9px',color:'#94a3b8'}}>{course.category}</span>
                    </div>

                    {/* Course title */}
                    <h5 className="font-black font-sans leading-snug" style={{fontSize:'14px',color:'#0f172a',margin:0}}>{course.name}</h5>

                    {/* Description */}
                    <p className="font-sans line-clamp-2" style={{fontSize:'12px',color:'#64748b',lineHeight:1.6,margin:0}}>{course.description}</p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 flex items-center justify-between" style={{borderTop:'1px solid #f1f5f9'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span className="flex items-center gap-1 font-bold" style={{fontSize:'11px',color:'#94a3b8'}}>
                        <Clock className="w-3 h-3" />{course.duration}
                      </span>
                      <span className="font-bold uppercase" style={{fontSize:'10px',color:'#cbd5e1'}}>{course.format}</span>
                    </div>
                    <button
                      onClick={() => { sessionStorage.setItem('tsoc_pending_course', course.id); sessionStorage.setItem('tsoc_pending_course_type', course.type); handleNav('/courses'); }}
                      className="flex items-center gap-1 font-black uppercase tracking-wide transition-opacity hover:opacity-70"
                      style={{fontSize:'10px',color:'#e8601c',background:'none',border:'none',cursor:'pointer',padding:0}}
                    >
                      Enquire <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View all CTA */}
            <div className="text-center mt-10">
              <button
                onClick={() => handleNav('/courses')}
                className="inline-flex items-center gap-2 rounded-full font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                style={{background:'#0f172a',color:'#ffffff',padding:'14px 36px',fontSize:'11px',boxShadow:'0 4px 16px rgba(15,23,42,0.2)'}}
              >
                View All Programmes <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 7. PUSH NOTIFICATION REMINDER CARDS (removed) ==================== */}
      <section id="gentle-reminders" className="hidden">
        
        {/* Consistent Section Eyebrow Label Pill */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3.5 py-1.5 bg-[#132549]/40 border border-orange-500/20 rounded-full text-[9px] font-sans text-orange-400 font-bold uppercase tracking-widest leading-none">
            Daily push prompts
          </span>
          <h3 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight">Advisory Notification Prompts</h3>
          <p className="text-slate-400 text-xs font-sans">Real-time advisory bulletins to calibrate written, spoken, interpersonal, and digital communication performance.</p>
        </div>

        {reminders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reminders.map(rem => (
              <div 
                key={rem.id} 
                id={`reminder-card-${rem.id}`}
                className="bg-[#0c101c] border border-white/10 rounded-[24px] p-5.5 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.5)] text-left transition-all duration-300 hover:border-orange-500/30 hover:scale-102 hover:-translate-y-1 relative"
              >
                <button 
                  onClick={() => dismissReminder(rem.id)}
                  title="Dismiss notification"
                  className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-4">
                  {/* Push header metadata */}
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-mono font-bold text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Bell className="w-3 h-3 text-[#e8601c] animate-bounce" /> Push Bulletin
                    </div>
                    <span className="text-slate-700 font-bold">•</span>
                    <span className="text-[10px] text-slate-500 font-mono">{rem.time}</span>
                  </div>

                  <div className="flex gap-3 items-start">
                    {/* Orange avatar style stamp */}
                    <div className="w-10 h-10 bg-orange-600/10 border border-orange-500/25 rounded-full flex items-center justify-center text-base shrink-0">
                      {rem.avatar}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-white leading-tight">{rem.title}</h4>
                      <p className="text-[11px] text-slate-400 font-sans font-medium leading-relaxed">{rem.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4 mt-4 border-t border-white/5 text-[10px] font-sans">
                  <button 
                    onClick={() => completeReminder(rem.id)}
                    className="flex-grow bg-[#f5f5f5] hover:bg-orange-600 text-slate-900 hover:text-white font-sans font-black py-2.5 rounded-full cursor-pointer transition-colors text-center text-[10px]"
                  >
                    I'm on it
                  </button>
                  <button 
                    onClick={() => dismissReminder(rem.id)}
                    className="px-4 border border-white/10 hover:border-white/20 text-slate-300 font-bold py-2.5 rounded-full cursor-pointer transition-colors text-center text-[10px]"
                  >
                    Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-[#080d19]/80 border border-emerald-500/20 text-emerald-400 rounded-[24px] text-center text-xs font-sans font-mono space-y-2 max-w-xl mx-auto shadow-xl">
            <span className="block font-black text-sm">✓ AUDITS STATUS SECURED</span>
            <div>All pushed communication calibration tasks cleared! Daily streak extended to {userStreak}.</div>
          </div>
        )}
      </section>

      {/* ==================== 8. FULL-PHOTO USER ACHIEVEMENT CARDS ==================== */}
      <section id="achievements-milestones" className="relative z-10 space-y-6 pt-2 pb-4 animate-fade-in-up">
        
        {/* Consistent Section Eyebrow Label Pill */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3.5 py-1.5 bg-[#132549]/40 border border-orange-500/20 rounded-full text-[9px] font-sans text-orange-400 font-bold uppercase tracking-widest">
            Sovereign outcomes
          </span>
          <h2 className="font-black tracking-tight font-sans" style={{color:'#000000',fontSize:'clamp(2.5rem,6vw,4rem)',lineHeight:1.05,textShadow:'0 1px 2px rgba(0,0,0,0.12), 0 4px 16px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.3)'}}>Trust Landmarks Achieved</h2>
          <p className="font-sans" style={{color:'#000000',fontWeight:800,fontSize:'16px',textShadow:'0 1px 4px rgba(255,255,255,0.5)'}}>Read how real C-suite delegates mastered every dimension of strategic communication — written, spoken, digital, and interpersonal.</p>
        </div>

        {/* 3-Column Grid of flat, high-border-radius portrait landmark photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[
            { 
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=450", 
              name: "Ramya", 
              role: "MD, Trans-Global Logis", 
              badge: "Completed 21-day streak", 
              desc: "Written, verbal, and interpersonal communication signals reached clean absolute parity."
            },
            { 
              img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=450", 
              name: "Maya", 
              role: "Securities Counsel", 
              badge: "87% Improved consistency", 
              desc: "Successfully sieved out defensive corporate passive filler terminology." 
            },
            { 
              img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=450", 
              name: "Daniel", 
              role: "Social Responsibility Dir", 
              badge: "Hit daily focus: 10 Days", 
              desc: "CSR reports structured rigorously around verified rhetorical facts." 
            }
          ].map((card, idx) => (
            <div 
              key={idx} 
              id={`achievement-card-${idx}`}
              onMouseEnter={() => playBeep(500 + idx*150, 'sine', 0.05)}
              className="h-[380px] rounded-[24px] overflow-hidden relative group cursor-pointer flex flex-col justify-end p-6.5 select-none shadow-2xl transition-all duration-500 hover:scale-102 hover:-translate-y-1.5"
            >
              {/* Image background with zoom scale */}
              <img 
                src={card.img} 
                alt={card.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              {/* Sleek shadow gradient overlay for text legibility */}
              <div className="absolute inset-0 landmark-gradient-overlay bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent transition-opacity duration-300 group-hover:via-slate-950/60" />

              {/* Text overlays with premium motion slide-up */}
              <div className="relative z-10 text-left space-y-2.5 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="font-sans text-[8.5px] bg-[#e8601c] text-white px-3.5 py-1.5 rounded-full uppercase font-black tracking-widest leading-none shadow-lg">
                  {card.badge}
                </span>
                
                <div>
                  <h4 className="text-xl font-black leading-tight">{card.name}</h4>
                  <p className="text-[11px] text-slate-300 leading-none mt-1 font-medium italic">{card.role}</p>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1.5">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 9. GIANT REAL HABITS ANIMATED COUNTERS SECTION (OFF-WHITE bg) ==================== */}
      <section id="epic-numbers" className="relative z-10 py-10 bg-[#f5f5f5] text-slate-900 rounded-[28px] px-6 md:px-12 text-center space-y-8 shadow-lg border border-slate-200">
        
        {/* Consistent Eyebrow Label Pill */}
        <div className="max-w-xl mx-auto space-y-2 my-2">
          <span className="inline-block px-3.5 py-1.5 bg-slate-900/5 border border-slate-900/10 rounded-full text-[9px] font-sans text-orange-555 font-bold uppercase tracking-widest">
            Real habits, real numbers
          </span>
          <h3 className="text-3xl md:text-5xl font-sans font-black tracking-tight leading-none text-slate-950 mt-1">
            Real Communication. Verifiable Results.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { num: "400+", label: "Cumulative Years of Experience", sub: "Combined expertise across our faculty and industry practitioners." },
            { num: "3000+", label: "Students Already Benefited", sub: "Professionals and students who have transformed their communication skills." },
            { num: "14+", label: "International Footprints", sub: "Connecting local academies with overseas corporate advisors." }
          ].map((st, i) => (
            <div key={i} id={`live-stat-${i}`} className="space-y-1.5 text-center transition-all duration-300 hover:scale-104 cursor-default">
              <span className="text-4xl sm:text-5xl md:text-[38px] lg:text-[54px] xl:text-[72px] font-sans font-black text-[#e8601c] block leading-none tracking-tight transform hover:skew-x-2 transition-transform duration-300 select-all font-sans">
                {st.num}
              </span>
              <h4 className="text-xs md:text-sm font-sans font-black uppercase tracking-widest text-slate-900 mt-3 pt-2 border-t border-slate-200">
                {st.label}
              </h4>
              <p className="text-xs text-slate-600 font-medium font-sans">
                {st.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 10. TESTIMONIAL MASONRY SECTION (OFF-WHITE bg) ==================== */}
      <section id="masonry-testimonials" className="relative z-10 space-y-8 rounded-[28px] py-10 px-4 md:px-8" style={{background:'transparent'}}>

        {/* Eyebrow Label Pill */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest leading-none" style={{background:'rgba(255,255,255,0.2)',border:'1px solid rgba(232,96,28,0.4)',color:'#000000'}}>
            Real experts, real outcomes
          </span>
          <h2 className="font-black font-sans tracking-tight" style={{color:'#000000',fontSize:'clamp(2.5rem,6vw,4rem)',lineHeight:1.05,textShadow:'0 1px 2px rgba(0,0,0,0.12), 0 4px 16px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.3)'}}>Voice of Strategic Communicators</h2>
          <p className="font-sans" style={{color:'#000000',fontWeight:800,fontSize:'16px',textShadow:'0 1px 4px rgba(255,255,255,0.5)'}}>Read verified dispatch notes written directly by program delegates.</p>
        </div>

        {/* Testimonial masonry items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pt-4">
          {testimonials.map((test) => (
            <div
              key={test.id}
              id={`testi-masonry-${test.id}`}
              onMouseEnter={() => {
                setSelectedReviewer(test.id);
                playBeep(320 + test.id*70, 'triangle', 0.04);
              }}
              onMouseLeave={() => setSelectedReviewer(null)}
              className="p-6 md:p-8 rounded-[24px] relative flex flex-col justify-between space-y-6 text-left transition-all duration-300"
              style={selectedReviewer === test.id
                ? {background:'rgba(255,255,255,0.7)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'2px solid #f97316',boxShadow:'0 0 0 4px rgba(249,115,22,0.15)',transform:'translateY(-4px) scale(1.02)'}
                : {background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.4)',boxShadow:'0 6px 30px rgba(0,0,0,0.1)'}
              }
            >
              <Quote className="w-8 h-8 absolute top-5 left-5" style={{color:'rgba(0,0,0,0.05)'}} />

              {/* Dialogue teaser */}
              <div className="space-y-2 pb-3" style={{borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                <div className="flex justify-end">
                  <span className="text-[10px] font-sans px-3 py-1.5 rounded-full rounded-tr-none italic" style={{background:'rgba(0,0,0,0.08)',color:'#000000',fontWeight:600}}>
                    "Does T-SOC actually make a difference?"
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img className="w-5 h-5 rounded-full object-cover shrink-0" src={test.avatar} alt={test.author} />
                  <span className="text-[10px] font-sans px-3 py-1.5 rounded-full rounded-tl-none italic" style={{background:'rgba(232,96,28,0.15)',border:'1px solid rgba(232,96,28,0.3)',color:'#c2410c',fontWeight:700}}>
                    "Here's what I found..."
                  </span>
                </div>
              </div>

              <blockquote className="text-xs sm:text-[13px] font-sans italic font-semibold leading-relaxed pt-2.5" style={{color:'#000000'}}>
                "{test.quote}"
              </blockquote>

              <div className="flex items-center gap-3.5 pt-4" style={{borderTop:'1px solid rgba(0,0,0,0.1)'}}>
                <img className="w-10 h-10 rounded-full object-cover shrink-0 shadow-md border" src={test.avatar} alt={test.author} />
                <div className="leading-snug">
                  <h4 className="text-xs font-black" style={{color:'#000000'}}>{test.author}</h4>
                  <p className="text-[9.5px] font-mono uppercase font-black leading-none mt-1.5 tracking-wider" style={{color:'#0f172a'}}>{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6 text-center">
          <button
            id="btn-view-reviews-pill"
            onClick={() => {
              triggerCalibrateMelody();
              handleNav('/insights');
            }}
            className="inline-flex hover:bg-orange-600 hover:text-white font-sans text-xs font-black px-10 py-4 rounded-full transition-all cursor-pointer uppercase shadow-lg tracking-widest hover:scale-102 active:scale-[0.98]"
            style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',color:'#000000',border:'2px solid rgba(0,0,0,0.15)'}}
          >
            View all Reviews
          </button>
        </div>
      </section>

      {/* ==================== 11. FAQ ACCORDION SECTION ==================== */}
      <section id="faq-accordions" className="relative z-10 space-y-8 py-10 px-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {/* Eyebrow Label Pill */}
          <span className="inline-block px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-sans text-slate-400 font-bold uppercase tracking-widest leading-none">
            Clear answers, direct support
          </span>
          <h2 className="font-black font-sans tracking-tight leading-none mt-1" style={{color:'#000000',fontSize:'clamp(2.5rem,6vw,4rem)',textShadow:'0 1px 2px rgba(0,0,0,0.12), 0 4px 16px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.3)'}}>Frequently Vetted Inquiries</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left panel: FAQ accordions */}
          <div className="lg:col-span-8 space-y-4">
            {/* Chat FAQ */}
            {(() => {
              return (
                <div className="space-y-3">
                  {/* Question chips */}
                  <div className="flex flex-wrap gap-2 pb-2">
                    {faqs.map((faq, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setActiveFaqChat(index);
                          playBeep(440, 'sine', 0.05);
                        }}
                        className="text-[11px] font-mono font-bold px-4 py-2 rounded-full border transition-all cursor-pointer"
                        style={activeFaqChat === index
                          ? {background:'#e8601c',borderColor:'#e8601c',color:'#ffffff',boxShadow:'0 4px 14px rgba(232,96,28,0.35)'}
                          : {background:'rgba(255,255,255,0.85)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',borderColor:'rgba(0,0,0,0.15)',color:'#0f172a'}
                        }
                      >
                        {faq.q.length > 45 ? faq.q.substring(0, 45) + '…' : faq.q}
                      </button>
                    ))}
                  </div>

                  {/* Chat bubbles */}
                  {activeFaqChat !== null && (
                    <div className="space-y-3 animate-fade-in-up">
                      {/* User question bubble */}
                      <div className="flex justify-end">
                        <div className="bg-orange-500/10 border border-orange-500/20 text-slate-200 text-xs font-sans px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed">
                          {faqs[activeFaqChat].q}
                        </div>
                      </div>
                      {/* T-SOC response bubble */}
                      <div className="flex justify-start gap-3 items-start">
                        <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-teal-900/40" style={{minWidth:'2.25rem'}}>
                          <span className="text-white text-[10px] font-black font-mono leading-none">TS</span>
                        </div>
                        <div className="bg-[#080d19]/90 border border-white/10 text-slate-300 text-xs font-sans px-5 py-3.5 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed">
                          {faqs[activeFaqChat].a}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Right panel: Support card escape hatch */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0c101c] to-[#030712] border border-white/10 p-7 rounded-[28px] text-left space-y-5 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-28 h-28 bg-[#e8601c]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3">
              <span className="font-mono text-[8.5px] text-teal-400 font-black block uppercase tracking-widest">// ASSIST CORE</span>
              <h4 className="text-base font-extrabold text-white leading-tight">Can't find your strategic answer?</h4>
              <p className="text-[11px] leading-relaxed text-slate-400 font-sans font-medium">
                Our executive dean and senior communication specialists coordinate directly with active C-suite boards.
              </p>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-2 text-xs text-slate-400 pr-2">
              <p className="font-mono text-[9px] text-[#e8601c] font-black uppercase block leading-none mb-2 tracking-widest">// RESPONSE REGISTRY ENVELOPE</p>
              <p>Hotline Support: <a href="tel:9278075130" className="text-white hover:text-orange-500 font-bold inline-block ml-1 transition-colors">9278075130</a></p>
              <p>Physical Office: <a href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009" target="_blank" rel="noopener noreferrer" className="text-[#e8601c] hover:text-white font-extrabold inline-block ml-1 transition-colors">Regency Park 2, Gurgaon</a></p>
            </div>

            <button 
              id="btn-dispatcher"
              onClick={() => {
                triggerCalibrateMelody();
                handleNav('/contact');
              }}
              className="w-full bg-[#f5f5f5] md:hover:bg-orange-600 text-slate-900 md:hover:text-white font-sans text-[10.5px] font-black uppercase py-4 rounded-full transition-colors text-center cursor-pointer tracking-wider"
            >
              Contact Dispatch Desk
            </button>
          </div>

        </div>
      </section>

      {/* ==================== 12. FINAL CTA / APP DOWNLOADS SECTION ==================== */}
      <section id="final-downloads-cta" className="bg-[#080d19]/90 p-8 md:p-16 rounded-[28px] border border-white/5 text-center space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-48 h-48 bg-[#ea580c]/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-44 h-44 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left panel: Heading and Dual app download CTAs */}
          <div className="md:col-span-7 text-left space-y-7">
            <div className="space-y-3.5">
              <span className="font-mono text-[10px] text-[#e8601c] font-black block tracking-widest uppercase leading-none">// CALIBRATION ENVELOPE</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.1] font-sans">
                Ready to communicate with sovereign authority?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg font-sans font-medium">
                Register your target communications project today. Our regional council will initiate a full-spectrum communication diagnostic — written, verbal, digital, and interpersonal — within 24 working hours.
              </p>
            </div>


            <div className="text-[10.5px] font-sans text-slate-500 space-y-1 pr-6 leading-relaxed border-t border-white/5 pt-4">
              <p>Academy campus: <a href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-orange-500 transition-colors font-bold">Regency Park 2, DLF Phase 4, Gurgaon 122009.</a></p>
              <p>Regional Board Hotline: <a href="tel:9278075130" className="text-[#e8601c] hover:text-white transition-colors font-extrabold">9278075130</a></p>
            </div>
          </div>

          {/* Right panel: Phone mockup card with perspective tilt */}
          <div className="md:col-span-5 flex justify-center relative min-h-[240px]">
            <div className="absolute right-[-10%] top-0 w-72 h-72 bg-[#e8601c]/10 rounded-full blur-[100px]" />
            <div id="phone-mockup-bottom" className="w-[250px] h-[360px] bg-[#030712] border-4 border-slate-800 rounded-[34px] p-5.5 text-left font-mono relative overflow-hidden shadow-2xl transform rotate-3 hover:rotate-1 hover:scale-103 transition-all z-10 select-none border-b-8">
              
              <div className="flex justify-between items-start mb-6 pb-2.5 border-b border-white/5">
                <span className="text-[7.5px] text-orange-500 font-black uppercase tracking-wider leading-none">// ACCREDITATION REPORT</span>
                <span className="text-[6.5px] px-1.5 bg-teal-950 text-teal-300 rounded border border-teal-500/30 font-bold uppercase leading-none">SECURE</span>
              </div>

              <div className="space-y-4 font-sans">
                <div className="space-y-1">
                  <span className="font-mono text-[7px] text-slate-500 uppercase font-black tracking-wider leading-none">BOARDROOM DELEGATE</span>
                  <div className="text-sm font-black text-white leading-none">Priti Goel</div>
                  <div className="text-[8px] text-slate-450 leading-none mt-1">VP Corporate Insights, Agritech Ltd</div>
                </div>

                <div className="p-4 bg-slate-950/80 border border-white/10 rounded-2xl text-[8.5px] space-y-2 text-slate-305 telemetry-dark-card">
                  <span className="font-mono block text-[#0d9488] text-[7.5px] uppercase font-bold leading-none">// TELEMETRY VERIFIED</span>
                  <p className="leading-relaxed font-bold text-slate-300">
                    98.4% Credibility scale indices secured securely within Gautam Nagar residential facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
