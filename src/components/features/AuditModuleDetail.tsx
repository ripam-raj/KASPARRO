'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScoreGauge } from '@/components/ui/score-gauge';
import { useToast } from '@/components/ui/toast';
import {
    AlertTriangle,
    AlertCircle,
    Info,
    Lightbulb,
    TrendingUp,
    TrendingDown,
    Minus,
    Download,
    CheckCircle2,
    Sparkles,
    ArrowUpRight,
    Filter,
} from 'lucide-react';
import { cn, getSeverityColor, getPriorityColor } from '@/lib/utils';
import auditData from '@/data/audit-modules.json';
import type { AuditModule } from '@/types';

const modules = auditData.modules as AuditModule[];

export function AuditModuleDetail() {
    const { selectedModuleId } = useAppStore();
    const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
    const [resolvedRecs, setResolvedRecs] = useState<Record<string, boolean>>({});
    const { toast } = useToast();

    const module = modules.find((m) => m.id === selectedModuleId) || modules[0];

    if (!module) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-surface-400">
                <AlertCircle className="w-8 h-8 mb-2 text-surface-500" />
                <span>Select an audit module from the list to view telemetry details.</span>
            </div>
        );
    }

    const filteredIssues = module.issues.filter((issue) =>
        severityFilter === 'all' ? true : issue.severity === severityFilter
    );

    const handleApplyRecommendation = (recId: string, title: string) => {
        setResolvedRecs((prev) => ({ ...prev, [recId]: true }));
        toast({
            title: 'Recommendation Applied',
            description: `Auto-fix queued for: "${title}". Score boost will apply on next sync.`,
            type: 'success',
        });
    };

    const handleExportModuleCSV = () => {
        const jsonContent = JSON.stringify(module, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kasparro-audit-${module.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: 'Audit Report Exported',
            description: `Downloaded telemetry report as kasparro-audit-${module.id}.json`,
            type: 'info',
        });
    };

    const getTrendIcon = (trend?: string) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-emerald-500" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            default:
                return <Minus className="w-4 h-4 text-surface-400" />;
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical':
                return <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />;
            default:
                return <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Module Executive Summary */}
            <Card className="border-primary-500/20 bg-gradient-to-br from-white via-surface-50 to-primary-50/20 dark:from-surface-900 dark:via-surface-900 dark:to-primary-950/20 shadow-xl overflow-hidden relative">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                                <Badge variant="gradient" size="sm" dot animatePulse>
                                    Module #{module.id}
                                </Badge>
                                <Badge
                                    variant={
                                        module.status === 'excellent' || module.status === 'good'
                                            ? 'success'
                                            : module.status === 'moderate'
                                                ? 'warning'
                                                : 'danger'
                                    }
                                    className="capitalize"
                                >
                                    Status: {module.status}
                                </Badge>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
                                {module.name}
                            </h2>
                            <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed max-w-2xl">
                                {module.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-6 self-start md:self-center bg-white/50 dark:bg-surface-800/60 p-4 rounded-2xl border border-surface-200 dark:border-surface-700/60 shadow-inner">
                            <ScoreGauge score={module.score} size="lg" label="Health Index" />
                            <div className="hidden sm:flex flex-col justify-center gap-2">
                                <Button variant="outline" size="sm" onClick={handleExportModuleCSV}>
                                    <Download className="w-3.5 h-3.5 mr-1" /> Export JSON
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Key Insights Grid */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="w-5 h-5 text-primary-500" />
                        Live Telemetry Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {module.insights.map((insight) => (
                            <motion.div
                                key={insight.id}
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                                className="bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/50 rounded-xl p-4 space-y-2 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-surface-500 dark:text-surface-400 truncate">
                                        {insight.title}
                                    </span>
                                    {getTrendIcon(insight.trend)}
                                </div>
                                <div className="text-2xl font-extrabold text-surface-900 dark:text-white font-mono">
                                    {insight.value}
                                </div>
                                {insight.description && (
                                    <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-2">
                                        {insight.description}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Issues & Flags */}
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            Detected Issues & Vulnerabilities
                            <Badge variant="outline" className="ml-2 font-mono">
                                {filteredIssues.length}
                            </Badge>
                        </CardTitle>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800/80 p-1 rounded-lg border border-surface-200 dark:border-surface-700 text-xs">
                            <Filter className="w-3.5 h-3.5 text-surface-400 ml-1 mr-1" />
                            {(['all', 'critical', 'warning', 'info'] as const).map((sev) => (
                                <button
                                    key={sev}
                                    onClick={() => setSeverityFilter(sev)}
                                    className={cn(
                                        'px-2.5 py-1 rounded-md capitalize font-medium transition-all',
                                        severityFilter === sev
                                            ? 'bg-white dark:bg-surface-900 text-surface-900 dark:text-white shadow-xs'
                                            : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'
                                    )}
                                >
                                    {sev}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {filteredIssues.length === 0 ? (
                            <div className="p-8 text-center text-xs text-surface-400 bg-surface-50 dark:bg-surface-800/30 rounded-xl border border-dashed border-surface-200 dark:border-surface-700">
                                No issues detected for filter &quot;{severityFilter}&quot;
                            </div>
                        ) : (
                            filteredIssues.map((issue) => (
                                <motion.div
                                    key={issue.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        'flex items-start gap-3.5 p-4 rounded-xl border transition-colors',
                                        getSeverityColor(issue.severity)
                                    )}
                                >
                                    {getSeverityIcon(issue.severity)}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h4 className="font-semibold text-sm text-surface-900 dark:text-white">
                                                {issue.title}
                                            </h4>
                                            <Badge variant="outline" size="sm" className="capitalize">
                                                {issue.severity}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
                                            {issue.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Lightbulb className="w-5 h-5 text-accent-cyan" />
                        AI Action Plan & Recommendations
                        <Badge variant="outline" className="ml-2 font-mono">
                            {module.recommendations.length}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {module.recommendations.map((rec) => {
                            const isDone = !!resolvedRecs[rec.id];

                            return (
                                <motion.div
                                    key={rec.id}
                                    whileHover={{ scale: 1.005 }}
                                    className={cn(
                                        'bg-surface-50 dark:bg-surface-800/60 rounded-xl p-5 border border-surface-200 dark:border-surface-700/60 space-y-3 transition-all',
                                        isDone && 'opacity-60 bg-emerald-500/5 border-emerald-500/30'
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-accent-purple flex-shrink-0" />
                                            <h4 className="font-semibold text-sm text-surface-900 dark:text-white">
                                                {rec.title}
                                            </h4>
                                        </div>
                                        <Badge className={cn('capitalize', getPriorityColor(rec.priority))}>
                                            Priority: {rec.priority}
                                        </Badge>
                                    </div>

                                    <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
                                        {rec.description}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-200/60 dark:border-surface-700/60 text-xs">
                                        <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            <span>Expected Impact: {rec.impact}</span>
                                        </div>

                                        <Button
                                            variant={isDone ? 'ghost' : 'default'}
                                            size="sm"
                                            onClick={() => handleApplyRecommendation(rec.id, rec.title)}
                                            disabled={isDone}
                                            className={cn(isDone && 'text-emerald-400')}
                                        >
                                            {isDone ? (
                                                <>
                                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                                    Auto-Fix Enqueued
                                                </>
                                            ) : (
                                                <>
                                                    Apply Optimization
                                                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
