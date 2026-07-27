'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, FileSearch, Network, Moon, Sun, ArrowRight, X, Building2 } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { useToast } from '@/components/ui/toast';
import brandsData from '@/data/brands.json';
import auditData from '@/data/audit-modules.json';
import type { Brand, AuditModule } from '@/types';

const brands = brandsData.brands as Brand[];
const modules = auditData.modules as AuditModule[];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const { setSelectedBrand, setSelectedModule, theme, toggleTheme } = useAppStore();
    const { toast } = useToast();

    // Toggle palette via Cmd+K / Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === 'Escape' && open) {
                setOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    const handleSelectBrand = (brandId: string, name: string) => {
        setSelectedBrand(brandId);
        setOpen(false);
        toast({
            title: `Active Brand Changed`,
            description: `Switched brand context to ${name}`,
            type: 'success',
        });
    };

    const handleSelectModule = (moduleId: string, name: string) => {
        setSelectedModule(moduleId);
        router.push('/app/audit');
        setOpen(false);
        toast({
            title: `Audit Module Opened`,
            description: `Viewing detailed audit metrics for ${name}`,
            type: 'info',
        });
    };

    const handleNavigate = (path: string, label: string) => {
        router.push(path);
        setOpen(false);
        toast({
            title: `Navigated to ${label}`,
            type: 'info',
        });
    };

    const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) || b.domain.toLowerCase().includes(query.toLowerCase())
    );

    const filteredModules = modules.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) || m.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-surface-950/70 backdrop-blur-md"
                    />

                    {/* Palette Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl shadow-2xl overflow-hidden z-10"
                    >
                        {/* Search Input Bar */}
                        <div className="flex items-center px-4 py-3.5 border-b border-surface-200 dark:border-surface-800">
                            <Search className="w-5 h-5 text-surface-400 mr-3" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command, search audit modules or brands... (Esc to exit)"
                                className="w-full bg-transparent text-surface-900 dark:text-white placeholder-surface-400 text-sm focus:outline-none"
                                autoFocus
                            />
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1 rounded-md text-surface-400 hover:text-surface-600 dark:hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
                            {/* Quick Navigation */}
                            <div>
                                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-surface-400 uppercase">
                                    Navigation
                                </div>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => handleNavigate('/app/dashboard', 'Dashboard')}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <LayoutDashboard className="w-4 h-4 text-primary-500" />
                                            <span>Executive Dashboard</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-surface-400" />
                                    </button>

                                    <button
                                        onClick={() => handleNavigate('/app/audit', 'AI Audit')}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileSearch className="w-4 h-4 text-accent-purple" />
                                            <span>AI-SEO Audit Suite</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-surface-400" />
                                    </button>

                                    <button
                                        onClick={() => handleNavigate('/app/architecture', 'Architecture')}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Network className="w-4 h-4 text-accent-cyan" />
                                            <span>System Pipeline Architecture</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-surface-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Brands Section */}
                            {filteredBrands.length > 0 && (
                                <div>
                                    <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-surface-400 uppercase">
                                        Switch Brand Context
                                    </div>
                                    <div className="space-y-1">
                                        {filteredBrands.map((b) => (
                                            <button
                                                key={b.id}
                                                onClick={() => handleSelectBrand(b.id, b.name)}
                                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Building2 className="w-4 h-4 text-blue-400" />
                                                    <span className="font-medium">{b.name}</span>
                                                </div>
                                                <span className="text-xs text-surface-400">{b.domain}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Audit Modules Section */}
                            {filteredModules.length > 0 && (
                                <div>
                                    <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-surface-400 uppercase">
                                        Audit Modules
                                    </div>
                                    <div className="space-y-1">
                                        {filteredModules.map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => handleSelectModule(m.id, m.name)}
                                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FileSearch className="w-4 h-4 text-primary-400" />
                                                    <span>{m.name}</span>
                                                </div>
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-500/10 text-primary-400">
                                                    Score: {m.score}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quick Settings */}
                            <div>
                                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-surface-400 uppercase">
                                    Preferences
                                </div>
                                <button
                                    onClick={() => {
                                        toggleTheme();
                                        toast({
                                            title: `Theme Changed`,
                                            description: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`,
                                            type: 'info',
                                        });
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {theme === 'dark' ? (
                                            <Sun className="w-4 h-4 text-amber-400" />
                                        ) : (
                                            <Moon className="w-4 h-4 text-surface-600" />
                                        )}
                                        <span>Toggle Light/Dark Theme</span>
                                    </div>
                                    <span className="text-xs text-surface-400 capitalize">{theme} Mode</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer Bar */}
                        <div className="px-4 py-2.5 bg-surface-50 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between text-xs text-surface-400">
                            <span>Navigation: <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-800 text-[10px]">Cmd+K</kbd></span>
                            <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-800 text-[10px]">Enter</kbd></span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
