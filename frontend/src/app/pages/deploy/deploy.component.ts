import { Component } from '@angular/core';
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
  ) {}
}