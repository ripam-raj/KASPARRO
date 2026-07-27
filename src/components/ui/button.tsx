'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>>,
        HTMLMotionProps<'button'> {
    variant?: 'default' | 'outline' | 'ghost' | 'link' | 'gradient' | 'danger' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size = 'md',
            children,
            isLoading = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-surface-950 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

        const variants = {
            default:
                'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 shadow-md shadow-primary-600/20 border border-primary-500/30',
            secondary:
                'bg-surface-800 text-white hover:bg-surface-700 active:bg-surface-900 border border-surface-700 shadow-sm',
            outline:
                'border border-surface-200 dark:border-surface-800 bg-white/50 dark:bg-surface-900/50 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-surface-100 backdrop-blur-sm',
            ghost:
                'bg-transparent hover:bg-surface-100 dark:hover:bg-surface-800/80 text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white',
            link: 'bg-transparent underline-offset-4 hover:underline text-primary-500 p-0 h-auto',
            gradient:
                'bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan text-white hover:opacity-95 shadow-lg shadow-primary-600/25 border border-white/20',
            danger:
                'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 shadow-md shadow-red-600/20 border border-red-500/30',
        };

        const sizes = {
            sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
            md: 'text-sm px-4 py-2 gap-2 h-10',
            lg: 'text-base px-6 py-3 gap-2.5 h-12',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.975 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>Loading...</span>
                    </span>
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
