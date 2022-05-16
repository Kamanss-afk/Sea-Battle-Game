import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MessageConfig } from '../../../core/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageComponent {
  @Input() visible: boolean = false;
  @Input() config: MessageConfig = {} as MessageConfig;

  constructor(private router: Router) {}

  public redirect(event: MouseEvent) {
    this.router.navigate(['/']);
  }
}