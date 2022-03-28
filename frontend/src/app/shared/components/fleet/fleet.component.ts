import { CdkDragEnd, CdkDragStart } from "@angular/cdk/drag-drop";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Ship } from "../../models/ship.model";

@Component({
  selector: 'app-fleet',
  templateUrl: 'fleet.component.html',
  styleUrls: ['fleet.component.scss'],
})
export class FleetComponent {
  @Input() fleet: Array<Ship> = [];
  
  @Output() onDragStarted = new EventEmitter<{ event: CdkDragStart, ship: Ship }>()
  dragStarted(event: CdkDragStart, ship: Ship) {
    this.onDragStarted.emit({ event, ship });
  }

  @Output() onDragEnded = new EventEmitter<CdkDragEnd>()
  dragEnded(event: CdkDragEnd) {
    this.onDragEnded.emit(event);
  }
}