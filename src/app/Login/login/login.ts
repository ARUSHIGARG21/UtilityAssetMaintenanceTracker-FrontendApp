import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  u: User = new User();
  result: any;

  constructor(private client: HttpClient, private router: Router) {}

  loginHandler() {
    this.client.post("http://localhost:7078/api/Auth/login", this.u)
      .subscribe({
        next: (res: any) => {
          this.result = res;
          console.log(this.result);

          localStorage.setItem("token", this.result.token);
          localStorage.setItem("role", this.result.role);

          if (this.result.token && this.result.role === 'Admin') {
            this.router.navigate(['/asset-navigation/show-asset']);
          } 
          else if (this.result.token && this.result.role === 'Technician') {
            console.log("Technician Route");
            this.router.navigate(['/technician-dashboard']); 
          }
        },

        error: (err) => {
          console.error(err);
          alert("Login Failed");
        }
      });
  }
}