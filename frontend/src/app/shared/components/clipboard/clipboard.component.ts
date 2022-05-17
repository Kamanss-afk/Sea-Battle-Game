import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-clipboard',
  templateUrl: 'clipboard.component.html',
  styleUrls: ['clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardComponent {
  @Input() text: string = '';
}