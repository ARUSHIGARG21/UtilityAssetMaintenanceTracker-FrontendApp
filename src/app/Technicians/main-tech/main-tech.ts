import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowTechnician } from '../show-technician/show-technician';
import { AddTechnician } from '../add-technician/add-technician';

@Component({
  selector: 'app-main-tech',
  standalone: true,
  imports: [CommonModule, ShowTechnician, AddTechnician],
  templateUrl: './main-tech.html'
})
export class MainTech {
  showModal = false;   // ✅ controls popup
}
