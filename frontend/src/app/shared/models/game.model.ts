export enum GameState {
  INIT='INIT',
  DEPLOY='DEPLOY',
  WAIT='WAIT',
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
  turn: GameTurn;

  constructor(id: string, turn: GameTurn) {
    this.id = id;
    this.state = GameState.INIT;
    this.time = 30;
    this.turn = turn;
  }
}