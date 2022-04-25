import { Component, Input } from "@angular/core";

type MessageType = 'DEFAULT' | 'SUCCESS' | 'DANGER';

@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageComponent {
  @Input() type: MessageType = 'DEFAULT';
}