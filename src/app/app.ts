import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Login/login/login';
import { Navigation } from './navigation/navigation';
import { Register } from './Register/register/register';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navigation,Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('UtilityMaintenance_Frontend');
}
