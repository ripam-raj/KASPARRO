'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScoreGauge } from '@/components/ui/score-gauge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { Eye, Shield, Search, Clock, RefreshCw, TrendingUp, Sparkles, Layers, FileCheck } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import dashboardData from '@/data/dashboard.json';
import type { DashboardSnapshot } from '@/types';

const dashboards = dashboardData.dashboards as Record<string, DashboardSnapshot>;

export function SnapshotCards() {
    const { selectedBrandId } = useAppStore();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { toast } = useToast();

    const snapshot = dashboards[selectedBrandId || 'brand-1'] || dashboards['brand-1'];

    const handleRefreshAudit = () => {
        setIsRefreshing(true);
        toast({
            title: 'Audit In Progress',
            description: 'Fetching real-time platform signals from ChatGPT, Gemini & Perplexity...',
            type: 'info',
        });

        setTimeout(() => {
            setIsRefreshing(false);
            toast({
                title: 'Audit Synchronization Complete',
                description: 'Latest brand health metrics updated successfully.',
                type: 'success',
            });
        }, 1200);
    };

    if (!snapshot) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-44 rounded-2xl" />
                    <Skeleton className="h-44 rounded-2xl" />
                    <Skeleton className="h-44 rounded-2xl" />
                </div>
            </div>
        );
    }

    const metrics = [
        {
            id: 'ai-visibility',
            title: 'AI Visibility Score',
            value: snapshot.aiVisibilityScore,
            icon: Eye,
            trend: '+5.4% vs last week',
            trendUp: true,
            description: 'Aggregate presence across AI answer engines',
            accent: 'from-blue-500/20 to-cyan-500/20',
        },
        {
            id: 'trust',
            title: 'Trust / E-E-A-T Score',
            value: snapshot.eeeatScore,
            icon: Shield,
            trend: '+3.1% vs last week',
            trendUp: true,
            description: 'Experience, Expertise, Authoritativeness & Trust',
            accent: 'from-amber-500/20 to-orange-500/20',
        },
        {
            id: 'keywords',
            title: 'Keyword Coverage',
            value: snapshot.keywordCoverage,
            icon: Search,
            trend: `${snapshot.nonBrandedKeywords} / ${snapshot.totalKeywords} non-branded`,
            trendUp: true,
            description: 'Organic search query capture in LLM contexts',
            accent: 'from-purple-500/20 to-pink-500/20',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Executive Status Banner */}
            <Card className="overflow-hidden border-0 bg-gradient-to-r from-surface-900 via-primary-950 to-surface-900 shadow-2xl relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#5a6cf4_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Badge variant="gradient" dot animatePulse size="lg">
                                    Live Intelligence Active
                                </Badge>
                                <Badge
                                    variant={
                                        snapshot.overallHealth === 'excellent' || snapshot.overallHealth === 'good'
                                            ? 'success'
                                            : snapshot.overallHealth === 'moderate'
                                                ? 'warning'
                                                : 'danger'
                                    }
                                    className="capitalize"
                                >
                                    Health: {snapshot.overallHealth}
                                </Badge>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Brand Performance Snapshot
                            </h2>
                            <p className="text-surface-300 text-sm max-w-xl">
                                Real-time AI engine citations, knowledge graph alignment, and sentiment telemetry.
                            </p>
                        </div>

                        {/* Action Controls */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="gradient"
                                size="md"
                                onClick={handleRefreshAudit}
                                isLoading={isRefreshing}
                                className="shadow-lg shadow-primary-600/30"
                            >
                                <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Run On-Demand Sync
                            </Button>
                        </div>
                    </div>

                    {/* Metadata Footer bar */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-surface-400">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-primary-400" />
                            <span>Last Full Telemetry Sync: <strong className="text-surface-200">{formatRelativeTime(snapshot.lastAuditDate)}</strong></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                <Sparkles className="w-3.5 h-3.5" /> 3 AI Engines Tracked
                            </span>
                            <span className="flex items-center gap-1.5 text-primary-300 font-medium">
                                <Layers className="w-3.5 h-3.5" /> 7 Audit Modules Active
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* High Density Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:border-primary-500/40 hover:shadow-xl dark:hover:shadow-primary-950/40 transition-all duration-300 group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.accent} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-5 h-5 text-primary-400" />
                                            </div>
                                            <CardTitle className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                                                {metric.title}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between gap-4 mt-2">
                                        <ScoreGauge score={metric.value} size="md" showLabel={false} />
                                        <div className="flex-1 text-right space-y-1">
                                            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-emerald-500">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                <span>{metric.trend}</span>
                                            </div>
                                            <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-2 leading-relaxed">
                                                {metric.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
