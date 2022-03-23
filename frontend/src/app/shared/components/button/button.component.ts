import { Component, Input } from "@angular/core";

type ButtonType = 'primary' | 'danger';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() disabled: boolean = false;
}