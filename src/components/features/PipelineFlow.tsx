'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Database, Cpu, BarChart3, FileOutput } from 'lucide-react';

const pipelineSteps = [
    {
        id: 'input',
        title: 'Input Assembler',
        description: 'Collect brand data, URLs, keywords, and competitive context',
        icon: Database,
        items: ['Brand Assets', 'Target Keywords', 'Competitor List', 'Historical Data'],
    },
    {
        id: 'context',
        title: 'Context Pack',
        description: 'Enrich inputs with AI platform signals and market intelligence',
        icon: Cpu,
        items: ['AI Platform APIs', 'Search Trends', 'Entity Graphs', 'SERP Analysis'],
    },
    {
        id: 'modules',
        title: 'Audit Modules',
        description: 'Process through 7 specialized AI-SEO analysis modules',
        icon: BarChart3,
        items: ['Visibility', 'Content', 'E-E-A-T', 'Technical', 'Entity', 'Competitive', 'Citations'],
    },
    {
        id: 'output',
        title: 'Output Surfaces',
        description: 'Deliver actionable insights and recommendations',
        icon: FileOutput,
        items: ['Dashboard', 'Reports', 'Alerts', 'API Access'],
    },
];

export function PipelineFlow() {
    return (
        <section className="py-24 bg-white dark:bg-surface-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                        How Kasparro Works
                    </h2>
                    <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                        A systematic pipeline that transforms raw brand data into actionable
                        AI-SEO intelligence through four key stages.
                    </p>
                </motion.div>

                {/* Desktop Pipeline */}
                <div className="hidden lg:block">
                    <div className="flex items-start justify-between gap-4">
                        {pipelineSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="flex-1 relative"
                                >
                                    <div className="bg-surface-50 dark:bg-surface-900 rounded-2xl p-6 border border-surface-200 dark:border-surface-800 h-full">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center mb-4">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
                                            {step.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {step.items.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm text-surface-500 dark:text-surface-500 flex items-center gap-2"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Arrow */}
                                    {index < pipelineSteps.length - 1 && (
                                        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="w-6 h-6 text-primary-500" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Pipeline */}
                <div className="lg:hidden space-y-6">
                    {pipelineSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="bg-surface-50 dark:bg-surface-900 rounded-2xl p-6 border border-surface-200 dark:border-surface-800">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                                                {step.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {step.items.map((item, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2 py-1 rounded-full bg-surface-200 dark:bg-surface-800 text-surface-600 dark:text-surface-400"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Arrow */}
                                {index < pipelineSteps.length - 1 && (
                                    <div className="flex justify-center py-2">
                                        <ArrowRight className="w-5 h-5 text-primary-500 rotate-90" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
