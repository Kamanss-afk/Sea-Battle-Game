import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { DeployService } from './services/deploy.service';

@Component({
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
})
export class DeployComponent {
  constructor(
    public gameService: GameService,
    public deployService: DeployService,
    private router: Router,
  ) {}

  public ready() {
    if(this.gameService.game.player.deployedShips.length == 10) {
      this.router.navigate(['battle']);
    }
  }
}