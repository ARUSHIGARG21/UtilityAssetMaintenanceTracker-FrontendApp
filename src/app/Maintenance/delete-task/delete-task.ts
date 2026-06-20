import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn-cross" (click)="confirmAndDelete($event)" title="Delete">&times;</button>
  `,
  styles: [`
    .btn-cross {
      background: none; border: none; cursor: pointer;
      color: #6c757d; font-size: 1rem; font-weight: bold;
      width: 18px; height: 18px; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.15s ease-in-out; margin-left: 8px;
    }
    .btn-cross:hover { color: #dc3545; background-color: #f8d7da; }
    .btn-cross:active { transform: scale(0.9); }
  `]
})
export class DeleteTaskComponent {
  @Input() taskId!: number;
  @Output() deletionSuccessful = new EventEmitter<number>();

  constructor(private client: HttpClient) {}

  confirmAndDelete(event: MouseEvent) {
    event.stopPropagation(); // Stops the card selection click chain propagation

    if (confirm("Are you sure you want to delete this task?")) {
      const url = `http://localhost:5110/api/MaintenanceTasks/${this.taskId}`;
      
      this.client.delete(url).subscribe({
        next: () => {
          this.deletionSuccessful.emit(this.taskId);
        },
        error: (err) => {
          console.error("API Deletion failed:", err);
          alert("Could not delete task.");
        }
      });
    }
  }
}