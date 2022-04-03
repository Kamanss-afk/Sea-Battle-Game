import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeployComponent } from './deploy.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { ShipComponent } from './components/ship/ship.component';
import { FleetMapComponent } from './components/fleet-map/fleet-map.component';

@NgModule({
  declarations: [
    DeployComponent,
    FleetComponent,
    ShipComponent,
    FleetMapComponent,
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