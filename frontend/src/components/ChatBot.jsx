import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: 'Halo Bestie! 👋 Aku Dokter Z. Lagi burnout, overthinking, atau butuh temen cerita? Yuk curhat sini, aku siap dengerin!',
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isMaximized, isTyping]); // Scroll when typing starts

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMessage = { role: 'user', content: text };
        setInput('');
        setLoading(true); // Disable input immediately

        const newMessages = [...messages, userMessage];
        setMessages(newMessages); // Optimistic update

        // Random delay 1-3 seconds before showing typing indicator
        const delay = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        setIsTyping(true); // Show typing indicator

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation: newMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: 'bot', content: data.result || 'Waduh, koneksi lagi ngadat nih. Coba lagi bentar ya bestie!' },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', content: 'Waduh, koneksi error. Refresh dulu yuk.' },
            ]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (content) => {
        return content.replace(/\*\*/g, '').replace(/\*/g, '-').replace(/#/g, '');
    };

    const toggleMaximize = () => setIsMaximized(!isMaximized);

    // Dynamic classes for the chat window
    // Fixed inset-0 or inset-4 for maximized
    // Bottom-right for minimized
    const containerClasses = isMaximized
        ? `fixed inset-0 sm:inset-4 z-[100] bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`
        : `fixed bottom-24 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`;

    const handleClose = () => {
        setIsOpen(false);
        // Optional: Reset maximization after close so next open is standard size
        setTimeout(() => setIsMaximized(false), 300);
    };

    return (
        <>
            {/* Overlay for Maximized Mode (optional but good for focus) */}
            {isMaximized && isOpen && (
                <div className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm" onClick={handleClose} />
            )}

            {/* Chat Window */}
            <div className={containerClasses} style={{ height: isMaximized ? 'auto' : '520px', maxHeight: isMaximized ? 'none' : '80vh' }}>
                <div className="flex flex-col h-full">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-5 py-4 flex items-center justify-between flex-shrink-0 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Dokter Z</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-primary-100 text-xs">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMaximize}
                                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                                title={isMaximized ? "Kecilkan" : "Perbesar"}
                            >
                                {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                            </button>
                            <button
                                id="chatbot-close"
                                onClick={handleClose}
                                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                                title="Tutup Chat"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'bot' && (
                                    <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot size={14} className="text-primary-600" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-primary-600 text-white rounded-br-md'
                                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
                                        }`}
                                >
                                    {formatMessage(msg.content)}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <User size={14} className="text-slate-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-2.5 justify-start">
                                <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot size={14} className="text-primary-600" />
                                </div>
                                <div className="bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Loader2 size={14} className="animate-spin" />
                                        <span>Sedang mengetik...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-slate-100 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                id="chatbot-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik keluh kesah kamu..."
                                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
                                disabled={loading}
                            />
                            <button
                                id="chatbot-send"
                                onClick={sendMessage}
                                disabled={!input.trim() || loading}
                                className="p-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 rounded-xl transition-colors duration-200"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center mt-2">
                            Dokter Z bisa salah. Curhat ini bukan pengganti konsultasi dengan psikolog/psikiater profesional.
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                id="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
                    ? 'bg-slate-700 hover:bg-slate-800 rotate-90'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/30 hover:shadow-primary-600/40 hover:scale-105'
                    }`}
            >
                {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
            </button>

            {/* Tooltip (visible when closed) */}
            {!isOpen && (
                <div className="fixed bottom-[5.5rem] right-4 sm:right-6 z-50 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg animate-bounce pointer-events-none">
                    Curhat dengan AI 💬
                    <div className="absolute -bottom-1 right-5 w-2 h-2 bg-slate-800 rotate-45" />
                </div>
            )}
        </>
    );
}
