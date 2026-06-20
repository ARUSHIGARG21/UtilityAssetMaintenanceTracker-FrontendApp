// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-get-plan-by-pid',
//   imports: [],
//   templateUrl: './get-plan-by-pid.html',
//   styleUrl: './get-plan-by-pid.css',
// })
// export class GetPlanByPid {}




import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Plan } from '../model/plan'; // Ensure path to your Plan interface/class is correct
import { DeleteTaskComponent } from '../delete-task/delete-task';

@Component({
  selector: 'app-get-plan-by-pid',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteTaskComponent],
  templateUrl: './get-plan-by-pid.html', // <-- Check this line is linking to the file!
  styleUrl: './get-plan-by-pid.css'
})
export class GetPlanByPidComponent implements OnInit {
  planId!: number;
  plan: Plan | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private client: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // URL me se dynamic ':id' path variable capture karein
    this.route.paramMap.subscribe(params => {
      this.planId = Number(params.get('id'));
      if (this.planId) {
        this.fetchPlanDetails();
      }
    });
  }

  fetchPlanDetails() {
    this.loading = true;
    this.errorMessage = '';
    
    // Aapke C# single-plan controller endpoint direct execution logic URL mapping
    this.client.get<Plan>(`http://localhost:5110/api/MaintenancePlans/${this.planId}`)
      .subscribe({
        next: (data) => {
          this.plan = data;
          this.loading = false;
        },
        error: (err) => {
          console.error("Plan fetch target error state:", err);
          this.plan = null;
          this.loading = false;
          this.errorMessage = `Plan ID #${this.planId} not found in system storage database.`;
        }
      });
  }

  goToUpdatePage(id: number) {
    this.router.navigate(['/update-plan', id]);
  }

  handleTaskDeleted(deletedTaskId: number) {
    if (this.plan && this.plan.tasks) {
      // Instant operational list updates configuration
      this.plan.tasks = this.plan.tasks.filter(task => task.taskID !== deletedTaskId);
    }
  }
}