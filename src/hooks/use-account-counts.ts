"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ProgramId } from "@/lib/config";

interface UseAccountCountsResult {
  counts: Record<string, number>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching account counts per discriminator/type
 *
 * Used for filtering sidebar to hide account types with 0 accounts.
 */
export function useAccountCounts(programId: ProgramId): UseAccountCountsResult {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cache counts per program to avoid refetching on navigation
  const cacheRef = useRef<Map<ProgramId, Record<string, number>>>(new Map());

  const fetchCounts = useCallback(async () => {
    // Check cache first
    const cached = cacheRef.current.get(programId);
    if (cached) {
      setCounts(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/account-counts?program=${programId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch account counts");
      }

      const data = await res.json();
      const fetchedCounts = data.counts ?? {};

      // Cache the results
      cacheRef.current.set(programId, fetchedCounts);
      setCounts(fetchedCounts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [programId]);

  // Fetch on mount and when program changes
  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  // Clear cache when program changes (fetch will populate it)
  useEffect(() => {
    setCounts({});
  }, [programId]);

  return {
    counts,
    loading,
    error,
    refetch: fetchCounts,
  };
}
