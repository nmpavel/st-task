import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import type { UseProductsOptions, UseProductsResult } from "../types/use-products";
import { useDebouncedValue } from "./useDebouncedValue";

export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const {
    initialLimit = 12,
    maxRetries = 2,
    retryDelayMs = 500,
    searchDebounceMs = 350,
  } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const limit = Math.max(1, Number(searchParams.get("limit") ?? String(initialLimit)) || initialLimit);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const debouncedSearch = useDebouncedValue(search, searchDebounceMs);

  const productsQuery = useQuery({
    queryKey: ["products", page, limit, category, debouncedSearch],
    queryFn: () =>
      api.fetchProducts({
        page,
        limit,
        category,
        search: debouncedSearch,
      }),
    retry: maxRetries,
    retryDelay: (attemptIndex) => retryDelayMs * (attemptIndex + 1),
    placeholderData: keepPreviousData,
  });

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const totalPages = productsQuery.data?.totalPages ?? 0;
  const nextPage = useCallback(() => {
    const next = Math.min(page + 1, Math.max(totalPages, 1));
    updateParams({ page: String(next) });
  }, [page, totalPages, updateParams]);

  const prevPage = useCallback(() => {
    const next = Math.max(page - 1, 1);
    updateParams({ page: String(next) });
  }, [page, updateParams]);

  const safeSetPage = useCallback((nextPageValue: number) => {
    updateParams({ page: String(Math.max(1, nextPageValue)) });
  }, [updateParams]);

  const safeSetLimit = useCallback((nextLimitValue: number) => {
    updateParams({
      limit: String(Math.max(1, nextLimitValue)),
      page: "1",
    });
  }, [updateParams]);

  const safeSetCategory = useCallback((nextCategory?: string) => {
    updateParams({
      category: nextCategory || undefined,
      page: "1",
    });
  }, [updateParams]);

  const safeSetSearch = useCallback((nextSearch?: string) => {
    updateParams({
      search: nextSearch || undefined,
      page: "1",
    });
  }, [updateParams]);

  return useMemo(
    () => ({
      products: productsQuery.data?.data ?? [],
      loading: productsQuery.isPending,
      isFetching: productsQuery.isFetching,
      error: productsQuery.error instanceof Error ? productsQuery.error.message : null,
      page,
      limit,
      total: productsQuery.data?.total ?? 0,
      totalPages,
      category,
      search,
      setPage: safeSetPage,
      setLimit: safeSetLimit,
      setCategory: safeSetCategory,
      setSearch: safeSetSearch,
      nextPage,
      prevPage,
      retry: productsQuery.refetch,
      refetch: productsQuery.refetch,
    }),
    [
      productsQuery.data,
      productsQuery.error,
      productsQuery.isPending,
      productsQuery.isFetching,
      productsQuery.refetch,
      page,
      limit,
      totalPages,
      category,
      search,
      safeSetPage,
      safeSetLimit,
      safeSetCategory,
      safeSetSearch,
      nextPage,
      prevPage,
    ]
  );
}
