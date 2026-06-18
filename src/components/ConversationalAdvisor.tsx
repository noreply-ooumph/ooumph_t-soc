import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ChevronRight } from 'lucide-react';

type Message = {
  from: 'advisor' | 'user';
  text: string;
};

const GREETING =
  "Hi! I'm the T-SOC admissions advisor. What would you like to know about our programmes?";

const CHIPS = [
  'Programme fees',
  'Next intake dates',
  'Who is this for?',
  'How to apply',
] as const;

type Chip = (typeof CHIPS)[number];

const CANNED: Record<Chip, string> = {
  'Programme fees':
    'Our programmes range from ₹45,000 (2-week intensive) to ₹2,40,000 (12-month elite track). All fees include GST, lab access, and certification. You can view full details on our Checkout Desk.',
  'Next intake dates':
    'We run rolling intakes throughout the year. Certificate programmes begin on the 1st of each month. Intensive workshops run every 3 weeks. Contact our registrar at 9278075130 to confirm your preferred slot.',
  'Who is this for?':
    'T-SOC programmes are designed for corporate executives, founders, diplomats, legal counsels, and senior professionals who need to communicate with authority in high-stakes environments.',
  'How to apply':
    'Simply fill out our Admissions Form — it takes under 3 minutes. Our council reviews credentials within 48 hours and sends a formal intake confirmation to your registered email.',
};

export default function ConversationalAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'advisor', text: GREETING },
  ]);
  const [showChips, setShowChips] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  function handleChip(chip: Chip) {
    setShowChips(false);
    setMessages((prev) => [...prev, { from: 'user', text: chip }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'advisor', text: CANNED[chip] },
      ]);
    }, 600);
  }

  function handleReset() {
    setMessages([{ from: 'advisor', text: GREETING }]);
    setShowChips(true);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="w-[calc(100vw-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-teal-600">
              <span className="text-white font-semibold text-sm tracking-wide">
                T-SOC Advisor
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close advisor"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 px-4 py-4 max-h-72 overflow-y-auto">
              {messages.map((msg, i) =>
                msg.from === 'advisor' ? (
                  <div key={i} className="flex items-start gap-2">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px] font-bold mt-0.5">
                      TS
                    </div>
                    <div className="bg-slate-100 text-slate-800 text-sm rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <div className="bg-teal-600 text-white text-sm rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%] leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                )
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick-reply chips */}
            <AnimatePresence>
              {showChips && (
                <motion.div
                  key="chips"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleChip(chip)}
                        className="flex items-center gap-1 text-xs font-medium text-teal-700 border border-teal-300 bg-teal-50 hover:bg-teal-100 rounded-full px-3 py-1.5 transition-colors"
                      >
                        {chip}
                        <ChevronRight size={12} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ask another question */}
            <AnimatePresence>
              {!showChips && (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4"
                >
                  <button
                    onClick={handleReset}
                    className="w-full text-xs font-medium text-teal-700 border border-teal-300 bg-teal-50 hover:bg-teal-100 rounded-full px-3 py-2 transition-colors"
                  >
                    Ask another question
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-teal-600 text-white shadow-xl flex items-center justify-center hover:bg-teal-700 transition-colors"
        aria-label="Open T-SOC advisor"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}
