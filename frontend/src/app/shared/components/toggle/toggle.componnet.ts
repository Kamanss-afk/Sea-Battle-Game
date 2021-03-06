import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: 'toggle.component.html',
  styleUrls: ['toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  @Input() controllers: [string, string] = ['On', 'Off'];

  @Output() onSwitch = new EventEmitter<MouseEvent>();
  switch(event: MouseEvent){
    this.onSwitch.emit(event);
  }
}