'use client';

import { BrandSelector } from '@/components/features/BrandSelector';
import { SnapshotCards } from '@/components/features/SnapshotCards';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Monitor your brand&apos;s AI-SEO performance
          </p>
        </div>
        <BrandSelector />
      </div>

      {/* Metrics */}
      <SnapshotCards />
    </div>
  );
}
