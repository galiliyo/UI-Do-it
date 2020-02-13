import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm = new FormGroup({
    email: new FormControl('1', [Validators.required, Validators.email]),
    password: new FormControl('1', Validators.required)
  });

  private isLoading = false;
  private error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;



  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) {

  }



  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.error = authState.authError;
      if (this.error) {
        LoginComponent.showErrorAlert(this.error);
      }
    });
  }


  onSubmit() {
    const value = this.loginForm.value;
    this.store.dispatch(new AuthActions.LoginStart({email: value.email, password: value.password}));
  }

  private static showErrorAlert(error: string) {
    console.log('error', error);
  }
}
