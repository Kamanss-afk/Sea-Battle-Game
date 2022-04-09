import { Player } from './player.model';

export enum GameState {
  NONE='NONE',
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
  room: string;
  turn: GameTurn | undefined;

  constructor() {
    this.state = GameState.NONE;
    this.player = new Player();
    this.opponent = new Player();
    this.room = '';
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