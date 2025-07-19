import type { FilterState } from "@/shared/types/types";
import { create } from "zustand";

/**
 * Хук для работы с отфильтрованными задачами
 */
export const useFilterStore = create<FilterState>((set) => ({
    status: '',
    category: '',
    priority: '',
    debouncedSearch: '',
    setDebouncedSearch: (debouncedSearch: string) => set({ debouncedSearch }),
    setStatus: (status) => set({ status }),
    setCategory: (category) => set({ category }),
    setPriority: (priority) => set({ priority }),
    resetFilters: () => set({ status: '', category: '', priority: '', debouncedSearch: '' }),
    resetStatus: () => set({ status: '' }),
    resetCategory: () => set({ category: '' }),
    resetPriority: () => set({ priority: '' }),
}));