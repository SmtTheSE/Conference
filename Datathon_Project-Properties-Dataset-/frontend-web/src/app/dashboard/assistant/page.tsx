"use client";

import { useState, useRef, useEffect } from "react";

const API_PRODUCT3 = "http://localhost:5003";

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

export default function CulturalAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: 'Greetings. I am your SYNERGIA 2026 Legal & Cultural Guide, powered by LLM core. Ask me about foreign ownership laws, rental yields, or cultural investment factors in Southeast Asia.'
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch(`${API_PRODUCT3}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });

            if (!res.ok) throw new Error("Connection error");
            const data = await res.json();

            const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: data.response };
            setMessages(prev => [...prev, botMsg]);

        } catch (err) {
            const errorMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: "Connection error with Cultural Assistant. Please ensure the local Qwen module is active." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 flex flex-col h-[calc(100vh-200px)]">
            <div className="mb-6">
                <h1 className="text-3xl font-black text-asean-navy mb-2">Cultural & Legal AI Assistant</h1>
                <p className="text-text-muted">Query the qwen2.5 local LLM for pan-Asian property law and cultural nuance.</p>
            </div>

            <div className="flex-1 bg-white border border-border-light shadow-sm flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="bg-asean-navy text-white px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-bold tracking-wider">SYNERGIA 2026 AI Core</div>
                        <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold uppercase tracking-widest mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            qwen2.5:7b Active
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-background-offwhite">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                  max-w-[85%] px-5 py-3.5 
                  ${msg.sender === 'user'
                                        ? 'bg-asean-navy text-white rounded-l-lg rounded-tr-lg'
                                        : 'bg-white border border-border-light text-text-main rounded-r-lg rounded-tl-lg shadow-sm'}
                `}>
                                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-border-light text-text-muted rounded-r-lg rounded-tl-lg shadow-sm px-5 py-3.5 flex gap-2 items-center">
                                    <div className="w-2 h-2 rounded-full bg-border-dark animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-border-dark animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-border-dark animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-border-light">
                    <div className="max-w-3xl mx-auto flex gap-4">
                        <input
                            type="text"
                            placeholder="Query the AI..."
                            className="flex-1 border border-border-light rounded px-4 py-3 focus:outline-none focus:border-asean-navy focus:ring-1 focus:ring-asean-navy transition-shadow bg-background-offwhite text-text-main"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="bg-asean-red hover:bg-asean-red-dark text-white font-bold px-8 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Execute
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
