import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { MessageService } from 'primeng/api';
import * as SharedActions from './store/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
  private error: string = null;

  title = 'do-it';
  loading: boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.store.select('shared').subscribe(sharedStated => {
      this.loading = sharedStated.loading;
      this.error = sharedStated.error;
      if (this.error) {
        this.addSingle(this.error);
      }
    });
  }
  addSingle(errorMsg) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMsg,
      sticky: true,
    });
    setTimeout(() => {
      this.messageService.clear();
      this.clearError();
    }, 3000);
  }

  clearError() {
    this.store.dispatch(new SharedActions.ClearError());
  }
}
