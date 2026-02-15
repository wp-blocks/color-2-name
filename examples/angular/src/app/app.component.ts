import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorConverterComponent } from './color-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ColorConverterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Color to Name Converter';
}
