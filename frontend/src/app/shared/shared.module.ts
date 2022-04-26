import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ToggleComponent } from './components/toggle/toggle.componnet';
import { BoardComponent } from './components/board/board.component';
import { MessageComponent } from './components/message/message.component';
import { WaitingDotsComponent } from './components/waiting-dots/waiting-dots.component';
import { ClipboardComponent } from './components/clipboard/clipboard.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ToggleComponent,
    BoardComponent,
    MessageComponent,
    WaitingDotsComponent,
    ClipboardComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
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
    MessageComponent,
    WaitingDotsComponent,
    ClipboardComponent,
  ],
})
export class SharedModule {}