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
    this.deployedShips = [...this.deployedShips, ship];
    this.fleet = this.fleet.filter((source: Ship) => source.id != ship.id);
  }

  public removeShip(ship: Ship) {
    this.deployedShips = this.deployedShips.filter((source: Ship) => source.id != ship.id);
    this.fleet = [ship, ...this.fleet];
  }

  public moveShip(ship: Ship) {
    this.deployedShips = this.deployedShips.filter((source: Ship) => source.id != ship.id);
    this.deployedShips = [ship, ...this.deployedShips];
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