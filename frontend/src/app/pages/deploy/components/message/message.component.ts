import { Component, Input } from "@angular/core";

export interface MessageConfig {
  title: string;
  body: string;
};

@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageComponent {
  @Input() config: MessageConfig = {
    title: 'Ожидание игры',
    body: 'Игра начнется через некоторое время'
  };
}