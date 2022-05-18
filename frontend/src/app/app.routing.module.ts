import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattleGuard } from './core/guards/battle.guard';
import { DeployGuard } from './core/guards/deploy.guard';

const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule)
  },
  { 
    path: 'deploy',
    canActivate: [DeployGuard],
    loadChildren: () => import('./pages/deploy/deploy.module').then(module => module.DeployModule) 
  },
  { 
    path: 'battle',
    canActivate: [BattleGuard],
    loadChildren: () => import('./pages/battle/battle.module').then(module => module.BattleModule) 
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }