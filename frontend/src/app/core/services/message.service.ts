import { Injectable } from '@angular/core';

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
  public visible: boolean = false;
  public currentMessage: MessageConfig;

  constructor(private gameService: GameService) {}

  public setCurrentMessage(state: GameState) {
    switch(state) {
      case 'INIT': this.currentMessage = {
        title: 'ОЖИДАНИЕ ИГРОКОВ',
        body: 'Отправьте код второму игроку. Расстановка кораблей начнется сразу после присоединение противника',
        type: 'DEFAULT',
        display: 'INIT',
        clipboard: this.gameService.game.id,
      };
      break;

      case 'WAIT': this.currentMessage = {
        title: 'ОЖИДАНИЕ БОЯ',
        body: 'Бой начнется после того как противник будет готов',
        type: 'DEFAULT',
        display: 'WAIT',
      };
      break;
      
      case 'END': this.currentMessage = {
        title: 'БОЙ ОКОНЧЕН',
        body: this.gameService.player.winner ? 'Вы победили' : this.gameService.opponent?.winner ? 'Вы проиграли' : 'Оппонент покинул игру',
        type: this.gameService.player.winner ? 'SUCCESS' : this.gameService.opponent?.winner ? 'DANGER' : 'DEFAULT',
        display: 'END',
      };
      break;
    }
  }
}