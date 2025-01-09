import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { MessageService } from '../../core/services/message.service';
import { GameService } from '../../core/services/game.service';
import { Player } from '../../shared/models/player.model';
import { DeployService } from './services/deploy.service';

@Component({
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        case 'DEPLOY': this.messageService.visible.next(false);
        break;
        case 'WAIT': this.messageService.visible.next(true);
        break;
        case 'END': this.messageService.visible.next(true);
        break;
        case 'BATTLE': 
          this.messageService.visible.next(false);
          this.router.navigate(['battle']);
        break;
      };
    });

    this.opponentReady = this.gameService.onOpponentReady.subscribe(({ opponent }) => {
      const { id, name, ready } = opponent;
      
      this.gameService.opponent = new Player(id, name);
      this.gameService.opponent.ready = ready;

      this.toastr.info(`Opponent ${opponent.name} has completed ship deployment and ready for battle!`);
    });

    this.deployShipsSuccess = this.gameService.onDeployShipsSuccess.subscribe(({ ready }) => {
      this.gameService.player.ready = ready;
    });

    this.deployShipsError = this.gameService.onDeployShipsError.subscribe(({ ready, message }) => {
      this.gameService.player.ready = ready;
      this.toastr.error(message, 'An error has been made when deploying ships:');
    })
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();
    this.opponentReady.unsubscribe();
    this.deployShipsSuccess.unsubscribe();
    this.deployShipsError.unsubscribe();
  }

  public ready() {
    if(this.gameService.player.deployedShips.length === 10) {
      const ships = this.gameService.player.deployedShips.map(({ coords }) => coords);
      this.gameService.deployShips(ships);
    } else {
      this.toastr.error('You need to deploy all the ships');
    }
  }
}