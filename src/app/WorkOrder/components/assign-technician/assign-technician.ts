import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-technician',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assign-technician.html'
  
})
export class AssignTechnician {
  @Input() technicians: Array<any> = [];
  @Output() assign = new EventEmitter<string>();
}