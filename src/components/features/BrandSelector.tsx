'use client';

import { useAppStore } from '@/store/app-store';
import { ChevronDown, Search, Check, Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import brandsData from '@/data/brands.json';
import type { Brand } from '@/types';

const brands = brandsData.brands as Brand[];

export function BrandSelector() {
    const { selectedBrandId, setSelectedBrand } = useAppStore();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const selectedBrand = brands.find((b) => b.id === selectedBrandId) || brands[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectBrand = (brand: Brand) => {
        setSelectedBrand(brand.id);
        setIsOpen(false);
        setSearchQuery('');
        toast({
            title: `Active Brand Changed`,
            description: `Now monitoring AI metrics for ${brand.name}`,
            type: 'success',
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select active brand"
                className="flex items-center gap-3 px-3.5 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl hover:border-surface-300 dark:hover:border-surface-700 transition-all duration-200 min-w-[220px] shadow-sm group cursor-pointer"
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                    {selectedBrand.name.charAt(0)}
                </div>
                <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                        {selectedBrand.name}
                    </div>
                    <div className="text-xs text-surface-400 truncate">{selectedBrand.domain}</div>
                </div>
                <ChevronDown
                    className={cn('w-4 h-4 text-surface-400 transition-transform duration-200', isOpen && 'rotate-180')}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full right-0 sm:left-0 mt-2 w-72 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="px-3 pb-2 border-b border-surface-200 dark:border-surface-800">
                            <div className="relative flex items-center">
                                <Search className="w-3.5 h-3.5 absolute left-2.5 text-surface-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter brands..."
                                    className="w-full pl-8 pr-3 py-1.5 bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60 rounded-lg text-xs text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Brands List */}
                        <div className="max-h-60 overflow-y-auto py-1">
                            {filteredBrands.length === 0 ? (
                                <div className="px-4 py-3 text-xs text-center text-surface-400">
                                    No brands found matching &quot;{searchQuery}&quot;
                                </div>
                            ) : (
                                filteredBrands.map((brand) => {
                                    const isSelected = brand.id === selectedBrandId;
                                    return (
                                        <button
                                            key={brand.id}
                                            onClick={() => handleSelectBrand(brand)}
                                            role="option"
                                            aria-selected={isSelected}
                                            className={cn(
                                                'w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-surface-50 dark:hover:bg-surface-800/80 transition-colors',
                                                isSelected && 'bg-primary-500/10 text-primary-400'
                                            )}
                                        >
                                            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                                {brand.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-semibold text-surface-900 dark:text-white truncate">
                                                    {brand.name}
                                                </div>
                                                <div className="text-[11px] text-surface-400 truncate">
                                                    {brand.domain}
                                                </div>
                                            </div>
                                            {isSelected && <Check className="w-4 h-4 text-primary-400 flex-shrink-0" />}
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {/* Add Brand Action */}
                        <div className="px-2 pt-2 border-t border-surface-200 dark:border-surface-800">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    toast({
                                        title: 'Add New Brand',
                                        description: 'Brand onboarding drawer is active in Enterprise tier.',
                                        type: 'info',
                                    });
                                }}
                                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-surface-300 dark:border-surface-700 text-xs font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Connect New Brand</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
