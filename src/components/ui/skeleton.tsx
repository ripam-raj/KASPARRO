import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'circular' | 'rounded';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-surface-200/80 dark:bg-surface-800/80',
                variant === 'circular' && 'rounded-full',
                variant === 'rounded' && 'rounded-xl',
                variant === 'default' && 'rounded-md',
                className
            )}
            {...props}
        />
    );
}
