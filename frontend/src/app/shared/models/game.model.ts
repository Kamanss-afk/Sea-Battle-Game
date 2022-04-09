import { Player } from './player.model';

export enum GameState {
  INIT='INIT',
  DEPLOY='DEPLOY',
  BATTLE='BATTLE',
  END='END',
}

export enum GameTurn {
  PLAYER='PLAYER',
  OPPONENT='OPPONENT',
}

export class Game {
  state: GameState;
  player: Player;
  opponent: Player;
  room: string | undefined;
  turn: GameTurn | undefined;

  constructor() {
    this.state = GameState.INIT;
    this.player = new Player();
    this.opponent = new Player();
    this.room = undefined;
    this.turn = undefined;
  }

  public setState(state: GameState): void {
    this.state = state;
  }

  public setTurn(turn: GameTurn): void {
    this.turn = turn;
  }

  public setRoom(room: string): void {
    this. room = room;
  }
}