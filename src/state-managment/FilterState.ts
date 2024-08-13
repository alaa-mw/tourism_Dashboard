import { create } from 'zustand';

export interface FilterState {
  role_id: string;
  most_recent: number;
  by_name: "asc" | null;
  user_type:"banned" |null;
  setFilters: (newFilters: Partial<FilterState>) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  role_id: '0',
  most_recent: 0,
  by_name: null,
  user_type: null,
  setFilters: (newFilters) => set((state) => ({ ...state, ...newFilters })),
}));

export default useFilterStore;
