import { Component } from '@angular/core';
import { Square } from 'src/app/shared/models/square.model';
import { Ship } from '../../shared/models/ship.model';

@Component({
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
})
export class DeployComponent {
  public fleet: Array<Ship> = [];
  public board: Array<Array<Square>> = [];

  constructor() {
    this.fleet = this.createFleet();
    this.board = this.createBoard();
  }

  private createBoard(): Square[][] {
    return Array.from({ length: 10}, (_, i) => 
      Array.from({ length: 10 }, (_, j) => new Square({ x: i, y: j }))
    );
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