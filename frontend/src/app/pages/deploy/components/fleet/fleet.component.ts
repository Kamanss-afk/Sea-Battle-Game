import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Ship } from '../../../../shared/models/ship.model';

@Component({
  selector: 'app-fleet',
  templateUrl: 'fleet.component.html',
  styleUrls: ['fleet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetComponent {
  @Input() fleet: Array<Ship> = [];
  @Input() draggable: boolean = true;
  
  @Output() onDragStarted = new EventEmitter<{ event: CdkDragStart, ship: Ship }>()
  dragStarted(event: CdkDragStart, ship: Ship) {
    this.onDragStarted.emit({ event, ship });
  }

  @Output() onDragEnded = new EventEmitter<CdkDragEnd>()
  dragEnded(event: CdkDragEnd) {
    this.onDragEnded.emit(event);
  }

  @Output() onRotate = new EventEmitter<number>()
  rotate(shipId: number) {
    this.onRotate.emit(shipId);
  }
}