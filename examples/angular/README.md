# Angular Color to Name Converter Example

This example demonstrates how to integrate the **color-2-name** library with an Angular application to convert hex color codes to their closest color names.

## Features

- Convert hex colors (like `#F00`, `#00F`) to their closest color names
- Interactive color input with real-time conversion
- Pre-defined color buttons for quick testing
- Beautiful, responsive UI with modern design
- Error handling for invalid color formats

## Live Demo

The app converts:
- `#F00` → `red`
- `#00F` → `blue`
- And any other valid hex color to its closest color name

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the Angular example directory:
   ```bash
   cd examples/angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

### Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── app.component.ts          # Main app component
│   ├── app.component.html        # App template
│   ├── app.component.css         # App styles
│   ├── color-converter.component.ts  # Color converter logic
│   ├── color-converter.component.html # Converter UI
│   └── color-converter.component.css  # Converter styles
├── index.html                    # Main HTML file
├── main.ts                       # Angular bootstrap
└── styles.css                    # Global styles
```

## Key Implementation Details

### Color Conversion Logic

The color conversion is handled by the `ColorConverterComponent`:

```typescript
import { closest } from 'color-2-name';

convertColor() {
  try {
    const result = closest(this.colorInput);
    this.colorResult = {
      hex: this.colorInput,
      name: result.name,
      rgb: result.color
    };
  } catch (err) {
    this.error = `Invalid color format: ${this.colorInput}`;
  }
}
```

### Angular Integration

- Uses **Standalone Components** (Angular 17+)
- Implements **Two-Way Data Binding** with `[(ngModel)]`
- Includes **Form Handling** with `FormsModule`
- Features **Responsive Design** with CSS Grid and Flexbox

### Dependencies

The key dependency is the `color-2-name` library:

```json
{
  "dependencies": {
    "color-2-name": "^1.5.0",
    "@angular/core": "^17.0.0",
    // ... other Angular dependencies
  }
}
```

## Usage Examples

### Basic Usage

1. Enter a hex color in the input field (e.g., `#F00`, `#FF0000`)
2. Press Enter or click "Convert"
3. View the result showing the color name and RGB values

### Quick Testing

Click the pre-defined color buttons:
- **Red** (`#F00`) → Converts to "red"
- **Blue** (`#00F`) → Converts to "blue"
- **Green** (`#0F0`) → Converts to "green"
- And more...

## Customization

### Adding New Colors

To add more pre-defined colors, update the `predefinedColors` array in `color-converter.component.ts`:

```typescript
predefinedColors = [
  { hex: '#F00', name: 'Red' },
  { hex: '#00F', name: 'Blue' },
  // Add new colors here
  { hex: '#800080', name: 'Purple' },
];
```

### Styling

Modify the CSS files to customize the appearance:
- `color-converter.component.css` - Component-specific styles
- `app.component.css` - Layout and container styles
- `styles.css` - Global styles

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `npm install`
2. **Port Already in Use**: The app uses port 4200 by default. Kill existing processes or use a different port
3. **Color Conversion Errors**: Make sure to enter valid hex color formats (#RGB, #RRGGBB)

### Getting Help

- Check the [color-2-name documentation](https://github.com/wp-blocks/color-2-name)
- Review Angular's [official documentation](https://angular.io/docs)

## License

This example follows the same license as the color-2-name library (ISC).
