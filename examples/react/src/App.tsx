import { closest } from "color-2-name";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface SvgColorDef {
	color: string;
	name: string;
}

/* ------------------------------------------------------------------ */
/*  Utility helpers (preserved from the original React block)     */
/* ------------------------------------------------------------------ */

/**
 * Collect unique colors from an SVG string and resolve their names.
 */
function collectColors(fileContent: string): SvgColorDef[] {
	const colorCollection: string[] = [];
	if (fileContent) {
		const colorRegexp =
			/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgb\((?:\s*\d+\s*,){2}\s*\d+\)|rgba\((\s*\d+\s*,){3}[\d.]+\)/g;
		const matchedColors = fileContent.matchAll(colorRegexp);

		for (const match of matchedColors) {
			if (match[0] && colorCollection.length < 50) {
				if (!colorCollection.includes(match[0])) {
					colorCollection.push(match[0]);
				}
			}
		}
	}
	return colorCollection.map((color) => ({
		color,
		name: closest(color).name,
	}));
}

/**
 * Replace every occurrence of `oldColor` with `newColor` in an SVG string.
 */
function updateColor(
	svgContent: string,
	newColor: string,
	oldColor: string,
): string {
	return svgContent.replace(
		new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
		newColor,
	);
}

/**
 * Default sample SVG.
 */
function getDefaultSvg(): string {
	return `
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#ff0000" />
      <rect x="100" y="0" width="100" height="100" fill="#00ff00" />
      <rect x="0" y="100" width="100" height="100" fill="#0000ff" />
      <rect x="100" y="100" width="100" height="100" fill="#ffff00" />
      <circle cx="100" cy="100" r="40" fill="#ff00ff" />
    </svg>
  `;
}

/* ------------------------------------------------------------------ */
/*  Components                                                        */
/* ------------------------------------------------------------------ */

function ColorSwatch({
	color,
	name,
	active,
	onClick,
}: {
	color: string;
	name: string;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			className={`swatch${active ? " swatch--active" : ""}`}
			style={{ backgroundColor: color }}
			onClick={onClick}
			title={`${name} (${color})`}
			aria-label={`Select color ${name}`}
		/>
	);
}

/* ------------------------------------------------------------------ */
/*  Main App                                                          */
/* ------------------------------------------------------------------ */

export function App() {
	const [svg, setSvg] = useState(getDefaultSvg);
	const [currentColor, setCurrentColor] = useState("#ff0000");
	const [colors, setColors] = useState<SvgColorDef[]>([]);

	// Re-extract palette whenever the SVG changes
	useEffect(() => {
		setColors(collectColors(svg));
	}, [svg]);

	const colorInfo = closest(currentColor);

	const handleColorChange = (newHex: string) => {
		if (newHex !== currentColor) {
			// If the new color is not already in the palette, replace the old one in the SVG
			if (!colors.some((c) => c.color === newHex)) {
				setSvg((prev) => updateColor(prev, newHex, currentColor));
			}
			setCurrentColor(newHex);
		}
	};

	const handleSwatchClick = (hex: string) => {
		setCurrentColor(hex);
	};

	return (
		<div className="page">
			{/* Header */}
			<header className="header">
				<h1 className="header__title">
					Color <span className="header__accent">2</span> Name
				</h1>
				<p className="header__sub">
					Pick any colour and instantly discover its closest named colour.
				</p>
			</header>

			<main className="grid">
				{/* ---- Left column: picker + info ---- */}
				<section className="card card--picker" id="color-picker-section">
					<h2 className="card__title">Color Picker</h2>

					<div className="picker-row">
						<input
							id="color-input"
							type="color"
							value={currentColor}
							onChange={(e) => handleColorChange(e.target.value)}
							className="picker-input"
							aria-label="Pick a color"
						/>
						<div className="picker-label">
							<span className="picker-label__hex">{currentColor}</span>
							<span className="picker-label__name">{colorInfo.name}</span>
						</div>
					</div>

					{/* Color info card */}
					<div
						className="info-banner"
						style={{
							backgroundColor: currentColor,
							color:
								colorInfo.name === "White" || colorInfo.name === "white"
									? "#1a1a2e"
									: "#fff",
						}}
					>
						<span className="info-banner__name">{colorInfo.name}</span>
						<span className="info-banner__hex">{currentColor}</span>
					</div>

					{/* Extracted palette */}
					{colors.length > 0 && (
						<div className="palette-section">
							<h3 className="palette-section__title">Extracted Palette</h3>
							<div className="palette-grid">
								{colors.map((c) => (
									<ColorSwatch
										key={c.color}
										color={c.color}
										name={c.name}
										active={c.color === currentColor}
										onClick={() => handleSwatchClick(c.color)}
									/>
								))}
							</div>
						</div>
					)}
				</section>
			</main>

			{/* Footer */}
			<footer className="footer">
				Built with{" "}
				<a
					href="https://github.com/wp-blocks/color-2-name"
					target="_blank"
					rel="noopener noreferrer"
				>
					color-2-name
				</a>{" "}
				+ React
			</footer>
		</div>
	);
}
