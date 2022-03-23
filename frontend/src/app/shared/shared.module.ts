import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
  ],
})
export class SharedModule {}