import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ToggleComponent } from './components/toggle/toggle.componnet';
import { BoardComponent } from './components/board/board.component';
import { ShipComponent } from './components/ship/ship.component';
import { FleetComponent } from './components/fleet/fleet.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
    ShipComponent,
    FleetComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    DragDropModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
    ShipComponent,
    FleetComponent
  ],
})
export class SharedModule {}