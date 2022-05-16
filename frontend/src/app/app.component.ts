import { Component, HostListener } from '@angular/core';
import { GameService } from './core/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private gameService: GameService) {}

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    if(this.gameService.game?.state === 'END') return true;

    event.stopImmediatePropagation();
    return false;
  }
}