'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950" />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(90, 108, 244, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(90, 108, 244, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-primary-400" />
                        <span className="text-sm font-medium text-primary-400">
                            AI-Native SEO Platform
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        SEO for the{' '}
                        <span className="gradient-text">AI-First</span>
                        <br />
                        Search Era
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-surface-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Optimize your brand visibility across ChatGPT, Gemini, Perplexity, and the next
                        generation of AI search engines. Traditional SEO is evolving—stay ahead.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/app/audit">
                            <Button variant="gradient" size="lg" className="group">
                                Run AI-SEO Audit
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/platform">
                            <Button variant="outline" size="lg" className="border-surface-700 text-surface-300 hover:bg-surface-800">
                                Learn How It Works
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { value: '7', label: 'Audit Modules' },
                        { value: '50+', label: 'AI Signals Tracked' },
                        { value: '3', label: 'AI Platforms' },
                        { value: '100%', label: 'AI-Native' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-surface-500">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
