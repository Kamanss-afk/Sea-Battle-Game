import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { LayoutComponent } from './components/layout/layout.component';
import { GameService } from './services/game.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    SocketIoModule.forRoot(config)
  ],
  exports: [
    LayoutComponent,
  ],
  providers: [
    GameService,
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