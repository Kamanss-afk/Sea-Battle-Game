import { 
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Square, SquarePosition } from "../../models/square.model";

@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss'],
})
export class BoardComponent {
  @Input() board: Array<Array<Square>> = [];

  @ViewChild('boardElement', {static: false}) 
  boardElement: ElementRef | undefined;

  @Output() onSquareClick = new EventEmitter<Square>()
  squareClick(square: Square) {
    this.onSquareClick.emit(square);
  }

  @Output() onSquareLeave = new EventEmitter<Square>()
  squareLeave(square: Square) {
    this.onSquareLeave.emit(square);
  }

  @Output() onSquareHover = new EventEmitter<{ square: Square, position: SquarePosition }>()
  squareHover(square: Square, squareElement: any) {
    const position = this.getSquarePosition(squareElement);
    this.onSquareHover.emit({ square, position });
  }

  private getSquarePosition(squareElement: any): SquarePosition {
    return {
      left:
        squareElement.left - 
        this.boardElement?.nativeElement.getBoundingClientRect().left,
      top:
        squareElement.top - 
        this.boardElement?.nativeElement.getBoundingClientRect().top,
    };
  }
}