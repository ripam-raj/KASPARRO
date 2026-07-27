'use client';

import { motion } from 'framer-motion';
import { Bot, Search, Zap } from 'lucide-react';

export function WhyAiSeo() {
    const differences = [
        {
            traditional: 'Optimizes for Google\'s algorithm',
            aiFirst: 'Optimizes for AI understanding and synthesis',
            icon: Bot,
        },
        {
            traditional: 'Focuses on rankings and CTR',
            aiFirst: 'Focuses on citations and AI visibility',
            icon: Search,
        },
        {
            traditional: 'Keyword-centric approach',
            aiFirst: 'Entity and context-centric approach',
            icon: Zap,
        },
    ];

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
                        Why AI-SEO is Different
                    </h2>
                    <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                        The shift from traditional search to AI-first search requires a
                        fundamental rethinking of SEO strategy.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {differences.map((diff, index) => {
                        const Icon = diff.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-surface-900 rounded-2xl p-6 border border-surface-200 dark:border-surface-800"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center mb-6">
                                    <Icon className="w-6 h-6 text-primary-500" />
                                </div>

                                <div className="space-y-4">
                                    <div className="pb-4 border-b border-surface-200 dark:border-surface-800">
                                        <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                                            Traditional SEO
                                        </span>
                                        <p className="mt-2 text-surface-600 dark:text-surface-400">
                                            {diff.traditional}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-green-500 uppercase tracking-wider">
                                            AI-First SEO
                                        </span>
                                        <p className="mt-2 text-surface-900 dark:text-white font-medium">
                                            {diff.aiFirst}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
