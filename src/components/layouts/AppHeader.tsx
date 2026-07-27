'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';

export function AppHeader() {
    const pathname = usePathname();
    const { toast } = useToast();

    const getBreadcrumb = () => {
        if (pathname.includes('/dashboard')) return { title: 'Dashboard', category: 'Executive Overview' };
        if (pathname.includes('/audit')) return { title: 'AI-SEO Audit', category: 'Audit Suite' };
        if (pathname.includes('/architecture')) return { title: 'Pipeline Flow', category: 'System Architecture' };
        return { title: 'App Workspace', category: 'Kasparro Platform' };
    };

    const breadcrumb = getBreadcrumb();

    return (
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 flex items-center justify-between px-6 transition-colors">
            {/* Left Breadcrumbs */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
                    {breadcrumb.category}
                </span>
                <span className="text-surface-300 dark:text-surface-700">/</span>
                <span className="text-sm font-semibold text-surface-900 dark:text-white">
                    {breadcrumb.title}
                </span>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-3">
                {/* Search Bar / Cmd+K Trigger */}
                <button
                    onClick={() => {
                        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                        window.dispatchEvent(event);
                    }}
                    className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-surface-100 dark:bg-surface-800/80 hover:bg-surface-200 dark:hover:bg-surface-800 text-surface-400 text-xs rounded-lg border border-surface-200 dark:border-surface-700 transition-colors"
                >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search or jump to...</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-700 text-[10px] text-surface-500 font-mono">
                        ⌘K
                    </kbd>
                </button>

                {/* AI Status Badge */}
                <Badge variant="gradient" dot animatePulse className="hidden md:inline-flex">
                    AI Engine Live
                </Badge>

                {/* Notification Bell */}
                <button
                    onClick={() => {
                        toast({
                            title: 'System Notifications',
                            description: 'All 7 audit modules are up to date with latest AI platform signals.',
                            type: 'info',
                        });
                    }}
                    className="relative p-2 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                </button>

                <ThemeToggle />

                {/* User Profile Pill */}
                <div className="flex items-center gap-2 pl-2 border-l border-surface-200 dark:border-surface-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 via-accent-purple to-accent-cyan flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-500/20">
                        SR
                    </div>
                </div>
            </div>
        </header>
    );
}
