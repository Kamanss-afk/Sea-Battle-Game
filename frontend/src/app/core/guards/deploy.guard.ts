import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { GameService } from '../services/game.service';

@Injectable()
export class DeployGuard
  implements CanActivate {
  constructor(
    @Inject(GameService) private auth: GameService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (!!this.auth.game) {
      return true;
    } else {
      this.router.navigate(['']);
    }
    return false;
  }
}