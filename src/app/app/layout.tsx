'use client';

import { AppSidebar } from '@/components/layouts/AppSidebar';
import { AppHeader } from '@/components/layouts/AppHeader';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex text-surface-900 dark:text-surface-100">
            {/* Left Sidebar */}
            <AppSidebar />

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col pl-16 lg:pl-64 transition-all duration-300 min-w-0">
                <AppHeader />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
