import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { TodosModule } from './todos/todos.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { TodosEffects } from './todos/store/todos.effects';
import { CoreModule } from './core.module';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { TodoMainComponent } from './todos/todo-main.component';

@NgModule({
  declarations: [LoginComponent, AppComponent, HeaderComponent],
  imports: [
    LoginModule,
    SharedModule,
    TodosModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, TodosEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [MessageService],
  exports: [LoginModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
