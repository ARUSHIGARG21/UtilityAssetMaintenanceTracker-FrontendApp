
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-workorders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-workorders.html',
  styleUrl: './generate-workorders.css'
})
export class GenerateWorkorders {
  @Input() assets: Array<any> = [];
  
  
  @Input() chosenAssetID: number | null = null;
  @Output() chosenAssetIDChange = new EventEmitter<number | null>();
  
  @Output() close = new EventEmitter<void>();
  @Output() generate = new EventEmitter<void>();


  closePopup() {
    this.close.emit();
  }

 
  keepPopupOpen(event: Event) {
    event.stopPropagation();
  }

 
  submitGeneration() {
    this.chosenAssetIDChange.emit(this.chosenAssetID);
    this.generate.emit();
  }
}