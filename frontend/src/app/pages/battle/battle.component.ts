import { Component } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent {
  constructor(public gameService: GameService) {}
}
