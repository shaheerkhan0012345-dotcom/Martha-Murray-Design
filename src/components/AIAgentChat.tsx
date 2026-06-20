import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, AlertTriangle, ArrowRight, User, Trash2, Calendar } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  inquiryCreated?: any;
}

export default function AIAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting if history is empty
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: 'greeting',
          role: 'model',
          text: "Welcome to Martha Murray Design. I am your spatial curator assistant. I am here to guide you through our aesthetic philosophy, describe our residential remodeling services in Bend, Oregon, detail our fine European linen selections, or structure and submit a custom design inquiry. How may I inspire your space today?"
        }
      ]);
    }
  }, [history]);

  // Auto scroll to bottom when message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    e?.preventDefault();
    const textToSend = customText || message;
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    if (!customText) {
      setMessage('');
    }

    // Append user message to local list
    const userMsg: ChatMessage = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      text: textToSend
    };
    
    setHistory(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: history.map(h => ({ role: h.role, text: h.text })),
          message: textToSend
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error.');
      }

      const modelMsg: ChatMessage = {
        id: `msg_${Math.random().toString(36).substr(2, 9)}`,
        role: 'model',
        text: data.reply,
        inquiryCreated: data.inquiryCreated
      };

      setHistory(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Connecting to the AI spatial curator failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (preset: string) => {
    handleSendMessage(undefined, preset);
  };

  const clearChat = () => {
    setHistory([
      {
        id: 'greeting',
        role: 'model',
        text: "Welcome to Martha Murray Design. I am your spatial curator assistant. I am here to guide you through our aesthetic philosophy, describe our residential remodeling services in Bend, Oregon, detail our fine European linen selections, or structure and submit a custom design inquiry. How may I inspire your space today?"
      }
    ]);
    setErrorText(null);
  };

  return (
    <>
      {/* Floating Sparkle Action Button bottom right above general elements */}
      <div className="fixed bottom-6 right-6 z-[99]" id="mmd-chat-floating-container">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-neutral-950 text-white shadow-2xl hover:bg-[#B3542E] transition-colors border border-white/5 cursor-pointer group"
          id="mmd-trigger-chat-btn"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center relative"
              >
                <MessageSquare className="w-5 h-5 text-white group-hover:text-amber-100 transition-colors" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#CE9E56] animate-ping" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#CE9E56]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Slide-out Sidebar Chat Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[92vw] max-w-md h-[74vh] bg-white rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden z-[98] flex flex-col justify-between"
            id="mmd-ai-agent-panel"
          >
            {/* Architectural Header */}
            <div className="bg-[#030303] text-white p-4.5 px-6 flex justify-between items-center border-b border-neutral-900 select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B3542E]/20 flex items-center justify-center border border-[#CE9E56]/35">
                  <Sparkles className="w-4 h-4 text-[#CE9E56] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-[#CE9E56] font-bold uppercase leading-tight">AI SPATIAL ADVISOR</h4>
                  <span className="text-[9px] text-neutral-400 font-sans tracking-wide">Martha Murray Design Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  className="p-1 px-1.5 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors text-[10px] font-mono tracking-wider uppercase flex items-center gap-1 cursor-pointer"
                  title="Reset conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESET</span>
                </button>
              </div>
            </div>

            {/* Conversation Flow Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4.5 bg-[#FAF9F6]/50 scrollbar-thin scrollbar-thumb-neutral-200">
              
              {history.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed tracking-wide ${
                    msg.role === 'user' 
                      ? 'bg-neutral-950 text-white font-sans rounded-tr-none shadow-md' 
                      : 'bg-white text-neutral-800 border border-neutral-200/70 font-sans line-clamp-none font-light rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}

                    {/* Automatically injected Consultation Inquiry Ticket if set by Gemini function calling */}
                    {msg.inquiryCreated && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 p-4 border border-[#CE9E56]/50 bg-[#F4F0EA]/60 rounded-xl text-neutral-900 font-sans space-y-3"
                      >
                        <div className="flex items-center gap-2 text-[10px] font-bold font-mono tracking-wider text-[#B3542E] uppercase">
                          <Calendar className="w-4 h-4 text-[#CE9E56]" />
                          <span>CONSULTATION LOGGED PERFECTLY</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] font-light text-neutral-600">
                          <div><strong className="font-semibold text-neutral-800">CLIENT:</strong> {msg.inquiryCreated.name}</div>
                          <div><strong className="font-semibold text-neutral-800">EMAIL:</strong> {msg.inquiryCreated.email}</div>
                          <div><strong className="font-semibold text-neutral-800">PROJECT:</strong> {msg.inquiryCreated.projectType}</div>
                          <div><strong className="font-semibold text-neutral-800">STATUS:</strong> <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono tracking-wider uppercase font-bold">QUEUED FOR MARTHA</span></div>
                        </div>
                        <p className="text-[10px] italic text-[#B3542E] font-medium leading-relaxed">
                          Your coordinates have bypassed the queues and loaded on the resident terminal. We will follow up in 24 business hours.
                        </p>
                      </motion.div>
                    )}
                  </div>
                  <span className="text-[8px] font-mono tracking-wider text-neutral-400 mt-1 uppercase select-none flex items-center gap-1">
                    {msg.role === 'user' ? (
                      <>
                        <span>YOU</span>
                        <User className="w-2 h-2 text-neutral-300" />
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-2.5 h-2.5 text-[#CE9E56]" />
                        <span>MMD SPECIALIST</span>
                      </>
                    )}
                  </span>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="p-3.5 px-4.5 rounded-2xl bg-white text-neutral-400 border border-neutral-100 rounded-tl-none shadow-sm flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[8px] font-mono tracking-wider text-neutral-400 mt-1 uppercase select-none">
                    COMPOSING LAYOUT PLANS...
                  </span>
                </div>
              )}

              {/* Error Warning */}
              {errorText && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex gap-2.5 items-start">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-bold block">Developer Secrets Required</span>
                    <span>{errorText}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets / Suggestions Area */}
            {history.length === 1 && (
              <div className="px-5 py-2.5 bg-[#FAF9F6] border-t border-neutral-100 flex gap-2 overflow-x-auto select-none scrollbar-none shrink-0">
                <button 
                  onClick={() => handlePresetClick("What is your design philosophy?")}
                  className="shrink-0 text-[10px] font-mono tracking-wide uppercase px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-[#CE9E56]/10 hover:border-[#CE9E56]/40 transition-colors text-neutral-600 hover:text-black cursor-pointer"
                >
                  Philosophy
                </button>
                <button 
                  onClick={() => handlePresetClick("Tell me about the Fine European Linens.")}
                  className="shrink-0 text-[10px] font-mono tracking-wide uppercase px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-[#CE9E56]/10 hover:border-[#CE9E56]/40 transition-colors text-neutral-600 hover:text-black cursor-pointer"
                >
                  SDH Linens
                </button>
                <button 
                  onClick={() => handlePresetClick("I'd like to schedule a home remodel consultation")}
                  className="shrink-0 text-[10px] font-mono tracking-wide uppercase px-3 py-1.5 rounded-lg border border-[#B3542E]/30 bg-white hover:bg-[#B3542E]/10 hover:border-[#B3542E]/60 transition-colors text-neutral-600 hover:text-black cursor-pointer font-semibold"
                >
                  Book consultation
                </button>
              </div>
            )}

            {/* Text Input Footer Area */}
            <form onSubmit={handleSendMessage} className="p-4.5 bg-white border-t border-neutral-200/80 flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your design inquiry..."
                disabled={isLoading}
                className="flex-1 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:ring-0 rounded-xl px-4 py-3 text-xs tracking-wide focus:outline-none placeholder-neutral-400 text-neutral-800 disabled:opacity-50 font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="bg-neutral-950 hover:bg-[#B3542E] text-white p-3 rounded-xl disabled:opacity-40 transition-colors shadow flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
