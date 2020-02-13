import {Component, Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable({providedIn:'root'})
export class AppComponent implements OnInit {
  //private isLoading: boolean = false;
  private error: string = null;

  title = 'do-it';

  constructor(private store: Store<fromApp.AppState>, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      //this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error){
       this.addSingle(this.error)
      }
    });
  }
  addSingle(errorMsg) {
    this.messageService.add({severity:'Error', summary:'Service Message', detail:errorMsg});
  }

}
