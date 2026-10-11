import './QRPreview.css';

/**
 * Displays the generated QR code with a download button.
 * The download builds a PNG filename from a slugified payload.
 */
export default function QRPreview({ qrDataURL, text, onDownload }) {
  if (!qrDataURL) {
    return (
      <div className="qr-preview qr-preview--empty">
        <div className="qr-preview__placeholder" aria-hidden="true">
          <span className="qr-preview__glyph">▦</span>
        </div>
        <p className="qr-preview__hint">
          Enter some text or a URL above, then click <strong>Generate</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="qr-preview">
      <div className="qr-preview__image-wrap">
        <img className="qr-preview__image" src={qrDataURL} alt={`2d barcode for: ${text}`} />
      </div>
      <button type="button" className="btn btn--secondary" onClick={onDownload}>
        Download PNG
      </button>
    </div>
  );
}