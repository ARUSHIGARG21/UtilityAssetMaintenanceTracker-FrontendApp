import { Routes } from '@angular/router';
import { Login } from './Login/login/login';
import { Register } from './Register/register/register';

import { Navigation } from './Asset/navigation/navigation';
import { AddAsset } from './Asset/add-asset/add-asset';
import { ShowAssets } from './Asset/show-assets/show-assets';
import { UpdateAsset } from './Asset/update-asset/update-asset';


export const routes: Routes = [
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:'asset-navigation',component:Navigation,
        children:[
            {path:'add-asset', component:AddAsset},
            {path:'show-asset',component:ShowAssets},
            {path:'update-asset/:assetID',component:UpdateAsset},

        ]
    }
];
