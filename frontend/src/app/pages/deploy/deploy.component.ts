import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/services/message.service';
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

  constructor(
    public gameService: GameService,
    public messageService: MessageService,
    public deployService: DeployService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.gameState = this.gameService.onGameState.subscribe(({ state }) => {
      this.gameService.game.state = state;
      this.messageService.setCurrentMessage(state);

      switch(state) {
        case 'DEPLOY': this.messageService.visible = false;
        break;
        case 'END': this.messageService.visible = true;
        break;
        case 'BATTLE': 
          this.messageService.visible = false;
          this.router.navigate(['battle']);
        break;
      };
    });

    this.opponentReady = this.gameService.onOpponentReady.subscribe(({ opponent }) => {
      const { id, name, ready } = opponent;
      
      this.gameService.opponent = new Player(id, name);
      this.gameService.opponent.ready = ready;

      this.toastr.info(`Оппонент ${opponent.name} завершил расстановку кораблей и готов к бою!`);
    });

    this.deployShipsSuccess = this.gameService.onDeployShipsSuccess.subscribe(({ ready }) => {
      this.gameService.player.ready = ready;
      this.messageService.visible = true;
    });

    this.deployShipsError = this.gameService.onDeployShipsError.subscribe(({ ready, message }) => {
      this.gameService.player.ready = ready;
      this.toastr.error(message, 'Произошла ошибка при расстановке кораблей:');
    })
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();
    this.opponentReady.unsubscribe();
    this.deployShipsSuccess.unsubscribe();
    this.deployShipsError.unsubscribe();
  }

  public ready() {
    if(this.gameService.player.deployedShips.length == 10) {
      const ships = this.gameService.player.deployedShips.map(({ coords }) => coords);

      this.gameService.deployShips(ships);
    }
  }
}