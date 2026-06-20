// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Asset } from '../models/asset';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-asset',
//   imports: [FormsModule],
//   templateUrl: './add-asset.html',
//   styleUrl: './add-asset.css',
// })
// export class AddAsset implements OnInit {
//   a: Asset = new Asset();
//   assetTypes: string[] = [];
//   newAssetType: string = '';

//   constructor(private client: HttpClient, private router: Router,private cd:ChangeDetectorRef) {}

//   ngOnInit() {
//     this.a.locations = [{
//       region: "",
//       siteCode: ""
//     }];

//     this.fetchAssetTypesFromDB();
//     this.cd.detectChanges();
//   }

//   fetchAssetTypesFromDB() {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     this.client.get<Array<Asset>>("http://localhost:5084/api/Assets", { headers })
//       .subscribe({
//         next: (data) => {
//           if (data && data.length > 0) {
//             const rawTypes = data.map(asset => asset.type);
//             const uniqueDBTypes = Array.from(new Set(rawTypes.filter(type => type && type.trim() !== '')));
            
//            this.assetTypes = uniqueDBTypes;
//            this.cd.detectChanges();
//           }
//         },
//         error: (err) => {
//           console.error("Database se types laane mein dikkat aayi:", err);
//         }
//       });
//   }

//   onChangeDetection(){
//     this.cd.detectChanges();
//   }

//   addNewAssetType() {
//     const trimmed = this.newAssetType.trim();
//     if (trimmed) {
//       if (!this.assetTypes.includes(trimmed)) {
//         this.assetTypes.push(trimmed);
//       }
//       this.a.type = trimmed; 
//       this.newAssetType = ''; 
//       this.cd.detectChanges();
//     }
//   }

//   handleAddClick() {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });


//     this.client.post("http://localhost:5084/api/Assets", this.a, { headers })
//       .subscribe(() => {
//         this.a = new Asset();
//         this.ngOnInit(); 
//         this.router.navigate(['/asset-navigation/show-asset']);
//         this.cd.detectChanges();
//       });
//   }
// }



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Asset } from '../models/asset';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asset',
  imports: [FormsModule],
  templateUrl: './add-asset.html',
  styleUrl: './add-asset.css',
})
export class AddAsset implements OnInit {
  a: Asset = new Asset();
  assetTypes: string[] = [];
  newAssetType: string = '';


  constructor(private client: HttpClient, private router: Router,private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.a.locations = [{
      region: "",
      siteCode: ""
    }];

    this.fetchAssetTypesFromDB();
    this.cd.detectChanges();
  }

  fetchAssetTypesFromDB() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.client.get<Array<Asset>>("http://localhost:5084/api/Assets", { headers })
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            const rawTypes = data.map(asset => asset.type);
            const uniqueDBTypes = Array.from(new Set(rawTypes.filter(type => type && type.trim() !== '')));
            
            this.assetTypes = uniqueDBTypes;
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.error("Database se types laane mein dikkat aayi:", err);
        }
      });
  }

  addNewAssetType() {
    const trimmed = this.newAssetType.trim();
    if (trimmed) {
      if (!this.assetTypes.includes(trimmed)) {
        this.assetTypes.push(trimmed);
      }
      this.a.type = trimmed; 
      this.newAssetType = ''; 
      this.cd.detectChanges();
    }
  }

  handleAddClick() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.client.post("http://localhost:5084/api/Assets", this.a, { headers })
      .subscribe(() => {
        this.a = new Asset();
        this.ngOnInit(); 
        this.router.navigate(['/asset-navigation/show-asset']);
        this.cd.detectChanges();
      });
  }
}