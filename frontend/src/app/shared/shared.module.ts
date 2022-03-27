import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ToggleComponent } from './components/toggle/toggle.componnet';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
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
  ],
})
export class SharedModule {}