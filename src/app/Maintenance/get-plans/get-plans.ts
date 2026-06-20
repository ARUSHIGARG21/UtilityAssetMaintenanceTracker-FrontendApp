// import { HttpClient } from '@angular/common/http';
// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Plan } from '../model/plan';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // ActivatedRoute import kiya
// import { DeleteTaskComponent } from '../delete-task/delete-task';

// @Component({
//   selector: 'app-get-plans',
//   imports: [CommonModule, RouterLink, DeleteTaskComponent],
//   templateUrl: './get-plans.html',
//   styleUrl: './get-plans.css',
// })
// export class Getplans implements OnInit {
//   allplan: Array<Plan> = [];          // Master Data Backup
//   displayedPlans: Array<Plan> = [];   // Jo UI par dikhega

//   constructor(
//     private c: HttpClient, 
//     private cd: ChangeDetectorRef, 
//     private router: Router,
//     private route: ActivatedRoute // Route ko inject kiya parameter read karne ke liye
//   ) {}

//   ngOnInit() {
//     // API se saare plans le aao ek hi baar me
//     this.c.get<Array<Plan>>("http://localhost:5110/api/MaintenancePlans").subscribe({
//       next: (response) => {
//         this.allplan = response;
//         this.displayedPlans = response; 

//         // Live track karo search bar me kya type ho raha hai
//         this.route.queryParams.subscribe(params => {
//           const pid = params['pid'];
          
//           if (pid) {
//             // Agar search bar me ID hai, toh instantly baki list gayab karke sirf wahi card dikhao
//             this.displayedPlans = this.allplan.filter(p => p.planID?.toString() === pid.trim());
//           } else {
//             // Agar search bar empty hai, toh wapas saare plans dikhao
//             this.displayedPlans = this.allplan;
//           }
//           this.cd.detectChanges();
//         });
//       },
//       error: (error) => {
//         alert("Error fetching items: " + JSON.stringify(error));
//       }
//     });
//   }

//   goToUpdatePage(planId: number) {
//     this.router.navigate(['/update-plan', planId]);
//   }

//   handleTaskDeleted(currentPlan: Plan, deletedTaskId: number) {
//     if (currentPlan && currentPlan.tasks) {
//       currentPlan.tasks = currentPlan.tasks.filter(task => task.taskID !== deletedTaskId);
//       this.cd.detectChanges();
//     }
//   }
// }








import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Plan } from '../model/plan';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router'; 
import { DeleteTaskComponent } from '../delete-task/delete-task';
import { Body } from '../body/body';

@Component({
  selector: 'app-get-plans',
  imports: [CommonModule, RouterLink, DeleteTaskComponent],
  templateUrl: './get-plans.html',
  styleUrl: './get-plans.css',
})
export class Getplans implements OnInit {
  allplan: Array<Plan> = [];          
  displayedPlans: Array<Plan> = [];   

  constructor(
    private c: HttpClient, 
    private cd: ChangeDetectorRef, 
    private route: ActivatedRoute,
    private parentBody: Body 
  ) {}

  ngOnInit() {
    this.loadAllPlans();
  }

  loadAllPlans() {
    this.c.get<Array<Plan>>("http://localhost:5110/api/MaintenancePlans").subscribe({
      next: (response) => {
        this.allplan = response;
        this.displayedPlans = response; 

        this.route.queryParams.subscribe(params => {
          const pid = params['pid'];
          if (pid) {
            this.displayedPlans = this.allplan.filter(p => p.planID?.toString() === pid.trim());
          } else {
            this.displayedPlans = this.allplan;
          }
          this.cd.detectChanges();
        });
      },
      error: (error) => {
        alert("Error fetching items: " + JSON.stringify(error));
      }
    });
  }

  goToUpdatePage(planId: number) {
    this.parentBody.openUpdatePlanModal(planId);
  }

  openAddTaskPopup(planId: number) {
    this.parentBody.openAddTaskModal(planId);
  }

  handleTaskDeleted(currentPlan: Plan, deletedTaskId: number) {
    if (currentPlan && currentPlan.tasks) {
      currentPlan.tasks = currentPlan.tasks.filter(task => task.taskID !== deletedTaskId);
      this.cd.detectChanges();
    }
  }
}