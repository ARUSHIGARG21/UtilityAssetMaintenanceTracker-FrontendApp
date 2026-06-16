import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  u:User = new User();
  result:any;
  constructor(private client:HttpClient){}
  loginHandler(){
    this.client.post("https://localhost:7078/api/Auth/login",this.u)
    .subscribe({
  next: (res: any) => {
    this.result = res;
    localStorage.setItem("token", this.result.token);

    if (this.result.token) {
      alert("Login Successfully");
    }
     else {
      alert("Token not found");
    }
  },
  error: (err) => {
    console.error(err);
    alert("Login Failed");
  }
});
  }
}
