import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Square } from '../../models/square.model';

@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() board: Array<Array<Square>> = [];

  public numbers: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public letters: Array<string> = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

  @Output() onSquareClick = new EventEmitter<Square>()
  squareClick(square: Square) {
    this.onSquareClick.emit(square);
  }

  @Output() onSquareLeave = new EventEmitter<Square>()
  squareLeave(square: Square) {
    this.onSquareLeave.emit(square);
  }

  @Output() onSquareHover = new EventEmitter<Square>()
  squareHover(square: Square) {
    this.onSquareHover.emit(square);
  }

}