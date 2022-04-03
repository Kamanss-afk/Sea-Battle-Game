export interface ShipCoords {
  x: number;
  y: number;
}

export interface ShipPosition {
  top: number;
  left: number;
}

export class Ship {
  id: number;
  size: number;
  rotate: boolean;
  deployed: boolean;
  coords?: ShipCoords;
  position?: ShipPosition;

  constructor(id: number, size: number) {
    this.id = id;
    this.size = size;
    this.rotate = false;
    this.deployed = false;
    this.coords = undefined;
    this.position = undefined;
  }
}