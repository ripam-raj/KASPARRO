'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', icon, rightElement, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {icon && (
                    <div className="absolute left-3 flex items-center pointer-events-none text-surface-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    ref={ref}
                    className={cn(
                        'w-full bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg px-3 py-2 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200',
                        icon && 'pl-9',
                        rightElement && 'pr-9',
                        className
                    )}
                    {...props}
                />
                {rightElement && (
                    <div className="absolute right-3 flex items-center">
                        {rightElement}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
