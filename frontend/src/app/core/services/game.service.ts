import { Injectable } from '@angular/core';
import { Game } from '../../shared/models/game.model';

@Injectable()
export class GameService {
  public game: Game;
}