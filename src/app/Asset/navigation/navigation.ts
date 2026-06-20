import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {}
