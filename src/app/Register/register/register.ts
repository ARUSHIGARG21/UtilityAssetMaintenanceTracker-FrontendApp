import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    u:User = new User();
    constructor(private client: HttpClient){}
    registerHandler(){
      this.client.post(
    "https://localhost:7078/api/Auth/register",this.u,{ responseType: 'text' } )
  .subscribe({
    next: (res) => {
      alert("Registration Successful");
    },
    error: (err) => {
      alert("Registration Failed");
    }
  });
}
}
