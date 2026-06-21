import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Login/login/login';
import {Navigation as AssetNavigation} from './navigation/navigation';

import { Register } from './Register/register/register';
import { Body } from './Maintenance/body/body';
import { AddTask } from './Maintenance/add-task/add-task';
import { Getplans } from './Maintenance/get-plans/get-plans';
import { UpdatePlan } from './Maintenance/update-plan/update-plan';
import { GetTasks } from './Maintenance/get-tasks/get-tasks';
import { ShowTechnician } from './Technicians/show-technician/show-technician';
import { Navigation} from './WorkOrder/components/navigation/navigation';
@Component({
  selector: 'app-root',
 imports: [RouterOutlet,AssetNavigation],
  //imports: [RouterOutlet,ShowTechnician],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('UtilityMaintenance_Frontend');
}
