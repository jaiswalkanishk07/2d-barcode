import { useState, useCallback, useEffect } from 'react';
import { HISTORY_STORAGE_KEY, MAX_HISTORY_ITEMS } from '../constants.js';

/**
 * localStorage-backed history of generated QR codes.
 * Each entry: { id, text, dataURL, createdAt, options }
 */
export function useHistory() {
  const [history, setHistory] = useState(() => loadHistory());

  // Persist to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (err) {
      console.warn('Could not persist history:', err);
    }
  }, [history]);

  /**
   * Adds a new entry (newest first) and trims to MAX_HISTORY_ITEMS.
   * Skips exact duplicates of the same text + options.
   */
  const addEntry = useCallback((text, dataURL, options) => {
    setHistory((prev) => {
      const dup = prev.some(
        (e) =>
          e.text === text &&
          e.options?.size === options.size &&
          e.options?.errorCorrectionLevel === options.errorCorrectionLevel,
      );
      if (dup) return prev;

      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        dataURL,
        createdAt: new Date().toISOString(),
        options: { ...options },
      };
      return [entry, ...prev].slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const removeEntry = useCallback((id) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
}

/** Reads history from localStorage, tolerating missing/corrupt data. */
function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}