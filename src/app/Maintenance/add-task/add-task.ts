// import { Component } from '@angular/core';
// import { Task } from '../model/task';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-add-task',
//   imports: [FormsModule],
//   templateUrl: './add-task.html',
//   styleUrl: './add-task.css',
// })
// export class AddTask {

//   t:Task = new Task

//   constructor(private client:HttpClient){

//   }

//   AddTask(){
//     alert("you want to add the")
//       this.client.post("http://localhost:5110/api/MaintenanceTasks", this.t)
//       .subscribe(
//         res => alert('Task added successfully'),
//         err => console.log(err)
//       );
//     }
//   }



import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'; 
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit, OnChanges {

  t: Task = new Task();

  @Input() selectedPlanId!: number;
  @Output() taskAddedSuccessfully = new EventEmitter<void>();

  constructor(private client: HttpClient) {}

  ngOnInit() {
    this.assignPlanId();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPlanId']) {
      this.assignPlanId();
    }
  }

  private assignPlanId() {
    if (this.selectedPlanId) {
      this.t.planID = this.selectedPlanId;
    }
  }

  AddTask() {
    this.client.post("http://localhost:5110/api/MaintenanceTasks", this.t)
      .subscribe({
        next: (res) => {
          alert('Task added successfully');
          this.t = new Task(); 
          this.taskAddedSuccessfully.emit(); 
        },
        error: (err) => {
          console.error("Task insertion failed:", err);
          alert('Error adding task.');
        }
      });
  }
}