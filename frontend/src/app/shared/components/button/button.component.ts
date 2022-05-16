import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'primary' | 'danger';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();
  click(event: MouseEvent){
    this.onClick.emit(event);
  }
}