import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoMainComponent } from './todos/todo-main.component';
import { AuthGuard } from './auth.gurds';
import {TodosResolverService} from './app.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodoMainComponent, canActivate: [AuthGuard], resolve: {
      todo: TodosResolverService
    } },
];

@NgModule({
  // providers[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
