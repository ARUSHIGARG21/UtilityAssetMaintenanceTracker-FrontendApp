import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    u:User = new User();
    constructor(private client: HttpClient,private router:Router){}
    registerHandler(){
      this.client.post(
    "http://localhost:7078/api/Auth/register",this.u,{ responseType: 'text' } )
  .subscribe({
    next: (res) => {
      alert("Registration Successful");
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert("Registration Failed");
    }
  });
}
}
