import { Ship } from './ship.model';
import { Square } from './square.model';

export class Board {
  grid: Array<Array<Square>> = [];

  constructor() {
    this.grid = this.createBoardGrid();
  }

  private createBoardGrid(): Array<Array<Square>> {
    return Array.from({ length: 10 }, (_, i: number) => 
      Array.from({ length: 10 }, (_, j: number) => new Square({ x: i, y: j }))
    );
  }

  public placeShip(dropZone: Array<Square>): void {
    dropZone.map((square: Square) => square.isShip = true);
  }

  public removeShip(ship: Ship): void {
    if(!ship.coords) return;
    const { x, y } = ship.coords;

    let shipPlaces: Array<Square> = [];

    if (ship.rotate) {

      for (let i = x + (ship.size - 1); i >= x; i--) {       
        shipPlaces.push(this.grid[i][y]);
      }

    } else {

      for (let i = y + (ship.size - 1); i >= y; i--) {     
        shipPlaces.push(this.grid[x][i]);
      }

    }

    shipPlaces.map((square: Square) => square.isShip = false);
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
  }

  public unmarkForbiddenSquares(): void {
    this.grid.map((row: Array<Square>) => row.map((square: Square) => square.isForbidden = false));
  }

  public markDropZone(dropZone: Array<Square>): void {
    dropZone.map((place: Square) => place.isDropZone = true);
  }

  public unmarkDropZone(dropZone: Array<Square>): void {
    dropZone.map((place: Square) => place.isDropZone = false);
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
}