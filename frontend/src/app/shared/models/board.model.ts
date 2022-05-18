import { BehaviorSubject } from 'rxjs';
import { Ship, ShipCoords } from './ship.model';
import { Square } from './square.model';

export class Board {
  grid: Array<Array<Square>>;
  gridSubject: BehaviorSubject<Array<Array<Square>>>;

  constructor() {
    this.grid = this.createBoardGrid();
    this.gridSubject = new BehaviorSubject([...this.grid])
  }

  public makeShot(hit: boolean, coords: ShipCoords) {
    const { x, y } = coords;

    if(hit) {
      this.grid[x][y].isHit = true;
    } else {
      this.grid[x][y].isMiss = true;
    }

    this.gridSubject.next([...this.grid]);
  }

  public placeShip(dropZone: Array<Square>): void {
    dropZone.map((square: Square) => square.isShip = true);

    this.gridSubject.next([...this.grid]);
  }

  public removeShip(ship: Ship): void {
    for (let i = 0; i < ship.coords.length; i++) {
      const { x, y } = ship.coords[i];
      this.grid[x][y].isShip = false;
    }

    this.gridSubject.next([...this.grid]);
  }

  public getPlacesForShip(x: number, y: number, ship: Ship): Array<Square> {
    let places: Array<Square> = [];

    if (ship.rotate) {
      for (let i = x + (ship.size - 1) ; i >= x - (ship.size - 1); i--) {

        if (!this.isValidCoords(x,i)) {
            continue;
        }

        if (!this.grid[i][y].isShip && !this.grid[i][y].isForbidden) {
            places.push(this.grid[i][y]);
        } else {
            places = [];
        }

        if (places.length === ship.size) {
            return places.reverse();
        }
      }
    } else {

      for (let i = y + (ship.size - 1) ; i >= y - (ship.size - 1); i--) {

        if (!this.isValidCoords(x,i)) {
            continue;
        }

        if (!this.grid[x][i].isShip && !this.grid[x][i].isForbidden) {
            places.push(this.grid[x][i]);
        } else {
            places = [];
        }

        if (places.length === ship.size) {
            return places.reverse();
        }
      }

    }

    return [];
  }

  public markForbiddenSquares(): void {
    for (let i = 0; i < this.grid.length; i++) {
      const row = this.grid[i];

      for (let j = 0; j < row.length; j++) {
        const square = row[j];

        if(square.isShip) {
          this.getSquaresNearby(square).map((square: Square) => square.isForbidden = true);
        }

      }
    }

    this.gridSubject.next([...this.grid]);
  }

  public unmarkForbiddenSquares(): void {
    this.grid.map((row: Array<Square>) => row.map((square: Square) => square.isForbidden = false));

    this.gridSubject.next([...this.grid]);
  }

  public markDropZone(dropZone: Array<Square>): void {
    dropZone.map((place: Square) => place.isDropZone = true);

    this.gridSubject.next([...this.grid]);
  }

  public unmarkDropZone(dropZone: Array<Square>): void {
    dropZone.map((place: Square) => place.isDropZone = false);

    this.gridSubject.next([...this.grid]);
  }
  
  private getSquaresNearby(square: Square): Array<Square> {
    const { x, y } = square.coords;

    const allSquareNeighbors: Array<Array<number>> = [
      [x - 1, y - 1],[x - 1, y], [x - 1, y + 1],
      [x, y - 1],                 [x, y + 1],
      [x + 1, y - 1], [x + 1, y], [x + 1, y + 1],
    ];

    let validSquareNeighbors: Array<Square> = [];

    for (let i = 0; i < allSquareNeighbors.length; i++) {
      const [ x, y ] = allSquareNeighbors[i];

      if(this.isValidCoords(x,y)) {
        validSquareNeighbors.push(this.grid[x][y]);
      }
    }

    return validSquareNeighbors;
  }

  private isValidCoords = (x: number, y: number): boolean => {
    return ((x >= 0 && x <= 9) && (y >= 0 && y <= 9)) ? true : false;
  }

  private createBoardGrid(): Array<Array<Square>> {
    return Array.from({ length: 10 }, (_, i: number) => 
      Array.from({ length: 10 }, (_, j: number) => new Square({ x: i, y: j }))
    );
  }
}