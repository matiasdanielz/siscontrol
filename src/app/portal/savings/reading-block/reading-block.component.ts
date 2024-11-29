import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reading-block',
  templateUrl: './reading-block.component.html',
  styleUrls: ['./reading-block.component.css']
})
export class ReadingBlockComponent {
  @Input() type!: string; // 'agua' ou 'gas'
  @Input() previousReading!: string;
  @Input() currentReading!: string | number;
  @Output() readingChanged = new EventEmitter<{ type: string, value: string | number }>();

  onReadingChanged(value: string | number): void {
    this.readingChanged.emit({ type: this.type, value });
  }
}
