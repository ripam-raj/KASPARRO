'use client';

import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    animatePulse?: boolean;
}

export function Badge({
    className,
    variant = 'default',
    size = 'md',
    dot = false,
    animatePulse = false,
    children,
    ...props
}: BadgeProps) {
    const variants = {
        default: 'bg-surface-200 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border border-surface-300 dark:border-surface-700/50',
        success: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
        danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
        info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
        outline: 'bg-transparent border border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-400',
        gradient: 'bg-gradient-to-r from-primary-500/20 via-accent-purple/20 to-accent-cyan/20 text-white border border-primary-500/30',
    };

    const dotColors = {
        default: 'bg-surface-500',
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
        info: 'bg-blue-500',
        outline: 'bg-surface-400',
        gradient: 'bg-cyan-400',
    };

    const sizes = {
        sm: 'text-[10px] px-2 py-0.5 gap-1 font-semibold uppercase tracking-wider',
        md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
        lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full transition-colors',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {dot && (
                <span className="relative flex h-2 w-2">
                    {animatePulse && (
                        <span
                            className={cn(
                                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                                dotColors[variant]
                            )}
                        />
                    )}
                    <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
                </span>
            )}
            {children}
        </span>
    );
}
