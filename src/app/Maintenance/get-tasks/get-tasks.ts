import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Task } from '../model/task';

@Component({
  selector: 'app-get-tasks',
  imports: [CommonModule],
  templateUrl: './get-tasks.html',
  styleUrl: './get-tasks.css',
})
export class GetTasks implements OnInit {
  allTasks: Array<Task> = [];

  constructor(private client: HttpClient, private cd:ChangeDetectorRef) {}

  ngOnInit() {
    // Verify if your route is /api/MaintenanceTasks/all or /api/Tasks/all based on your controller name
    this.client.get<Array<any>>("http://localhost:5110/api/MaintenanceTasks/all")
      .subscribe({
        next: (response) => {
          // Map the lowercase backend JSON to your PascalCase frontend model
         this.allTasks = response.map(item => ({
          taskID: item.taskID,                 // Changed key to lowercase
          description: item.description,       // Changed key to lowercase
          estimatedHours: item.estimatedHours  // Changed key to lowercase
        }));
          this.cd.detectChanges()
        },
        error: (err) => {
          console.error(err);
          alert("Error fetching tasks");
        }
      });
  }
}