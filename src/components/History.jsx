import './History.css';

/**
 * Recent QR codes saved to localStorage.
 * Each item shows a thumbnail, payload preview, timestamp,
 * and actions: restore into the generator, download PNG, delete.
 */
export default function History({ items, onRestore, onDownload, onRemove, onClear }) {
  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <section className="history">
      <div className="history__header">
        <h2 className="history__title">Recent barcodes</h2>
        {items.length > 0 && (
          <button type="button" className="history__clear" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="history__empty">
          Nothing here yet - generated barcodes will appear in this list.
        </p>
      ) : (
        <ul className="history__list">
          {items.map((item) => (
            <li key={item.id} className="history__item">
              <button
                type="button"
                className="history__thumb"
                onClick={() => onRestore(item)}
                title="Restore this barcode"
              >
                <img src={item.dataURL} alt="" />
              </button>

              <div className="history__meta">
                <p className="history__text" title={item.text}>
                  {item.text}
                </p>
                <p className="history__date">{formatDate(item.createdAt)}</p>
              </div>

              <div className="history__actions">
                <button
                  type="button"
                  className="history__btn"
                  onClick={() => onDownload(item)}
                  title="Download PNG"
                >
                  &#11067;
                </button>
                <button
                  type="button"
                  className="history__btn history__btn--danger"
                  onClick={() => onRemove(item.id)}
                  title="Delete"
                  aria-label={'Delete ' + item.text}
                >
                  &#10005;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}