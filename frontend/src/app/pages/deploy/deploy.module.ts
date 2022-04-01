import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeployComponent } from './deploy.component';

@NgModule({
  declarations: [
    DeployComponent,
  ],
  imports: [
    DragDropModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DeployComponent }
    ])
  ],
  exports: [

  ],
})
export class DeployModule {}