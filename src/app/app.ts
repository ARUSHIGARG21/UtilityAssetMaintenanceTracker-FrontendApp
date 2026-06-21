import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Login/login/login';
import { Navigation } from './navigation/navigation';
import { Register } from './Register/register/register';
import { ShowTechnician } from './Technicians/show-technician/show-technician';
@Component({
  selector: 'app-root',
 // imports: [RouterOutlet,Navigation],
  imports: [RouterOutlet,ShowTechnician],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('UtilityMaintenance_Frontend');
}
