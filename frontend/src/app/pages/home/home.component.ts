import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GameService } from '../../core/services/game.service';
import { Game } from '../../shared/models/game.model';
import { Player } from '../../shared/models/player.model';

type FormMode = 'START' | 'JOIN';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private startGameSuccess: Subscription;
  private startGameError: Subscription;

  private joinGameSuccess: Subscription;
  private joinGameError: Subscription;

  private formMode: FormMode = 'START';

  public form: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  public controllers: [string, string] = ['НАЧАТЬ', 'ПРИСОЕДИНИТЬСЯ'];

  constructor(
    private router: Router,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.startGameSuccess = this.gameService.onStartGameSuccess.subscribe(({ gameId, player }) => {
      console.log(gameId, player)
      this.gameService.game = new Game(gameId);
      this.gameService.player = new Player(player.id, player.name);
      this.router.navigate(['deploy']);
    });

    this.joinGameSuccess = this.gameService.onJoinGameSuccess.subscribe(({ gameId, player }) => {
      this.gameService.game = new Game(gameId);
      this.gameService.player = new Player(player.id, player.name);
      this.router.navigate(['deploy']);
    });

    this.startGameError = this.gameService.onStartGameError.subscribe(({ message }) => {
      console.log(message);
    });

    this.joinGameError = this.gameService.onJoinGameError.subscribe(({ message }) => {
      console.log(message);
    });
  }

  ngOnDestroy(): void {
    this.startGameSuccess.unsubscribe();
    this.startGameError.unsubscribe();
    this.joinGameError.unsubscribe();
    this.joinGameSuccess.unsubscribe();
  }

  public changeFormMode(event: MouseEvent) {
    switch(this.formMode) {
      case 'START': this.formMode = 'JOIN';
      break;
      case 'JOIN': this.formMode = 'START';
      break;
    }

    if(this.formMode == 'START') {
      this.form.removeControl('gameId');
    }

    if(this.formMode == 'JOIN') {
      this.form.addControl('gameId', new FormControl());
    }
  }

  public submit() {
    const name = this.form.controls['name'].value;

    if(this.formMode === 'JOIN') {
      const gameId = this.form.controls['gameId'].value;
      this.gameService.joinGame(name, gameId);
    }

    if(this.formMode === 'START') {
      this.gameService.startGame(name);
    }

  }
}
