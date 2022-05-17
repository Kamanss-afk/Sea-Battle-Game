import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    event.stopImmediatePropagation();
    return false;
  }
}