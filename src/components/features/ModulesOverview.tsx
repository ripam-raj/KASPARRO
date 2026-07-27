'use client';

import { motion } from 'framer-motion';
import {
    Eye,
    FileText,
    Award,
    Settings,
    Building2,
    TrendingUp,
    Link as LinkIcon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const modules = [
    {
        id: 'ai-visibility',
        name: 'AI Visibility',
        description: 'Track how often your brand appears in AI-generated responses across platforms.',
        icon: Eye,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'content-quality',
        name: 'Content Quality',
        description: 'Analyze content against AI-preferred formats, depth, and accuracy signals.',
        icon: FileText,
        color: 'from-purple-500 to-pink-500',
    },
    {
        id: 'eeat',
        name: 'E-E-A-T Assessment',
        description: 'Evaluate Experience, Expertise, Authoritativeness, and Trustworthiness for AI credibility.',
        icon: Award,
        color: 'from-amber-500 to-orange-500',
    },
    {
        id: 'technical-seo',
        name: 'Technical SEO',
        description: 'Audit technical factors affecting AI crawling and content understanding.',
        icon: Settings,
        color: 'from-green-500 to-emerald-500',
    },
    {
        id: 'brand-entity',
        name: 'Brand Entity',
        description: 'Measure how well AI systems understand and associate your brand entity.',
        icon: Building2,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        id: 'competitive',
        name: 'Competitive Landscape',
        description: 'Analyze AI visibility relative to competitors and market positioning.',
        icon: TrendingUp,
        color: 'from-rose-500 to-red-500',
    },
    {
        id: 'citations',
        name: 'Citations Analysis',
        description: 'Track how AI systems cite and reference your content as authoritative sources.',
        icon: LinkIcon,
        color: 'from-cyan-500 to-blue-500',
    },
];

export function ModulesOverview() {
    return (
        <section className="py-24 bg-surface-50 dark:bg-surface-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                        7 Comprehensive Audit Modules
                    </h2>
                    <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                        Each module analyzes a critical dimension of your AI search visibility,
                        providing actionable insights to improve your brand&apos;s presence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => {
                        const Icon = module.icon;
                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg dark:hover:shadow-primary-500/5 transition-all duration-300 group cursor-pointer">
                                    <CardHeader>
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">{module.name}</CardTitle>
                                        <CardDescription className="text-base mt-2">
                                            {module.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
