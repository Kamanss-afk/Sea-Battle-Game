import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
    ShipComponent,
    FleetComponent
  ],
})
export class SharedModule {}