import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GameState } from '../../shared/models/game.model';
import { GameService } from './game.service';

type MessageType = 'DEFAULT' | 'SUCCESS' | 'DANGER';
type MessageDisplay = 'INIT' | 'WAIT' | 'END';

export interface MessageConfig {
  title: string;
  body: string;
  type: MessageType;
  display: MessageDisplay;
  clipboard?: string;
}

@Injectable()
export class MessageService {
  public visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentMessage: BehaviorSubject<MessageConfig> = new BehaviorSubject({} as any);

  constructor(private gameService: GameService) {}

  public setCurrentMessage(state: GameState) {
    switch(state) {
      case 'INIT': this.currentMessage.next({
        title: 'WAITING FOR PLAYERS',
        body: 'Share the code with the second player. The ships deployment will start once player join.',
        type: 'DEFAULT',
        display: 'INIT',
        clipboard: this.gameService.game.id,
      });
      break;

      case 'WAIT': this.currentMessage.next({
        title: 'WAITING FOR BATTLE',
        body: 'The battle will begin as soon as the opponent is ready.',
        type: 'DEFAULT',
        display: 'WAIT',
      });
      break;
      
      case 'END': this.currentMessage.next({
        title: 'BATTLE ENDED',
        body: this.gameService.player.winner ? 'You won!' : this.gameService.opponent?.winner ? 'You lost!' : 'The opponent has left the game!',
        type: this.gameService.player.winner ? 'SUCCESS' : this.gameService.opponent?.winner ? 'DANGER' : 'DEFAULT',
        display: 'END',
      });
      break;
    }
  }
}