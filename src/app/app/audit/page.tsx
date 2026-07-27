'use client';

import { AuditModuleList } from '@/components/features/AuditModuleList';
import { AuditModuleDetail } from '@/components/features/AuditModuleDetail';

export default function Audit() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          AI-SEO Audit
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Comprehensive analysis across 7 audit modules
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Module List Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <AuditModuleList />
        </div>

        {/* Module Details */}
        <div className="lg:col-span-8 xl:col-span-9">
          <AuditModuleDetail />
        </div>
      </div>
    </div>
  );
}
