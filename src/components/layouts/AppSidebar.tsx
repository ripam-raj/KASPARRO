'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileSearch,
    Network,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const appNavLinks = [
    { href: '/app/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { href: '/app/audit', label: 'AI Audit Suite', icon: FileSearch, badge: '7 Modules' },
    { href: '/app/architecture', label: 'System Pipeline', icon: Network, badge: 'Graph' },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 h-screen bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-r border-surface-200 dark:border-surface-800 flex flex-col transition-all duration-300 z-40 shadow-2xl',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Logo Brand Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-surface-200 dark:border-surface-800">
                {!collapsed ? (
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 via-accent-purple to-accent-cyan flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
                            <span className="text-white font-extrabold text-base">K</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-extrabold text-surface-900 dark:text-white tracking-tight leading-none">
                                Kasparro
                            </span>
                            <span className="text-[10px] font-semibold text-primary-400 uppercase tracking-widest mt-0.5">
                                AI Intelligence
                            </span>
                        </div>
                    </Link>
                ) : (
                    <Link href="/" className="mx-auto">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 via-accent-purple to-accent-cyan flex items-center justify-center shadow-md">
                            <span className="text-white font-extrabold text-base">K</span>
                        </div>
                    </Link>
                )}
            </div>

            {/* Main Navigation Links */}
            <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
                {!collapsed && (
                    <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-surface-400 uppercase">
                        Workspace Views
                    </div>
                )}

                {appNavLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 shadow-xs'
                                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800/80 hover:text-surface-900 dark:hover:text-white'
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSidebarIndicator"
                                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary-500"
                                />
                            )}
                            <Icon className={cn('w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110', isActive && 'text-primary-500')} />
                            {!collapsed && (
                                <div className="flex-1 flex items-center justify-between min-w-0">
                                    <span className="truncate">{link.label}</span>
                                    {link.badge && (
                                        <Badge
                                            variant={isActive ? 'gradient' : 'outline'}
                                            size="sm"
                                            className="text-[9px] px-1.5 py-0"
                                        >
                                            {link.badge}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Navigation */}
            <div className="p-3 border-t border-surface-200 dark:border-surface-800 space-y-2">
                <Link
                    href="/"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-surface-500 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/80 transition-colors'
                    )}
                >
                    <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span>Back to Marketing</span>}
                </Link>
            </div>

            {/* Collapse Toggle Switch Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center text-surface-500 hover:text-surface-900 dark:hover:text-white shadow-md hover:scale-110 transition-all"
            >
                {collapsed ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                    <ChevronLeft className="w-3.5 h-3.5" />
                )}
            </button>
        </aside>
    );
}
