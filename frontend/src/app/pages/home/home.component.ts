import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

type FormMode = 'START' | 'JOIN';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private formMode: FormMode = 'START';

  public form: FormGroup = new FormGroup({
    username: new FormControl(),
  });

  public controllers: [string, string] = ['START GAME', 'JOIN TO GAME'];

  constructor(private router: Router) {}

  public changeFormMode(event: MouseEvent) {
    switch(this.formMode) {
      case 'START': this.formMode = 'JOIN';
      break;
      case 'JOIN': this.formMode = 'START';
      break;
    }

    if(this.formMode == 'START') {
      this.form.removeControl('code');
    }

    if(this.formMode == 'JOIN') {
      this.form.addControl('code', new FormControl());
    }
  }

  public submit() {
    this.router.navigate(['deploy']);
  }
}
