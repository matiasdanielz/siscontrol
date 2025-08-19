import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reading-block',
  templateUrl: './reading-block.component.html',
  styleUrls: ['./reading-block.component.css']
})
export class ReadingBlockComponent {
  @Input() type!: string; // 'agua', 'aguaq' ou 'gas'
  @Input() previousReading!: string;
  @Input() currentReading!: string | number;
  @Output() readingChanged = new EventEmitter<{ type: string, value: string | number }>();

  protected onReadingChanged(value: string | number): void {
    this.readingChanged.emit({ type: this.type, value });
  }

  protected getIcon(): string {
    switch (this.type) {
      case 'agua': return './assets/images/water.png';
      case 'aguaq': return './assets/images/hot-water.png';
      case 'gas': return './assets/images/fire.png';
      default: return './assets/images/water.png';
    }
  }

  protected getLabel(): string {
    switch (this.type) {
      case 'agua': return 'Água';
      case 'aguaq': return 'Água Quente';
      case 'gas': return 'Gás';
      default: return '';
    }
  }
}
