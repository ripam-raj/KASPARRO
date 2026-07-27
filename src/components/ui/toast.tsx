'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
    id: string;
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
}

interface ToastContextType {
    toast: (item: Omit<ToastItem, 'id'>) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback(
        ({ title, description, type = 'info', duration = 4000 }: Omit<ToastItem, 'id'>) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast: ToastItem = { id, title, description, type, duration };

            setToasts((prev) => [...prev.slice(-4), newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        },
        [removeToast]
    );

    return (
        <ToastContext.Provider value={{ toast, removeToast }}>
            {children}
            <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
                <AnimatePresence mode="sync">
                    {toasts.map((t) => (
                        <ToastCard key={t.id} toast={t} onClose={() => removeToast(t.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
        error: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
        info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
    };

    const borderColors = {
        success: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-100',
        error: 'border-red-500/30 bg-red-950/40 text-red-100',
        warning: 'border-amber-500/30 bg-amber-950/40 text-amber-100',
        info: 'border-blue-500/30 bg-blue-950/40 text-blue-100',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={cn(
                'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl shadow-black/50',
                borderColors[toast.type || 'info']
            )}
        >
            {icons[toast.type || 'info']}
            <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-sm leading-tight text-white">{toast.title}</h5>
                {toast.description && (
                    <p className="text-xs text-surface-300 mt-1 leading-relaxed">{toast.description}</p>
                )}
            </div>
            <button
                onClick={onClose}
                className="text-surface-400 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
