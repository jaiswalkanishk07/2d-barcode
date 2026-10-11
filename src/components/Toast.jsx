import { useEffect } from 'react';
import './Toast.css';

/**
 * Lightweight toast notification with auto-dismiss.
 * Styled by variant: success, error, info.
 */
export default function Toast({ message, variant = 'info', onDismiss, duration = 3000 }) {
  // Auto-dismiss after `duration` ms; resets when message/variant changes
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className={`toast toast--${variant}`} role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        {variant === 'success' ? '✓' : variant === 'error' ? '✕' : 'ℹ'}
      </span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onDismiss} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}