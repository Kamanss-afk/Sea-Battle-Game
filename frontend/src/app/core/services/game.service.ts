import { Injectable } from '@angular/core';
import { Game } from '../../shared/models/game.model';

@Injectable()
export class GameService {
  public game: Game = new Game();

  onGameState: any;
  onJoinGame: any;
  onSwitchPlayer: any;
  onShoot: any;

  public startGame() {}

  public joinGame() {}

  public leaveGame() {}

  public deployShips() {}

  public switchTurn() {}

  public makeShoot() {}
}