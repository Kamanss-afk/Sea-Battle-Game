export interface SquareCoords {
  x: number;
  y: number;
}

export class Square {
  coords: SquareCoords;
  isShip: boolean;
  isForbidden: boolean;
  isDropZone: boolean;
  isHit: boolean;
  isMiss: boolean;

  constructor(coords: SquareCoords) {
    this.isShip = false;
    this.isForbidden = false;
    this.isDropZone = false;
    this.isHit = false;
    this.isMiss = false;
    this.coords = coords;
  }
}