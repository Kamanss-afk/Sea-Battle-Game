import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LayoutComponent } from './components/layout/layout.component';
import { BattleGuard } from './guards/battle.guard';
import { DeployGuard } from './guards/deploy.guard';
import { GameService } from './services/game.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot(),
  ],
  exports: [
    LayoutComponent,
  ],
  providers: [
    GameService,
    DeployGuard,
    BattleGuard
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}