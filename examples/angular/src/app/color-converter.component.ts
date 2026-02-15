import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { closest } from 'color-2-name';

export interface ColorResult {
  hex: string;
  name: string;
  rgb: string;
}

@Component({
  selector: 'app-color-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-converter.component.html',
  styleUrls: ['./color-converter.component.css']
})
export class ColorConverterComponent {
  colorInput: string = '#F00';
  colorResult: ColorResult | null = null;
  error: string | null = null;

  predefinedColors = [
    { hex: '#F00', name: 'Red' },
    { hex: '#00F', name: 'Blue' },
    { hex: '#0F0', name: 'Green' },
    { hex: '#FF0', name: 'Yellow' },
    { hex: '#F0F', name: 'Magenta' },
    { hex: '#0FF', name: 'Cyan' }
  ];

  convertColor() {
    this.error = null;
    
    try {
      const result = closest(this.colorInput);
      this.colorResult = {
        hex: this.colorInput,
        name: result.name,
        rgb: result.color
      };
    } catch (err) {
      this.error = `Invalid color format: ${this.colorInput}`;
      this.colorResult = null;
    }
  }

  setPredefinedColor(hex: string) {
    this.colorInput = hex;
    this.convertColor();
  }

  ngOnInit() {
    this.convertColor();
  }
}
