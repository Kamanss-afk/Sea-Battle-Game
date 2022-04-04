import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BattleComponent } from './battle.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    BattleComponent,
    PlayerComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: BattleComponent }
    ])
  ],
  exports: [

  ],
})
export class BattleModule {}