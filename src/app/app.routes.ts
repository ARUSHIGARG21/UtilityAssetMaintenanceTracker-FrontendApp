import { Routes } from '@angular/router';
import { Login } from './Login/login/login';
import { Register } from './Register/register/register';
//import { Technician } from './Technicians/models/technician';
import { ShowTechnician } from './Technicians/show-technician/show-technician';
import { AddTechnician } from './Technicians/add-technician/add-technician';
import { MainTech } from './Technicians/main-tech/main-tech';

import { Navigation } from './Asset/navigation/navigation';
import { AddAsset } from './Asset/add-asset/add-asset';
import { ShowAssets } from './Asset/show-assets/show-assets';
import { UpdateAsset } from './Asset/update-asset/update-asset';


export const routes: Routes = [
    
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:'technician',component:ShowTechnician},
     { path: 'add-tech', component: AddTechnician },
    {path:'main-technician',component:MainTech}
    {path:'asset-navigation',component:Navigation,
        children:[
            {path:'add-asset', component:AddAsset},
            {path:'show-asset',component:ShowAssets},
            {path:'update-asset/:id',component:UpdateAsset}
        ]
    }
    
];
