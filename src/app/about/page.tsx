'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Rocket, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-surface-950 to-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Kasparro
            </h1>
            <p className="text-lg text-surface-400 max-w-3xl mx-auto">
              We&apos;re building the future of SEO for an AI-first world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <Target className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-400">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-6">
                Making Brands Visible in AI-Generated Responses
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 mb-6">
                Search is undergoing its biggest transformation since Google.
                Users are increasingly turning to ChatGPT, Gemini, Perplexity,
                and other AI assistants for information. Traditional SEO
                metrics like rankings and click-through rates are becoming
                less relevant.
              </p>
              <p className="text-lg text-surface-600 dark:text-surface-400">
                Kasparro is building the tools brands need to understand,
                measure, and optimize their visibility in this new paradigm.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-3xl p-8 border border-primary-500/20"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '2024', label: 'Founded' },
                  { value: '7', label: 'Audit Modules' },
                  { value: '3+', label: 'AI Platforms' },
                  { value: '50+', label: 'Signals Tracked' },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-surface-50 dark:bg-surface-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <Lightbulb className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium text-accent-purple">Product Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Data-Driven, AI-Native
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Our approach is grounded in rigorous data analysis and purpose-built
              for the AI era.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Entity-Centric Thinking',
                description: 'AI systems understand entities and relationships, not just keywords. We analyze how AI perceives your brand as an entity.',
              },
              {
                title: 'Cross-Platform Intelligence',
                description: 'Different AI platforms have different behaviors. We track and optimize for ChatGPT, Gemini, Perplexity, and emerging players.',
              },
              {
                title: 'Actionable Insights',
                description: 'Every metric maps to a concrete action. We don\'t just show scores—we show exactly what to do to improve.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white dark:bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 mb-6">
                <Rocket className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm font-medium text-accent-cyan">Vision for AI-First Search</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-6">
                The Future of Brand Discovery
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
                We believe the next decade will see AI become the primary
                interface for information discovery. Search engines will evolve
                into AI assistants that synthesize, recommend, and make
                decisions for users.
              </p>
              <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
                Brands that understand how to be visible, trusted, and cited
                by these AI systems will thrive. Those that don&apos;t will
                become invisible to a growing share of their audience.
              </p>
              <p className="text-xl font-semibold text-surface-900 dark:text-white">
                Kasparro is here to ensure your brand leads in this transition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface-50 dark:bg-surface-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">The Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-6">
              Built by Engineers & SEO Experts
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Our team combines deep expertise in AI/ML, search engine
              optimization, and enterprise software development. We&apos;ve
              built and scaled products at leading tech companies and bring
              that experience to solving the AI-SEO challenge.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
