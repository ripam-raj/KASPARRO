'use client';

import { motion } from 'framer-motion';
import { cn, getScoreColor } from '@/lib/utils';

interface ScoreGaugeProps {
    score: number;
    maxScore?: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    label?: string;
    className?: string;
    animated?: boolean;
}

export function ScoreGauge({
    score,
    maxScore = 100,
    size = 'md',
    showLabel = true,
    label,
    className,
    animated = true,
}: ScoreGaugeProps) {
    const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const sizes = {
        sm: { width: 64, fontSize: 'text-lg', labelSize: 'text-xs', strokeWidth: 7 },
        md: { width: 104, fontSize: 'text-2xl', labelSize: 'text-xs', strokeWidth: 8 },
        lg: { width: 144, fontSize: 'text-4xl', labelSize: 'text-sm', strokeWidth: 9 },
    };

    const { width, fontSize, labelSize, strokeWidth } = sizes[size];
    const scoreColor = getScoreColor(score);

    return (
        <div className={cn('flex flex-col items-center select-none', className)}>
            <div className="relative flex items-center justify-center" style={{ width, height: width }}>
                <svg
                    className="transform -rotate-90 filter drop-shadow-sm"
                    width={width}
                    height={width}
                    viewBox="0 0 100 100"
                >
                    {/* Background track circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-surface-200/60 dark:text-surface-800/80"
                    />
                    {/* Progress stroke circle */}
                    {animated ? (
                        <motion.circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className={scoreColor}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                strokeDasharray: circumference,
                            }}
                        />
                    ) : (
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className={scoreColor}
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset,
                                transition: 'stroke-dashoffset 0.8s ease-out',
                            }}
                        />
                    )}
                </svg>
                {/* Score label text inside SVG */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={cn('font-extrabold tracking-tight', fontSize, scoreColor)}
                    >
                        {score}
                    </motion.span>
                </div>
            </div>
            {showLabel && label && (
                <span className={cn('mt-2 font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider', labelSize)}>
                    {label}
                </span>
            )}
        </div>
    );
}
