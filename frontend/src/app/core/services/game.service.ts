import { Injectable } from '@angular/core';
import { Player } from '../../shared/models/player.model';

@Injectable()
export class GameService {
  public player: Player = new Player('');
  public opponent: Player = new Player('');
}