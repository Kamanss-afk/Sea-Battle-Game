import { Board } from './board.model';
import { Ship } from './ship.model';

export class Player {
  id: string;
  name: string;
  ready: boolean;
  winner: boolean;
  score: number;
  board: Board;
  fleet: Array<Ship>;
  deployedShips: Array<Ship>;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.ready = false;
    this.winner = false;
    this.score = 20;
    this.board = new Board();
    this.fleet = this.createFleet();
    this.deployedShips = [];
  }

  public rotateShip(shipId: number) {
    const ship = this.fleet.find((ship: Ship) => ship.id == shipId);

    if(ship) {
      ship.rotate = !ship.rotate;
    }
  }

  public deployShip(ship: Ship) {
    const index = this.fleet.findIndex((source: Ship) => source.id == ship.id);
    this.deployedShips.push(ship);
    this.fleet.splice(index, 1);
  }

  public removeShip(ship: Ship) {
    const index = this.deployedShips.findIndex((source: Ship) => source.id == ship.id);
    this.deployedShips.splice(index, 1);
    this.fleet.unshift(ship);
  }

  public moveShip(ship: Ship) {
    let index = this.deployedShips.findIndex((source: Ship) => source.id == ship.id);
    this.deployedShips.splice(index, 1);
    this.deployedShips.push(ship);
  }

  public decreaseScore() {
    this.score = this.score - 1;
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