import { Routes } from '@angular/router';
import { Login } from './Login/login/login';
import { Register } from './Register/register/register';
//import { Technician } from './Technicians/models/technician';
import { Body } from './Maintenance/body/body';
import { Getplans } from './Maintenance/get-plans/get-plans';
import { AddPlans } from './Maintenance/add-plans/add-plans';
import { UpdatePlan } from './Maintenance/update-plan/update-plan';
import { GetTasks } from './Maintenance/get-tasks/get-tasks';
 
import { AddTask } from './Maintenance/add-task/add-task';
import { GetPlanByPidComponent } from './Maintenance/get-plan-by-pid/get-plan-by-pid';
import { ShowTechnician } from './Technicians/show-technician/show-technician';
import { AddTechnician } from './Technicians/add-technician/add-technician';
import { MainTech } from './Technicians/main-tech/main-tech';
import { ShowWorkorders } from './WorkOrder/components/show-workorders/show-workorders';
 import { GenerateWorkorders } from './WorkOrder/components/generate-workorders/generate-workorders';
 import { AssignTechnician } from './WorkOrder/components/assign-technician/assign-technician';
 
import { UpdateStatus } from './WorkOrder/components/update-status/update-status';

import { Navigation } from './Asset/navigation/navigation';
import { AddAsset } from './Asset/add-asset/add-asset';
import { ShowAssets } from './Asset/show-assets/show-assets';
import { UpdateAsset } from './Asset/update-asset/update-asset';


export const routes: Routes = [
    
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:'technician',component:ShowTechnician},
     { path: 'add-tech', component: AddTechnician },
    {path:'main-technician',component:MainTech},
    {path:'asset-navigation',component:Navigation,
        children:[
            {path:'add-asset', component:AddAsset},
            {path:'show-asset',component:ShowAssets},
            {path:'update-asset/:id',component:UpdateAsset}
        ]
    },
    {
    path: '',
    component: Body,
    children: [
      { path: '', redirectTo: 'get-plans', pathMatch: 'full' },
      { path: 'get-plans', component: Getplans },
      { path: 'get-plan-by-pid/:id', component: GetPlanByPidComponent }
    ]
  },
  { path: 'add-plans', component: AddPlans },
  { path: 'get-tasks', component: GetTasks },
  // Added /:id here so the update component knows which plan was clicked
  { path: 'update-plan/:id', component: UpdatePlan },
 
  { path: 'add-task/:planId', component: AddTask },
     { path: '', redirectTo: 'show-workorders', pathMatch: 'full' },
   { path: 'show-workorders', component: ShowWorkorders },
  { path: 'generate-workorders', component: GenerateWorkorders },
  { path: 'assign-technician', component: AssignTechnician },
 
   { path: 'update-status', component: UpdateStatus }
    
];
