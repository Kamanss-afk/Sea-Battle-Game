import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ToggleComponent } from './components/toggle/toggle.componnet';
import { BoardComponent } from './components/board/board.component';
import { ShipComponent } from './components/ship/ship.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
    ShipComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
    ShipComponent,
  ],
})
export class SharedModule {}