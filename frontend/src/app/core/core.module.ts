import { NgModule, Optional, SkipSelf } from '@angular/core';

import { LayoutComponent } from './components/layout/layout.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [],
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