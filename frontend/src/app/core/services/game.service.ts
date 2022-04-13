import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ShipCoords } from 'src/app/shared/models/ship.model';
import { Game } from '../../shared/models/game.model';
import { Player } from '../../shared/models/player.model';

@Injectable()
export class GameService {
  public game: Game;
  public player: Player;
  public opponent: Player;

  constructor(private socket: Socket) {}

  onGameState = this.socket.fromEvent<any>('game-state');
  onTurnChange = this.socket.fromEvent<any>('turn-change');
  onTimerCountDown = this.socket.fromEvent<any>('timer-countdown');
  onGetShot = this.socket.fromEvent<any>('get-shot');

  onStartGameSuccess = this.socket.fromEvent<any>('game-start_success');
  onStartGameError = this.socket.fromEvent<any>('game-start_error');

  onJoinGameSuccess = this.socket.fromEvent<any>('game-join_success');
  onJoinGameError = this.socket.fromEvent<any>('game-join_error');

  onDeployShipsSuccess = this.socket.fromEvent<any>('deploy-ships_success');
  onDeployShipsError = this.socket.fromEvent<any>('deploy-ships_error');

  onMakeShotSuccess = this.socket.fromEvent<any>('make-shot_success');
  onMakeShotError = this.socket.fromEvent<any>('make-shot_error');

  public startGame(name: string) {
    this.socket.emit('game-start', { name });
  }

  public joinGame(name: string, gameId: string) {
    this.socket.emit('game-join', { name, gameId });
  }

  public leaveGame(userId: string, gameId: string) {
    this.socket.emit('game-leave', { userId, gameId });
  }

  public deployShips(userId: string, gameId: string, ships: Array<Array<ShipCoords>>) {
    this.socket.emit('deploy-ships', { userId, gameId, ships });
  }

  public makeShot(userId: string, gameId: string, coords: ShipCoords) {
    this.socket.emit('make-shot', { userId, gameId, coords });
  }
}