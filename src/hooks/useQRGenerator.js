import { useState, useEffect, useCallback } from 'react';
import { generateQRDataURL } from '../lib/qr.js';
import { DEFAULT_OPTIONS, MAX_INPUT_LENGTH } from '../constants.js';

/**
 * Core hook managing QR generation state:
 * - input text + validation error
 * - generation options (size, EC level, colors, margin)
 * - async QR data URL generation with loading/error states
 */
export function useQRGenerator() {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [qrDataURL, setQrDataURL] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');

  // Reset input error as the user types
  useEffect(() => {
    if (inputError) setInputError('');
  }, [input, inputError]);

  /**
   * Validates the input. Returns an error string, or '' if valid.
   * Trimmed non-empty + respects MAX_INPUT_LENGTH.
   */
  const validateInput = useCallback((value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter some text or a URL to encode.';
    if (trimmed.length > MAX_INPUT_LENGTH) {
      return `Input is too long (max ${MAX_INPUT_LENGTH} characters).`;
    }
    return '';
  }, []);

  /**
   * Generates the QR code from current input + options.
   * Sets loading state, awaits the library, and stores the data URL.
   */
  const generate = useCallback(async () => {
    const error = validateInput(input);
    if (error) {
      setInputError(error);
      setQrDataURL(null);
      return;
    }

    setIsGenerating(true);
    setGenerateError('');
    try {
      const dataURL = await generateQRDataURL(input.trim(), options);
      setQrDataURL(dataURL);
    } catch (err) {
      console.error('QR generation failed:', err);
      setGenerateError(
        'Could not generate the barcode. The input may be too large — try shorter text.',
      );
      setQrDataURL(null);
    } finally {
      setIsGenerating(false);
    }
  }, [input, options, validateInput]);

  /**
   * Patch a single option field (e.g. setOptions({ size: 768 })).
   * Used by the options panel.
   */
  const updateOption = useCallback((key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    input,
    setInput,
    inputError,
    options,
    updateOption,
    isGenerating,
    generateError,
    qrDataURL,
    generate,
  };
}