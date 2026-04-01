import type { Product } from "./product";

export interface UseProductsOptions {
  initialLimit?: number;
  maxRetries?: number;
  retryDelayMs?: number;
  searchDebounceMs?: number;
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  isFetching: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  category?: string;
  search?: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setCategory: (category?: string) => void;
  setSearch: (search?: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  retry: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
}
