import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
}

export function getScoreBgColor(score: number): string {
    if (score >= 90) return 'bg-green-500/10 border-green-500/20';
    if (score >= 75) return 'bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
    if (score >= 40) return 'bg-orange-500/10 border-orange-500/20';
    return 'bg-red-500/10 border-red-500/20';
}

export function getStatusColor(status: string): string {
    switch (status) {
        case 'excellent':
            return 'text-green-500 bg-green-500/10';
        case 'good':
            return 'text-emerald-400 bg-emerald-500/10';
        case 'moderate':
            return 'text-yellow-500 bg-yellow-500/10';
        case 'poor':
            return 'text-orange-500 bg-orange-500/10';
        case 'critical':
            return 'text-red-500 bg-red-500/10';
        default:
            return 'text-gray-500 bg-gray-500/10';
    }
}

export function getSeverityColor(severity: string): string {
    switch (severity) {
        case 'critical':
            return 'text-red-500 bg-red-500/10 border-red-500/20';
        case 'warning':
            return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        case 'info':
            return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        default:
            return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
}

export function getPriorityColor(priority: string): string {
    switch (priority) {
        case 'high':
            return 'text-red-400 bg-red-500/10';
        case 'medium':
            return 'text-yellow-400 bg-yellow-500/10';
        case 'low':
            return 'text-blue-400 bg-blue-500/10';
        default:
            return 'text-gray-400 bg-gray-500/10';
    }
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
}
