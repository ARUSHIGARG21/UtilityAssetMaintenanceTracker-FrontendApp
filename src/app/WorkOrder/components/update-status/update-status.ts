import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-status.html'
})
export class UpdateStatus {
  @Input() currentStatus: string = '';
  @Output() statusChange = new EventEmitter<string>();
}