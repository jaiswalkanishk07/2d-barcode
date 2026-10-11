/**
 * Shared configuration constants for the 2D Barcode app.
 */

// Maximum character length for QR payloads (prevents degenerate oversized codes)
export const MAX_INPUT_LENGTH = 1000;

// Available QR sizes in pixels (exported for the size selector)
export const SIZE_OPTIONS = [256, 384, 512, 768, 1024];

// Default generation options
export const DEFAULT_OPTIONS = {
  size: 512,
  errorCorrectionLevel: 'M', // L, M, Q, H — M is a good balance
  colorDark: '#000000',
  colorLight: '#ffffff',
  margin: 2, // quiet zone in modules
};

// Error correction level labels (higher = more damage tolerance, denser QR)
export const EC_LEVELS = [
  { value: 'L', label: 'L — Low (7%)' },
  { value: 'M', label: 'M — Medium (15%)' },
  { value: 'Q', label: 'Q — Quartile (25%)' },
  { value: 'H', label: 'H — High (30%)' },
];

// localStorage key for the QR history
export const HISTORY_STORAGE_KEY = '2d-barcode:history:v1';

// Maximum number of history entries kept
export const MAX_HISTORY_ITEMS = 20;