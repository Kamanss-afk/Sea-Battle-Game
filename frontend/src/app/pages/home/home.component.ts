import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { MessageService } from '../../core/services/message.service';
import { GameService } from '../../core/services/game.service';
import { Game, GameTurn } from '../../shared/models/game.model';
import { Player } from '../../shared/models/player.model';

type FormMode = 'START' | 'JOIN';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
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
    public messageService: MessageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.startGameSuccess = this.gameService.onStartGameSuccess.subscribe(({ gameId, player }) => {
      this.gameService.game = new Game(gameId, GameTurn.PLAYER);
      this.gameService.player = new Player(player.id, player.name);

      this.messageService.visible.next(true);
      this.messageService.setCurrentMessage(this.gameService.game.state);

      this.router.navigate(['deploy']);
    });

    this.joinGameSuccess = this.gameService.onJoinGameSuccess.subscribe(({ gameId, player }) => {
      this.gameService.game = new Game(gameId, GameTurn.OPPONENT);
      this.gameService.player = new Player(player.id, player.name);

      this.messageService.setCurrentMessage(this.gameService.game.state);
      
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
    this.startGameSuccess.unsubscribe();
    this.startGameError.unsubscribe();
    this.joinGameError.unsubscribe();
    this.joinGameSuccess.unsubscribe();
  }

  public changeFormMode(event: MouseEvent) {
    switch(this.formMode) {
      case 'START':
        this.formMode = 'JOIN';
        this.form.addControl('gameId', new FormControl('', [ Validators.required ]));
      break;

      case 'JOIN': 
        this.formMode = 'START';
        this.form.removeControl('gameId');
      break;
    }
  }

  public submit() {
    if (this.form.invalid) return;

    const name = this.form.controls['name'].value;

    switch(this.formMode) {
      case 'START': this.gameService.startGame(name);
      break;
      
      case 'JOIN':
        const gameId = this.form.controls['gameId'].value;
        this.gameService.joinGame(name, gameId);
      break;
    }
  }
}
