import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {

  @ViewChild('timer', { static: false }) private timer: CountdownComponent;

  @Output() onDone = new EventEmitter<CountdownEvent>();
  @Output() onStart = new EventEmitter<CountdownEvent>();

  public handleEvent(event: CountdownEvent) {
    switch(event.action) {
      case 'done': this.doneEvent(event);
      break;
      
      case 'start': this.startEvent(event);
      break;
    }
  }

  private doneEvent(event: CountdownEvent): void {
    this.timer.restart();
    this.onDone.emit(event);
  }

  private startEvent(event: CountdownEvent): void {
    this.onStart.emit(event);
  }

  public config: CountdownConfig = {
    leftTime: 5,
    format: 's',
  }

}
