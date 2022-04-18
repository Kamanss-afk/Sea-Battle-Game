import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from '../../core/services/game.service';
import { GameState, GameTurn } from '../../shared/models/game.model';
import { Player } from '../../shared/models/player.model';
import { DeployService } from './services/deploy.service';

@Component({
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
})
export class DeployComponent implements OnInit, OnDestroy {
  private gameState: Subscription;
  private opponentReady: Subscription;
  private deployShipsSuccess: Subscription;
  private deployShipsError: Subscription;
  private turnChange: Subscription;

  constructor(
    public gameService: GameService,
    public deployService: DeployService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.gameState = this.gameService.onGameState.subscribe(({ state }) => {
      this.gameService.game.changeState(state);

      if(state === GameState.BATTLE) this.router.navigate(['battle']);
    });

    this.opponentReady = this.gameService.onOpponentReady.subscribe(({ opponent }) => {
      const { id, name, ready } = opponent;
      
      this.gameService.opponent = new Player(id, name);
      this.gameService.opponent.ready = ready;
    });

    this.turnChange = this.gameService.onTurnChange.subscribe(({ turn }) => {
      if(turn != this.gameService.player.id) {
        this.gameService.game.turn = GameTurn.OPPONENT;
      } else {
        this.gameService.game.turn = GameTurn.PLAYER;
      }
    });

    this.deployShipsSuccess = this.gameService.onDeployShipsSuccess.subscribe(({ ready }) => {
      this.gameService.player.ready = ready;
    });

    this.deployShipsError = this.gameService.onDeployShipsError.subscribe(({ ready, message }) => {
      this.gameService.player.ready = ready;
    })
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();
    this.opponentReady.unsubscribe();
    this.deployShipsSuccess.unsubscribe();
    this.deployShipsError.unsubscribe();
    this.turnChange.unsubscribe();
  }

  public ready() {
    if(this.gameService.player.deployedShips.length == 10) {
      const userId = this.gameService.player.id;
      const gameId = this.gameService.game.id;
      const ships = this.gameService.player.deployedShips.map(({ coords }) => coords);

      this.gameService.deployShips(userId, gameId, ships);
    }
  }
}