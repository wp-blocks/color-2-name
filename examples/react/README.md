# Color 2 Name – Standalone React Example

A standalone, interactive demo that showcases the **color-2-name** library with a React-powered color picker UI.

## Features

- **Color Picker** – Native browser color input with live feedback
- **Color Naming** – Instantly shows the closest named color via `color-2-name`
- **SVG Preview** – Sample SVG with live color replacement
- **Color Palette** – Clickable swatches extracted from the SVG
- **Dark Theme** – Polished glassmorphism design

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## File Structure

```
examples/react/
├── index.html        # HTML entry point
├── src/
│   ├── main.tsx      # React entry point
│   ├── App.tsx       # Main application component
│   └── index.css     # Styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## How It Works

1. The `collectColors` function extracts unique hex/rgb/rgba colours from SVG content
2. Each extracted colour is resolved to its closest named colour using `closest()` from `color-2-name`
3. Picking a new colour replaces the currently selected colour in the SVG in real-time
4. The palette updates automatically whenever the SVG changes

## Dependencies

- **React 19** – UI rendering
- **Vite** – Development server & build tool
- **color-2-name** – Color naming library

## License

ISC License – see LICENSE file for details.
