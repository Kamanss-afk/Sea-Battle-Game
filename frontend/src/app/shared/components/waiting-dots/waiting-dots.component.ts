import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-waiting-dots',
  templateUrl: 'waiting-dots.component.html',
  styleUrls: ['waiting-dots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingDotsComponent {}