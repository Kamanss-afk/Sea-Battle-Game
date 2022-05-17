import { BehaviorSubject } from "rxjs";

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
  turn: GameTurn;
  time: BehaviorSubject<number>;

  constructor(id: string, turn: GameTurn) {
    this.id = id;
    this.state = GameState.INIT;
    this.turn = turn;
    this.time = new BehaviorSubject(30);
  }
}