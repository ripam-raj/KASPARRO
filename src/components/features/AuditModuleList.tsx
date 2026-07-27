'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Eye,
    FileText,
    Award,
    Settings,
    Building2,
    TrendingUp,
    Link as LinkIcon,
    Search,
    ChevronRight,
} from 'lucide-react';
import { cn, getScoreColor } from '@/lib/utils';
import auditData from '@/data/audit-modules.json';
import type { AuditModule } from '@/types';

const modules = auditData.modules as AuditModule[];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Eye,
    FileText,
    Award,
    Settings,
    Building2,
    TrendingUp,
    Link: LinkIcon,
};

export function AuditModuleList() {
    const { selectedModuleId, setSelectedModule } = useAppStore();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredModules = modules.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-xl overflow-hidden h-full flex flex-col">
            {/* List Header */}
            <div className="p-4 border-b border-surface-200 dark:border-surface-800 space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-base text-surface-900 dark:text-white">
                            Audit Modules
                        </h2>
                        <p className="text-xs text-surface-400">
                            7 Diagnostic Engines
                        </p>
                    </div>
                    <Badge variant="outline" size="sm">
                        {modules.length} Active
                    </Badge>
                </div>

                {/* Filter Input */}
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter audit modules..."
                    icon={<Search className="w-3.5 h-3.5 text-surface-400" />}
                    className="text-xs py-1.5"
                />
            </div>

            {/* Modules Item List */}
            <div className="divide-y divide-surface-200/80 dark:divide-surface-800/80 overflow-y-auto flex-1 max-h-[680px]">
                {filteredModules.length === 0 ? (
                    <div className="p-6 text-center text-xs text-surface-400">
                        No modules match &quot;{searchQuery}&quot;
                    </div>
                ) : (
                    filteredModules.map((module) => {
                        const Icon = iconMap[module.icon] || Eye;
                        const isSelected = module.id === selectedModuleId;

                        return (
                            <motion.button
                                key={module.id}
                                onClick={() => setSelectedModule(module.id)}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.15 }}
                                className={cn(
                                    'w-full flex items-center gap-3.5 p-4 text-left transition-all duration-200 group relative',
                                    isSelected
                                        ? 'bg-primary-500/10 text-primary-400 border-l-4 border-primary-500'
                                        : 'hover:bg-surface-50 dark:hover:bg-surface-800/60'
                                )}
                            >
                                <div
                                    className={cn(
                                        'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105',
                                        isSelected
                                            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                                            : 'bg-surface-100 dark:bg-surface-800 text-surface-400'
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span
                                            className={cn(
                                                'font-semibold text-xs truncate',
                                                isSelected
                                                    ? 'text-primary-600 dark:text-primary-400'
                                                    : 'text-surface-900 dark:text-white'
                                            )}
                                        >
                                            {module.shortName}
                                        </span>
                                        <span className={cn('text-xs font-bold font-mono', getScoreColor(module.score))}>
                                            {module.score}
                                        </span>
                                    </div>

                                    {/* Score Progress Bar */}
                                    <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                'h-full rounded-full transition-all duration-500',
                                                module.score >= 75 ? 'bg-emerald-500' :
                                                    module.score >= 60 ? 'bg-amber-500' :
                                                        module.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                            )}
                                            style={{ width: `${module.score}%` }}
                                        />
                                    </div>
                                </div>

                                <ChevronRight
                                    className={cn(
                                        'w-4 h-4 transition-transform flex-shrink-0',
                                        isSelected ? 'text-primary-400 translate-x-0.5' : 'text-surface-400 opacity-0 group-hover:opacity-100'
                                    )}
                                />
                            </motion.button>
                        );
                    })
                )}
            </div>
        </div>
    );
}
