import { Board } from "./board.model";
import { Ship } from "./ship.model";

export class Player {
  board: Board;
  fleet: Array<Ship>;
  deployedShips: Array<Ship>;

  constructor() {
    this.board = new Board();
    this.fleet = this.createFleet();
    this.deployedShips = [];
  }

  private createFleet(): Array<Ship> {
    return [
      new Ship(1, 4),
      new Ship(2, 3),
      new Ship(3, 3),
      new Ship(4, 2),
      new Ship(5, 2),
      new Ship(6, 2),
      new Ship(7, 1),
      new Ship(8, 1),
      new Ship(9, 1),
      new Ship(10, 1)
    ];
  };
}