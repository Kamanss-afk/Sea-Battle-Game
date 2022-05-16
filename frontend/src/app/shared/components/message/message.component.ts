import { Component, Input } from '@angular/core';

import { MessageConfig } from '../../../core/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageComponent {
  @Input() visible: boolean = false;
  @Input() config: MessageConfig = {} as MessageConfig;

  public redirect(event: MouseEvent) {
    window.location.href = '/';
  }
}