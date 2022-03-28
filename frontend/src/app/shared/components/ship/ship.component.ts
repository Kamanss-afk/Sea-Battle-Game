import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-ship',
  templateUrl: 'ship.component.html',
  styleUrls: ['ship.component.scss'],
})
export class ShipComponent {
  @Input() size: number = 0;
  @Input() rotate: boolean = false;
}