import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Task } from '../model/task';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask {
  // Create a clean instance of Task matching your simple layout style
  t: Task = new Task();
  idToUpdate!: number;

  constructor(private client: HttpClient) {}

  UpdateTask() {
    // 1. URL tells backend WHICH task ID to update
    const url = "http://localhost:5110/api/MaintenanceTasks/" + this.idToUpdate;

    // 2. We create a simple object with lowercase names to match your backend JSON payload
    const dataToSend = {
      planID: this.t.planID,
      description: this.t.description,
      estimatedHours: this.t.estimatedHours
    };

    // 3. Send the PATCH request and alert the result
    this.client.patch(url, dataToSend).subscribe(
      (res) => alert('Task updated successfully!'),
      (err) => console.log(err)
    );
  }
}