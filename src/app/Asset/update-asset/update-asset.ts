import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-asset',
  imports: [FormsModule],
  templateUrl: './update-asset.html',
  styleUrl: './update-asset.css',
})
export class UpdateAsset implements OnInit {
  u:User = new User();
  currentAssetID!: number;
  constructor(private c:HttpClient,private route:ActivatedRoute,private cd :ChangeDetectorRef,private router:Router){}
  ngOnInit(){
    const paramID = this.route.snapshot.paramMap.get('assetID');
    this.currentAssetID = Number(paramID);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    if(this.currentAssetID){
      this.c.get<any>(`http://localhost:5084/api/Assets/${this.currentAssetID}`, { headers })
      .subscribe({
        next:(data)=>{
          this.u.assetName = data.name;
          this.u.assetType = data.type;
          this.u.installationDate = data.installationDate;

          this.cd.detectChanges();
        }
      })
    }
    
   
  }
  updateAsset() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      const updatedAsset = {
         name: this.u.assetName,
         type: this.u.assetType ,
         installationDate: this.u.installationDate
        };
    this.c.patch(`http://localhost:5084/api/Assets/${this.currentAssetID}`, updatedAsset, { headers })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/asset-navigation/show-asset']);
        },
        error: (err) => {
          alert("Asset Update Failed");
        }
      });
    
}
}
