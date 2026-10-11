import './GeneratorForm.css';
import { MAX_INPUT_LENGTH, SIZE_OPTIONS, EC_LEVELS } from '../constants.js';

/**
 * Input + options panel for QR generation.
 * Includes a text area, size selector, error-correction level,
 * color pickers, and the Generate button.
 */
export default function GeneratorForm({
  input,
  onInputChange,
  inputError,
  options,
  onOptionChange,
  isGenerating,
  onGenerate,
}) {
  return (
    <form
      className="generator-form"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}
    >
      {/* --- Payload input ------------------------------------------- */}
      <div className="generator-form__field">
        <label className="generator-form__label" htmlFor="payload-input">
          Text or URL
        </label>
        <div className={`input-shell${inputError ? ' input-shell--error' : ''}`}>
          <textarea
            id="payload-input"
            className="generator-form__input"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="e.g. https://example.com or any text…"
            rows={3}
            maxLength={MAX_INPUT_LENGTH}
            autoFocus
          />
          <span className="input-shell__counter">
            {input.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>
        {inputError && <p className="generator-form__error">{inputError}</p>}
      </div>

      {/* --- Options row --------------------------------------------- */}
      <div className="generator-form__options">
        {/* Size */}
        <div className="generator-form__field">
          <label className="generator-form__label" htmlFor="opt-size">
            Size
          </label>
          <select
            id="opt-size"
            className="generator-form__select"
            value={options.size}
            onChange={(e) => onOptionChange('size', Number(e.target.value))}
          >
            {SIZE_OPTIONS.map((px) => (
              <option key={px} value={px}>
                {px}×{px} px
              </option>
            ))}
          </select>
        </div>

        {/* Error correction */}
        <div className="generator-form__field">
          <label className="generator-form__label" htmlFor="opt-ec">
            Error correction
          </label>
          <select
            id="opt-ec"
            className="generator-form__select"
            value={options.errorCorrectionLevel}
            onChange={(e) => onOptionChange('errorCorrectionLevel', e.target.value)}
          >
            {EC_LEVELS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Color pickers */}
        <div className="generator-form__field generator-form__field--color">
          <label className="generator-form__label" htmlFor="opt-dark">
            Color
          </label>
          <div className="color-pickers">
            <label className="color-picker" title="Dark modules">
              <input
                type="color"
                value={options.colorDark}
                onChange={(e) => onOptionChange('colorDark', e.target.value)}
                aria-label="Barcode color"
              />
            </label>
            <label className="color-picker color-picker--light" title="Background">
              <input
                type="color"
                value={options.colorLight}
                onChange={(e) => onOptionChange('colorLight', e.target.value)}
                aria-label="Background color"
              />
            </label>
          </div>
        </div>
      </div>

      {/* --- Actions --------------------------------------------------- */}
      <button
        type="submit"
        className="btn btn--primary generator-form__submit"
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating…' : 'Generate barcode'}
      </button>
    </form>
  );
}