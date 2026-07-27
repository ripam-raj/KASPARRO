import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { CommandPalette } from '@/components/features/CommandPalette';

export const metadata: Metadata = {
    title: 'Kasparro - AI-Native SEO & Brand Intelligence Dashboard',
    description:
        'AI-native SEO & Brand Intelligence platform for the AI-first search era. Optimize your brand visibility across ChatGPT, Gemini, Perplexity, and beyond.',
    keywords: ['AI SEO', 'Brand Intelligence', 'ChatGPT', 'Gemini', 'Perplexity', 'AI Search', 'SaaS Dashboard'],
    authors: [{ name: 'Kasparro' }],
    openGraph: {
        title: 'Kasparro - AI-Native SEO & Brand Intelligence',
        description: 'AI-native SEO & Brand Intelligence platform for the AI-first search era.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 antialiased selection:bg-primary-500/30 selection:text-white">
                <ToastProvider>
                    {children}
                    <CommandPalette />
                </ToastProvider>
            </body>
        </html>
    );
}
