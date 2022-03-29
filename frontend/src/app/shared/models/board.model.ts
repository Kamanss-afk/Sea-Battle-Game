import { Square } from "./square.model";

export class Board {
  grid: Array<Array<Square>> = [];

  constructor() {
    this.grid = this.getEmptyGrid();
  }

  private getEmptyGrid(): Square[][] {
    return Array.from({ length: 10 }, (_, i: number) => 
      Array.from({ length: 10 }, (_, j: number) => new Square({ x: i, y: j }))
    );
  }
}