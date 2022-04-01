import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule)
  },
  { 
    path: 'deploy', 
    loadChildren: () => import('./pages/deploy/deploy.module').then(module => module.DeployModule) 
  },
  { 
    path: 'battle', 
    loadChildren: () => import('./pages/battle/battle.module').then(module => module.BattleModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }