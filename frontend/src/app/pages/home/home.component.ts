import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  private gameState: Subscription;

  private startGameSuccess: Subscription;
  private startGameError: Subscription;

  private joinGameSuccess: Subscription;
  private joinGameError: Subscription;

  private formMode: FormMode = 'START';

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(7),
    ]),
  });

  public controllers: [string, string] = ['НАЧАТЬ', 'ПРИСОЕДИНИТЬСЯ'];

  constructor(
    private router: Router,
    private gameService: GameService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.gameState = this.gameService.onGameState.subscribe(({ state }) => {
      this.gameService.game.changeState(state);
    });

    this.startGameSuccess = this.gameService.onStartGameSuccess.subscribe(({ gameId, player }) => {
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
      this.toastr.error(message, 'Вы не можете начать новую игру:');
    });

    this.joinGameError = this.gameService.onJoinGameError.subscribe(({ message }) => {
      this.toastr.error(message, 'Вы не можете присоединиться к игре:');
    });
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();
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
      this.form.addControl('gameId', new FormControl('', [ Validators.required ]));
    }
  }

  public submit() {
    const name = this.form.controls['name'].value;

    if (this.form.invalid) return;
  
    if(this.formMode === 'JOIN') {
      const gameId = this.form.controls['gameId'].value;
      this.gameService.joinGame(name, gameId);
    }

    if(this.formMode === 'START') {
      this.gameService.startGame(name);
    }
  }
}
