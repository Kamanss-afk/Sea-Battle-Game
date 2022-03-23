import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ToogleComponent } from './components/toogle/toogle.componnet';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ToogleComponent,
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
    ToogleComponent,
  ],
})
export class SharedModule {}