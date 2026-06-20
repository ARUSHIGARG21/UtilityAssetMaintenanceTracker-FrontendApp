// import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // Added Output, EventEmitter
// import { Plan } from '../model/plan';
// import { Asset } from '../model/asset'; 
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-add-plans',
//   standalone: true, // Make sure it's standalone if used out of direct router scope
//   imports: [FormsModule, CommonModule],
//   templateUrl: './add-plans.html',
//   styleUrl: './add-plans.css',
// })
// export class AddPlans implements OnInit {
//   p: Plan = new Plan();
//   assetList: Asset[] = [];
//   frequencies: string[] = ['Weekly', 'Quarterly', 'Half-Yearly', 'Yearly'];

//   // Output mechanism parent dashboard window frame ko dynamic callbacks pass karne ke liye
//   @Output() planAddedSuccessfully = new EventEmitter<void>();

//   constructor(private client: HttpClient) {}

//   ngOnInit() {
//     this.client.get<Asset[]>("http://localhost:5084/api/Assets").subscribe({
//       next: (data) => { this.assetList = data; },
//       error: (err) => { console.error("Error fetching assets:", err); }
//     });
//   }

//   Addplan() {
//     this.client.post("http://localhost:5110/api/maintenanceplans", this.p).subscribe({
//       next: (c) => {
//         alert('Plan Added Successfully!');
//         this.p = new Plan(); // Reset the data fields clear
//         this.planAddedSuccessfully.emit(); // Parent modal popup container engine ko inform karega
//       },
//       error: (error) => console.log(error)
//     });
//   }
// }





import { Component, OnInit, Output, EventEmitter } from '@angular/core'; 
import { Plan } from '../model/plan';
import { Asset } from '../model/asset'; 
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-plans',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './add-plans.html',
  styleUrl: './add-plans.css',
})
export class AddPlans implements OnInit {
  p: Plan = new Plan();
  assetList: Asset[] = [];
  uniqueAssetTypes: string[] = []; // Explicitly declared as string array

  frequencies: string[] = ['Weekly', 'Quarterly', 'Half-Yearly', 'Yearly'];

  @Output() planAddedSuccessfully = new EventEmitter<void>();

  constructor(private client: HttpClient) {}

  ngOnInit() {
    this.client.get<Asset[]>("http://localhost:5084/api/Assets").subscribe({
      next: (data: Asset[]) => { 
        this.assetList = data; 

        // FIX: strict type cast kiya hai taaki Set array compiler error na de
        const allTypes: string[] = data.map(asset => String(asset.type));
        this.uniqueAssetTypes = Array.from(new Set(allTypes));
      },
      error: (err) => { console.error("Error fetching assets:", err); }
    });
  }

  Addplan() {
    this.client.post("http://localhost:5110/api/maintenanceplans", this.p).subscribe({
      next: (c) => {
        alert('Plan Added Successfully!');
        this.p = new Plan(); 
        this.planAddedSuccessfully.emit(); 
      },
      error: (error) => console.log(error)
    });
  }
}