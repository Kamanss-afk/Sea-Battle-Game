import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeployComponent } from './deploy.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { ShipComponent } from './components/ship/ship.component';
import { FleetMapComponent } from './components/fleet-map/fleet-map.component';
import { DeployService } from './services/deploy.service';
import { ClipboardModule } from 'ngx-clipboard';
import { ClipboardComponent } from './components/clipboard/clipboard.component';

@NgModule({
  declarations: [
    DeployComponent,
    FleetComponent,
    ShipComponent,
    FleetMapComponent,
    ClipboardComponent,
  ],
  imports: [
    DragDropModule,
    SharedModule,
    ClipboardModule,
    RouterModule.forChild([
      { path: '', component: DeployComponent }
    ])
  ],
  exports: [

  ],
  providers: [
    DeployService,
  ]
})
export class DeployModule {}