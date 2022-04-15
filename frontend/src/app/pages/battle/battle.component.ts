import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/core/services/game.service';
import { GameTurn } from 'src/app/shared/models/game.model';
import { Square } from 'src/app/shared/models/square.model';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit, OnDestroy {
  private getShot: Subscription;
  private gameState: Subscription;
  private turnChange: Subscription;
  private timerCountDown: Subscription;
  
  private makeShotSuccess: Subscription;
  private makeShotError: Subscription;

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.getShot = this.gameService.onGetShot.subscribe(({ coords, hit, destroyed }) => {
      this.gameService.player.board.makeShot(hit, coords);
    });

    this.gameState = this.gameService.onGameState.subscribe(({ state }) => {
      this.gameService.game.state = state;
    });

    this.timerCountDown = this.gameService.onTimerCountDown.subscribe(({ duration, done}) => {
      this.gameService.game.time = duration;
    });

    this.makeShotSuccess = this.gameService.onMakeShotSuccess.subscribe(({ coords, hit, destroyed }) => {
      this.gameService.opponent.board.makeShot(hit, coords);
    });

    this.makeShotError = this.gameService.onMakeShotError.subscribe(({ message }) => {
      console.log(message);
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
    const gameId = this.gameService.game.id;
    const userId = this.gameService.player.id;
    
    this.gameService.makeShot(userId, gameId, coords);
  }
}
