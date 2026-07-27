import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '@/types';

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            selectedBrandId: 'brand-1',
            selectedModuleId: 'ai-visibility',
            theme: 'dark',
            setSelectedBrand: (brandId) => set({ selectedBrandId: brandId }),
            setSelectedModule: (moduleId) => set({ selectedModuleId: moduleId }),
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'dark' ? 'light' : 'dark',
                })),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'kasparro-store',
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
