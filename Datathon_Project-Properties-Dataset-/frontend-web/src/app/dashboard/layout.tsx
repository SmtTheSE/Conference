import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-[calc(100vh-128px)] overflow-hidden bg-background-offwhite">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-border-light flex flex-col shadow-sm flex-shrink-0">
                <div className="p-6 border-b border-border-light">
                    <div className="font-black text-xl text-asean-navy tracking-tight leading-none mb-1">
                        INTELLIGENCE<br />HUB
                    </div>
                    <div className="text-xs font-bold text-asean-red tracking-widest uppercase">
                        SYNERGIA 2026
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 mb-2 text-xs font-bold text-text-muted uppercase tracking-wider">
                        Market Analysis
                    </div>
                    <nav className="space-y-1 px-2 mb-8">
                        <Link href="/dashboard/intelligence" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-asean-navy hover:bg-asean-navy/5 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Global Market Intel
                        </Link>
                        <Link href="/dashboard/scanner" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-asean-navy hover:bg-asean-navy/5 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Opportunity Scanner
                        </Link>
                    </nav>

                    <div className="px-4 mb-2 text-xs font-bold text-text-muted uppercase tracking-wider">
                        AI Operations
                    </div>
                    <nav className="space-y-1 px-2 mb-8">
                        <Link href="/dashboard/datalab" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-asean-navy hover:bg-asean-navy/5 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Dynamic Data Lab
                        </Link>
                        <Link href="/dashboard/manage" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-asean-navy hover:bg-asean-navy/5 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                            Manage Data Registry
                        </Link>
                    </nav>

                    <div className="px-4 mb-2 text-xs font-bold text-text-muted uppercase tracking-wider">
                        Assistants
                    </div>
                    <nav className="space-y-1 px-2">
                        <Link href="/dashboard/assistant" className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-asean-navy hover:bg-asean-navy/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Cultural AI
                            </div>
                            <span className="bg-asean-red text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                                Legal
                            </span>
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
