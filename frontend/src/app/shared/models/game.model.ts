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
  id: string;
  state: GameState;
  time: number;
  turn: GameTurn | undefined;

  constructor(id: string) {
    this.id = id;
    this.state = GameState.INIT;
    this.time = 30;
    this.turn = undefined;
  }

  public changeState(state: GameState): void {
    this.state = state;
  }

  public changeTurn(turn: GameTurn): void {
    this.turn = turn;
  }

  public changeTime(time: number): void {
    this.time = time;
  }
}