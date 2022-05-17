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
        title: 'ОЖИДАНИЕ ИГРОКОВ',
        body: 'Отправьте код второму игроку. Расстановка кораблей начнется сразу после присоединение противника',
        type: 'DEFAULT',
        display: 'INIT',
        clipboard: this.gameService.game.id,
      });
      break;

      case 'WAIT': this.currentMessage.next({
        title: 'ОЖИДАНИЕ БОЯ',
        body: 'Бой начнется после того как противник будет готов',
        type: 'DEFAULT',
        display: 'WAIT',
      });
      break;
      
      case 'END': this.currentMessage.next({
        title: 'БОЙ ОКОНЧЕН',
        body: this.gameService.player.winner ? 'Вы победили' : this.gameService.opponent?.winner ? 'Вы проиграли' : 'Оппонент покинул игру',
        type: this.gameService.player.winner ? 'SUCCESS' : this.gameService.opponent?.winner ? 'DANGER' : 'DEFAULT',
        display: 'END',
      });
      break;
    }
  }
}