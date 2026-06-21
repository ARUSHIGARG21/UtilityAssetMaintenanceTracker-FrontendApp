






// // // src/app/Technicians/add-technician/add-technician.ts
// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-add-technician',
// //   standalone: true,
// //   imports:[FormsModule, CommonModule],
// //   templateUrl: './add-technician.html',
// //   styleUrls: ['./add-technician.css']
// // })
// // export class AddTechnician implements OnInit {
// //   technician = { name: '', skillSet: '' };
// //   skillSets: string[] = [];
// //   technicians: any[] = [];
// //   isCustomSkill: boolean = false;   // ✅ flag for custom skill

// //   constructor(private http: HttpClient) {}

// //   ngOnInit() {
// //     this.loadTechnicians();
// //   }

// //   loadTechnicians() {
// //     this.http.get<any[]>("http://localhost:5241/api/technicians")
// //       .subscribe({
// //         next: (data) => {
// //           this.technicians = data;
// //           this.skillSets = [...new Set(data.map(t => t.skillSet))];
// //         },
// //         error: (err) => alert("Error fetching technicians: " + JSON.stringify(err))
// //       });
// //   }

// //   addTechnician() {
 
// //     const payload = {
// //       name: this.technician.name,
// //       skillSet: this.technician.skillSet
// //     };

// //     this.http.post("http://localhost:5241/api/technicians", payload)
// //       .subscribe({
// //         next: () => {
// //           alert("Technician added successfully!");
// //           this.technician = { name: '', skillSet: '' };
// //           this.isCustomSkill = false;
// //           this.loadTechnicians(); 
// //         },
// //         error: (err) => alert("Error adding technician: " + JSON.stringify(err))
// //       });
// //   }

// //   // ✅ Toggle custom skill input
// //   onSkillChange(event: any) {
// //     this.isCustomSkill = (event.target.value === 'Other');
// //     if (this.isCustomSkill) {
// //       this.technician.skillSet = '';
// //     }
// //   }
// // }



// // // add-technician.ts
// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-add-technician',
// //   standalone: true,
// //   imports:[FormsModule, CommonModule],
// //   templateUrl: './add-technician.html',
// //   styleUrls: ['./add-technician.css']
// // })
// // export class AddTechnician implements OnInit {
// //   technician = { name: '', skillSet: '' };
// //   skillSets: string[] = [];
// //   technicians: any[] = [];
// //   isCustomSkill: boolean = false;
// //   showModal: boolean = false;

// //   constructor(private http: HttpClient) {}

// //   ngOnInit() {
// //     this.loadTechnicians();
// //   }

// //   loadTechnicians() {
// //     this.http.get<any[]>("http://localhost:5241/api/technicians")
// //       .subscribe({
// //         next: (data) => {
// //           this.technicians = data;
// //           this.skillSets = [...new Set(data.map(t => t.skillSet))];
// //         }
// //       });
// //   }

// //   addTechnician() {
// //     const payload = {
// //       name: this.technician.name,
// //       skillSet: this.technician.skillSet
// //     };

// //     this.http.post("http://localhost:5241/api/technicians", payload)
// //       .subscribe({
// //         next: () => {
// //           alert("Technician added successfully!");
// //           this.technician = { name: '', skillSet: '' };
// //           this.isCustomSkill = false;
// //           this.showModal = false;   // ✅ close modal
// //           this.loadTechnicians();
// //         }
// //       });
// //   }

// //   onSkillChange(event: any) {
// //     this.isCustomSkill = (event.target.value === 'Other');
// //     if (this.isCustomSkill) {
// //       this.technician.skillSet = '';
// //     }
// //   }

// //   openModal() { this.showModal = true; }
// //   closeModal() { this.showModal = false; }
// // }


// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-add-technician',
//   standalone: true,
//   imports:[FormsModule, CommonModule],
//   templateUrl: './add-technician.html',
//   styleUrls: ['./add-technician.css']
// })
// export class AddTechnician implements OnInit {
//   @Output() close = new EventEmitter<void>();   // ✅ notify parent

//   technician = { name: '', skillSet: '' };
//   skillSets: string[] = [];
//   isCustomSkill: boolean = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadTechnicians();
//   }

//   loadTechnicians() {
//     this.http.get<any[]>("http://localhost:5241/api/technicians")
//       .subscribe({
//         next: (data) => {
//           this.skillSets = [...new Set(data.map(t => t.skillSet))];
//         }
//       });
//   }

//   addTechnician() {
//     const payload = { name: this.technician.name, skillSet: this.technician.skillSet };

//     this.http.post("http://localhost:5241/api/technicians", payload)
//       .subscribe({
//         next: () => {
//           alert("Technician added successfully!");
//           this.technician = { name: '', skillSet: '' };
//           this.isCustomSkill = false;
//           this.close.emit();   // ✅ close modal after save
//         }
//       });
//   }

//   onSkillChange(event: any) {
//     this.isCustomSkill = (event.target.value === 'Other');
//     if (this.isCustomSkill) this.technician.skillSet = '';
//   }
// }






import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-technician',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './add-technician.html',
  styleUrls: ['./add-technician.css']
})
export class AddTechnician implements OnInit {
  technician = { name: '', skillSet: '' };
  skillSets: string[] = [];
  isCustomSkill: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadTechnicians();
  }

  loadTechnicians() {
    this.http.get<any[]>("http://localhost:5241/api/technicians")
      .subscribe({
        next: (data) => {
          this.skillSets = [...new Set(data.map(t => t.skillSet))];
        }
      });
  }

  addTechnician() {
    const payload = { name: this.technician.name, skillSet: this.technician.skillSet };

    this.http.post("http://localhost:5241/api/technicians", payload)
      .subscribe({
        next: () => {
          alert("Technician added successfully!");
          this.technician = { name: '', skillSet: '' };
          this.isCustomSkill = false;
          this.router.navigate(['/technician']);   // ✅ go back after save
        }
      });
  }

  cancel() {
    this.router.navigate(['/technician']);   // ✅ go back on cancel
  }

  onSkillChange(event: any) {
    this.isCustomSkill = (event.target.value === 'Other');
    if (this.isCustomSkill) this.technician.skillSet = '';
  }
}
