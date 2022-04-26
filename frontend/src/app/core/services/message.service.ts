import { Injectable } from '@angular/core';
import { GameService } from './game.service';

type MessageType = 'DEFAULT' | 'SUCCESS' | 'DANGER';
type MessageDisplay = 'INIT' | 'DEPLOY' | 'END';

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

  constructor(private gameService: GameService) {}

  public getMessageConfig(): MessageConfig {
    switch(this.gameService.game.state) {
      case 'INIT': return {
        title: 'ОЖИДАНИЕ ИГРОКОВ',
        body: 'Отправьте код второму игроку. Расстановка кораблей начнется сразу после присоединение противника',
        type: 'DEFAULT',
        display: 'INIT',
        clipboard: this.gameService.game.id,
      };

      case 'DEPLOY': return {
        title: 'ОЖИДАНИЕ БОЯ',
        body: 'Бой начнется после того как противник расставит свои корабли',
        type: 'DEFAULT',
        display: 'DEPLOY',
      };
      
      case 'END': return {
        title: 'БОЙ ОКОНЧЕН',
        body: this.gameService.player.winner ? 'Вы победили' : this.gameService.opponent?.winner ? 'Вы проиграли' : 'Оппонент покинул игру',
        type: this.gameService.player.winner ? 'SUCCESS' : this.gameService.opponent?.winner ? 'DANGER' : 'DEFAULT',
        display: 'END',
      };

      default: return {} as MessageConfig;
    }
  }
}