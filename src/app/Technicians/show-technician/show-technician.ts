// src/app/Technicians/show-technician/show-technician.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technician } from '../models/technician';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-technician',
 
  imports: [RouterLink, CommonModule],
  templateUrl: './show-technician.html',
  styleUrls: ['./show-technician.css']   
})
export class ShowTechnician implements OnInit {
  technicians: Technician[] = [];

  constructor(private http: HttpClient,private cd : ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<Technician[]>("http://localhost:5241/api/technicians")
      .subscribe({
        next: (data) => {
          console.log(data); 
          this.technicians = data; 
          this.cd.detectChanges();
        },
        error: (error) => { 
          alert(JSON.stringify(error)); 
        }
      });
  }
  
}

// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Technician } from '../models/technician';
// import { RouterLink } from "@angular/router";
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-show-technician',
//   standalone: true,
//   imports: [RouterLink, CommonModule],
//   templateUrl: './show-technician.html',
//   styleUrls: ['./show-technician.css']   
// })
// export class ShowTechnician implements OnInit {
//   technicians: Technician[] = [];

//   constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

//   ngOnInit() {
//     this.loadTechnicians();
//   }

//   loadTechnicians() {
//     this.http.get<Technician[]>("http://localhost:5241/api/technicians")
//       .subscribe({
//         next: (data) => {
//           this.technicians = data; 
//           this.cd.detectChanges();
//         },
//         error: (error) => { 
//           console.error(error);
//           alert("Error loading technicians: " + JSON.stringify(error)); 
//         }
//       });
//   }

//   confirmDelete(id: number) {
//     if (confirm("Are you sure you want to delete this technician?")) {
//       this.http.delete(`http://localhost:5241/api/technicians/${id}`)
//         .subscribe({
//           next: () => {
//             alert("Technician deleted successfully!");
//             this.loadTechnicians();
//           },
//           error: (error) => {
//             console.error(error);
//             alert("Error deleting technician: " + JSON.stringify(error));
//           }
//         });
//     }
//   }
// }
