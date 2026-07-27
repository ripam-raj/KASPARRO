// Brand entity
export interface Brand {
    id: string;
    name: string;
    domain: string;
    logo?: string | null;
}

// Audit issue/flag
export interface AuditIssue {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
}

// Audit recommendation
export interface AuditRecommendation {
    id: string;
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: string;
}

// Audit insight
export interface AuditInsight {
    id: string;
    title: string;
    value: string | number;
    trend?: 'up' | 'down' | 'stable';
    description?: string;
}

// Audit module
export interface AuditModule {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: string;
    score: number;
    maxScore: number;
    status: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
    insights: AuditInsight[];
    issues: AuditIssue[];
    recommendations: AuditRecommendation[];
}

// Dashboard snapshot metrics
export interface DashboardSnapshot {
    brandId: string;
    aiVisibilityScore: number;
    trustScore: number;
    eeeatScore: number;
    keywordCoverage: number;
    nonBrandedKeywords: number;
    totalKeywords: number;
    lastAuditDate: string;
    overallHealth: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
}

// Architecture node for visualization
export interface ArchitectureNode {
    id: string;
    type: 'input' | 'processor' | 'module' | 'output';
    name: string;
    description: string;
    inputs?: string[];
    outputs?: string[];
}

// Architecture pipeline
export interface ArchitecturePipeline {
    inputAssembler: ArchitectureNode;
    contextPack: ArchitectureNode;
    modules: ArchitectureNode[];
    outputSurfaces: ArchitectureNode[];
}

// Module overview for public pages
export interface ModuleOverview {
    id: string;
    name: string;
    description: string;
    icon: string;
    features: string[];
}

// App state for Zustand store
export interface AppState {
    selectedBrandId: string | null;
    selectedModuleId: string | null;
    theme: 'light' | 'dark';
    setSelectedBrand: (brandId: string) => void;
    setSelectedModule: (moduleId: string) => void;
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}
