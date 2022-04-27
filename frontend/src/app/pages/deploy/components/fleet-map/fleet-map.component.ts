import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ship } from '../../../../shared/models/ship.model';

@Component({
  selector: 'fleet-map',
  templateUrl: 'fleet-map.component.html',
  styleUrls: ['fleet-map.component.scss'],
})
export class FleetMapComponent {
  @Input() deployedShips: Array<Ship> = [];
  @Input() draggable: boolean = true;

  @Output() onDragStarted = new EventEmitter<{ event: CdkDragStart, ship: Ship }>()
  dragStarted(event: CdkDragStart, ship: Ship) {
    this.onDragStarted.emit({ event, ship });
  }

  @Output() onDragEnded = new EventEmitter<CdkDragEnd>()
  dragEnded(event: CdkDragEnd) {
    this.onDragEnded.emit(event);
  }
}