# 2D Barcode — QR Code Generator

> A modern, client-side QR code (2D barcode) generator built with **React + Vite**.
> No backend, no database, no external API calls — everything runs in your browser.

---

## Quick Start

> **Note:** This machine does not have Node.js installed globally, so a portable
> Node.js runtime is bundled in the `nodejs/` folder. Prefix commands with it
> (or add it to your PATH). If you have Node.js installed globally, just use
> `npm` directly.

### Windows (PowerShell) — portable runtime

```powershell
# 1. Install dependencies
$env:PATH = "$PWD\nodejs;" + $env:PATH   # add portable node to PATH
npm install

# 2. Start the dev server
npm run dev
# -> open http://localhost:5173
```

### Any OS (Node.js installed globally)

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

---

## Features

- ✍️ **Text / URL input** with live character counter (max 1000 chars)
- ▶️ **Generate** produces a real, scannable QR code (validated input, no crashes on empty input)
- 🖼️ **Preview** with a clean white-backed display
- ⬇️ **Download as PNG** with a smart filename derived from your payload
- 🎛️ **Customization**:
  - Size: 256 → 1024 px
  - Error correction level: L / M / Q / H
  - Foreground & background colors
- 🔁 **Regenerate** anytime with new input — no page reload needed
- 🕘 **History** of your last 20 generated codes (persisted in `localStorage`):
  - Restore an entry back into the generator
  - Download any entry as PNG
  - Delete entries or clear all

---

## Tech Stack

| Layer     | Choice                                                  |
| --------- | ------------------------------------------------------- |
| Framework | React 18 + Vite 6                                       |
| QR engine | [`qrcode`](https://www.npmjs.com/package/qrcode) (v1.5) |
| Styling   | Hand-written CSS modules (BEM naming, dark theme)       |
| Storage   | `localStorage` (history persistence)                    |

---

## Project Structure

```
2d_barcode/
├── index.html                  # SPA entry point
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # App shell: header, form, preview, history
    ├── App.css                 # Layout + shared card/button styles
    ├── index.css               # Global theme (CSS variables, reset)
    ├── constants.js            # Shared config (sizes, EC levels, limits)
    ├── lib/
    │   └── qr.js               # Thin wrapper around the `qrcode` library
    ├── hooks/
    │   ├── useQRGenerator.js   # Input validation + async QR generation state
    │   └── useHistory.js       # localStorage-backed history state
    └── components/
        ├── GeneratorForm.jsx   # Input, options, generate button (+ .css)
        ├── QRPreview.jsx       # QR display + download (+ .css)
        ├── History.jsx         # Recent QR list (restore/download/delete) (+ .css)
        └── Toast.jsx           # Auto-dismiss notifications (+ .css)
```

---

## Key Decisions

- **Use `qrcode` library** — QR encoding is complex (Reed–Solomon, masking, format info).
  Rolling our own would be error-prone; the library is battle-tested and scannable.
- **Pure client-side** — no server means the app works from a static host or `file://`
  (camera/CSP caveats aside), and user data never leaves the browser.
- **Async generation with loading state** — QR rendering can take a few hundred ms
  for large inputs; the UI stays responsive and feedbacks via toast notifications.
- **History deduplication** — regenerating the same text + options doesn't spam history.
- **Accessible fields** — proper labels, `aria-*` attributes, and focus states.

---

## Linting

```bash
npm run lint
```

ESLint is configured with the flat config format (`eslint.config.js`),
React Hooks rules, and React Refresh safety checks.

---

## License

MIT — free to use, modify, and extend.