import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  QrCode, 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  Printer, 
  Mail, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle,
  FileCheck,
  Building2,
  Lock,
  Globe,
  Loader2,
  ChevronRight,
  ArrowLeft,
  Smartphone,
  PhoneCall
} from 'lucide-react';

interface PaymentDeskProps {
  onNavigate?: (path: string) => void;
  initialItem?: string;
}

const receiptContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    }
  }
};

const receiptItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 22 }
  }
};

interface FeeItem {
  id: string;
  name: string;
  duration: string;
  basePrice: number; // in INR
  category: string;
}

export default function PaymentDesk({ onNavigate, initialItem }: PaymentDeskProps) {
  // Available billing plans / items
  const feeItems: FeeItem[] = [
    { id: 'vetting-fee', name: 'Admission Vetting & Registration Package', duration: 'Vetting Phase Only', basePrice: 5000, category: 'Administrative' },
    { id: 'crisis-2w', name: 'Strategic Crisis Messaging Boot Camp', duration: '2 Weeks Intensive', basePrice: 45000, category: 'Short-term Track' },
    { id: 'certificate-2m', name: 'Professional Communications Loop', duration: '2 Months Certificate', basePrice: 85000, category: 'Certificate Track' },
    { id: 'certificate-3m', name: 'Executive Leadership Dialogue Run', duration: '3 Months Certificate', basePrice: 120000, category: 'Certificate Track' },
    { id: 'boardroom-12m', name: 'Boardroom Communication Dynamics Elite', duration: '12 Months Seat Reservation Deposit', basePrice: 240000, category: 'Elite Executive Track' },
    { id: 'custom-corporate', name: 'Bespoke Corporate Advisory Deposit', duration: 'As Commissioned', basePrice: 154000, category: 'Custom Program' }
  ];

  // Selected payment item state
  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialItem || feeItems[0].id
  );

  // Form details state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [corporateGST, setCorporateGST] = useState('');
  const [taxInvoiceAgreement, setTaxInvoiceAgreement] = useState(true);

  // Tabs for payment option: 'phonepe' | 'card' | 'upi' | 'netbank'
  const [paymentOption, setPaymentOption] = useState<'phonepe' | 'card' | 'upi' | 'netbank'>('phonepe');

  // PhonePe URL Callback parser
  useEffect(() => {
    try {
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        const status = params.get('status');
        const txnId = params.get('txnId');
        
        if (status && txnId) {
          console.log("[PhonePe Callback Loaded] Extracting payment feedback:", status, txnId);
          const parsedItemId = params.get('itemId') || '';
          const parsedAmount = Number(params.get('amount') || '5000');
          const matchedItem = feeItems.find(item => item.id === parsedItemId) || feeItems[0];
          
          const matchedBaseAmount = Math.round(parsedAmount / 1.18);
          const matchedCgst = Math.round(matchedBaseAmount * 0.09);
          const matchedSgst = Math.round(matchedBaseAmount * 0.09);

          const receiptData = {
            transactionId: txnId,
            invoiceNumber: 'TSOC-DEL-2026-' + Math.floor(2000 + Math.random() * 7999),
            timestamp: new Date().toISOString(),
            paymentMethod: "PhonePe Sandbox Gateway Check",
            feesDetails: matchedItem,
            billingDetails: {
              fullName: params.get('name') ? decodeURIComponent(params.get('name')!) : 'Sarthak Dwivedi',
              email: params.get('email') ? decodeURIComponent(params.get('email')!) : 'communications@paramount.in',
              phone: params.get('phone') ? decodeURIComponent(params.get('phone')!) : '9812345678',
              corporateGST: 'N/A'
            },
            financials: {
              base: matchedBaseAmount,
              cgst: matchedCgst,
              sgst: matchedSgst,
              total: parsedAmount
            }
          };

          setReceiptRecord(receiptData);
          setCheckoutStage('receipt');
          if (parsedItemId) {
            setSelectedItemId(parsedItemId);
          }
          sendEmailReceipt(receiptData);
          
          // Clear query string from URL browser history safely to keep interface clean
          const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        }
      }
    } catch (e) {
      console.error("[PhonePe Client] URL parsing error:", e);
    }
  }, []);

  // Interactive Card widget elements
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardFocusedField, setCardFocusedField] = useState<'front' | 'back'>('front');

  // Net banking items
  const banksList = [
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
    { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
    { id: 'sbi', name: 'State Bank of India', code: 'SBI' },
    { id: 'axis', name: 'Axis Bank', code: 'AXIS' }
  ];
  const [selectedBank, setSelectedBank] = useState('hdfc');

  // UPI configuration
  const [selectedUPIApp, setSelectedUPIApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [upiStatusText, setUpiStatusText] = useState('Awaiting scanner signal...');
  const [upiConfirmPercent, setUpiConfirmPercent] = useState(0);

  // Execution states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptRecord, setReceiptRecord] = useState<any | null>(null);
  const [checkoutStage, setCheckoutStage] = useState<'fill' | 'receipt'>('fill');
  const [emailSendStatus, setEmailSendStatus] = useState<string>(''); // '', 'sending', 'sent', 'failed'
  const [emailFeedbackMsg, setEmailFeedbackMsg] = useState<string>('');

  // Get pricing calculations
  const currentItem = feeItems.find(item => item.id === selectedItemId) || feeItems[0];
  const baseAmount = currentItem.basePrice;
  // Indian institutional service tax at 18% GST (CGST 9% + SGST 9%)
  const cgstAmount = Math.round(baseAmount * 0.09);
  const sgstAmount = Math.round(baseAmount * 0.09);
  const grandTotal = baseAmount + cgstAmount + sgstAmount;

  // Sync initial param if supplied
  useEffect(() => {
    if (initialItem && feeItems.some(i => i.id === initialItem)) {
      setSelectedItemId(initialItem);
    }
  }, [initialItem]);

  const sendEmailReceipt = async (receiptData: any) => {
    if (!receiptData) return;
    setEmailSendStatus('sending');
    setEmailFeedbackMsg('Sending official tax invoice and registration receipt to your email...');
    try {
      const res = await fetch('/api/phonepe/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptData)
      });
      const data = await res.json();
      if (data.success) {
        setEmailSendStatus('sent');
        setEmailFeedbackMsg(`Successfully dispatched official invoice to ${receiptData.billingDetails?.email}.`);
      } else {
        setEmailSendStatus('failed');
        setEmailFeedbackMsg(data.error || 'Failed to dispatch email.');
      }
    } catch (e) {
      console.error('[Invoice Delivery] Connection failure:', e);
      setEmailSendStatus('failed');
      setEmailFeedbackMsg('Connection to billing server timed out.');
    }
  };

  // Card formatting helpers
  const handleCardNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // format as 4-4-4-4
    const rawValue = e.target.value.replace(/\D/g, '');
    const formatted = rawValue.substring(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    let formatted = rawValue;
    if (rawValue.length > 2) {
      formatted = rawValue.substring(0, 2) + '/' + rawValue.substring(2, 4);
    }
    setCardExpiry(formatted);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setCardCVV(rawValue.substring(0, 4));
  };

  // Card vendor detector
  const getCardVendor = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^(508[5-9]|652[1-2]|607)/.test(clean)) return 'RuPay';
    if (/^3[47]/.test(clean)) return 'American Express';
    return 'Debit Card';
  };

  // Simple Luhn check for card numbers
  const isLuhnValid = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (clean.length < 13) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Reset UPI state when payment option changes
  useEffect(() => {
    setUpiConfirmPercent(0);
    setUpiStatusText('Awaiting scanner signal...');
  }, [paymentOption]);

  // Manual UPI scan confirmation — called by the "I have paid" button
  const handleUpiConfirm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full primary name is required for credential auditing.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid corporate email alignment coordinate required.';
    if (!phone.trim() || phone.length < 8) newErrors.phone = 'Corporate registrar routing phone number required.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setUpiStatusText('Payment confirmed. Proceed to complete enrollment.');
    setUpiConfirmPercent(100);
  };

  // Main submission and gateway validation
  const handlePaymentInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    // Validate personal coordinates
    if (!fullName.trim()) {
      newErrors.fullName = 'Full primary name is required for credential auditing.';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid corporate email alignment coordinate required.';
    }
    if (!phone.trim() || phone.length < 8) {
      newErrors.phone = 'Corporate registrar routing phone number required.';
    }

    // Handlers depending on method chosen
    if (paymentOption === 'card') {
      const cleanCard = cardNumber.replace(/\D/g, '');
      if (cleanCard.length < 15 || cleanCard.length > 16) {
        newErrors.cardNumber = 'Provide standard Visa, Mastercard or RuPay credit card sequence.';
      } else if (!isLuhnValid(cleanCard)) {
        newErrors.cardNumber = 'Valid Luhn verification check failed. Please audit card numbers.';
      }

      if (!cardHolder.trim()) {
        newErrors.cardHolder = 'Account holder coordinates are required.';
      }

      const expiryParts = cardExpiry.split('/');
      if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
        newErrors.cardExpiry = 'Verify date metrics formatting (MM/YY).';
      } else {
        const month = parseInt(expiryParts[0], 10);
        const year = parseInt(expiryParts[1], 10);
        if (month < 1 || month > 12) {
          newErrors.cardExpiry = 'Specified academic calendar month is out of range.';
        }
      }

      if (cardCVV.length < 3) {
        newErrors.cardCVV = 'Require certified dynamic card verification code.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (paymentOption === 'phonepe') {
      setIsProcessing(true);
      fetch('/api/phonepe/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: grandTotal,
          fullName,
          email,
          phone,
          itemId: selectedItemId,
          itemName: currentItem.name
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('Gateway connection rejected by sandbox network');
        return res.json();
      })
      .then(data => {
        if (data.redirectUrl) {
          console.log("[PhonePe Client] Navigating customer to UAT page location:", data.redirectUrl);
          window.location.href = data.redirectUrl;
        } else {
          throw new Error('Gateway yielded invalid redirect state format');
        }
      })
      .catch(err => {
        console.error("[PhonePe Client] Redirect initialization failed:", err);
        setErrors({ form: err.message || 'Failure establishing a secure session with PhonePe preprod' });
        setIsProcessing(false);
      });
      return;
    }

    // Trigger loader
    setIsProcessing(true);

    setTimeout(() => {
      // Complete transaction mock
      const finalTxnId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000) + '-IND';
      const taxInvoiceNo = 'TSOC-DEL-2026-' + Math.floor(2000 + Math.random() * 7999);
      
      const receiptData = {
        transactionId: finalTxnId,
        invoiceNumber: taxInvoiceNo,
        timestamp: new Date().toISOString(),
        paymentMethod: paymentOption === 'card' 
          ? `Credit Card (${getCardVendor(cardNumber)} *${cardNumber.slice(-4)})`
          : paymentOption === 'upi' ? `Unified UPI via ${selectedUPIApp.toUpperCase()}`
          : `Net Banking via ${banksList.find(b => b.id === selectedBank)?.name}`,
        feesDetails: currentItem,
        billingDetails: {
          fullName,
          email,
          phone,
          corporateGST: corporateGST.trim() || 'N/A'
        },
        financials: {
          base: baseAmount,
          cgst: cgstAmount,
          sgst: sgstAmount,
          total: grandTotal
        }
      };

      setReceiptRecord(receiptData);
      setIsProcessing(false);
      setCheckoutStage('receipt');
      sendEmailReceipt(receiptData);

      // Persist payment to backend
      fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: finalTxnId,
          invoiceNumber: taxInvoiceNo,
          paymentMethod: receiptData.paymentMethod,
          fullName,
          email,
          phone,
          corporateGST: corporateGST.trim() || 'N/A',
          itemId: selectedItemId,
          itemName: currentItem.name,
          baseAmount,
          cgst: cgstAmount,
          sgst: sgstAmount,
          totalAmount: grandTotal,
          status: 'success'
        })
      }).catch(err => console.error('[Payment Save] Failed:', err));
    }, 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const triggerEmailSimulation = () => {
    if (receiptRecord) {
      sendEmailReceipt(receiptRecord);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id="payment-portal-root"
      className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-slate-900 space-y-10 font-sans print:py-0 print:max-w-full"
    >
      {/* Header and secure branding line */}
      <div className="border-b border-rose-500/10 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 print:hidden">
        <div>
          <span className="text-[10px] font-mono text-teal-500 block font-bold uppercase tracking-widest animate-pulse-slow">
            // METRIC DESK // SECURITY ENVELOPE SHIELD ONLINE
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1 font-sans">
            Registrar Payment <span className="text-teal-600">Portal Desk</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl leading-relaxed">
            Settle official administrative fees, certificate run loop tuition, or C-suite customized program deposits. Transactions are audited securely under central Delhi territorial jurisdiction.
          </p>
        </div>

        {/* Back and help utility link */}
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => onNavigate && onNavigate('/admissions')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-mono transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Return to Admissions</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {checkoutStage === 'fill' ? (
          <div key="pay-step-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT INPUTS COLUMN (7/12 cols) */}
            <form onSubmit={handlePaymentInitiate} id="registrar-checkout-form" className="lg:col-span-7 space-y-6">
              
              {/* Product selector block */}
              <div id="payment-items-container" className="bg-white p-5 rounded-lg border border-teal-500/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                      01. SECURE ACADEMIC SELECTION
                    </span>
                  </div>
                  <Building className="w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-3">
                  <label htmlFor="academic-item-select" className="block text-[10px] font-mono text-slate-550 uppercase tracking-wider font-bold">
                    Item / Syllabus Run Loop to Finance
                  </label>
                  <select
                    id="academic-item-select"
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className="w-full text-xs font-sans px-3 py-2.5 bg-white border border-slate-300 rounded focus:border-teal-550 focus:outline-none focus:ring-1 focus:ring-teal-500/20 text-slate-900 transition-all font-semibold"
                  >
                    {feeItems.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.duration}) — ₹{item.basePrice.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Micro bento recap of item */}
                <div className="p-3 bg-slate-50 rounded border border-slate-150 flex items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">FEES CATEGORY //</span>
                    <span className="text-teal-600 font-bold">{currentItem.category}</span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">ESTIMATED RUN //</span>
                    <span className="text-slate-700 font-bold">{currentItem.duration}</span>
                  </div>
                </div>
              </div>

              {/* Billing Info block */}
              <div id="billing-info-container" className="bg-white p-5 rounded-lg border border-teal-500/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                      02. EXECUTIVE BILLING DETAILS
                    </span>
                  </div>
                  <FileCheck className="w-4 h-4 text-slate-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="payer-fullname-input" className="block text-[10px] font-mono text-slate-550 uppercase tracking-wider font-bold">
                      Designated Registrant Name *
                    </label>
                    <input 
                      id="payer-fullname-input"
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarthak Dwivedi"
                      className={`w-full text-xs font-sans px-3.5 py-2 bg-white border rounded focus:outline-none ${
                        errors.fullName ? 'border-rose-400 ring-1 ring-rose-220' : 'border-slate-300'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="payer-email-input" className="block text-[10px] font-mono text-slate-550 uppercase tracking-wider font-bold">
                      Corporate Email *
                    </label>
                    <input 
                      id="payer-email-input"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. communications@paramount.in"
                      className={`w-full text-xs font-sans px-3.5 py-2 bg-white border rounded focus:outline-none ${
                        errors.email ? 'border-rose-400 ring-1 ring-rose-220' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="payer-phone-input" className="block text-[10px] font-mono text-slate-550 uppercase tracking-wider font-bold">
                      Admissions Phone Coordinate *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l font-mono">
                        +91
                      </span>
                      <input 
                        id="payer-phone-input"
                        type="text" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="e.g. 9812345678"
                        className={`w-full text-xs font-sans px-3.5 py-2 bg-white border rounded-r focus:outline-none ${
                          errors.phone ? 'border-rose-400 ring-1 ring-rose-220' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="payer-gst-input" className="block text-[10px] font-mono text-slate-550 uppercase tracking-wider font-bold">
                      Corporate Tax ID / GSTIN (Optional)
                    </label>
                    <input 
                      id="payer-gst-input"
                      type="text" 
                      value={corporateGST}
                      onChange={(e) => setCorporateGST(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                      placeholder="e.g. 07AAAAA1111A1Z1"
                      className="w-full text-xs font-sans px-3.5 py-2 bg-white border border-slate-300 rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods selector block */}
              <div id="payment-gateways-container" className="bg-white p-5 rounded-lg border border-teal-500/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                      03. DISCHARGE FEE PROTOCOL
                    </span>
                  </div>
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>

                {/* Sub Tab Navigation for methods */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-slate-150 rounded" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={paymentOption === 'phonepe'}
                    onClick={() => setPaymentOption('phonepe')}
                    className={`py-2 px-1 text-xs border rounded transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                      paymentOption === 'phonepe'
                        ? 'bg-purple-900 border-purple-850 text-white font-bold shadow-sm'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span>PhonePe Gateway</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={paymentOption === 'card'}
                    onClick={() => setPaymentOption('card')}
                    className={`py-2 px-1 text-xs border rounded transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                      paymentOption === 'card'
                        ? 'bg-white border-teal-400/20 text-teal-650 font-bold shadow-sm'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-teal-600" />
                    <span>Card Visa/RuPay</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={paymentOption === 'upi'}
                    onClick={() => setPaymentOption('upi')}
                    className={`py-2 px-1 text-xs border rounded transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                      paymentOption === 'upi'
                        ? 'bg-white border-teal-400/20 text-teal-650 font-bold shadow-sm'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-teal-600" />
                    <span>UPI Secure QR</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={paymentOption === 'netbank'}
                    onClick={() => setPaymentOption('netbank')}
                    className={`py-2 px-1 text-xs border rounded transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                      paymentOption === 'netbank'
                        ? 'bg-white border-teal-400/20 text-teal-650 font-bold shadow-sm'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Active Sub Form Panel content */}
                <div className="p-4 bg-slate-50 rounded border border-slate-150 min-h-[220px] flex flex-col justify-center">
                  
                  {/* Option 0: PhonePe Gateway */}
                  {paymentOption === 'phonepe' && (
                    <div id="phonepe-payment-subpanel" className="text-center space-y-4 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-3 py-1.5 bg-purple-100 border border-purple-200 text-purple-700 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                          <Smartphone className="w-3.5 h-3.5 text-purple-600 animate-bounce" />
                          <span>Official PhonePe Sandbox Checkout</span>
                        </span>
                      </div>
                      
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="text-sm font-black text-slate-900 tracking-tight">Standard Payment Redirect Entryway</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          Securely integrated using sandbox parameters. Validated with standard SHA256 base64 transaction logging.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded border border-slate-200 text-left font-mono space-y-1 text-[10.5px] max-w-sm mx-auto shadow-sm">
                        <div className="flex justify-between border-b border-slate-100 pb-1.5 mb-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>PhonePe Keys Mounted</span>
                          <span className="text-purple-600 font-bold">Active UAT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Merchant ID:</span>
                          <span className="text-slate-800 font-bold">PGTESTPAYUAT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Salt Key Base:</span>
                          <span className="text-slate-850 font-bold">...debaab3b6d89</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Salt Index:</span>
                          <span className="text-slate-800 font-bold">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Environment:</span>
                          <span className="text-purple-650 font-extrabold uppercase">UAT SANDBOX</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-450 max-w-xs mx-auto leading-relaxed">
                        Ready to trial. Clicking the execute payment button below triggers a secure post handshake redirection.
                      </p>
                    </div>
                  )}

                  {/* Option 1: Credit Card */}
                  {paymentOption === 'card' && (
                    <div id="credit-card-form-subpanel" className="space-y-4">
                      {/* Live aesthetic credit card preview layout widget */}
                      <div className="perspective-1000 hidden md:block">
                        <motion.div
                          animate={{ rotateY: cardFocusedField === 'back' ? 180 : 0 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-40 rounded-xl bg-gradient-to-br from-teal-800 via-teal-650 to-[#0f172a] text-white p-5 relative shadow-lg transform-style-3d overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_75%)] pointer-events-none" />
                          
                          {/* Card FRONT */}
                          <div className="absolute inset-0 p-5 backface-hidden flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5">
                                <span className="text-[8px] font-mono text-teal-300 block tracking-widest uppercase">// INTACT CORPORATE SECURE</span>
                                <span className="font-extrabold text-sm tracking-tight">T-SOC DELEGATE PLATINUM</span>
                              </div>
                              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/10 border border-white/20">
                                {getCardVendor(cardNumber)}
                              </span>
                            </div>

                            <div className="font-mono text-md tracking-widest text-teal-100 block py-1.5">
                              {cardNumber || '•••• •••• •••• ••••'}
                            </div>

                            <div className="flex justify-between items-end text-xs">
                              <div className="space-y-0.5 text-left">
                                <span className="text-[7px] text-teal-300 block font-mono">PRIMARY HOLDER //</span>
                                <span className="uppercase text-[11px] tracking-wide font-medium font-sans truncate max-w-[170px] block">
                                  {cardHolder || 'Sarthak Dwivedi'}
                                </span>
                              </div>
                              <div className="space-y-0.5 text-right font-mono">
                                <span className="text-[7px] text-teal-300 block">THR THROUGH //</span>
                                <span>{cardExpiry || 'MM/YY'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card BACK */}
                          <div className="absolute inset-0 p-4 bg-[#0a0f1c] backface-hidden flex flex-col justify-between rotateY-180">
                            <div className="w-full h-8 bg-slate-900 -mx-4 mt-2" />
                            <div className="flex justify-end pr-4 mt-2">
                              <div className="text-right space-y-1">
                                <span className="text-[8px] text-slate-400 block font-mono">VERIFICATION LOGS CVV2</span>
                                <div className="bg-white text-slate-900 px-3 py-1 font-mono text-xs text-right italic rounded w-16">
                                  {cardCVV || '•••'}
                                </div>
                              </div>
                            </div>
                            <p className="text-[6.5px] text-slate-500 font-mono text-center">
                              This authentic billing device coordinates with Delhi regional clearance systems. Discharging corporate fee limits.
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Card inputs */}
                      <div className="space-y-3 pt-2">
                        <div className="space-y-1">
                          <label htmlFor="card-number-input" className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                            Device Card Number *
                          </label>
                          <div className="relative">
                            <input 
                              id="card-number-input"
                              type="text" 
                              value={cardNumber}
                              onChange={handleCardNumChange}
                              onFocus={() => setCardFocusedField('front')}
                              placeholder="4111 2222 3333 4444"
                              className={`w-full text-xs font-mono px-3 py-2 bg-white border rounded focus:outline-none ${
                                errors.cardNumber ? 'border-rose-400' : 'border-slate-300'
                              }`}
                            />
                            <div className="absolute right-3 top-2.5 text-[9px] font-mono text-slate-400 font-bold">
                              {getCardVendor(cardNumber)}
                            </div>
                          </div>
                          {errors.cardNumber && <p className="text-[10px] text-rose-500 font-mono mt-0.5">{errors.cardNumber}</p>}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="card-holder-input" className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                            Cardholder Legal Name *
                          </label>
                          <input 
                            id="card-holder-input"
                            type="text" 
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            onFocus={() => setCardFocusedField('front')}
                            placeholder="SARTHAK DWIVEDI"
                            className={`w-full text-xs font-sans px-3 py-2 bg-white border rounded focus:outline-none uppercase ${
                              errors.cardHolder ? 'border-rose-400' : 'border-slate-300'
                            }`}
                          />
                          {errors.cardHolder && <p className="text-[10px] text-rose-500 font-mono mt-0.5">{errors.cardHolder}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="card-expiry-input" className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                              Expiry Date *
                            </label>
                            <input 
                              id="card-expiry-input"
                              type="text" 
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              onFocus={() => setCardFocusedField('front')}
                              placeholder="12/28"
                              className={`w-full text-xs font-mono px-3 py-2 bg-white border rounded focus:outline-none ${
                                errors.cardExpiry ? 'border-rose-400' : 'border-slate-300'
                              }`}
                            />
                            {errors.cardExpiry && <p className="text-[10px] text-rose-500 font-mono mt-0.5">{errors.cardExpiry}</p>}
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="card-cvv-input" className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                              Security Code (CVV) *
                            </label>
                            <input 
                              id="card-cvv-input"
                              type="password" 
                              value={cardCVV}
                              onChange={handleCVVChange}
                              onFocus={() => setCardFocusedField('back')}
                              onBlur={() => setCardFocusedField('front')}
                              placeholder="•••"
                              className={`w-full text-xs font-mono px-3 py-2 bg-white border rounded focus:outline-none ${
                                errors.cardCVV ? 'border-rose-400' : 'border-slate-300'
                              }`}
                            />
                            {errors.cardCVV && <p className="text-[10px] text-rose-500 font-mono mt-0.5">{errors.cardCVV}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Option 2: UPI Apps with secure simulation QR */}
                  {paymentOption === 'upi' && (
                    <div id="upi-payment-subpanel" className="text-center space-y-4">
                      <span className="text-[9px] font-mono text-teal-600 block font-bold uppercase tracking-widest">// DELEGATED BHIM UPI DISCHARGE</span>
                      
                      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                        {(['gpay', 'phonepe', 'paytm', 'bhim'] as const).map(app => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setSelectedUPIApp(app)}
                            className={`p-1.5 text-[10px] font-mono border rounded transition-all capitalize cursor-pointer ${
                              selectedUPIApp === app 
                                ? 'bg-teal-50 border-teal-400/20 text-teal-600 font-bold' 
                                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {app === 'gpay' ? 'GPay' : app === 'phonepe' ? 'PhonePe' : app === 'paytm' ? 'Paytm' : 'BHIM'}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-center gap-5 pt-3">
                        {/* Dynamic Styled matrix mockuprepresenting QR code */}
                        <div className="p-2.5 bg-white border-2 border-slate-300 rounded shadow-sm relative shrink-0">
                          <svg className="w-28 h-28 text-slate-900" viewBox="0 0 100 100">
                            {/* Outer square trackers */}
                            <rect x="5" y="5" width="22" height="22" fill="currentColor" stroke="white" strokeWidth="2" />
                            <rect x="9" y="9" width="14" height="14" fill="white" />
                            <rect x="12" y="12" width="8" height="8" fill="currentColor" />

                            <rect x="73" y="5" width="22" height="22" fill="currentColor" stroke="white" strokeWidth="2" />
                            <rect x="77" y="9" width="14" height="14" fill="white" />
                            <rect x="80" y="12" width="8" height="8" fill="currentColor" />

                            <rect x="5" y="73" width="22" height="22" fill="currentColor" stroke="white" strokeWidth="2" />
                            <rect x="9" y="77" width="14" height="14" fill="white" />
                            <rect x="12" y="80" width="8" height="8" fill="currentColor" />

                            {/* Stylized QR matrix representation */}
                            <path d="M35,10 h5 v5 h-5 z M45,5 h10 v5 h-10 z M60,10 h8 v5 h-8 z M35,20 h8 v5 h-8 z M48,18 h5 v8 h-5 z M62,22 h8 v5 h-8 z" fill="currentColor"/>
                            <path d="M5,35 h5 v10 h-5 z M15,40 h12 v5 h-12 z M32,35 h15 v5 h-15 z M52,32 h8 v10 h-8 z M65,35 h15 v5 h-15 z M85,35 h10 v5 h-10 z" fill="currentColor" />
                            <path d="M5,50 h12 v5 h-12 z M22,52 h8 v8 h-8 z M35,48 h18 v5 h-18 z M60,50 h15 v5 h-15 z M80,48 h15 v7 h-15 z" fill="currentColor" />
                            <path d="M32,62 h12 v5 h-12 z M50,60 h10 v10 h-10 z M65,65 h12 v5 h-12 z M82,60 h12 v5 h-12 z" fill="currentColor" />
                            <path d="M35,78 h10 v5 h-10 z M48,74 h12 v5 h-12 z M65,76 h18 v5 h-18 z M88,74 h8 v10 h-8 z" fill="currentColor" />
                            <path d="M32,88 h8 v6 h-8 z M45,90 h15 v5 h-15 z M68,88 h10 v6 h-10 z M82,90 h12 v5 h-12 z" fill="currentColor" />
                            
                            {/* Inner Logo symbol */}
                            <rect x="42" y="42" width="16" height="16" fill="white" rx="3" />
                            <circle cx="50" cy="50" r="6" fill="#0d9488" />
                          </svg>
                          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <span className="text-[8px] font-mono font-bold text-slate-500 uppercase">UPI SCHEDULER</span>
                            <span className="text-[10px] font-bold text-teal-600 font-mono">admissions@tsoc</span>
                          </div>
                        </div>

                        {/* Scan context */}
                        <div className="space-y-2 text-left max-w-sm">
                          <p className="text-xs text-slate-700 leading-snug">
                            Open your preferred UPI mobile sandbox app, select <strong>Scan QR</strong>, and verify that the merchant specifies <strong>T-SOC Registrar Accounts</strong>.
                          </p>

                          {/* Scan confirmation */}
                          <div className="space-y-1.5 pt-1.5">
                            <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
                              <span>SCAN STATUS</span>
                              <span className={upiConfirmPercent === 100 ? 'text-teal-600' : 'text-slate-400'}>{upiConfirmPercent === 100 ? '✓ CONFIRMED' : 'PENDING'}</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1 rounded overflow-hidden">
                              <motion.div
                                className="bg-teal-500 h-full"
                                animate={{ width: `${upiConfirmPercent}%` }}
                                transition={{ ease: 'easeOut' }}
                              />
                            </div>
                            <p className="text-[10px] font-mono text-teal-600 font-medium italic flex items-center gap-1">
                              {upiConfirmPercent === 100 ? <CheckCircle2 className="w-3 h-3" /> : <Loader2 className="w-3 h-3" />}
                              {upiStatusText}
                            </p>
                            {upiConfirmPercent < 100 && (
                              <button
                                type="button"
                                onClick={handleUpiConfirm}
                                className="mt-2 w-full bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-mono font-bold py-2 px-3 rounded transition-all cursor-pointer"
                              >
                                I HAVE SCANNED &amp; PAID — CONFIRM
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Option 3: Net Banking with selectors */}
                  {paymentOption === 'netbank' && (
                    <div id="netbank-payment-subpanel" className="space-y-4 text-center">
                      <span className="text-[9px] font-mono text-teal-600 block font-bold uppercase tracking-widest">// SECURED GATEWAY INTERFACE VIA NETBANKING</span>
                      
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                        {banksList.map(bank => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setSelectedBank(bank.id)}
                            className={`p-3 text-xs font-semibold border rounded transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                              selectedBank === bank.id 
                                ? 'bg-teal-50 border-teal-400/20 text-teal-650' 
                                : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100'
                            }`}
                          >
                            <span>{bank.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                              {bank.code}
                            </span>
                          </button>
                        ))}
                      </div>

                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed pt-2">
                        Upon finalizing checkout, you will be securely routed of T-SOC archives momentarily to authenticate credentials at the bank's sovereign terminal registry.
                      </p>
                    </div>
                  )}

                </div>

                {/* Agreement Check for GST documentation */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input 
                    id="checkbox-agreement"
                    type="checkbox" 
                    checked={taxInvoiceAgreement} 
                    onChange={(e) => setTaxInvoiceAgreement(e.target.checked)}
                    className="w-4 h-4 text-teal-600 mt-0.5 border-slate-300 focus:ring-teal-500 cursor-pointer rounded"
                  />
                  <label htmlFor="checkbox-agreement" className="text-[11px] text-slate-500 leading-snug cursor-pointer font-sans">
                    Issue corporate audit log. Establish that this registration discharge adheres strictly to Delhi taxation laws, with printable tax invoice receipts issued instantly upon vetting loop arrival.
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="submit"
                disabled={isProcessing || (paymentOption === 'upi' && upiConfirmPercent < 100)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-mono text-xs font-bold py-4 px-6 rounded shadow-md hover:shadow-teal-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>LODGING BILLING DISCHARGE TO GATEWAY...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>
                      {paymentOption === 'upi' && upiConfirmPercent < 100 
                        ? 'SCAN QR CODE ON THE RIGHT FIRST' 
                        : `EXECUTE SECURE ADMISSION CHECKOUT (₹${grandTotal.toLocaleString('en-IN')})`
                      }
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* RIGHT SUMMARY COLUMN (5/12 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Financial Recap Board */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-white p-6 rounded-lg border border-teal-500/10 shadow-sm space-y-5"
              >
                <div className="flex items-center gap-2 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-teal-600 animate-pulse" />
                  <span>// BILLING MATRIX RECAP</span>
                </div>

                <div className="space-y-3 font-sans pb-4 border-b border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">// SELECTED ACADEMIC COMPONENT</span>
                  <p className="font-extrabold text-[#0f172a] text-md leading-normal">
                    {currentItem.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Syllabus block: <span className="font-mono text-teal-600 font-semibold">{currentItem.duration}</span>
                  </p>
                </div>

                <div className="space-y-2 text-xs font-mono pt-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>BASE ACADEMIC FEE:</span>
                    <span className="font-bold text-slate-900">₹{baseAmount.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>9% SGST REGIONAL TAX:</span>
                    <span>₹{sgstAmount.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="flex justify-between pb-3.5 border-b border-dashed border-slate-200">
                    <span>9% CGST CENTRAL TAX:</span>
                    <span>₹{cgstAmount.toLocaleString('en-IN')}.00</span>
                  </div>
                  
                  <div className="flex justify-between items-end pt-3 text-slate-900">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">GRAND TOTAL DISCHARGE //</span>
                    <span className="text-xl font-sans font-black text-teal-650">
                      ₹{grandTotal.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded leading-relaxed text-[11px] text-slate-500 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Delhi Region Headquarters Vetting</span>
                  </div>
                  <p>
                    All registered credentials and registration receipts are legally validated within NCR central archives. Delhi territorial fees have flat SGST/CGST rates of 9% applied respectively.
                  </p>
                </div>
              </motion.div>

              {/* Integrity and contact desk fallback */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-teal-50/10 border border-slate-250 rounded-lg space-y-3.5 shadow-sm text-xs">
                <span className="text-[9px] font-mono text-teal-600 font-bold block uppercase tracking-widest">// DELEGATE ADVISORY</span>
                <p className="text-slate-500 leading-relaxed">
                  Experiencing corporate billing card clearance queries or corporate payment limit restrictions? Our Central Gautam Nagar Admissions Desk handles offline bank transfers and corporate check deposits securely.
                </p>
                <div className="pt-2 text-slate-700 font-bold space-y-1 md:space-y-1.5 font-mono text-[10.5px]">
                  <a 
                    href="tel:9278075130" 
                    className="flex items-center gap-1.5 hover:text-teal-600 transition-colors block"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span>Registrar Direct Helpline: 9278075130</span>
                  </a>
                  <p className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span>Academy Location: Noida Block-2 / Delhi Enclosure</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* DIGITAL TAX INVOICE RECEIPT (Success state) */
          <motion.div 
            key="success-receipt-screen"
            id="admissions-receipt-container"
            variants={receiptContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg border border-teal-500/20 shadow-2xl space-y-8 relative overflow-hidden print:border-0 print:shadow-none"
          >
            {/* Success ribbon and print header hide */}
            <div className="absolute top-0 right-0 left-0 h-[3.5px] bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 print:hidden" />
            
            {/* Visual Success Indicator Hero Block */}
            <motion.div variants={receiptItemVariants} className="text-center space-y-3 pb-6 border-b border-slate-100 print:hidden">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full mx-auto border border-emerald-400/25 shadow-lg shadow-emerald-400/5">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-sans mt-2">Registration Seat Secured</h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                "Payment integrated and processed!" Your course tuition credentials have been successfully lodged into T-SOC Delhi Registrar general archives. We have updated your admissions status.
              </p>
            </motion.div>

            {/* Email dispatch state telemetry without emoji */}
            {emailFeedbackMsg && (
              <motion.div 
                variants={receiptItemVariants}
                className={`p-4 rounded border text-xs font-mono leading-relaxed print:hidden flex items-center gap-3 ${
                  emailSendStatus === 'sending' ? 'bg-amber-50/70 text-amber-800 border-amber-200' :
                  emailSendStatus === 'sent' ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200' :
                  'bg-rose-50/70 text-rose-800 border-rose-250'
                }`}
              >
                {emailSendStatus === 'sending' && <Loader2 className="w-4 h-4 animate-spin text-amber-600" />}
                {emailSendStatus === 'sent' && <ShieldCheck className="w-4 h-4 text-emerald-600 animate-pulse" />}
                {emailSendStatus === 'failed' && <AlertCircle className="w-4 h-4 text-rose-600" />}
                <span>
                  <strong>Admissions dispatch:</strong> {emailFeedbackMsg}
                </span>
              </motion.div>
            )}

            {/* REAL PRINT TARGET (The Sovereign Delhi Tax Invoice) */}
            <motion.div variants={receiptItemVariants} id="print-tax-invoice-block" className="space-y-6 font-sans text-slate-800">
              
              {/* Invoice Meta details */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-teal-600 text-white flex items-center justify-center rounded-full font-black text-xs">
                      T
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 tracking-tight text-sm uppercase">TRUST SCHOOL OF COMMUNICATIONS</h4>
                      <p className="text-[8px] font-mono text-slate-400 leading-none">GOVERNMENT REGD COMMISSIONS DESK DELHI</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Regency+Park+2,+DLF+Phase+4,+Gurgaon+122009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-500 hover:text-teal-600 transition-colors leading-relaxed font-sans pl-1.5 block"
                  >
                    Regency Park 2, DLF Phase 4, Gurgaon 122009.
                  </a>
                </div>

                <div className="text-left sm:text-right font-mono text-[10.5px] space-y-1 shrink-0">
                  <span className="px-2 py-0.5 font-bold rounded bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] block w-fit sm:ml-auto">
                    OFFICIAL STATE REGISTERED RECEIPT
                  </span>
                  <p className="pt-1"><span className="text-slate-400">INVOICE NO:</span> <span className="font-bold text-slate-900">{receiptRecord?.invoiceNumber}</span></p>
                  <p>
                    <span className="text-slate-400">DATE RECORD:</span>{' '}
                    <span>{receiptRecord ? new Date(receiptRecord.timestamp).toLocaleDateString() : '2026-06-10'}</span>
                  </p>
                  <p><span className="text-slate-400">STATUS STATE:</span> <span className="text-emerald-600 font-bold">FEES DISCHARGED</span></p>
                </div>
              </div>

              {/* Billing Info row */}
              <div className="grid grid-cols-2 gap-4 p-4.5 bg-slate-50 border border-slate-150 rounded text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">// DESIGNATED BILL-TO REPRESENTATIVE</span>
                  <p className="font-extrabold text-slate-900 uppercase text-[11px]">{receiptRecord?.billingDetails?.fullName}</p>
                  <p className="text-slate-500">{receiptRecord?.billingDetails?.email}</p>
                  <p className="text-slate-500">+91 {receiptRecord?.billingDetails?.phone}</p>
                </div>

                <div className="space-y-1 font-sans">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">// REGISTRATION REGION ROUTING</span>
                  <p className="font-bold text-slate-900">Delhi National Capital Region</p>
                  <p className="text-slate-500">Corporate GSTIN: <span className="font-mono text-[10px] font-bold text-slate-600">{receiptRecord?.billingDetails?.corporateGST}</span></p>
                  <p className="text-slate-500">Routing gateway ID: <span className="font-mono text-[10px] font-bold text-slate-600">{receiptRecord?.transactionId}</span></p>
                </div>
              </div>

              {/* Items Table details */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">// AUDITED ACADEMIC TUITION COMPONENTS</span>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[9px] font-bold uppercase">
                        <th className="px-4 py-2.5">Syllabus Component Item</th>
                        <th className="px-4 py-2.5">Academic Track</th>
                        <th className="px-4 py-2.5 text-right">Base Amount (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {receiptRecord?.feesDetails?.name}
                          <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                            Standard guaranteed run cycle duration: {receiptRecord?.feesDetails?.duration}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[10px] text-teal-650 font-bold">
                          {receiptRecord?.feesDetails?.category}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-[11px] text-slate-700">
                          ₹{receiptRecord?.financials?.base.toLocaleString('en-IN')}.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Calculations breakdown block */}
              <div className="flex justify-end pt-2">
                <div className="w-72 space-y-2.5 text-xs font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Tuition Fee:</span>
                    <span className="text-slate-900">₹{receiptRecord?.financials?.base.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Central Tax CGST (9%):</span>
                    <span>₹{receiptRecord?.financials?.cgst.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span>State Tax SGST (9%):</span>
                    <span>₹{receiptRecord?.financials?.sgst.toLocaleString('en-IN')}.00</span>
                  </div>
                  <div className="flex justify-between text-base items-end pt-1 bg-slate-50 px-3 py-1.5 border border-slate-200 rounded text-slate-900">
                    <span className="text-[9px] font-bold text-slate-450 uppercase font-mono tracking-wider">AGGREGATE ENROLLED //</span>
                    <span className="text-lg font-sans font-black text-teal-650">
                      ₹{receiptRecord?.financials?.total.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Headquarters Sign and legal footnote */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-6 border-t border-slate-100 mt-6">
                <div className="text-[10px] text-slate-400 space-y-1.5 leading-relaxed">
                  <p className="font-mono text-[9px] text-[#0d9488] font-bold uppercase tracking-wider">// LEGAL NOTICE</p>
                  <p>
                    All communications vetting admissions fees are processed securely following standard legal systems. Delhi State CGST / SGST rates are mapped under Central Board of Indirect Taxes rules. Keep this credential safe for physical corporate entry audit verification.
                  </p>
                </div>

                <div className="text-right space-y-1.5">
                  <div className="text-center float-right select-none">
                    <div className="font-mono text-[8px] text-slate-400 mt-1">Delhi Registrar Registry Signature</div>
                    <div className="font-serif italic text-md text-teal-600 block pl-4 transform -rotate-2 pb-1 bg-gradient-to-r from-transparent via-teal-50/10 to-transparent">
                      Registrar T-SOC New Delhi
                    </div>
                    <div className="w-32 border-t border-slate-350 mx-auto" />
                    <span className="text-[7.5px] font-mono text-slate-400 block">// AUTHENTICATION VERIFIED</span>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Print and interaction buttons */}
            <motion.div variants={receiptItemVariants} className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-slate-100 print:hidden justify-items-center">
              <button 
                type="button"
                onClick={handlePrintReceipt}
                className="px-5 py-3 text-xs font-mono bg-teal-600 text-white rounded border border-teal-650 shadow hover:bg-teal-700 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>Print Invoice Reciept Ticket</span>
              </button>

              <button 
                type="button"
                onClick={triggerEmailSimulation}
                className="px-5 py-3 text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Deliver Invoice Hash to Email</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  setCheckoutStage('fill');
                  handleResetCard();
                }}
                className="px-5 py-3 text-xs font-mono bg-slate-50 hover:bg-slate-150 text-slate-500 rounded border border-slate-300 transition-all cursor-pointer"
              >
                Finance Another Vetting File
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  function handleResetCard() {
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCVV('');
    setFullName('');
    setEmail('');
    setPhone('');
    setCorporateGST('');
    setUpiConfirmPercent(0);
    setUpiStatusText('Awaiting scanner signal...');
    setErrors({});
  }
}
