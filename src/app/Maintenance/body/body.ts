// import { Component } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router'; 
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AddPlans } from '../add-plans/add-plans'; // Make sure the path is correct

// @Component({
//   selector: 'app-body',
//   // Add AddPlans and CommonModule to imports
//   imports: [RouterLink, RouterOutlet, FormsModule, CommonModule, AddPlans], 
//   templateUrl: './body.html',
//   styleUrl: './body.css',
// })
// export class Body {
//   searchId: string = '';
//   showModal: boolean = false; // State to handle modal visibility

//   constructor(private router: Router) {}

//   executeSearch() {
//     this.router.navigate(['/get-plans'], {
//       queryParams: { pid: this.searchId || null }
//     });
//   }

//   openCreatePlanModal() {
//     this.showModal = true;
//   }

//   closeModal() {
//     this.showModal = false;
//   }

//   onPlanAdded() {
//     this.showModal = false; // Form submit hote hi overlay hide ho jayega
    
//     // Auto refresh trick: Jo piche dynamic cards list hai use automatically fresh reload karwane ke liye
//     this.router.navigate(['/get-plans'], { queryParams: { refresh: Date.now() }, queryParamsHandling: 'merge' });
//   }
// }






import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddPlans } from '../add-plans/add-plans'; 
import { UpdatePlan } from '../update-plan/update-plan';
import { AddTask } from '../add-task/add-task';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule, AddPlans, UpdatePlan, AddTask], 
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  searchId: string = '';
  
  // Modal toggle flags
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  showAddTaskModal: boolean = false;

  // Passed references tracking state storage
  planIdToUpdate!: number;
  planIdForTask!: number;

  constructor(private router: Router) {}

  executeSearch() {
    this.router.navigate(['/get-plans'], {
      queryParams: { pid: this.searchId || null }
    });
  }

  // Add Plan Methods
  openCreatePlanModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }
  onPlanAdded() {
    this.showModal = false;
    this.refreshDashboardList();
  }

  // Update Plan Methods
  openUpdatePlanModal(planId: number) {
    this.planIdToUpdate = planId;
    this.showUpdateModal = true;
  }
  closeUpdateModal() { this.showUpdateModal = false; }
  onPlanUpdated() {
    this.showUpdateModal = false;
    this.refreshDashboardList();
  }

  // Add Task Methods
  openAddTaskModal(planId: number) {
    this.planIdForTask = planId;
    this.showAddTaskModal = true;
  }
  closeAddTaskModal() { this.showAddTaskModal = false; }
  onTaskAdded() {
    this.showAddTaskModal = false;
    this.refreshDashboardList();
  }

  private refreshDashboardList() {
    this.router.navigate(['/get-plans'], { 
      queryParams: { refresh: Date.now() }, 
      queryParamsHandling: 'merge' 
    });
  }
}