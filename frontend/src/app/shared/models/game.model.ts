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
}