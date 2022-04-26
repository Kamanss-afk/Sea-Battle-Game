import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LayoutComponent } from './components/layout/layout.component';
import { BattleGuard } from './guards/battle.guard';
import { DeployGuard } from './guards/deploy.guard';
import { GameService } from './services/game.service';
import { MessageService } from './services/message.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 10000,
      preventDuplicates: true,
    }),
    BackButtonDisableModule.forRoot(),
  ],
  exports: [
    LayoutComponent,
  ],
  providers: [
    GameService,
    MessageService,
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