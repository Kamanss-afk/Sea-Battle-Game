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
  room: string | undefined;
  turn: GameTurn | undefined;
  player: Player | undefined;
  opponent: Player | undefined;

  constructor() {
    this.state = GameState.NONE;
    this.room = undefined;
    this.turn = undefined;
    this.player = undefined;
    this.opponent = undefined
  }

  public setPlayer(name: string): void {
    this.player = new Player(name);
  }

  public setOpponent(name: string): void {
    this.opponent = new Player(name);
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