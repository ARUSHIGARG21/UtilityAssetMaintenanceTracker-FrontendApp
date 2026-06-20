



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { Plan } from '../model/plan';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-update-plan',
//   imports: [FormsModule],
//   templateUrl: './update-plan.html',
//   styleUrl: './update-plan.css',
// })
// export class UpdatePlan implements OnInit {
//   p: Plan = new Plan();
//   idToUpdate!: number; 

//   constructor(
//     private client: HttpClient, 
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.idToUpdate = Number(this.route.snapshot.paramMap.get('id'));
//     this.p.planID = this.idToUpdate;

//     // FETCH existing data from your backend so fields are pre-filled!
//     this.client.get<Plan>(`http://localhost:5110/api/MaintenancePlans/${this.idToUpdate}`)
//       .subscribe({
//         next: (data) => {
//           this.p = data; // Populates name, assetID, frequency, type automatically
//         },
//         error: (err) => {
//           console.error("Could not fetch plan details:", err);
//         }
//       });
//   }

//   Updateplan() {
//     const url = `http://localhost:5110/api/MaintenancePlans/${this.idToUpdate}`;
    
//     const updatePayload = {
//       planID: this.p.planID,
//       assetID: this.p.assetID, // This will safely remain what was loaded from the DB
//       name: this.p.name,
//       frequency: this.p.frequency,
//       type: this.p.type
//     };

//     this.client.put(url, updatePayload).subscribe({
//       next: (res) => {
//         alert('Plan updated successfully');
//         this.router.navigate(['/']);
//       },
//       error: (err) => {
//         console.error("Update failed:", err);
//         alert('Failed to update plan.');
//       }
//     });
//   }
// }








import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Plan } from '../model/plan';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-update-plan',
  standalone: true,
  imports: [FormsModule,DecimalPipe],
  templateUrl: './update-plan.html',
  styleUrl: './update-plan.css',
})
export class UpdatePlan implements OnInit, OnChanges {
  p: Plan = new Plan();
  
  // Dynamic declarations pulling ID from the active dashboard actions loop
  @Input() selectedPlanId!: number;
  @Output() planUpdatedSuccessfully = new EventEmitter<void>();

  constructor(private client: HttpClient) {}

  ngOnInit() {
    if (this.selectedPlanId) {
      this.fetchExistingPlanDetails();
    }
  }

  // Modal agar doosri bar click ho to changes pick load karne ke liye
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPlanId'] && !changes['selectedPlanId'].firstChange) {
      this.fetchExistingPlanDetails();
    }
  }

  fetchExistingPlanDetails() {
    this.p.planID = this.selectedPlanId;
    this.client.get<Plan>(`http://localhost:5110/api/MaintenancePlans/${this.selectedPlanId}`)
      .subscribe({
        next: (data) => {
          this.p = data; 
        },
        error: (err) => {
          console.error("Could not fetch plan details:", err);
        }
      });
  }

  Updateplan() {
    const url = `http://localhost:5110/api/MaintenancePlans/${this.selectedPlanId}`;
    
    const updatePayload = {
      planID: this.p.planID,
      assetID: this.p.assetID, 
      name: this.p.name,
      frequency: this.p.frequency,
      type: this.p.type
    };

    this.client.put(url, updatePayload).subscribe({
      next: (res) => {
        alert('Plan updated successfully');
        this.planUpdatedSuccessfully.emit(); // Closes screen and auto refreshes parent cards
      },
      error: (err) => {
        console.error("Update failed:", err);
        alert('Failed to update plan.');
      }
    });
  }
}