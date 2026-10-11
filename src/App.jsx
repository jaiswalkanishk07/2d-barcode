import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import GeneratorForm from './components/GeneratorForm.jsx';
import QRPreview from './components/QRPreview.jsx';
import History from './components/History';
import Toast from './components/Toast.jsx';
import { useQRGenerator } from './hooks/useQRGenerator.js';
import { useHistory } from './hooks/useHistory.js';

/**
 * Builds a safe PNG filename from the barcode payload text.
 * e.g. "https://example.com" -> "2d-barcode-https-example-com.png"
 */
export function fileNameFromText(text) {
  const slug =
    text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30) || 'code';
  return `2d-barcode-${slug}.png`;
}

/**
 * Triggers a client-side download of a PNG data URL.
 */
export function downloadDataURL(dataURL, filename) {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Main application shell: header, generator card, preview, and history.
 */
export default function App() {
  const {
    input,
    setInput,
    inputError,
    options,
    updateOption,
    isGenerating,
    generateError,
    qrDataURL,
    generate,
  } = useQRGenerator();

  const { history, addEntry, removeEntry, clearHistory } = useHistory();

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Tracks the last QR URL we recorded so we only record new generations
  // (not re-renders with the same URL).
  const lastRecordedRef = useRef(null);

  /** Shows a transient toast notification. */
  const showToast = useCallback((message, variant = 'info') => {
    setToast({ message, variant, id: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const dismissToast = useCallback(() => {
    clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  /** Generates a QR code and provides user feedback on the outcome. */
  const handleGenerate = useCallback(async () => {
    if (isGenerating) return;
    if (!input.trim()) return; // validation handled inside the hook
    await generate();
  }, [generate, input, isGenerating]);

  // Whenever a NEW QR data URL is produced, record it in history
  // and notify the user. Guarded by lastRecordedRef to avoid duplicates
  // caused by re-renders with the same generated URL.
  useEffect(() => {
    if (!qrDataURL || lastRecordedRef.current === qrDataURL) return;
    lastRecordedRef.current = qrDataURL;
    addEntry(input.trim(), qrDataURL, options);
    showToast('2d barcode generated!', 'success');
  }, [qrDataURL, input, options, addEntry, showToast]);

  // Surface async generation errors to the user via a toast.
  useEffect(() => {
    if (generateError) showToast(generateError, 'error');
  }, [generateError, showToast]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app__header">
        <div className="app__header-content">
          <div className="app__brand">
            <span className="app__logo" aria-hidden="true">
              ▦
            </span>
            <div>
              <h1 className="app__title">2d barcode</h1>
              <p className="app__subtitle">generate · scan · download</p>
            </div>
          </div>
          <p className="app__tagline">
            Generate scannable 2d barcodes instantly — right in your browser.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="app__main">
        <section className="card">
          <GeneratorForm
            input={input}
            onInputChange={setInput}
            inputError={inputError}
            options={options}
            onOptionChange={updateOption}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        </section>

        <section className="card card--preview">
          <QRPreview
            qrDataURL={qrDataURL}
            text={input}
            onDownload={() => downloadDataURL(qrDataURL, fileNameFromText(input))}
          />
        </section>
      </main>

      {/* History */}
      <section className="app__history">
        <div className="card">
          <History
            items={history}
            onRestore={(item) => {
              setInput(item.text);
              showToast('Text restored — press Generate to create the barcode', 'info');
            }}
            onDownload={(item) => downloadDataURL(item.dataURL, fileNameFromText(item.text))}
            onRemove={removeEntry}
            onClear={() => {
              clearHistory();
              showToast('History cleared', 'info');
            }}
          />
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onDismiss={dismissToast}
        />
      )}
    </div>
  );
}