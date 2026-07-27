'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import {
    Database,
    Cpu,
    Eye,
    FileText,
    Award,
    Settings,
    Building2,
    TrendingUp,
    Link as LinkIcon,
    BarChart3,
    FileOutput,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Layers,
} from 'lucide-react';

const stages = [
    {
        id: 'input',
        name: 'Stage 1: Input Assembler',
        description: 'Collects and normalizes brand assets, URLs, keyword lists, and competitive context',
        color: 'border-blue-500/30 bg-blue-500/5',
        headerBg: 'bg-blue-500',
        textColor: 'text-blue-400',
        icon: Database,
        items: [
            { name: 'Brand Identity', detail: 'Logos, domain profile, entity schemas, metadata' },
            { name: 'Crawled Sitemaps', detail: 'Target landing pages & RSS index feeds' },
            { name: 'Keyword Matrix', detail: 'Branded & non-branded search query intent' },
            { name: 'Competitor Domains', detail: 'Benchmarked market competitor URLs' },
            { name: 'Historical Telemetry', detail: 'Past audit scores & citation frequency' },
        ],
    },
    {
        id: 'context',
        name: 'Stage 2: Context Pack',
        description: 'Enriches inputs with real-time AI platform API telemetry and SERP signals',
        color: 'border-purple-500/30 bg-purple-500/5',
        headerBg: 'bg-purple-500',
        textColor: 'text-purple-400',
        icon: Cpu,
        items: [
            { name: 'ChatGPT API Stream', detail: 'OpenAI GPT-4o citation & entity confidence' },
            { name: 'Google Gemini Pro', detail: 'Gemini Search Grounding & Knowledge Graph' },
            { name: 'Perplexity Engine', detail: 'Sonar LLM real-time web source citations' },
            { name: 'Entity Graph DB', detail: 'Semantic relationship linking' },
            { name: 'SERP Feature Extractor', detail: 'AI Overview snippet parsing' },
        ],
    },
    {
        id: 'modules',
        name: 'Stage 3: 7 Audit Modules',
        description: 'Processes data through 7 parallel diagnostic AI engines',
        color: 'border-primary-500/30 bg-primary-500/5',
        headerBg: 'bg-primary-500',
        textColor: 'text-primary-400',
        icon: BarChart3,
        items: [
            { name: 'AI Visibility', detail: 'Overall engine capture score', icon: Eye },
            { name: 'Content Quality', detail: 'AI-favored format & accuracy', icon: FileText },
            { name: 'E-E-A-T Assessment', detail: 'Authority & trust evaluation', icon: Award },
            { name: 'Technical SEO', detail: 'Crawling & structured schema', icon: Settings },
            { name: 'Brand Entity', detail: 'Knowledge graph entity mapping', icon: Building2 },
            { name: 'Competitive', detail: 'Share-of-voice vs competitors', icon: TrendingUp },
            { name: 'Citations Analysis', detail: 'LLM reference frequency', icon: LinkIcon },
        ],
    },
    {
        id: 'output',
        name: 'Stage 4: Output Surfaces',
        description: 'Delivers actionable intelligence through multiple channels',
        color: 'border-emerald-500/30 bg-emerald-500/5',
        headerBg: 'bg-emerald-500',
        textColor: 'text-emerald-400',
        icon: FileOutput,
        items: [
            { name: 'Executive Dashboard', detail: 'Real-time telemetry & score tracking' },
            { name: 'JSON & CSV Export', detail: 'Programmatic raw data download' },
            { name: 'Auto-Fix Recommendations', detail: 'Prioritized optimization action plan' },
            { name: 'Alert Notifications', detail: 'Webhook & email anomaly alerts' },
        ],
    },
];

export function ArchitectureView() {
    const [selectedStage, setSelectedStage] = useState<string | null>('modules');
    const { toast } = useToast();

    const activeStageObj = stages.find((s) => s.id === selectedStage) || stages[2];

    const handleRunStagePipeline = (stageName: string) => {
        toast({
            title: `Pipeline Execution Started`,
            description: `Simulating data flow through ${stageName}...`,
            type: 'info',
        });
    };

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
                <Badge variant="gradient" size="md" dot animatePulse>
                    Enterprise AI Pipeline
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
                    System Architecture & Data Pipeline
                </h1>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    Explore how Kasparro ingest, enriches, audits, and delivers AI-first SEO intelligence through a 4-stage pipeline.
                </p>
            </div>

            {/* Pipeline Stage Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    const isSelected = stage.id === selectedStage;

                    return (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => setSelectedStage(stage.id)}
                            className="cursor-pointer"
                        >
                            <Card
                                className={`h-full border-2 transition-all duration-300 ${stage.color} ${
                                    isSelected ? 'ring-2 ring-primary-500 shadow-2xl scale-[1.02]' : 'opacity-90 hover:opacity-100 hover:shadow-xl'
                                }`}
                            >
                                <CardHeader className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-2xl ${stage.headerBg} flex items-center justify-center text-white shadow-lg`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <Badge variant={isSelected ? 'gradient' : 'outline'} size="sm">
                                            Stage 0{index + 1}
                                        </Badge>
                                    </div>

                                    <CardTitle className="text-lg font-bold text-surface-900 dark:text-white">
                                        {stage.name.split(': ')[1]}
                                    </CardTitle>
                                    <CardDescription className="text-xs mt-2 leading-relaxed">
                                        {stage.description}
                                    </CardDescription>

                                    {/* Item List */}
                                    <div className="mt-4 pt-4 border-t border-surface-200/50 dark:border-surface-800/50 space-y-2">
                                        {stage.items.slice(0, 4).map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-300">
                                                <span className={`w-1.5 h-1.5 rounded-full ${stage.headerBg}`} />
                                                <span className="font-medium truncate">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Pipeline Data Flow Telemetry Indicator */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-2xl bg-surface-100 dark:bg-surface-900/60 border border-surface-200 dark:border-surface-800">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-surface-900 dark:text-white">
                            Selected: {activeStageObj.name}
                        </div>
                        <div className="text-xs text-surface-400">
                            {activeStageObj.items.length} subprocess nodes configured in stage stream.
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => handleRunStagePipeline(activeStageObj.name)}>
                        Simulate Data Stream
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                </div>
            </div>

            {/* Stage Detail Subprocesses Drawer */}
            <Card className="border-surface-200 dark:border-surface-800 shadow-xl overflow-hidden">
                <CardHeader className="bg-surface-50 dark:bg-surface-900/40 border-b border-surface-200 dark:border-surface-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-primary-400" />
                            <CardTitle className="text-base">
                                Subprocess Telemetry: {activeStageObj.name}
                            </CardTitle>
                        </div>
                        <Badge variant="outline" size="sm" className="font-mono">
                            Status: Active
                        </Badge>
                    </div>
                </CardHeader>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeStageObj.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1 hover:border-primary-500/50 transition-colors shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-surface-900 dark:text-white">
                                        {item.name}
                                    </span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                                    {item.detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
