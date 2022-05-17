import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { GameService } from '../../core/services/game.service';
import { MessageService } from '../../core/services/message.service';
import { GameState, GameTurn } from '../../shared/models/game.model';
import { Square } from '../../shared/models/square.model';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit, OnDestroy {
  private getShot: Subscription;
  private gameState: Subscription;
  private turnChange: Subscription;
  private timerCountDown: Subscription;
  
  private makeShotSuccess: Subscription;
  private makeShotError: Subscription;

  constructor(
    public gameService: GameService,
    public messageService: MessageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getShot = this.gameService.onGetShot.subscribe(({ coords, hit, destroyed }) => {
      if(hit) this.gameService.player.decreaseScore();
      this.gameService.player.board.makeShot(hit, coords);
    });

    this.gameState = this.gameService.onGameState.subscribe(({ state, winner }) => {
      this.gameService.game.state = state;
      
      if(winner) {
        winner.id === this.gameService.player.id 
        ? this.gameService.player.winner = true
        : this.gameService.opponent.winner = true;
      }

      if(state === GameState.END) {
        this.messageService.visible.next(true);
      }

      this.messageService.setCurrentMessage(state);
    });

    this.timerCountDown = this.gameService.onTimerCountDown.subscribe(({ duration, done}) => {
      this.gameService.game.time.next(duration);
    });

    this.makeShotSuccess = this.gameService.onMakeShotSuccess.subscribe(({ coords, hit, destroyed }) => {
      if(hit) this.gameService.opponent.decreaseScore();
      this.gameService.opponent.board.makeShot(hit, coords);
    });

    this.makeShotError = this.gameService.onMakeShotError.subscribe(({ message }) => {
      this.toastr.error(message, 'Ошибка при выстреле! Повторите попытку');
    });

    this.turnChange = this.gameService.onTurnChange.subscribe(({ turn }) => {
      if(turn != this.gameService.player.id) {
        this.gameService.game.turn = GameTurn.OPPONENT;
      } else {
        this.gameService.game.turn = GameTurn.PLAYER;
      }
    });
  }

  ngOnDestroy(): void {
    this.getShot.unsubscribe();
    this.gameState.unsubscribe();
    this.turnChange.unsubscribe();
    this.timerCountDown.unsubscribe();
    this.makeShotSuccess.unsubscribe();
    this.makeShotError.unsubscribe();
  }

  public makeShot(square: Square): void {
    const { coords } = square;
    
    this.gameService.makeShot(coords);
  }
}
