// ==========================================================================
// QR code generation utilities
// Wraps the trusted `qrcode` npm library (no hand-rolled QR encoding).
// ==========================================================================

import QRCode from 'qrcode';

/**
 * Generates a QR code as a data URL (PNG) in the browser.
 *
 * @param {string} text     - Payload to encode (text or URL)
 * @param {Object} options  - QRCode.toDataURL options:
 *   { number } width              - Pixel width of the output image
 *   { string } errorCorrectionLevel - 'L' | 'M' | 'Q' | 'H'
 *   { string } color.dark         - Dark module color (hex)
 *   { string } color.light        - Light module color (hex)
 *   { number } margin             - Quiet zone width in modules
 * @returns {Promise<string>} Data URL of the generated QR PNG
 */
export function generateQRDataURL(text, options) {
  const {
    size,
    errorCorrectionLevel,
    colorDark,
    colorLight,
    margin,
  } = options;

  return QRCode.toDataURL(text, {
    width: size,
    errorCorrectionLevel,
    margin,
    color: {
      dark: colorDark,
      light: colorLight,
    },
  });
}