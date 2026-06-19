import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Asset } from '../models/asset';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-assets',
  imports: [FormsModule,RouterLink],
  templateUrl: './show-assets.html',
  styleUrl: './show-assets.css',
})
export class ShowAssets implements OnInit{
  assetArray:Array<Asset> = [];
  constructor(private c:HttpClient,private cd: ChangeDetectorRef){}
  ngOnInit(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.c.get<Array<Asset>>("http://localhost:5084/api/Assets", { headers })
    .subscribe({
      next:(data)=>{console.log(data),this.assetArray = data;this.cd.detectChanges()},
      error:(err)=>{alert(JSON.stringify(err))}
    })
  }
}
