import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../../shared/shared.module';
import { BattleComponent } from './battle.component';
import { PlayerComponent } from './components/player/player.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [
    BattleComponent,
    PlayerComponent,
    TimerComponent,
  ],
  imports: [
    SharedModule,
    CountdownModule,
    RouterModule.forChild([
      { path: '', component: BattleComponent }
    ])
  ],
  exports: [

  ],
})
export class BattleModule {}