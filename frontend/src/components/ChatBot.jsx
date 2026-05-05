import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Maximize2, Minimize2, Trash2, Phone } from 'lucide-react';

const STORAGE_KEY = 'dokterz-chat-history';
const QUICK_PROMPTS = [
    'Aku lagi overthinking...',
    'Aku susah tidur...',
    'Aku burnout sama tugas...',
    'Aku butuh grounding techniques',
    'Cerita dong, aku galau...',
    'Feeling lost banget nih...',
];

const CRISIS_MESSAGE = 'Jika kamu sedang dalam situasi krisis atau merasa ingin menyakiti diri sendiri, segera hubungi hotline 119 ext. 8 atau konselor terdekat.';

function loadMessages() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [
            {
                role: 'bot',
                content: 'Halo Bestie! 👋 Aku Dokter Z. Lagi burnout, overthinking, atau butuh temen cerita? Yuk curhat sini, aku siap dengerin!',
            },
        ];
    } catch {
        return [
            {
                role: 'bot',
                content: 'Halo Bestie! 👋 Aku Dokter Z. Lagi burnout, overthinking, atau butuh temen cerita? Yuk curhat sini, aku siap dengerin!',
            },
        ];
    }
}

function saveMessages(messages) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
        // Storage might be full or disabled
    }
}

function formatMessage(content) {
    return content.replace(/\*\*/g, '').replace(/\*/g, '-').replace(/#/g, '');
}

export default function ChatBot({ isOpenExternally, onToggleExternally }) {
    const [isOpen, setIsOpen] = useState(isOpenExternally || false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState(loadMessages);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [lastError, setLastError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isMaximized, isTyping]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    useEffect(() => {
        if (typeof isOpenExternally === 'boolean' && isOpenExternally !== isOpen) {
            setIsOpen(isOpenExternally);
        }
    }, [isOpenExternally, isOpen]);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggleExternally) onToggleExternally(newState);
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onToggleExternally) onToggleExternally(false);
        setTimeout(() => setIsMaximized(false), 300);
    };

    const sendMessage = async (messageText) => {
        const text = messageText || input.trim();
        if (!text || loading) return;

        const userMessage = { role: 'user', content: text };
        setInput('');
        setLoading(true);
        setLastError(null);

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        saveMessages(newMessages);

        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation: newMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) throw new Error('Request failed');

            const data = await res.json();
            const updatedMessages = [
                ...newMessages,
                { role: 'bot', content: data.result || 'Waduh, koneksi lagi ngadat nih. Coba lagi bentar ya bestie!' },
            ];
            setMessages(updatedMessages);
            saveMessages(updatedMessages);
        } catch {
            setLastError(text);
            setMessages(prev => [
                ...prev,
                { role: 'bot', content: 'Waduh, koneksi lagi error nih. Tekan "Coba lagi" ya!' },
            ]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    const retryLastMessage = () => {
        if (lastError) {
            sendMessage(lastError);
        }
    };

    const clearHistory = () => {
        const welcome = [
            {
                role: 'bot',
                content: 'Halo Bestie! 👋 Aku Dokter Z. Lagi burnout, overthinking, atau butuh temen cerita? Yuk curhat sini, aku siap dengerin!',
            },
        ];
        setMessages(welcome);
        saveMessages(welcome);
        setLastError(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleMaximize = () => setIsMaximized(!isMaximized);

    const containerClasses = isMaximized
        ? `fixed inset-0 sm:inset-4 z-[100] bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`
        : `fixed bottom-24 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`;

    return (
        <>
            {isMaximized && isOpen && (
                <div className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm" onClick={handleClose} />
            )}

            <div
                className={containerClasses}
                style={{ height: isMaximized ? 'auto' : '560px', maxHeight: isMaximized ? 'none' : '85vh' }}
                role="dialog"
                aria-modal="true"
                aria-label="Chat dengan Dokter Z"
            >
                <div className="flex flex-col h-full">
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
                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearHistory}
                                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                                title="Hapus riwayat"
                                aria-label="Hapus riwayat chat"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button
                                onClick={toggleMaximize}
                                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label={isMaximized ? 'Kecilkan chat' : 'Perbesar chat'}
                                title={isMaximized ? 'Kecilkan' : 'Perbesar'}
                            >
                                {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                            </button>
                            <button
                                onClick={handleClose}
                                className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                                aria-label="Tutup chat"
                                title="Tutup Chat"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50 dark:bg-slate-900">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'bot' && (
                                    <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot size={14} className="text-primary-600 dark:text-primary-300" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap ${
                                        msg.role === 'user'
                                            ? 'bg-primary-600 text-white rounded-br-md'
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-md shadow-sm'
                                    }`}
                                >
                                    {formatMessage(msg.content)}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-7 h-7 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <User size={14} className="text-slate-500 dark:text-slate-400" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-2 justify-start">
                                <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot size={14} className="text-primary-600 dark:text-primary-300" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Loader2 size={14} className="animate-spin" />
                                        <span>Sedang mengetik...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {lastError && !loading && (
                            <div className="flex justify-center pt-2">
                                <button
                                    onClick={retryLastMessage}
                                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 text-xs font-medium rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                                >
                                    Coba lagi
                                </button>
                            </div>
                        )}

                        {messages.length === 1 && (
                            <div className="pt-2 pb-1">
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 text-center">
                                    {CRISIS_MESSAGE}
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {QUICK_PROMPTS.map((prompt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(prompt)}
                                            disabled={loading}
                                            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-300 transition-colors disabled:opacity-50"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik keluh kesah kamu..."
                                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:border-primary-400 dark:focus:border-primary-500 transition-all"
                                disabled={loading}
                                aria-label="Ketik pesan"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || loading}
                                className="p-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200"
                                aria-label="Kirim pesan"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                Riwayat tersimpan di perangkat ini.
                            </p>
                            <a
                                href="tel:119"
                                className="text-[10px] text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                            >
                                <Phone size={10} />
                                Darurat? Hubungi 119
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleToggle}
                className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
                    ? 'bg-slate-700 hover:bg-slate-800 rotate-90'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/30 hover:shadow-primary-600/40 hover:scale-105'
                    }`}
                aria-label={isOpen ? 'Tutup chat Dokter Z' : 'Buka chat Dokter Z'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
            </button>

            {!isOpen && (
                <div className="fixed bottom-[5.5rem] right-4 sm:right-6 z-50 bg-slate-800 dark:bg-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg animate-bounce pointer-events-none">
                    Curhat dengan Dokter Z 💬
                    <div className="absolute -bottom-1 right-5 w-2 h-2 bg-slate-800 dark:bg-slate-700 rotate-45" />
                </div>
            )}
        </>
    );
}